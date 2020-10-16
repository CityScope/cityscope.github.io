(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{123:function(e,t,n){"use strict";n.r(t),t.default=n.p+"assets/images/web_ui-a8964ffa79f4bdd8f5c47db299d8e802.jpg"},124:function(e,t,n){"use strict";n.r(t),t.default=n.p+"assets/images/CityScopeJS-5c67b64921cab086329c46dfafa1715a.jpg"},68:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return a})),n.d(t,"metadata",(function(){return c})),n.d(t,"rightToc",(function(){return s})),n.d(t,"default",(function(){return l}));var r=n(2),i=n(6),o=(n(0),n(82)),a={id:"CityScopeJS"},c={unversionedId:"frontend/CityScopeJS",id:"frontend/CityScopeJS",isDocsHomePage:!1,title:"CityScopeJS",description:"CityScope platform for the web",source:"@site/docs/frontend/cityscopeJS.md",slug:"/frontend/CityScopeJS",permalink:"/docs/frontend/CityScopeJS",editUrl:"https://github.com/CityScope/cityscope.github.io/blob/new_docsite/docsite/docs/frontend/cityscopeJS.md",version:"current",sidebar:"sidebar",previous:{title:"License",permalink:"/docs/general/License"},next:{title:"TUI Introduction",permalink:"/docs/TUI/TUI Introduction"}},s=[{value:"CityScope platform for the web",id:"cityscope-platform-for-the-web",children:[]},{value:"What is it for?",id:"what-is-it-for",children:[]},{value:"Quick Start",id:"quick-start",children:[]},{value:"Development",id:"development",children:[]},{value:"CityScopeJS schema",id:"cityscopejs-schema",children:[]},{value:"Data Requirements",id:"data-requirements",children:[{value:"<code>geogrid:geojson</code>",id:"geogridgeojson",children:[]}]}],p={rightToc:s};function l(e){var t=e.components,a=Object(i.a)(e,["components"]);return Object(o.b)("wrapper",Object(r.a)({},p,a,{components:t,mdxType:"MDXLayout"}),Object(o.b)("h2",{id:"cityscope-platform-for-the-web"},"CityScope platform for the web"),Object(o.b)("p",null,"CityScopeJS is the unified front-end for the ",Object(o.b)("a",Object(r.a)({parentName:"p"},{href:"https://cityscope.media.mit.edu/"}),"MIT CityScope")," project. CityScopeJS allows users to examine different urban-design alternatives and observe their impact through different KPIs and matrices. CityScopeJS brings together different urban analytics modules, such as traffic simulation, ABM, noise, storm-water, access."),Object(o.b)("h2",{id:"what-is-it-for"},"What is it for?"),Object(o.b)("p",null,"CityScopeJS is an online tool with a web interface or tangible user interface (TUI). Using the tool, users can input land uses, buildings, open spaces or transport routes, categorize them and enrich their description with details on usability, density and other parameters. This input forms the basis for calculating the various modules and indicators."),Object(o.b)("h6",{id:"cityscopejs-web-interface"},"CityScopeJS Web interface"),Object(o.b)("p",null,Object(o.b)("img",{alt:"TUI",src:n(123).default})),Object(o.b)("h6",{id:"cityscopejs-tui"},"CityScopeJS TUI"),Object(o.b)("p",null,Object(o.b)("img",{alt:"TUI",src:n(124).default})),Object(o.b)("hr",null),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"CityScopeJS exposes two main features: ",Object(o.b)("inlineCode",{parentName:"strong"},"CityScopeJS Grid Editor")," and ",Object(o.b)("inlineCode",{parentName:"strong"},"CityScopeJS Palyground"))),Object(o.b)("h1",{id:"csjs-playground"},"CSjs Playground"),Object(o.b)("p",null,"CSjs Playground is where users interact with the design of urban areas. The tool is built to allow snappy, real-time intervention with various land-uses. The design is then evaluated using different urban analytics modules."),Object(o.b)("h2",{id:"quick-start"},"Quick Start"),Object(o.b)("p",null,"To explore the app for a known CityScope project, add a CityScope project name to this page URL (for example, ",Object(o.b)("inlineCode",{parentName:"p"},"__URL__/?cityscope=corktown")," will run ",Object(o.b)("a",Object(r.a)({parentName:"p"},{href:"https://cityscope.media.mit.edu/CS_cityscopeJS/?cityscope=corktown"}),"CityScopeJS Corktown")," project). You can also explore a list of active CityScope projects ",Object(o.b)("a",Object(r.a)({parentName:"p"},{href:"https://cityio.media.mit.edu"}),"here"),"."),Object(o.b)("p",null,"When in the app, edit the grid using the editing tool, and explore the different analytics updating"),Object(o.b)("h2",{id:"development"},"Development"),Object(o.b)("p",null,"CityScopeJS is being constantly developed through its frontend, backend and modules. This repo is subject to breaking changes."),Object(o.b)("p",null,"In the project directory, you can run: ",Object(o.b)("inlineCode",{parentName:"p"},"npm start")," Runs the app in the development mode.",Object(o.b)("br",null)," Open ",Object(o.b)("a",Object(r.a)({parentName:"p"},{href:"http://localhost:3000"}),"http://localhost:3000")," to view it in the browser."),Object(o.b)("h4",{id:"hard-reset-cityio-geogriddata-field"},"Hard-Reset cityIO ",Object(o.b)("inlineCode",{parentName:"h4"},"GEOGRIDDATA")," field"),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Note!")," This feature involves permanent data loss. If your dev created odd data for the grid, you can quickly reset it via:"),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{}),"`$ curl https://cityio.media.mit.edu/api/table/clear/__TABLE_NAME__/GEOGRIDDATA`\n")),Object(o.b)("hr",null),Object(o.b)("h1",{id:"csjs-grid-editor"},"CSjs Grid Editor"),Object(o.b)("p",null,"The CSjs Grid Editor is a helper tool to bootstrap new CityScope projects. It allow a quick creation of:"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},"a CityScope endpoint on CityIO"),Object(o.b)("li",{parentName:"ul"},"a geo-located, 3D, editable and contextual CityScope grid"),Object(o.b)("li",{parentName:"ul"},"a list of land-uses to be used during the project")),Object(o.b)("h2",{id:"cityscopejs-schema"},"CityScopeJS schema"),Object(o.b)("p",null,"This document illustrates the data format and standards for the deployment of a CityScopeJS instance. Being a WIP project, this is subject to change."),Object(o.b)("h2",{id:"data-requirements"},"Data Requirements"),Object(o.b)("h3",{id:"geogridgeojson"},Object(o.b)("inlineCode",{parentName:"h3"},"geogrid:geojson")),Object(o.b)("p",null,"Minimal data for initiation is a valid GeoJson ",Object(o.b)("inlineCode",{parentName:"p"},"FeatureCollection")," of at least one ",Object(o.b)("inlineCode",{parentName:"p"},"Polygon")," feature.\nIdeally, this field should be read once on init, due to its size and static state. User should not iterate over it."),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{}),'{\n  "type": "FeatureCollection",\n  "properties": {\n    "header": {},\n    "interactive_mapping": {"1245":{"TUI":"1"},"1472":{"WEB":"1"}}\n  },\n\n  "features": [\n    {\n      "type": "Feature",\n      "properties": {},\n      "geometry": {\n        "type": "Polygon",\n        "coordinates": [\n          [\n            [\n             __lat__,\n              __long__\n            ],\n            ...\n          ]\n        ]\n      }\n    }...\n  ]\n}\n')),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"optional fields")),Object(o.b)("p",null,Object(o.b)("inlineCode",{parentName:"p"},"interactive_mapping"),": maps the grid cells that are interactable via the HCI/TUI CityScope interface or web/mobile UI. This allow mixing of different interactions without overwriting. Format"),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{}),'{\n    "__feature_number__": {\n        "TUI": "__TUI_CELL_NUMBER__"\n    },\n    "__feature_number__": {\n        "WEB": "__WEB_INTERACTION_CELL_NUMBER__"\n    }\n}\n')))}l.isMDXComponent=!0},82:function(e,t,n){"use strict";n.d(t,"a",(function(){return d})),n.d(t,"b",(function(){return f}));var r=n(0),i=n.n(r);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var p=i.a.createContext({}),l=function(e){var t=i.a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},d=function(e){var t=l(e.components);return i.a.createElement(p.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return i.a.createElement(i.a.Fragment,{},t)}},u=i.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,a=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),d=l(n),u=r,f=d["".concat(a,".").concat(u)]||d[u]||b[u]||o;return n?i.a.createElement(f,c(c({ref:t},p),{},{components:n})):i.a.createElement(f,c({ref:t},p))}));function f(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,a=new Array(o);a[0]=u;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:r,a[1]=c;for(var p=2;p<o;p++)a[p]=n[p];return i.a.createElement.apply(null,a)}return i.a.createElement.apply(null,n)}u.displayName="MDXCreateElement"}}]);