import {
  Alert,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import type React from "react";
import { useEffect, useState } from "react";

interface Association {
  siret: string;
  nom: string;
  adresse: {
    numero: string;
    type: string;
    voie: string;
    codePostal: string;
    commune: string;
  };
  telephone: string | null;
}

interface AssociationDetailsProps {
  association: Association;
  open: boolean;
  onClose: () => void;
}

const AssociationDetails: React.FC<AssociationDetailsProps> = ({
  association,
  open,
  onClose,
}) => (
  <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
    <DialogTitle>{association.nom}</DialogTitle>
    <DialogContent>
      <Typography variant="body1" gutterBottom>
        <strong>SIRET:</strong> {association.siret}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Adresse:</strong>
        <br />
        {[
          association.adresse.numero,
          association.adresse.type,
          association.adresse.voie,
          `${association.adresse.codePostal} ${association.adresse.commune}`,
        ]
          .filter(Boolean)
          .join(" ")}
      </Typography>
      {association.telephone && (
        <Typography variant="body1" gutterBottom>
          <strong>Téléphone:</strong> {association.telephone}
        </Typography>
      )}
    </DialogContent>
  </Dialog>
);

const AssociationsSearch: React.FC = () => {
  const [associations, setAssociations] = useState<Association[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAssociation, setSelectedAssociation] =
    useState<Association | null>(null);

  useEffect(() => {
    const fetchAssociations = async () => {
      try {
        setLoading(true);

        const response = await fetch("/api/sirene/search", {
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

        const data = await response.json();
        const formattedAssociations: Association[] = data.etablissements
          .filter((etab) =>
            etab.uniteLegale.categorieJuridiqueUniteLegale.startsWith("92"),
          )
          .map((etab) => ({
            siret: etab.siret,
            nom: etab.uniteLegale.denominationUniteLegale,
            adresse: {
              numero: etab.adresseEtablissement.numeroVoieEtablissement,
              type: etab.adresseEtablissement.typeVoieEtablissement,
              voie: etab.adresseEtablissement.libelleVoieEtablissement,
              codePostal: etab.adresseEtablissement.codePostalEtablissement,
              commune: etab.adresseEtablissement.libelleCommuneEtablissement,
            },
            telephone: etab.periodesEtablissement[0]?.telephone || null,
          }));

        setAssociations(formattedAssociations);
      } catch (err) {
        console.error("Erreur détaillée:", err);
        setError(
          err instanceof Error ? err.message : "Une erreur est survenue",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAssociations();
  }, []);

  const handleOpenDetails = (association: Association) => {
    setSelectedAssociation(association);
  };

  const handleCloseDetails = () => {
    setSelectedAssociation(null);
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Associations à Toulouse et alentours ({associations.length})
      </Typography>

      <Grid container spacing={3}>
        {associations.map((asso) => (
          <Grid item xs={12} sm={6} md={4} key={asso.siret}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {asso.nom}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {asso.adresse.commune}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => handleOpenDetails(asso)}
                  style={{ marginTop: "10px" }}
                >
                  Voir détails
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {selectedAssociation && (
        <AssociationDetails
          association={selectedAssociation}
          open={!!selectedAssociation}
          onClose={handleCloseDetails}
        />
      )}

      {associations.length === 0 && !loading && (
        <Typography variant="body1" color="textSecondary" align="center">
          Aucune association trouvée
        </Typography>
      )}
    </div>
  );
};

export default AssociationsSearch;
