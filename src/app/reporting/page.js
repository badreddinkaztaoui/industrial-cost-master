"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Card,
  CardContent,
  CircularProgress,
  Alert
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import DownloadIcon from '@mui/icons-material/Download';
import EmailIcon from '@mui/icons-material/Email';
import { isAuthenticated } from '../lib/auth';

export default function Reporting() {
  const router = useRouter();
  const [reportType, setReportType] = useState('cost');
  const [project, setProject] = useState('all');
  const [department, setDepartment] = useState('all');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reportData, setReportData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [projects, setProjects] = useState([]);
  
  // Check authentication
  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/auth/login');
    }
  }, [router]);
  
  // Fetch report data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Get report data
        const reportResponse = await axios.get('/api/reports');
        setReportData(reportResponse.data.data);
        
        // Get projects for dropdown
        const projectsResponse = await axios.get('/api/projects');
        setProjects(projectsResponse.data);
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Impossible de charger les données des rapports');
        setLoading(false);
      }
    };

    if (isAuthenticated()) {
      fetchData();
    }
  }, []);
  
  // Filter data based on selections
  useEffect(() => {
    if (!reportData.length) return;
    
    const filtered = reportData.filter(item => {
      if (project !== 'all' && item.project !== project) return false;
      if (department !== 'all' && item.department !== department) return false;
      if (startDate && new Date(item.date) < startDate) return false;
      if (endDate && new Date(item.date) > endDate) return false;
      return true;
    });
    
    setFilteredData(filtered);
  }, [reportData, project, department, startDate, endDate]);

  // Calculate totals
  const totalAmount = filteredData.reduce((sum, item) => sum + item.amount, 0);

  const handleGenerateReport = () => {
    // In a real app, this would generate and download a report
    alert('Rapport généré avec succès!');
  };

  const handleEmailReport = () => {
    // In a real app, this would email the report to stakeholders
    alert('Rapport envoyé par email avec succès!');
  };

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
        Génération de Rapports
      </Typography>

      {/* Report Configuration */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Configuration du Rapport
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Type de Rapport</InputLabel>
              <Select
                value={reportType}
                label="Type de Rapport"
                onChange={(e) => setReportType(e.target.value)}
              >
                <MenuItem value="cost">Analyse des Coûts</MenuItem>
                <MenuItem value="budget">Comparaison Budgétaire</MenuItem>
                <MenuItem value="forecast">Prévisions</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel id="project-label">Projet</InputLabel>
              <Select
                labelId="project-label"
                value={project}
                label="Projet"
                onChange={(e) => setProject(e.target.value)}
              >
                <MenuItem value="all">Tous les projets</MenuItem>
                {projects.map(p => (
                  <MenuItem key={p.id} value={p.name}>{p.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Département</InputLabel>
              <Select
                value={department}
                label="Département"
                onChange={(e) => setDepartment(e.target.value)}
              >
                <MenuItem value="all">Tous les Départements</MenuItem>
                <MenuItem value="Production">Production</MenuItem>
                <MenuItem value="R&D">R&D</MenuItem>
                <MenuItem value="Marketing">Marketing</MenuItem>
                <MenuItem value="Administration">Administration</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Période (début)"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} md={3}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Période (fin)"
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </Paper>

      {/* Report Summary */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total des Coûts
              </Typography>
              <Typography variant="h5" component="div">
                {totalAmount.toLocaleString()} MAD
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Nombre d'Entrées
              </Typography>
              <Typography variant="h5" component="div">
                {filteredData.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Coût Moyen
              </Typography>
              <Typography variant="h5" component="div">
                {filteredData.length > 0 ? (totalAmount / filteredData.length).toLocaleString() : 0} MAD
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Report Data */}
      <Paper sx={{ width: '100%', overflow: 'hidden', mb: 3 }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Projet</TableCell>
                <TableCell>Département</TableCell>
                <TableCell>Catégorie</TableCell>
                <TableCell align="right">Montant (MAD)</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.project}</TableCell>
                  <TableCell>{row.department}</TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell align="right">{row.amount.toLocaleString()}</TableCell>
                  <TableCell>{row.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Actions */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button 
          variant="contained" 
          startIcon={<DownloadIcon />} 
          sx={{ mr: 1 }}
          onClick={handleGenerateReport}
        >
          Générer Rapport
        </Button>
        <Button 
          variant="outlined" 
          startIcon={<EmailIcon />}
          onClick={handleEmailReport}
        >
          Envoyer par Email
        </Button>
      </Box>
    </Box>
  );
}
