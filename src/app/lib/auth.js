'use client';

// Function to handle demo login
export async function login(email, password) {
  // For demo purposes, accept any login with demo credentials
  if (email === 'demo@example.com' && password === 'password') {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Create demo user
    const demoUser = {
      id: 1,
      email: 'demo@example.com',
      name: 'Utilisateur Demo',
      role: 'manager'
    };
    
    // Store user in localStorage
    localStorage.setItem('user', JSON.stringify(demoUser));
    
    return { user: demoUser };
  } else {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    throw { error: 'Identifiants incorrects. Utilisez les identifiants de démonstration.' };
  }
}

// Function to handle logout
export function logout() {
  // Remove user from localStorage
  localStorage.removeItem('user');
  
  // Redirect to login page
  window.location.href = '/auth/login';
}

// Function to check if user is authenticated
export function isAuthenticated() {
  if (typeof window === 'undefined') {
    return false;
  }
  
  return !!localStorage.getItem('user');
}

// Function to get current user
export function getCurrentUser() {
  if (typeof window === 'undefined') {
    return null;
  }
  
  const userString = localStorage.getItem('user');
  return userString ? JSON.parse(userString) : null;
}

// These functions are not needed for the simplified demo
// but kept as stubs for future implementation
export function getAuthToken() {
  return null;
}

export function setupAxiosInterceptors() {
  // No-op for demo
}
