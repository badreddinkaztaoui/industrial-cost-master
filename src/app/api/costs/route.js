import { NextResponse } from 'next/server';

// Mock data for costs dashboard
const dashboardData = {
  costsByProject: {
    labels: ['Projet A', 'Projet B', 'Projet C', 'Projet D'],
    datasets: [{
      data: [195000, 75000, 180000, 60000],
      backgroundColor: ['#3f51b5', '#2196f3', '#03a9f4', '#00bcd4'],
    }]
  },
  costTrend: {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
    datasets: [{
      label: 'Coûts réels',
      data: [65000, 95000, 120000, 140000, 180000, 210000],
      borderColor: '#3f51b5',
      backgroundColor: 'rgba(63, 81, 181, 0.1)',
    }, {
      label: 'Budget prévu',
      data: [70000, 100000, 130000, 160000, 190000, 220000],
      borderColor: '#f44336',
      backgroundColor: 'rgba(244, 67, 54, 0.1)',
    }]
  },
  departmentCosts: {
    labels: ['Production', 'R&D', 'Marketing', 'Administration'],
    datasets: [{
      label: 'Coûts par département',
      data: [220000, 115000, 45000, 130000],
      backgroundColor: ['#4caf50', '#8bc34a', '#cddc39', '#ffeb3b'],
    }]
  },
  kpis: {
    totalBudget: '900,000 MAD',
    totalSpent: '510,000 MAD',
    variance: '-10.5%',
    projectCount: 4
  },
  alerts: [
    { id: 1, type: 'warning', message: 'Projet A: Dépassement de budget prévu dans 14 jours' },
    { id: 2, type: 'error', message: 'Projet C: Coûts de main d\'œuvre 20% au-dessus des prévisions' },
    { id: 3, type: 'info', message: 'Projet B: Économies de 5% réalisées sur les matières premières' }
  ],
  costBreakdown: {
    materials: {
      total: 225000,
      byProject: {
        'Projet A': 120000,
        'Projet B': 30000,
        'Projet C': 50000,
        'Projet D': 25000
      }
    },
    labor: {
      total: 200000,
      byProject: {
        'Projet A': 45000,
        'Projet B': 35000,
        'Projet C': 100000,
        'Projet D': 20000
      }
    },
    equipment: {
      total: 55000,
      byProject: {
        'Projet A': 20000,
        'Projet B': 5000,
        'Projet C': 20000,
        'Projet D': 10000
      }
    },
    other: {
      total: 30000,
      byProject: {
        'Projet A': 10000,
        'Projet B': 5000,
        'Projet C': 10000,
        'Projet D': 5000
      }
    }
  }
};

export async function GET(request) {
  // Get the specific data type if provided
  const { searchParams } = new URL(request.url);
  const dataType = searchParams.get('type');

  // If a specific data type is requested, return only that data
  if (dataType && dashboardData[dataType]) {
    return NextResponse.json(dashboardData[dataType]);
  }

  // Otherwise return all dashboard data
  return NextResponse.json(dashboardData);
}
