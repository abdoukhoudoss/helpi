export interface Mission {
  id: number;
  nom: string;
  categorie: string;
  description: string;
  duree: string;
  nombreBenevoles: number;
  imageUrl: string;
  association: string;
}

export interface FormData {
  nom: string;
  prenom: string;
  telephone: string;
}
