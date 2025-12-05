import { GemIcon, NotificationIcon, SettingsIcon, TrashIcon, UserIcon } from "@/icons";

const routes = [
  {
    name: 'Tebligatlar',
    path: '/',
    icon: <NotificationIcon width={18} />,
    hideAdmin: true,
  },
  {
    name: 'Profil',
    path: '/profil',
    icon: <UserIcon width={18} />,
    hideAdmin: true,
  },
  {
    name: 'Kategoriler',
    path: '/kategoriler',
    icon: <GemIcon width={18} />,
    hideUser: true,
  },
  {
    name: 'Muhtarlar',
    path: '/muhtarlar',
    icon: <UserIcon width={18} />,
    hideUser: true,
  },
  {
    name: 'Admin Ayar',
    path: '/admin-ayar',
    icon: <SettingsIcon width={18} />,
    hideUser: true,
  },
];

export const bottomRoutes = [
  {
    name: 'Silinen Tebligatlar',
    path: '/silinen-tebligatlar',
    icon: <TrashIcon width={18} />,
    hideAdmin: true,
  }
];

export const hiddenRoutes = [
  {
    name: 'Profil',
    path: 'profil'
  },
  {
    name: 'Tebligat Ekle',
    path: 'tebligat-ekle',
  },
  {
    name: 'Tebligat Düzenle',
    path: 'tebligat'
  },
  {
    name: 'Muhtar Düzenle',
    path: 'muhtar'
  }
]

export default routes;
