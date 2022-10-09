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
    component: ComponentCreator('/docs', '766'),
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
        path: '/docs/Tasks/intro_git',
        component: ComponentCreator('/docs/Tasks/intro_git', '221'),
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
        component: ComponentCreator('/docs/Tasks/markdown-features', 'a58'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/Tasks/ramas_uniones',
        component: ComponentCreator('/docs/Tasks/ramas_uniones', '260'),
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
