import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'SENEGAL SOIL'
    }
  },
  {
    name: 'Liste des regions',
    url: '/base/tables',
    icon: 'nav-icon-bullet',
   
    
  },
  {
    name: 'Liste des terres',
    url: '/base/terre',
    icon: 'nav-icon-bullet',
   
    
  },
];
