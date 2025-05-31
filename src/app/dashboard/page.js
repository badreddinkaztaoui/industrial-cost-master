"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Button,
  Alert,
  CircularProgress
} from '@mui/material';
import { isAuthenticated } from '../lib/auth';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title } from 'chart.js';
import { Pie, Bar, Line } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title);

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [projectData, setProjectData] = useState(null);

  // Check authentication
  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/auth/login');
    }
  }, [router]);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get dashboard data from API
        const response = await axios.get('/api/costs');
        setProjectData(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Impossible de charger les données du dashboard');
        setLoading(false);
      }
    };

    if (isAuthenticated()) {
      fetchData();
    }
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard de Contrôle des Coûts
      </Typography>

      {/* KPI Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Budget Total
              </Typography>
              <Typography variant="h5" component="div">
                {projectData.kpis.totalBudget}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Dépenses Totales
              </Typography>
              <Typography variant="h5" component="div">
                {projectData.kpis.totalSpent}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Variance
              </Typography>
              <Typography variant="h5" component="div" sx={{ color: projectData.kpis.variance.startsWith('-') ? 'error.main' : 'success.main' }}>
                {projectData.kpis.variance}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Nombre de Projets
              </Typography>
              <Typography variant="h5" component="div">
                {projectData.kpis.projectCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Alerts */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Alertes
        </Typography>
        {projectData.alerts.map((alert) => (
          <Alert key={alert.id} severity={alert.type} sx={{ mb: 1 }}>
            {alert.message}
          </Alert>
        ))}
      </Box>

      {/* Charts */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Coûts par Projet
            </Typography>
            <Box sx={{ height: 300 }}>
              <Pie data={projectData.costsByProject} options={{ maintainAspectRatio: false }} />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Coûts par Département
            </Typography>
            <Box sx={{ height: 300 }}>
              <Bar
                data={projectData.departmentCosts}
                options={{
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true
                    }
                  }
                }}
              />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Tendance des Coûts vs Budget
            </Typography>
            <Box sx={{ height: 300 }}>
              <Line
                data={projectData.costTrend}
                options={{
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true
                    }
                  }
                }}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Actions */}
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" color="primary" sx={{ mr: 1 }}>
          Générer Rapport
        </Button>
        <Button variant="outlined">
          Exporter Données
        </Button>
      </Box>
    </Box>
  );
}
