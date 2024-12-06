import { Box, Typography, Button, TextField, Modal } from '@mui/material';
import { useEffect, useState } from 'react';
import "../styles/missionModal.css";    
import { Mission, FormData } from '../types/types';

interface MissionModalProps {
  open: boolean;
  selectedMission: Mission | null;
  onClose: () => void;
}

const MissionModal = ({ open, selectedMission, onClose }: MissionModalProps) => {
  const [showForm, setShowForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    nom: '',
    prenom: '',
    telephone: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setShowSuccess(true);
    setShowForm(false);
  };

  const handleClose = () => {
    setShowForm(false);
    setShowSuccess(false);
    setFormData({ nom: '', prenom: '', telephone: '' });
    onClose();
  };

  if (!selectedMission && open) {
    console.log("No mission selected"); // Pour le débogage
    return null;
  }

  useEffect(() => { // Pour le débogage
    console.log("Selected mission:", selectedMission);
  }, [selectedMission]);

  return (
    <Modal 
  open={open} 
  onClose={handleClose} 
  aria-labelledby="mission-modal"
  sx={{
    '& .MuiBackdrop-root': {
      backdropFilter: 'blur(5px)',
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
    }
  }}
>
      <Box className="modal-content">
        {selectedMission && !showForm && !showSuccess && (
          <>
            <Box className="modal-header">
              <img 
                src={selectedMission.imageUrl} 
                alt={selectedMission.nom}
                className="modal-image"
              />
              <Box>
                <Typography variant="h6" className="modal-title">
                  {selectedMission.nom}
                </Typography>
                <Typography className="modal-category">
                  {selectedMission.categorie}
                </Typography>
              </Box>
            </Box>

            <Typography className="modal-description">
              {selectedMission.description}
            </Typography>

            <Box className="modal-details">
              <Typography>
                <strong>Durée :</strong> {selectedMission.duree}
              </Typography>
              <Typography>
                <strong>Bénévoles requis :</strong> {selectedMission.nombreBenevoles}
              </Typography>
              <Typography>
                <strong>Association :</strong> {selectedMission.association}
              </Typography>
            </Box>

            <Box className="modal-actions">
              <Button 
                variant="outlined"
                onClick={handleClose}
                className="modal-button"
              >
                Fermer
              </Button>
              <Button 
                variant="contained"
                className="modal-button"
                onClick={() => setShowForm(true)}
              >
                S'inscrire
              </Button>
            </Box>
          </>
        )}

        {showForm && !showSuccess && (
          <form onSubmit={handleSubmit} className="registration-form">
            <Typography variant="h6" className="modal-title">
              Inscription à la mission
            </Typography>

            <TextField
              required
              fullWidth
              name="nom"
              label="Nom"
              value={formData.nom}
              onChange={handleInputChange}
              className="form-field"
              sx={{ mt: 2, mb: 2 }}
            />

            <TextField
              required
              fullWidth
              name="prenom"
              label="Prénom"
              value={formData.prenom}
              onChange={handleInputChange}
              className="form-field"
              sx={{ mb: 2 }}
            />

            <TextField
              required
              fullWidth
              name="telephone"
              label="Numéro de téléphone"
              value={formData.telephone}
              onChange={handleInputChange}
              className="form-field"
              sx={{ mb: 3 }}
            />

            <Box className="modal-actions">
              <Button 
                variant="outlined"
                onClick={() => setShowForm(false)}
                className="modal-button"
              >
                Retour
              </Button>
              <Button 
                variant="contained"
                type="submit"
                className="modal-button"
              >
                Confirmer
              </Button>
            </Box>
          </form>
        )}

        {showSuccess && (
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" className="modal-title">
              Merci pour votre inscription !
            </Typography>
            <Typography className="modal-description">
              Nous avons bien enregistré votre participation.
              L'association vous contactera prochainement.
            </Typography>
            <Box className="modal-actions" sx={{ justifyContent: 'center' }}>
              <Button 
                variant="contained"
                onClick={handleClose}
                className="modal-button"
              >
                Fermer
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default MissionModal;