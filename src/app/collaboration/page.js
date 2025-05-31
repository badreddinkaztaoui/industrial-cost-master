"use client";

import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Button,
  TextField,
  Chip,
  IconButton,
  Tab,
  Tabs
} from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import SendIcon from '@mui/icons-material/Send';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import AttachFileIcon from '@mui/icons-material/AttachFile';

export default function Collaboration() {
  const [activeTab, setActiveTab] = useState(0);
  const [comment, setComment] = useState('');

  // Mock data for projects
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

  // Mock data for comments
  const comments = [
    {
      id: 1,
      author: 'John Doe',
      role: 'Chef de projet',
      content: 'Les coûts de matières premières ont augmenté de 15% ce mois-ci. Nous devons revoir notre stratégie d\'approvisionnement.',
      timestamp: '2025-05-30 14:30',
      avatar: 'JD'
    },
    {
      id: 2,
      author: 'Jane Smith',
      role: 'Responsable financier',
      content: 'J\'ai analysé les données et je confirme cette tendance. Je propose une réunion avec les fournisseurs pour renégocier les contrats.',
      timestamp: '2025-05-30 15:15',
      avatar: 'JS'
    },
    {
      id: 3,
      author: 'Robert Johnson',
      role: 'Directeur des opérations',
      content: 'Bonne idée. Nous devrions également explorer des alternatives pour certains matériaux.',
      timestamp: '2025-05-30 16:00',
      avatar: 'RJ'
    }
  ];

  // Mock data for approvals
  const approvals = [
    {
      id: 1,
      title: 'Budget supplémentaire - Projet A',
      requestedBy: 'John Doe',
      requestedOn: '2025-05-29',
      status: 'En attente',
      amount: '25,000 MAD',
      approvers: ['Jane Smith', 'Michael Lee']
    },
    {
      id: 2,
      title: 'Changement de fournisseur - Projet B',
      requestedBy: 'Alice Brown',
      requestedOn: '2025-05-28',
      status: 'Approuvé',
      amount: '12,000 MAD',
      approvers: ['David Wilson']
    },
    {
      id: 3,
      title: 'Extension de délai - Projet C',
      requestedBy: 'Sarah Davis',
      requestedOn: '2025-05-27',
      status: 'Rejeté',
      amount: '8,000 MAD',
      approvers: ['Thomas Miller']
    }
  ];

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      // In a real app, this would add the comment to the database
      alert('Commentaire ajouté avec succès!');
      setComment('');
    }
  };

  const handleApprove = (id) => {
    // In a real app, this would update the approval status
    alert(`Demande #${id} approuvée avec succès!`);
  };

  const handleReject = (id) => {
    // In a real app, this would update the approval status
    alert(`Demande #${id} rejetée!`);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Module de Collaboration
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="collaboration tabs">
          <Tab label="Projets" />
          <Tab label="Discussions" />
          <Tab label="Approbations" />
        </Tabs>
      </Box>

      {/* Projects Tab */}
      {activeTab === 0 && (
        <Grid container spacing={3}>
          {projects.map((project) => (
            <Grid item xs={12} md={4} key={project.id}>
              <Card>
                <CardHeader
                  title={project.name}
                  subheader={`Dernière mise à jour: ${project.lastUpdated}`}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {project.description}
                  </Typography>

                  <Typography variant="body2" gutterBottom>
                    <strong>Statut:</strong> {project.status}
                  </Typography>

                  <Typography variant="body2" gutterBottom>
                    <strong>Progression:</strong> {project.progress}%
                  </Typography>

                  <Typography variant="body2" gutterBottom>
                    <strong>Membres:</strong>
                  </Typography>

                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    {project.members.map((member, index) => (
                      <Chip key={index} label={member} size="small" />
                    ))}
                  </Box>

                  <Button variant="outlined" size="small" fullWidth>
                    Voir les détails
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Discussions Tab */}
      {activeTab === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 2, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Discussion: Projet A - Optimisation des coûts
              </Typography>

              <List>
                {comments.map((comment, index) => (
                  <div key={comment.id}>
                    {index > 0 && <Divider variant="inset" component="li" />}
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar>{comment.avatar}</Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography component="span" variant="subtitle2">
                              {comment.author} ({comment.role})
                            </Typography>
                            <Typography component="span" variant="caption" color="text.secondary">
                              {comment.timestamp}
                            </Typography>
                          </Box>
                        }
                        secondary={comment.content}
                      />
                    </ListItem>
                  </div>
                ))}
              </List>

              <Box sx={{ display: 'flex', mt: 2 }}>
                <TextField
                  fullWidth
                  placeholder="Ajouter un commentaire..."
                  variant="outlined"
                  size="small"
                  value={comment}
                  onChange={handleCommentChange}
                />
                <IconButton color="primary" onClick={() => {}} sx={{ ml: 1 }}>
                  <AttachFileIcon />
                </IconButton>
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<SendIcon />}
                  onClick={handleCommentSubmit}
                  sx={{ ml: 1 }}
                  disabled={!comment.trim()}
                >
                  Envoyer
                </Button>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Discussions récentes
              </Typography>

              <List>
                <ListItem button selected>
                  <ListItemAvatar>
                    <Avatar>
                      <CommentIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Projet A - Optimisation des coûts"
                    secondary="3 nouveaux messages"
                  />
                </ListItem>
                <ListItem button>
                  <ListItemAvatar>
                    <Avatar>
                      <CommentIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Projet B - Réduction des coûts logistiques"
                    secondary="Dernière activité: hier"
                  />
                </ListItem>
                <ListItem button>
                  <ListItemAvatar>
                    <Avatar>
                      <CommentIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Projet C - Analyse des coûts de main d'œuvre"
                    secondary="Dernière activité: 3 jours"
                  />
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>
      )}

      {/* Approvals Tab */}
      {activeTab === 2 && (
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Demandes d'approbation
          </Typography>

          <List>
            {approvals.map((approval) => (
              <div key={approval.id}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar>
                      {approval.status === 'En attente' ? <PendingIcon /> : <CheckCircleIcon />}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography component="span" variant="subtitle2">
                          {approval.title}
                        </Typography>
                        <Chip
                          label={approval.status}
                          color={
                            approval.status === 'Approuvé' ? 'success' :
                            approval.status === 'Rejeté' ? 'error' : 'warning'
                          }
                          size="small"
                        />
                      </Box>
                    }
                    secondary={
                      <>
                        <Typography component="span" variant="body2" sx={{ display: 'block' }}>
                          Demandé par: {approval.requestedBy} le {approval.requestedOn}
                        </Typography>
                        <Typography component="span" variant="body2" sx={{ display: 'block' }}>
                          Montant: {approval.amount}
                        </Typography>
                        <Typography component="span" variant="body2" sx={{ display: 'block' }}>
                          Approbateurs: {approval.approvers.join(', ')}
                        </Typography>
                      </>
                    }
                  />
                  {approval.status === 'En attente' && (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        onClick={() => handleApprove(approval.id)}
                        sx={{ mr: 1 }}
                      >
                        Approuver
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => handleReject(approval.id)}
                      >
                        Rejeter
                      </Button>
                    </Box>
                  )}
                </ListItem>
                <Divider component="li" />
              </div>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
}
