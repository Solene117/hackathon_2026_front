export const STRAVA_STATUS_MESSAGES: Record<
  string,
  { title: string; body: string }
> = {
  connected: {
    title: "Strava connecté",
    body: "Vos activités seront synchronisées automatiquement.",
  },
  denied: {
    title: "Connexion refusée",
    body: "Vous avez annulé la liaison avec Strava.",
  },
  error: {
    title: "Erreur de connexion",
    body: "Impossible de finaliser la liaison Strava. Réessayez.",
  },
};
