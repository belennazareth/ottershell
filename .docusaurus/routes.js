import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/blog',
    component: ComponentCreator('/blog', '94e'),
    exact: true
  },
  {
    path: '/blog/archive',
    component: ComponentCreator('/blog/archive', 'fd1'),
    exact: true
  },
  {
    path: '/blog/Contacto',
    component: ComponentCreator('/blog/Contacto', '802'),
    exact: true
  },
  {
    path: '/blog/tags',
    component: ComponentCreator('/blog/tags', '098'),
    exact: true
  },
  {
    path: '/blog/tags/contacto',
    component: ComponentCreator('/blog/tags/contacto', 'ecb'),
    exact: true
  },
  {
    path: '/blog/tags/git-hub',
    component: ComponentCreator('/blog/tags/git-hub', '864'),
    exact: true
  },
  {
    path: '/blog/tags/gmail',
    component: ComponentCreator('/blog/tags/gmail', 'd5b'),
    exact: true
  },
  {
    path: '/blog/tags/linkedin',
    component: ComponentCreator('/blog/tags/linkedin', '5c1'),
    exact: true
  },
  {
    path: '/markdown-page',
    component: ComponentCreator('/markdown-page', '02c'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', 'dc3'),
    routes: [
      {
        path: '/docs/category/extras',
        component: ComponentCreator('/docs/category/extras', '88a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/category/tasks',
        component: ComponentCreator('/docs/category/tasks', '70f'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/Extras/ENTRA_AQUI',
        component: ComponentCreator('/docs/Extras/ENTRA_AQUI', 'f91'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/Extras/proximamente',
        component: ComponentCreator('/docs/Extras/proximamente', 'b0b'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/intro',
        component: ComponentCreator('/docs/intro', '99a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/Tasks/apache_wsgi',
        component: ComponentCreator('/docs/Tasks/apache_wsgi', '83c'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/Tasks/apache2_fpm',
        component: ComponentCreator('/docs/Tasks/apache2_fpm', 'b47'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/Tasks/bind9_local',
        component: ComponentCreator('/docs/Tasks/bind9_local', '3e2'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/Tasks/bookmedik',
        component: ComponentCreator('/docs/Tasks/bookmedik', '37d'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/Tasks/cifrado_asimetrico',
        component: ComponentCreator('/docs/Tasks/cifrado_asimetrico', '07c'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/Tasks/cliente_vpn',
        component: ComponentCreator('/docs/Tasks/cliente_vpn', '817'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/Tasks/clonacion_instantanea',
        component: ComponentCreator('/docs/Tasks/clonacion_instantanea', '211'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/Tasks/compilacion_kernel',
        component: ComponentCreator('/docs/Tasks/compilacion_kernel', 'bc5'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/Tasks/criptografia1',
        component: ComponentCreator('/docs/Tasks/criptografia1', 'd61'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/Tasks/criptografia2',
        component: ComponentCreator('/docs/Tasks/criptografia2', 'f53'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/Tasks/escenario_openstack',
        component: ComponentCreator('/docs/Tasks/escenario_openstack', '6ef'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/Tasks/gestion_paqueteria_aso',
        component: ComponentCreator('/docs/Tasks/gestion_paqueteria_aso', 'b86'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/Tasks/https',
        component: ComponentCreator('/docs/Tasks/https', 'fb6'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/Tasks/interconexion_bbdd',
        component: ComponentCreator('/docs/Tasks/interconexion_bbdd', '60e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/Tasks/intro_git',
        component: ComponentCreator('/docs/Tasks/intro_git', '221'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/Tasks/lemp',
        component: ComponentCreator('/docs/Tasks/lemp', '8ab'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/Tasks/makefile_aso',
        component: ComponentCreator('/docs/Tasks/makefile_aso', 'e40'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/Tasks/manejo_modulos',
        component: ComponentCreator('/docs/Tasks/manejo_modulos', 'bff'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/Tasks/markdown',
        component: ComponentCreator('/docs/Tasks/markdown', 'ebc'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/Tasks/markdown-features',
        component: ComponentCreator('/docs/Tasks/markdown-features', '4e3'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/Tasks/migracion_centos',
        component: ComponentCreator('/docs/Tasks/migracion_centos', '7c2'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/Tasks/migracion_php',
        component: ComponentCreator('/docs/Tasks/migracion_php', '940'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/Tasks/nfs_systemd',
        component: ComponentCreator('/docs/Tasks/nfs_systemd', '59a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/Tasks/nginx_php',
        component: ComponentCreator('/docs/Tasks/nginx_php', '77d'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/Tasks/parametros_kernel',
        component: ComponentCreator('/docs/Tasks/parametros_kernel', 'f29'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/Tasks/peticion_http',
        component: ComponentCreator('/docs/Tasks/peticion_http', '71d'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/Tasks/plsql_basica',
        component: ComponentCreator('/docs/Tasks/plsql_basica', 'c45'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/Tasks/ramas_uniones',
        component: ComponentCreator('/docs/Tasks/ramas_uniones', '260'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/Tasks/redes_openstack',
        component: ComponentCreator('/docs/Tasks/redes_openstack', 'b54'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/Tasks/router_nat',
        component: ComponentCreator('/docs/Tasks/router_nat', 'bbb'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/Tasks/servidor_lamp',
        component: ComponentCreator('/docs/Tasks/servidor_lamp', 'fb8'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/Tasks/tomcat',
        component: ComponentCreator('/docs/Tasks/tomcat', '5ff'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/Tasks/virtualhosting_apache',
        component: ComponentCreator('/docs/Tasks/virtualhosting_apache', '4ef'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/Tasks/virtualizacion_linux',
        component: ComponentCreator('/docs/Tasks/virtualizacion_linux', '3d7'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/Tasks/wordpress',
        component: ComponentCreator('/docs/Tasks/wordpress', 'b17'),
        exact: true,
        sidebar: "tutorialSidebar"
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', '19f'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
