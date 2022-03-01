export const navigation = [
  {
    text: 'Fondo General',
    path: '/',
    icon: 'home'
  },
  {
    text: 'Ingreso y Egreso ',
    icon: 'folder',
    items: [
      {
        text: 'INGRESO',
        path: '/ingreso'
      },
      {
        text: 'EGRESO',
        path: '/tasks'
      }
    ]
  }, {
    text: 'Variables',
    icon: 'folder',
    items: [
      {
        text: 'Cuentas',
        path: '/cuentas'
      },
      {
        text: 'Carteras',
        path: '/carteras'
      }
    ]

  }
];
