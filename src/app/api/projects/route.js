import { NextResponse } from 'next/server';

// Mock data for projects
const projects = [
  {
    id: 1,
    name: 'Projet A',
    description: 'Optimisation des coûts de production',
    budget: 300000,
    spent: 195000,
    department: 'Production',
    startDate: '2025-01-15',
    endDate: '2025-07-30',
    status: 'En cours',
    progress: 65,
    manager: 'John Doe',
    team: ['Jane Smith', 'Robert Johnson', 'Alice Brown'],
    costBreakdown: {
      materials: 120000,
      labor: 45000,
      equipment: 20000,
      other: 10000
    }
  },
  {
    id: 2,
    name: 'Projet B',
    description: 'Réduction des coûts logistiques',
    budget: 250000,
    spent: 75000,
    department: 'Logistique',
    startDate: '2025-03-01',
    endDate: '2025-09-15',
    status: 'En cours',
    progress: 30,
    manager: 'Alice Brown',
    team: ['David Wilson', 'Michael Lee'],
    costBreakdown: {
      materials: 30000,
      labor: 35000,
      equipment: 5000,
      other: 5000
    }
  },
  {
    id: 3,
    name: 'Projet C',
    description: 'Analyse des coûts de main d\'œuvre',
    budget: 200000,
    spent: 180000,
    department: 'Ressources Humaines',
    startDate: '2025-02-10',
    endDate: '2025-06-20',
    status: 'Presque terminé',
    progress: 90,
    manager: 'Sarah Davis',
    team: ['Thomas Miller', 'Michael Lee', 'Robert Johnson'],
    costBreakdown: {
      materials: 50000,
      labor: 100000,
      equipment: 20000,
      other: 10000
    }
  },
  {
    id: 4,
    name: 'Projet D',
    description: 'Optimisation des coûts énergétiques',
    budget: 150000,
    spent: 60000,
    department: 'Maintenance',
    startDate: '2025-04-05',
    endDate: '2025-10-30',
    status: 'En cours',
    progress: 40,
    manager: 'Thomas Miller',
    team: ['Jane Smith', 'David Wilson'],
    costBreakdown: {
      materials: 25000,
      labor: 20000,
      equipment: 10000,
      other: 5000
    }
  }
];

export async function GET(request) {
  // Get the project ID from the URL if provided
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  // If ID is provided, return that specific project
  if (id) {
    const project = projects.find(p => p.id === parseInt(id));
    if (project) {
      return NextResponse.json(project);
    } else {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
  }
  
  // Otherwise return all projects
  return NextResponse.json(projects);
}

export async function POST(request) {
  try {
    const body = await request.json();
    
    // In a real app, this would validate and save to a database
    // For now, we'll just return the data with a new ID
    const newProject = {
      id: projects.length + 1,
      ...body,
      status: 'Nouveau',
      progress: 0
    };
    
    // Return the new project
    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
  }
}
