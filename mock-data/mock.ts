import type { Post } from "@/components/post-card";

export const currentUser = {
  name: "Caro Giménez",
  role: "Maestra",
  room: "Soles",
  initial: "C",
};

export const posts: Post[] = [
  {
    id: "mateo-logro",
    childInitial: "M",
    name: "Mateo",
    avatarBg: "#A9D9E8",
    avatarColor: "#1F7A93",
    time: "14:20 · publicado por vos",
    badge: {
      label: "LOGRO",
      bg: "#CFEBD8",
      dot: "#3E9B6C",
      color: "#3E9B6C",
    },
    audience: "Para: familia de Mateo",
    body: "¡Usó el orinal solito por primera vez! Estaba feliz de contárselo a todos. Un gran paso.",
    likes: 3,
    comments: 1,
  },
  {
    id: "mateo-actividad",
    childInitial: "M",
    name: "Mateo",
    avatarBg: "#A9D9E8",
    avatarColor: "#1F7A93",
    time: "09:40 · publicado por vos",
    badge: {
      label: "ACTIVIDAD",
      bg: "#C7E7F1",
      dot: "#2E89A6",
      color: "#2E89A6",
    },
    audience: "Para: familia de Mateo",
    body: "Pintamos con témperas esta mañana. Mateo eligió el azul para todo y se concentró un montón mezclando colores.",
    photo: { label: "pintando con témperas" },
    likes: 5,
    comments: 2,
  },
  {
    id: "anuncio-general",
    childInitial: "",
    name: "Anuncio general",
    avatarBg: "#CCD8F4",
    avatarColor: "#4E72C8",
    avatarIcon: "megaphone",
    time: "07:50 · publicado por vos",
    badge: {
      label: "ANUNCIO",
      bg: "#CCD8F4",
      dot: "#4E72C8",
      color: "#4E72C8",
    },
    audience: "Para: toda la sala",
    body: "El viernes salimos al parque por la mañana. Recuerden mandar gorra y una botellita de agua.",
    likes: 8,
    comments: 0,
  },
];
