import { NextResponse } from 'next/server';

// Mock data for reports
const reportData = [
  { id: 1, project: 'Projet A', department: 'Production', category: 'Matières premières', amount: 125000, date: '2025-05-01' },
  { id: 2, project: 'Projet A', department: 'Production', category: 'Main d\'œuvre', amount: 85000, date: '2025-05-05' },
  { id: 3, project: 'Projet B', department: 'R&D', category: 'Équipement', amount: 95000, date: '2025-05-10' },
  { id: 4, project: 'Projet B', department: 'Marketing', category: 'Services externes', amount: 45000, date: '2025-05-15' },
  { id: 5, project: 'Projet C', department: 'Production', category: 'Matières premières', amount: 75000, date: '2025-05-20' },
  { id: 6, project: 'Projet C', department: 'Administration', category: 'Frais généraux', amount: 35000, date: '2025-05-25' },
  { id: 7, project: 'Projet D', department: 'R&D', category: 'Main d\'œuvre', amount: 65000, date: '2025-05-28' },
  { id: 8, project: 'Projet A', department: 'Administration', category: 'Frais généraux', amount: 15000, date: '2025-04-15' },
  { id: 9, project: 'Projet B', department: 'Production', category: 'Matières premières', amount: 55000, date: '2025-04-20' },
  { id: 10, project: 'Projet C', department: 'R&D', category: 'Équipement', amount: 40000, date: '2025-04-25' },
  { id: 11, project: 'Projet D', department: 'Marketing', category: 'Services externes', amount: 25000, date: '2025-04-10' },
  { id: 12, project: 'Projet A', department: 'R&D', category: 'Équipement', amount: 30000, date: '2025-03-15' },
];

// Report templates
const reportTemplates = [
  { id: 1, name: 'Rapport mensuel des coûts', type: 'cost', format: 'pdf', createdBy: 'John Doe' },
  { id: 2, name: 'Analyse budgétaire par projet', type: 'budget', format: 'excel', createdBy: 'Jane Smith' },
  { id: 3, name: 'Prévisions financières', type: 'forecast', format: 'pdf', createdBy: 'Robert Johnson' },
  { id: 4, name: 'Rapport d\'écarts', type: 'variance', format: 'excel', createdBy: 'Alice Brown' },
];

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const project = searchParams.get('project');
  const department = searchParams.get('department');
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  const templateId = searchParams.get('templateId');
  
  // If requesting templates
  if (type === 'templates') {
    return NextResponse.json(reportTemplates);
  }
  
  // Filter data based on query parameters
  let filteredData = [...reportData];
  
  if (project && project !== 'all') {
    filteredData = filteredData.filter(item => item.project === project);
  }
  
  if (department && department !== 'all') {
    filteredData = filteredData.filter(item => item.department === department);
  }
  
  if (startDate) {
    filteredData = filteredData.filter(item => new Date(item.date) >= new Date(startDate));
  }
  
  if (endDate) {
    filteredData = filteredData.filter(item => new Date(item.date) <= new Date(endDate));
  }
  
  // Calculate summary statistics
  const totalAmount = filteredData.reduce((sum, item) => sum + item.amount, 0);
  const entriesCount = filteredData.length;
  const averageAmount = entriesCount > 0 ? totalAmount / entriesCount : 0;
  
  // Return the report data with summary
  return NextResponse.json({
    data: filteredData,
    summary: {
      totalAmount,
      entriesCount,
      averageAmount
    }
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    
    // In a real app, this would generate a report based on the provided parameters
    // and either save it to a database or return it directly
    
    // For now, we'll just return a success message with the request parameters
    return NextResponse.json({
      success: true,
      message: 'Rapport généré avec succès',
      reportId: Math.floor(Math.random() * 1000) + 100,
      parameters: body
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
  }
}
