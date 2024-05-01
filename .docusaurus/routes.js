import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '602'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '44e'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', '748'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', '26b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', 'f42'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '92e'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '04d'),
    exact: true
  },
  {
    path: '/',
    component: ComponentCreator('/', '958'),
    routes: [
      {
        path: '/',
        component: ComponentCreator('/', '3b5'),
        routes: [
          {
            path: '/',
            component: ComponentCreator('/', 'fd7'),
            routes: [
              {
                path: '/archive/brix/',
                component: ComponentCreator('/archive/brix/', '140'),
                exact: true,
                sidebar: "sidebar"
              },
              {
                path: '/archive/brix/Examples/',
                component: ComponentCreator('/archive/brix/Examples/', '442'),
                exact: true,
                sidebar: "sidebar"
              },
              {
                path: '/archive/brix/GAMA',
                component: ComponentCreator('/archive/brix/GAMA', 'ae8'),
                exact: true,
                sidebar: "sidebar"
              },
              {
                path: '/archive/brix/Tutorial/',
                component: ComponentCreator('/archive/brix/Tutorial/', 'c50'),
                exact: true,
                sidebar: "sidebar"
              },
              {
                path: '/archive/cityio/',
                component: ComponentCreator('/archive/cityio/', 'e6a'),
                exact: true,
                sidebar: "sidebar"
              },
              {
                path: '/archive/cityio/API',
                component: ComponentCreator('/archive/cityio/API', '6aa'),
                exact: true,
                sidebar: "sidebar"
              },
              {
                path: '/archive/cityio/Build',
                component: ComponentCreator('/archive/cityio/Build', '95e'),
                exact: true,
                sidebar: "sidebar"
              },
              {
                path: '/archive/cityio/Internal_Note',
                component: ComponentCreator('/archive/cityio/Internal_Note', '6f4'),
                exact: true,
                sidebar: "sidebar"
              },
              {
                path: '/archive/h3/',
                component: ComponentCreator('/archive/h3/', '932'),
                exact: true,
                sidebar: "sidebar"
              },
              {
                path: '/category/archive',
                component: ComponentCreator('/category/archive', 'e51'),
                exact: true,
                sidebar: "sidebar"
              },
              {
                path: '/category/brix',
                component: ComponentCreator('/category/brix', '3b5'),
                exact: true,
                sidebar: "sidebar"
              },
              {
                path: '/category/cityio',
                component: ComponentCreator('/category/cityio', '165'),
                exact: true,
                sidebar: "sidebar"
              },
              {
                path: '/category/cityscopejs',
                component: ComponentCreator('/category/cityscopejs', '2a7'),
                exact: true,
                sidebar: "sidebar"
              },
              {
                path: '/category/modules',
                component: ComponentCreator('/category/modules', '784'),
                exact: true,
                sidebar: "sidebar"
              },
              {
                path: '/category/tangible-user-interfaces',
                component: ComponentCreator('/category/tangible-user-interfaces', '4f9'),
                exact: true,
                sidebar: "sidebar"
              },
              {
                path: '/cityio/API',
                component: ComponentCreator('/cityio/API', 'c37'),
                exact: true,
                sidebar: "sidebar"
              },
              {
                path: '/cityio/Architecture',
                component: ComponentCreator('/cityio/Architecture', 'aa5'),
                exact: true,
                sidebar: "sidebar"
              },
              {
                path: '/cityio/CityIO - Core',
                component: ComponentCreator('/cityio/CityIO - Core', 'aa1'),
                exact: true,
                sidebar: "sidebar"
              },
              {
                path: '/cityio/CityIO - Module',
                component: ComponentCreator('/cityio/CityIO - Module', '5dd'),
                exact: true,
                sidebar: "sidebar"
              },
              {
                path: '/cityio/CityIO - UI',
                component: ComponentCreator('/cityio/CityIO - UI', '6ae'),
                exact: true,
                sidebar: "sidebar"
              },
              {
                path: '/cityio/Introduction',
                component: ComponentCreator('/cityio/Introduction', '0eb'),
                exact: true,
                sidebar: "sidebar"
              },
              {
                path: '/cityscopejs/Introduction',
                component: ComponentCreator('/cityscopejs/Introduction', '389'),
                exact: true,
                sidebar: "sidebar"
              },
              {
                path: '/cityscopejs/Opening a project',
                component: ComponentCreator('/cityscopejs/Opening a project', 'f07'),
                exact: true,
                sidebar: "sidebar"
              },
              {
                path: '/cityscopejs/Project view',
                component: ComponentCreator('/cityscopejs/Project view', '55f'),
                exact: true,
                sidebar: "sidebar"
              },
              {
                path: '/intro/github',
                component: ComponentCreator('/intro/github', '55e'),
                exact: true,
                sidebar: "sidebar"
              },
              {
                path: '/intro/system',
                component: ComponentCreator('/intro/system', 'bc2'),
                exact: true,
                sidebar: "sidebar"
              },
              {
                path: '/modules/brix/DeckGL Modules',
                component: ComponentCreator('/modules/brix/DeckGL Modules', '261'),
                exact: true,
                sidebar: "sidebar"
              },
              {
                path: '/modules/brix/Introduction',
                component: ComponentCreator('/modules/brix/Introduction', 'cb3'),
                exact: true,
                sidebar: "sidebar"
              },
              {
                path: '/modules/brix/Module example',
                component: ComponentCreator('/modules/brix/Module example', '170'),
                exact: true,
                sidebar: "sidebar"
              },
              {
                path: '/modules/Core Modules/Introduction',
                component: ComponentCreator('/modules/Core Modules/Introduction', 'ccd'),
                exact: true,
                sidebar: "sidebar"
              },
              {
                path: '/modules/Types System',
                component: ComponentCreator('/modules/Types System', '3c9'),
                exact: true,
                sidebar: "sidebar"
              },
              {
                path: '/tanglibe user interfaces/CityScope Table Design',
                component: ComponentCreator('/tanglibe user interfaces/CityScope Table Design', '189'),
                exact: true,
                sidebar: "sidebar"
              },
              {
                path: '/tanglibe user interfaces/CityScoPy',
                component: ComponentCreator('/tanglibe user interfaces/CityScoPy', 'a24'),
                exact: true,
                sidebar: "sidebar"
              },
              {
                path: '/tanglibe user interfaces/RoboScope',
                component: ComponentCreator('/tanglibe user interfaces/RoboScope', '560'),
                exact: true,
                sidebar: "sidebar"
              },
              {
                path: '/',
                component: ComponentCreator('/', 'e98'),
                exact: true,
                sidebar: "sidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
