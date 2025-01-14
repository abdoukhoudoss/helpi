const getOptimizedImageUrl = (imageUrl: string) => {
  if (typeof imageUrl === "string" && imageUrl.includes("unsplash.com")) {
    return `${imageUrl}?w=200&h=200&fit=crop&q=75&fm=webp&auto=compress&blur=5`;
  }
  return imageUrl;
};

const missions = [
  {
    id: 1,
    nom: "Distribution alimentaire",
    categorie: "Aide alimentaire",
    description: "Distribution de repas chauds aux personnes dans le besoin",
    duree: "3 heures",
    nombreBenevoles: 5,
    imageUrl: getOptimizedImageUrl(
      "https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9",
    ),
    association: "Toulouse Solidarité",
  },
  {
    id: 2,
    nom: "Collecte alimentaire",
    categorie: "Aide alimentaire",
    description: "Collecte de denrées alimentaires en supermarché",
    duree: "6 heures",
    nombreBenevoles: 10,
    imageUrl: getOptimizedImageUrl(
      "https://images.unsplash.com/photo-1593113630400-ea4288922497",
    ),
    association: "Main Tendue 31",
  },
  {
    id: 3,
    nom: "Maraude sociale",
    categorie: "Aide sociale",
    description: "Maraude auprès des personnes sans abri",
    duree: "4 heures",
    nombreBenevoles: 6,
    imageUrl: getOptimizedImageUrl(
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b",
    ),
    association: "Toulouse Solidarité",
  },
  {
    id: 4,
    nom: "Aide administrative",
    categorie: "Aide sociale",
    description: "Aide aux démarches administratives",
    duree: "2 heures",
    nombreBenevoles: 4,
    imageUrl: getOptimizedImageUrl(
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85",
    ),
    association: "Cœur de Blagnac",
  },
  {
    id: 5,
    nom: "Soutien scolaire",
    categorie: "Éducation",
    description: "Aide aux devoirs pour collégiens",
    duree: "2 heures",
    nombreBenevoles: 4,
    imageUrl: getOptimizedImageUrl(
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45",
    ),
    association: "Main Tendue 31",
  },
  {
    id: 6,
    nom: "Cours de français",
    categorie: "Éducation",
    description: "Cours de français pour adultes",
    duree: "3 heures",
    nombreBenevoles: 3,
    imageUrl: getOptimizedImageUrl(
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    ),
    association: "Espoir Colomiers",
  },
  {
    id: 7,
    nom: "Visite aux personnes âgées",
    categorie: "Lien social",
    description: "Visite de personnes âgées isolées",
    duree: "2 heures",
    nombreBenevoles: 6,
    imageUrl: getOptimizedImageUrl(
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f",
    ),
    association: "Cœur de Blagnac",
  },
  {
    id: 8,
    nom: "Animation en maison de retraite",
    categorie: "Lien social",
    description: "Animation en maison de retraite",
    duree: "4 heures",
    nombreBenevoles: 5,
    imageUrl: getOptimizedImageUrl(
      "https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a",
    ),
    association: "Partage Tournefeuille",
  },
  {
    id: 9,
    nom: "Atelier CV",
    categorie: "Insertion professionnelle",
    description: "Atelier CV et lettre de motivation",
    duree: "3 heures",
    nombreBenevoles: 3,
    imageUrl: getOptimizedImageUrl(
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173",
    ),
    association: "Espoir Colomiers",
  },
  {
    id: 10,
    nom: "Simulation d'entretien",
    categorie: "Insertion professionnelle",
    description: "Simulation d'entretiens d'embauche",
    duree: "4 heures",
    nombreBenevoles: 2,
    imageUrl: getOptimizedImageUrl(
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e",
    ),
    association: "Main Tendue 31",
  },
  {
    id: 11,
    nom: "Animation ados",
    categorie: "Animation",
    description: "Animation d'activités pour adolescents",
    duree: "4 heures",
    nombreBenevoles: 3,
    imageUrl: getOptimizedImageUrl(
      "https://images.unsplash.com/photo-1489710437720-ebb67ec84dd2",
    ),
    association: "Espoir Colomiers",
  },
  {
    id: 12,
    nom: "Activités enfants",
    categorie: "Animation",
    description: "Activités créatives pour enfants",
    duree: "3 heures",
    nombreBenevoles: 4,
    imageUrl: getOptimizedImageUrl(
      "https://images.unsplash.com/photo-1472162072942-cd5147eb3902",
    ),
    association: "Partage Tournefeuille",
  },
  {
    id: 13,
    nom: "Transport médical",
    categorie: "Accompagnement",
    description: "Accompagnement aux rendez-vous médicaux",
    duree: "3 heures",
    nombreBenevoles: 5,
    imageUrl: getOptimizedImageUrl(
      "https://images.unsplash.com/photo-1581591524425-c7e0978865fc",
    ),
    association: "Cœur de Blagnac",
  },
  {
    id: 14,
    nom: "Aide aux courses",
    categorie: "Accompagnement",
    description: "Aide aux courses pour personnes âgées",
    duree: "2 heures",
    nombreBenevoles: 3,
    imageUrl: getOptimizedImageUrl(
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f",
    ),
    association: "Toulouse Solidarité",
  },
  {
    id: 15,
    nom: "Distribution vêtements",
    categorie: "Aide matérielle",
    description: "Tri et distribution de vêtements",
    duree: "4 heures",
    nombreBenevoles: 5,
    imageUrl: getOptimizedImageUrl(
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f",
    ),
    association: "Partage Tournefeuille",
  },
  {
    id: 16,
    nom: "Distribution fournitures",
    categorie: "Aide matérielle",
    description: "Distribution de fournitures scolaires",
    duree: "3 heures",
    nombreBenevoles: 4,
    imageUrl: getOptimizedImageUrl(
      "https://images.unsplash.com/photo-1452860606245-08befc0ff44b",
    ),
    association: "Main Tendue 31",
  },
];

export { missions };
