import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Secret key for JWT signing - in a real app, this would be in an environment variable
const JWT_SECRET = 'industrial-cost-master-secret-key';

// Mock user database
const users = [
  {
    id: 1,
    email: 'demo@example.com',
    password: '$2a$10$XFE.tWJNaJdxBZ4SjUGY8O4ynItRaZPjUOKGd1CiUMYhZZxLm1RVu', // hashed 'password'
    name: 'Utilisateur Demo',
    role: 'manager'
  },
  {
    id: 2,
    email: 'admin@example.com',
    password: '$2a$10$XFE.tWJNaJdxBZ4SjUGY8O4ynItRaZPjUOKGd1CiUMYhZZxLm1RVu', // hashed 'password'
    name: 'Administrateur',
    role: 'admin'
  }
];

export async function POST(request) {
  try {
    const body = await request.json();
    const { action, email, password, name } = body;
    
    // Login action
    if (action === 'login') {
      // Find user by email
      const user = users.find(u => u.email === email);
      
      // If user not found or password doesn't match
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return NextResponse.json({ error: 'Identifiants incorrects' }, { status: 401 });
      }
      
      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: '1d' }
      );
      
      // Return user info and token (excluding password)
      const { password: _, ...userWithoutPassword } = user;
      return NextResponse.json({
        user: userWithoutPassword,
        token
      });
    }
    
    // Register action
    if (action === 'register') {
      // Check if user already exists
      if (users.some(u => u.email === email)) {
        return NextResponse.json({ error: 'Cet email est déjà utilisé' }, { status: 400 });
      }
      
      // In a real app, this would save to a database
      // For now, we'll just return a success message
      
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Create new user
      const newUser = {
        id: users.length + 1,
        email,
        password: hashedPassword,
        name,
        role: 'user' // Default role
      };
      
      // Generate JWT token
      const token = jwt.sign(
        { userId: newUser.id, email: newUser.email, role: newUser.role },
        JWT_SECRET,
        { expiresIn: '1d' }
      );
      
      // Return user info and token (excluding password)
      const { password: _, ...userWithoutPassword } = newUser;
      return NextResponse.json({
        user: userWithoutPassword,
        token
      }, { status: 201 });
    }
    
    // Verify token action
    if (action === 'verify') {
      const { token } = body;
      
      if (!token) {
        return NextResponse.json({ error: 'Token non fourni' }, { status: 401 });
      }
      
      try {
        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET);
        
        // Find user
        const user = users.find(u => u.id === decoded.userId);
        
        if (!user) {
          return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
        }
        
        // Return user info (excluding password)
        const { password: _, ...userWithoutPassword } = user;
        return NextResponse.json({
          user: userWithoutPassword,
          valid: true
        });
      } catch (error) {
        return NextResponse.json({ error: 'Token invalide ou expiré', valid: false }, { status: 401 });
      }
    }
    
    return NextResponse.json({ error: 'Action non supportée' }, { status: 400 });
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json({ error: 'Erreur du serveur' }, { status: 500 });
  }
}
