import { NextResponse } from 'next/server';

// Mock data for collaboration projects
const projects = [
  {
    id: 1,
    name: 'Projet A',
    description: 'Optimisation des coûts de production',
    members: ['John Doe', 'Jane Smith', 'Robert Johnson'],
    status: 'En cours',
    progress: 65,
    lastUpdated: '2025-05-30'
  },
  {
    id: 2,
    name: 'Projet B',
    description: 'Réduction des coûts logistiques',
    members: ['Alice Brown', 'David Wilson'],
    status: 'En attente d\'approbation',
    progress: 30,
    lastUpdated: '2025-05-28'
  },
  {
    id: 3,
    name: 'Projet C',
    description: 'Analyse des coûts de main d\'œuvre',
    members: ['Michael Lee', 'Sarah Davis', 'Thomas Miller'],
    status: 'Approuvé',
    progress: 90,
    lastUpdated: '2025-05-25'
  }
];

// Mock data for discussions
const discussions = {
  1: [
    {
      id: 1,
      projectId: 1,
      author: 'John Doe',
      role: 'Chef de projet',
      content: 'Les coûts de matières premières ont augmenté de 15% ce mois-ci. Nous devons revoir notre stratégie d\'approvisionnement.',
      timestamp: '2025-05-30 14:30',
      avatar: 'JD'
    },
    {
      id: 2,
      projectId: 1,
      author: 'Jane Smith',
      role: 'Responsable financier',
      content: 'J\'ai analysé les données et je confirme cette tendance. Je propose une réunion avec les fournisseurs pour renégocier les contrats.',
      timestamp: '2025-05-30 15:15',
      avatar: 'JS'
    },
    {
      id: 3,
      projectId: 1,
      author: 'Robert Johnson',
      role: 'Directeur des opérations',
      content: 'Bonne idée. Nous devrions également explorer des alternatives pour certains matériaux.',
      timestamp: '2025-05-30 16:00',
      avatar: 'RJ'
    }
  ],
  2: [
    {
      id: 4,
      projectId: 2,
      author: 'Alice Brown',
      role: 'Chef de projet',
      content: 'Nous avons identifié plusieurs opportunités de réduction des coûts dans notre chaîne logistique.',
      timestamp: '2025-05-28 10:00',
      avatar: 'AB'
    },
    {
      id: 5,
      projectId: 2,
      author: 'David Wilson',
      role: 'Responsable logistique',
      content: 'Je suis d\'accord. Nous pourrions économiser jusqu\'à 20% en optimisant nos routes de livraison.',
      timestamp: '2025-05-28 11:30',
      avatar: 'DW'
    }
  ],
  3: [
    {
      id: 6,
      projectId: 3,
      author: 'Michael Lee',
      role: 'Analyste RH',
      content: 'L\'analyse des coûts de main d\'œuvre est presque terminée. Les résultats préliminaires montrent des écarts significatifs entre les départements.',
      timestamp: '2025-05-25 09:15',
      avatar: 'ML'
    },
    {
      id: 7,
      projectId: 3,
      author: 'Sarah Davis',
      role: 'Directrice RH',
      content: 'Excellent travail. Pouvez-vous préparer une présentation pour la réunion de direction de la semaine prochaine?',
      timestamp: '2025-05-25 10:30',
      avatar: 'SD'
    },
    {
      id: 8,
      projectId: 3,
      author: 'Thomas Miller',
      role: 'Directeur financier',
      content: 'J\'aimerais également voir une analyse comparative avec l\'année précédente.',
      timestamp: '2025-05-25 11:45',
      avatar: 'TM'
    }
  ]
};

// Mock data for approvals
const approvals = [
  {
    id: 1,
    title: 'Budget supplémentaire - Projet A',
    projectId: 1,
    requestedBy: 'John Doe',
    requestedOn: '2025-05-29',
    status: 'En attente',
    amount: '25,000 €',
    description: 'Demande de budget supplémentaire pour couvrir l\'augmentation des coûts des matières premières.',
    approvers: ['Jane Smith', 'Michael Lee']
  },
  {
    id: 2,
    title: 'Changement de fournisseur - Projet B',
    projectId: 2,
    requestedBy: 'Alice Brown',
    requestedOn: '2025-05-28',
    status: 'Approuvé',
    amount: '12,000 €',
    description: 'Proposition de changement de fournisseur pour réduire les coûts logistiques.',
    approvers: ['David Wilson']
  },
  {
    id: 3,
    title: 'Extension de délai - Projet C',
    projectId: 3,
    requestedBy: 'Sarah Davis',
    requestedOn: '2025-05-27',
    status: 'Rejeté',
    amount: '8,000 €',
    description: 'Demande d\'extension du délai du projet pour approfondir l\'analyse des données.',
    approvers: ['Thomas Miller']
  }
];

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const projectId = searchParams.get('projectId');
  
  // Return projects
  if (type === 'projects') {
    if (projectId) {
      const project = projects.find(p => p.id === parseInt(projectId));
      return project 
        ? NextResponse.json(project) 
        : NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    return NextResponse.json(projects);
  }
  
  // Return discussions
  if (type === 'discussions') {
    if (projectId) {
      const projectDiscussions = discussions[projectId] || [];
      return NextResponse.json(projectDiscussions);
    }
    // Return all discussions
    return NextResponse.json(Object.values(discussions).flat());
  }
  
  // Return approvals
  if (type === 'approvals') {
    if (projectId) {
      const filteredApprovals = approvals.filter(a => a.projectId === parseInt(projectId));
      return NextResponse.json(filteredApprovals);
    }
    return NextResponse.json(approvals);
  }
  
  // Default: return all collaboration data
  return NextResponse.json({
    projects,
    discussions,
    approvals
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { type, projectId } = body;
    
    // Handle new discussion comment
    if (type === 'comment') {
      const { author, role, content, avatar } = body;
      
      // Validate required fields
      if (!projectId || !author || !content) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
      }
      
      // In a real app, this would save to a database
      const newComment = {
        id: Math.floor(Math.random() * 1000) + 100,
        projectId: parseInt(projectId),
        author,
        role,
        content,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
        avatar: avatar || author.split(' ').map(n => n[0]).join('')
      };
      
      return NextResponse.json(newComment, { status: 201 });
    }
    
    // Handle new approval request
    if (type === 'approval') {
      const { title, requestedBy, amount, description, approvers } = body;
      
      // Validate required fields
      if (!projectId || !title || !requestedBy || !approvers) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
      }
      
      // In a real app, this would save to a database
      const newApproval = {
        id: Math.floor(Math.random() * 1000) + 100,
        projectId: parseInt(projectId),
        title,
        requestedBy,
        requestedOn: new Date().toISOString().split('T')[0],
        status: 'En attente',
        amount,
        description,
        approvers
      };
      
      return NextResponse.json(newApproval, { status: 201 });
    }
    
    // Handle approval status update
    if (type === 'updateApproval') {
      const { approvalId, status } = body;
      
      // Validate required fields
      if (!approvalId || !status) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
      }
      
      // In a real app, this would update the database
      return NextResponse.json({ 
        success: true, 
        message: `Approbation #${approvalId} mise à jour avec succès: ${status}` 
      });
    }
    
    return NextResponse.json({ error: 'Invalid request type' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
  }
}
