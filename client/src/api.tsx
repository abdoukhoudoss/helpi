// Types pour l'API Sirene
interface AdresseEtablissement {
  numeroVoieEtablissement: string;
  typeVoieEtablissement: string;
  libelleVoieEtablissement: string;
  codePostalEtablissement: string;
  libelleCommuneEtablissement: string;
  latitude?: string;
  longitude?: string;
}

interface PeriodeEtablissement {
  telephone?: string;
}

interface UniteLegale {
  denominationUniteLegale: string;
  categorieJuridiqueUniteLegale: string;
}

interface Etablissement {
  siret: string;
  uniteLegale: UniteLegale;
  adresseEtablissement: AdresseEtablissement;
  periodesEtablissement: PeriodeEtablissement[];
}

interface ApiResponse {
  etablissements: Etablissement[];
  header: {
    total: number;
    debut: number;
    nombre: number;
  };
}

// Type pour les associations formatées
interface FormattedAssociation {
  siret: string;
  nom: string;
  categorie: string;
  adresse: {
    numero: string;
    type: string;
    voie: string;
    codePostal: string;
    commune: string;
    latitude?: string;
    longitude?: string;
  };
  telephone: string | null;
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Loader2 } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";

const AssociationsSearch: React.FC = () => {
  const [associations, setAssociations] = useState<FormattedAssociation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAssociations = async () => {
      try {
        setLoading(true);

        // Coordonnées de Toulouse
        const toulouseLat = 43.604652;
        const toulouseLon = 1.444209;
        const rayon = 30;

        const baseUrl = "https://api.insee.fr/api-sirene/3.11/siren/920907110/";
        // const params = new URLSearchParams({
        //   q: "categorieJuridiqueUniteLegale:9220 AND etatAdministratifUniteLegale:A",
        //   geofiltre: `cercle(${toulouseLat},${toulouseLon},${rayon})`,
        //   nombre: "100",
        //   tri: "denominationUniteLegale",
        // });

        const response = await fetch(`${baseUrl}?`, {
          headers: {
            Accept: "application/json",
            Authorization: import.meta.env.VITE_API_SIRENE_KEY as string,
            "Accept-Encoding": "gzip",
          },
        });

        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const data: ApiResponse = await response.json();

        const formattedAssociations: FormattedAssociation[] =
          data.etablissements
            .filter((etab) =>
              etab.uniteLegale.categorieJuridiqueUniteLegale.startsWith("92"),
            )
            .map((etab) => ({
              siret: etab.siret,
              nom: etab.uniteLegale.denominationUniteLegale,
              categorie: etab.uniteLegale.categorieJuridiqueUniteLegale,
              adresse: {
                numero: etab.adresseEtablissement.numeroVoieEtablissement,
                type: etab.adresseEtablissement.typeVoieEtablissement,
                voie: etab.adresseEtablissement.libelleVoieEtablissement,
                codePostal: etab.adresseEtablissement.codePostalEtablissement,
                commune: etab.adresseEtablissement.libelleCommuneEtablissement,
                latitude: etab.adresseEtablissement.latitude,
                longitude: etab.adresseEtablissement.longitude,
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

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4 bord-red-300 rounded bg-red-50">
        Erreur lors de la récupération des données: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Associations à Toulouse et alentours ({associations.length})
      </h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {associations.map((asso) => (
          <Card key={asso.siret} className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-lg">
                {asso.nom || "Nom non disponible"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm">
                  <strong>Adresse:</strong>
                  <br />
                  {[
                    asso.adresse.numero,
                    asso.adresse.type,
                    asso.adresse.voie,
                    `${asso.adresse.codePostal} ${asso.adresse.commune}`,
                  ]
                    .filter(Boolean)
                    .join(" ")}
                </p>
                asso.telephone && (
                <p className="text-sm">
                  <strong>Téléphone:</strong> asso.telephone
                </p>
                )
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {associations.length === 0 && !loading && (
        <p className="text-center text-gray-500 mt-8">
          Aucune association trouvée
        </p>
      )}
    </div>
  );
};

export default AssociationsSearch;
