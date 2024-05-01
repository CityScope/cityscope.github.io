"use strict";(self.webpackChunkcityscope_docs=self.webpackChunkcityscope_docs||[]).push([[861],{5621:(e,l,n)=>{n.r(l),n.d(l,{assets:()=>o,contentTitle:()=>s,default:()=>h,frontMatter:()=>i,metadata:()=>t,toc:()=>d});var r=n(4848),a=n(8453);const i={sidebar_position:2},s=void 0,t={id:"modules/brix/DeckGL Modules",title:"DeckGL Modules",description:"The main difference in using Brix WS compared to the previous version of Brix is the method of sending data to CityScope for visualization. The previous version of Brix allowed for various pre-defined visualizations, such as numeric with bars or graphs, heatmaps, or ABM, among others. While this was useful, it didn't offer enough flexibility for module makers to create complex visualizations with a variety of different elements. They were always constrained to using the same method to display data.",source:"@site/docs/modules/brix/DeckGL Modules.md",sourceDirName:"modules/brix",slug:"/modules/brix/DeckGL Modules",permalink:"/modules/brix/DeckGL Modules",draft:!1,unlisted:!1,editUrl:"https://github.com/CityScope/cityscope.github.io/docs/modules/brix/DeckGL Modules.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"sidebar",previous:{title:"Introduction",permalink:"/modules/brix/Introduction"},next:{title:"Module example",permalink:"/modules/brix/Module example"}},o={},d=[{value:"Available DeckGL Layers",id:"available-deckgl-layers",level:2},{value:"Arc",id:"arc",level:3},{value:"Column",id:"column",level:3},{value:"Contour",id:"contour",level:3},{value:"GeoJson",id:"geojson",level:3},{value:"Grid",id:"grid",level:3},{value:"GridCell",id:"gridcell",level:3},{value:"Heatmap",id:"heatmap",level:3},{value:"Hexagon",id:"hexagon",level:3},{value:"Icon",id:"icon",level:3},{value:"Line",id:"line",level:3},{value:"Path",id:"path",level:3},{value:"ScatterPlot",id:"scatterplot",level:3},{value:"Scenegraph",id:"scenegraph",level:3},{value:"SimpleMesh",id:"simplemesh",level:3},{value:"TextLayer",id:"textlayer",level:3}];function c(e){const l={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,a.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(l.p,{children:"The main difference in using Brix WS compared to the previous version of Brix is the method of sending data to CityScope for visualization. The previous version of Brix allowed for various pre-defined visualizations, such as numeric with bars or graphs, heatmaps, or ABM, among others. While this was useful, it didn't offer enough flexibility for module makers to create complex visualizations with a variety of different elements. They were always constrained to using the same method to display data."}),"\n",(0,r.jsxs)(l.p,{children:["To address this issue, Brix WS introduces ",(0,r.jsx)(l.strong,{children:"DeckGL modules"}),", a new type of module that can harness the full power of DeckGL and create robust visualizations using multiple DeckGL layers."]}),"\n",(0,r.jsx)(l.p,{children:"The structure of the data that DeckGL modules should follow is an array of objects, where each object represents one layer of the visualization. Every layer always has the same three properties:"}),"\n",(0,r.jsxs)(l.ul,{children:["\n",(0,r.jsxs)(l.li,{children:[(0,r.jsx)(l.code,{children:"type"}),": The type of the layer."]}),"\n",(0,r.jsxs)(l.li,{children:[(0,r.jsx)(l.code,{children:"data"}),": The data to be represented."]}),"\n",(0,r.jsxs)(l.li,{children:[(0,r.jsx)(l.code,{children:"properties"}),": Additional properties to configure the visualization of the layer."]}),"\n"]}),"\n",(0,r.jsx)(l.pre,{children:(0,r.jsx)(l.code,{className:"language-json",children:'[\n{"type":"column","data":$data,"properties":{}},\n{"type":"arc","data":$data,"properties":{}},\n{"type":"column","data":$data,"properties":{}},\n...\n]\n'})}),"\n",(0,r.jsx)(l.h2,{id:"available-deckgl-layers",children:"Available DeckGL Layers"}),"\n",(0,r.jsx)(l.p,{children:"At the time being, the available DeckGL layers that can be use in the modules are the following:"}),"\n",(0,r.jsxs)(l.ul,{children:["\n",(0,r.jsxs)(l.li,{children:["arc: ",(0,r.jsx)(l.a,{href:"https://deck.gl/docs/api-reference/layers/arc-layer",children:"https://deck.gl/docs/api-reference/layers/arc-layer"})]}),"\n",(0,r.jsxs)(l.li,{children:["column: ",(0,r.jsx)(l.a,{href:"https://deck.gl/docs/api-reference/layers/column-layer",children:"https://deck.gl/docs/api-reference/layers/column-layer"})]}),"\n",(0,r.jsxs)(l.li,{children:["contours: ",(0,r.jsx)(l.a,{href:"https://deck.gl/docs/api-reference/aggregation-layers/contour-layer",children:"https://deck.gl/docs/api-reference/aggregation-layers/contour-layer"})]}),"\n",(0,r.jsxs)(l.li,{children:["geojsonbase: ",(0,r.jsx)(l.a,{href:"https://deck.gl/docs/api-reference/layers/geojson-layer",children:"https://deck.gl/docs/api-reference/layers/geojson-layer"})]}),"\n",(0,r.jsxs)(l.li,{children:["gridlayer: ",(0,r.jsx)(l.a,{href:"https://deck.gl/docs/api-reference/aggregation-layers/grid-layer",children:"https://deck.gl/docs/api-reference/aggregation-layers/grid-layer"})]}),"\n",(0,r.jsxs)(l.li,{children:["gridcell: ",(0,r.jsx)(l.a,{href:"https://deck.gl/docs/api-reference/layers/grid-cell-layer",children:"https://deck.gl/docs/api-reference/layers/grid-cell-layer"})]}),"\n",(0,r.jsxs)(l.li,{children:["heatmap: ",(0,r.jsx)(l.a,{href:"https://deck.gl/docs/api-reference/aggregation-layers/heatmap-layer",children:"https://deck.gl/docs/api-reference/aggregation-layers/heatmap-layer"})]}),"\n",(0,r.jsxs)(l.li,{children:["hexagon: ",(0,r.jsx)(l.a,{href:"https://deck.gl/docs/api-reference/aggregation-layers/hexagon-layer",children:"https://deck.gl/docs/api-reference/aggregation-layers/hexagon-layer"})]}),"\n",(0,r.jsxs)(l.li,{children:["icon: ",(0,r.jsx)(l.a,{href:"https://deck.gl/docs/api-reference/layers/icon-layer",children:"https://deck.gl/docs/api-reference/layers/icon-layer"})]}),"\n",(0,r.jsxs)(l.li,{children:["lines: ",(0,r.jsx)(l.a,{href:"https://deck.gl/docs/api-reference/layers/line-layer",children:"https://deck.gl/docs/api-reference/layers/line-layer"})]}),"\n",(0,r.jsxs)(l.li,{children:["path: ",(0,r.jsx)(l.a,{href:"https://deck.gl/docs/api-reference/layers/path-layer",children:"https://deck.gl/docs/api-reference/layers/path-layer"})]}),"\n",(0,r.jsxs)(l.li,{children:["scatterplot: ",(0,r.jsx)(l.a,{href:"https://deck.gl/docs/api-reference/layers/scatterplot-layer",children:"https://deck.gl/docs/api-reference/layers/scatterplot-layer"})]}),"\n",(0,r.jsxs)(l.li,{children:["scenegraph: ",(0,r.jsx)(l.a,{href:"https://deck.gl/docs/api-reference/mesh-layers/scenegraph-layer",children:"https://deck.gl/docs/api-reference/mesh-layers/scenegraph-layer"})]}),"\n",(0,r.jsxs)(l.li,{children:["simpleMesh: ",(0,r.jsx)(l.a,{href:"https://deck.gl/docs/api-reference/mesh-layers/simple-mesh-layer",children:"https://deck.gl/docs/api-reference/mesh-layers/simple-mesh-layer"})]}),"\n",(0,r.jsxs)(l.li,{children:["textLayer: ",(0,r.jsx)(l.a,{href:"https://deck.gl/docs/api-reference/layers/text-layer",children:"https://deck.gl/docs/api-reference/layers/text-layer"})]}),"\n"]}),"\n",(0,r.jsx)(l.p,{children:"This list will grow over time to include all the layers in DeckGL. In each of the links, you can view an example of the visualization that the layer creates."}),"\n",(0,r.jsx)(l.h3,{id:"arc",children:"Arc"}),"\n",(0,r.jsx)(l.p,{children:"The arc layer should follow the schema of the next example:"}),"\n",(0,r.jsx)(l.pre,{children:(0,r.jsx)(l.code,{className:"language-json",children:'    {\n        "type": "arc",\n        "data":[\n            {\n                "from": {\n                    "coordinates": [-122.269029, 37.80787]\n                },\n                "to": {\n                    "coordinates": [-122.271604, 37.803664]\n                },\n                "sourceColor": [255, 140, 0],\n                "targetColor": [100, 140, 0]\n            },\n        ],\n        "properties": {\n            "width": 20\n        }\n    }\n   \n'})}),"\n",(0,r.jsx)(l.p,{children:"The available properties for this layer are the following:"}),"\n",(0,r.jsxs)(l.ul,{children:["\n",(0,r.jsx)(l.li,{children:"width: integer, default value 12."}),"\n"]}),"\n",(0,r.jsx)(l.h3,{id:"column",children:"Column"}),"\n",(0,r.jsx)(l.p,{children:"The column layer should follow the schema of the next example:"}),"\n",(0,r.jsx)(l.pre,{children:(0,r.jsx)(l.code,{className:"language-json",children:'    {\n        "type": "column",\n        "data":[\n            {"centroid": [-122.4, 37.7], "value": 0.2},\n        ],\n        "properties": {\n            "disResolution": 12,\n            "radius": 25\n        }\n    }\n   \n'})}),"\n",(0,r.jsx)(l.p,{children:"The available properties for this layer are the following:"}),"\n",(0,r.jsxs)(l.ul,{children:["\n",(0,r.jsx)(l.li,{children:"disResolution: integer, default value 12."}),"\n",(0,r.jsx)(l.li,{children:"radius: integer, default value 30."}),"\n",(0,r.jsx)(l.li,{children:"extruded: boolean, default value true."}),"\n",(0,r.jsx)(l.li,{children:"pickable: boolean, default value true."}),"\n",(0,r.jsx)(l.li,{children:"elevationScale: integer, default value 1."}),"\n"]}),"\n",(0,r.jsx)(l.h3,{id:"contour",children:"Contour"}),"\n",(0,r.jsx)(l.p,{children:"The contour layer should follow the schema of the next example:"}),"\n",(0,r.jsx)(l.pre,{children:(0,r.jsx)(l.code,{className:"language-json",children:'    {\n        "type": "contour",\n        "data":[\n            {"coordinates": [-122.42177834, 37.78346622]}\n        ],\n        "properties": {\n            "cellSize": 100\n        }\n    }\n   \n'})}),"\n",(0,r.jsx)(l.p,{children:"The available properties for this layer are the following:"}),"\n",(0,r.jsxs)(l.ul,{children:["\n",(0,r.jsx)(l.li,{children:"cellSize: integer, default value 200."}),"\n"]}),"\n",(0,r.jsx)(l.h3,{id:"geojson",children:"GeoJson"}),"\n",(0,r.jsx)(l.p,{children:"The GeoJson layer should follow the schema of the next example:"}),"\n",(0,r.jsx)(l.pre,{children:(0,r.jsx)(l.code,{className:"language-json",children:'    {\n        "type": "geojsonbase",\n        "data": $validGeoJsonObject,\n        "properties": {\n            "filled": false\n        }\n    }\n   \n'})}),"\n",(0,r.jsx)(l.p,{children:"The available properties for this layer are the following:"}),"\n",(0,r.jsxs)(l.ul,{children:["\n",(0,r.jsx)(l.li,{children:"pickable: boolean, default value true."}),"\n",(0,r.jsx)(l.li,{children:"stroked: boolean, default value false."}),"\n",(0,r.jsx)(l.li,{children:"filled: boolean, default value true."}),"\n",(0,r.jsx)(l.li,{children:"extruded: boolean, default value true."}),"\n",(0,r.jsx)(l.li,{children:"pointType: string, default value 'circle'."}),"\n",(0,r.jsx)(l.li,{children:"lineWidthScale: integer, default value 20."}),"\n",(0,r.jsx)(l.li,{children:"lineWidthMinPixels: integer, default value 100."}),"\n",(0,r.jsx)(l.li,{children:"pointRadius: integer, default value 100."}),"\n",(0,r.jsx)(l.li,{children:"lineWidth: integer, default value 1."}),"\n",(0,r.jsx)(l.li,{children:"elevation: integer, default value 30."}),"\n"]}),"\n",(0,r.jsx)(l.h3,{id:"grid",children:"Grid"}),"\n",(0,r.jsx)(l.p,{children:"The Grid layer should follow the schema of the next example:"}),"\n",(0,r.jsx)(l.pre,{children:(0,r.jsx)(l.code,{className:"language-json",children:'    {\n        "type": "gridlayer",\n        "data": [{"coordinates": [-122.42177834, 37.78346622]}],\n        "properties": {\n            "cellSize": 100\n        }\n    }\n   \n'})}),"\n",(0,r.jsx)(l.p,{children:"The available properties for this layer are the following:"}),"\n",(0,r.jsxs)(l.ul,{children:["\n",(0,r.jsx)(l.li,{children:"pickable: boolean, default value true."}),"\n",(0,r.jsx)(l.li,{children:"extruded: boolean, default value true."}),"\n",(0,r.jsx)(l.li,{children:"cellSize: integer, default value 200."}),"\n",(0,r.jsx)(l.li,{children:"elevationScale: integer, default value 4."}),"\n"]}),"\n",(0,r.jsx)(l.h3,{id:"gridcell",children:"GridCell"}),"\n",(0,r.jsx)(l.p,{children:"The GridCell layer should follow the schema of the next example:"}),"\n",(0,r.jsx)(l.pre,{children:(0,r.jsx)(l.code,{className:"language-json",children:'    {\n        "type": "gridcell",\n        "data": [{"centroid": [-122.42177834, 37.78346622], "value": 100}],\n        "properties": {\n            "cellSize": 100\n        }\n    }\n   \n'})}),"\n",(0,r.jsx)(l.p,{children:"The available properties for this layer are the following:"}),"\n",(0,r.jsxs)(l.ul,{children:["\n",(0,r.jsx)(l.li,{children:"pickable: boolean, default value true."}),"\n",(0,r.jsx)(l.li,{children:"extruded: boolean, default value true."}),"\n",(0,r.jsx)(l.li,{children:"cellSize: integer, default value 200."}),"\n",(0,r.jsx)(l.li,{children:"elevationScale: integer, default value 5000."}),"\n"]}),"\n",(0,r.jsx)(l.h3,{id:"heatmap",children:"Heatmap"}),"\n",(0,r.jsx)(l.p,{children:"The heatmap layer should follow the schema of the next example:"}),"\n",(0,r.jsx)(l.pre,{children:(0,r.jsx)(l.code,{className:"language-json",children:'    {\n        "type": "heatmap",\n        "data": [{"coordinates": [-122.42177834, 37.78346622], "weight": 100}],\n        "properties": {\n        }\n    }\n   \n'})}),"\n",(0,r.jsx)(l.h3,{id:"hexagon",children:"Hexagon"}),"\n",(0,r.jsx)(l.p,{children:"The Hexagon layer should follow the schema of the next example:"}),"\n",(0,r.jsx)(l.pre,{children:(0,r.jsx)(l.code,{className:"language-json",children:'    {\n        "type": "hexagon",\n        "data": [{"coordinates": [-122.42177834, 37.78346622]}],\n        "properties": {\n            "elevationScale": 3\n        }\n    }\n   \n'})}),"\n",(0,r.jsx)(l.p,{children:"The available properties for this layer are the following:"}),"\n",(0,r.jsxs)(l.ul,{children:["\n",(0,r.jsx)(l.li,{children:"pickable: boolean, default value true."}),"\n",(0,r.jsx)(l.li,{children:"extruded: boolean, default value true."}),"\n",(0,r.jsx)(l.li,{children:"radius: integer, default value 200."}),"\n",(0,r.jsx)(l.li,{children:"elevationScale: integer, default value 4."}),"\n"]}),"\n",(0,r.jsx)(l.h3,{id:"icon",children:"Icon"}),"\n",(0,r.jsx)(l.p,{children:"The Icon layer should follow the schema of the next example:"}),"\n",(0,r.jsx)(l.pre,{children:(0,r.jsx)(l.code,{className:"language-json",children:'    {\n        "type": "icon",\n        "data": [{"coordinates": [-122.42177834, 37.78346622], "icon": $url, "width": 128, "height": 128, "anchorY": 128, "elevation": 30}],\n        "properties": {\n            "sizeScale": 3\n        }\n    }\n   \n'})}),"\n",(0,r.jsx)(l.p,{children:"The available properties for this layer are the following:"}),"\n",(0,r.jsxs)(l.ul,{children:["\n",(0,r.jsx)(l.li,{children:"pickable: boolean, default value true."}),"\n",(0,r.jsx)(l.li,{children:"sizeScale: integer, default value 10."}),"\n",(0,r.jsx)(l.li,{children:"sizeMaxPixels: integer, default value 10."}),"\n"]}),"\n",(0,r.jsx)(l.h3,{id:"line",children:"Line"}),"\n",(0,r.jsx)(l.p,{children:"The line layer should follow the schema of the next example:"}),"\n",(0,r.jsx)(l.pre,{children:(0,r.jsx)(l.code,{className:"language-json",children:'    {\n        "type": "line",\n        "data":[\n            {\n                "from": {\n                    "coordinates": [-122.269029, 37.80787]\n                },\n                "to": {\n                    "coordinates": [-122.271604, 37.803664]\n                },\n                "color": [255, 140, 0]\n            },\n        ],\n        "properties": {\n            "width": 20\n        }\n\n    }\n   \n'})}),"\n",(0,r.jsx)(l.p,{children:"The available properties for this layer are the following:"}),"\n",(0,r.jsxs)(l.ul,{children:["\n",(0,r.jsx)(l.li,{children:"pickable: boolean, default value true."}),"\n",(0,r.jsx)(l.li,{children:"width: integer, default value 50."}),"\n"]}),"\n",(0,r.jsx)(l.h3,{id:"path",children:"Path"}),"\n",(0,r.jsx)(l.p,{children:"The Path layer should follow the schema of the next example:"}),"\n",(0,r.jsx)(l.pre,{children:(0,r.jsx)(l.code,{className:"language-json",children:'    {\n        "type": "path",\n        "data":[\n            {\n                "path": [[-122.269029, 37.80787],[-122.271604, 37.803664],[-122.271604, 38.803664]],\n                "color": [255, 140, 0],\n                "width": 5\n            },\n        ],\n        "properties": {\n            "widthScale": 30\n        }\n\n    }\n   \n'})}),"\n",(0,r.jsx)(l.p,{children:"The available properties for this layer are the following:"}),"\n",(0,r.jsxs)(l.ul,{children:["\n",(0,r.jsx)(l.li,{children:"pickable: boolean, default value true."}),"\n",(0,r.jsx)(l.li,{children:"widthScale: integer, default value 20."}),"\n",(0,r.jsx)(l.li,{children:"widthMinPixels: integer, default value 2."}),"\n"]}),"\n",(0,r.jsx)(l.h3,{id:"scatterplot",children:"ScatterPlot"}),"\n",(0,r.jsx)(l.p,{children:"The ScatterPlot layer should follow the schema of the next example:"}),"\n",(0,r.jsx)(l.pre,{children:(0,r.jsx)(l.code,{className:"language-json",children:'    {\n        "type": "scatterplot",\n        "data":[\n             {"name": "Colma (COLM)", "address\u201d: "365 D Street, Colma CA 94014", "exits\u201d: 4214, "coordinates": [-122.466233, 37.684638]},\n        ],\n        "properties": {\n            "lineWidthMinPixels": 2\n        }\n\n    }\n   \n'})}),"\n",(0,r.jsx)(l.p,{children:"The available properties for this layer are the following:"}),"\n",(0,r.jsxs)(l.ul,{children:["\n",(0,r.jsx)(l.li,{children:"pickable: boolean, default value true."}),"\n",(0,r.jsx)(l.li,{children:"stroked: boolean, default value true."}),"\n",(0,r.jsx)(l.li,{children:"filled: boolean, default value true."}),"\n",(0,r.jsx)(l.li,{children:"radiusScale: integer, default value 6."}),"\n",(0,r.jsx)(l.li,{children:"radiusMinPixels: integer, default value 1."}),"\n",(0,r.jsx)(l.li,{children:"radiusMaxPixels: integer, default value 100."}),"\n",(0,r.jsx)(l.li,{children:"lineWidthMinPixels: integer, default value 1."}),"\n"]}),"\n",(0,r.jsx)(l.h3,{id:"scenegraph",children:"Scenegraph"}),"\n",(0,r.jsx)(l.p,{children:"The Scenegraph layer should follow the schema of the next example:"}),"\n",(0,r.jsx)(l.pre,{children:(0,r.jsx)(l.code,{className:"language-json",children:'    {\n        "type": "scenegraph",\n        "data":[\n             {"coordinates": [-122.466233, 37.684638]},\n        ],\n        "properties": {\n            "scenegraph": "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoxAnimated/glTF-Binary/BoxAnimated.glb"\n        }\n\n    }\n   \n'})}),"\n",(0,r.jsx)(l.p,{children:"The available properties for this layer are the following:"}),"\n",(0,r.jsxs)(l.ul,{children:["\n",(0,r.jsx)(l.li,{children:"pickable: boolean, default value true."}),"\n",(0,r.jsx)(l.li,{children:"scenegraph: string, url of the glb object."}),"\n",(0,r.jsx)(l.li,{children:"sizeScale: integer, default value 500."}),"\n"]}),"\n",(0,r.jsx)(l.h3,{id:"simplemesh",children:"SimpleMesh"}),"\n",(0,r.jsx)(l.p,{children:"The SimpleMesh layer should follow the schema of the next example:"}),"\n",(0,r.jsx)(l.pre,{children:(0,r.jsx)(l.code,{className:"language-json",children:'    {\n        "type": "simpleMesh",\n        "data":[\n             {\n                "position": [-122.45, 37.7],\n                "angle": 0,\n                "color": [255, 0, 0]\n            },\n            {\n                "position": [-122.46, 37.73],\n                "angle": 90,\n                "color": [0, 255, 0]\n            },\n        ],\n        "properties": {\n            "mesh": "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/humanoid_quad.obj"\n        }\n\n    }\n   \n'})}),"\n",(0,r.jsx)(l.p,{children:"The available properties for this layer are the following:"}),"\n",(0,r.jsxs)(l.ul,{children:["\n",(0,r.jsx)(l.li,{children:"sizeScale: integer, default value 1."}),"\n",(0,r.jsx)(l.li,{children:"mesh: string, url of the obj object."}),"\n"]}),"\n",(0,r.jsx)(l.h3,{id:"textlayer",children:"TextLayer"}),"\n",(0,r.jsx)(l.p,{children:"The Text layer should follow the schema of the next example:"}),"\n",(0,r.jsx)(l.pre,{children:(0,r.jsx)(l.code,{className:"language-json",children:'    {\n        "type": "textLayer",\n        "data":[\n             {\n                "coordinates": [-122.45, 37.7],\n                "text": "example",\n            },\n            {\n                "position": [-122.46, 37.73],\n                "text": "example",\n            },\n        ],\n        "properties": {\n        }\n\n    }\n   \n'})}),"\n",(0,r.jsx)(l.p,{children:"The available properties for this layer are the following:"}),"\n",(0,r.jsxs)(l.ul,{children:["\n",(0,r.jsx)(l.li,{children:"pickable: boolean, default value true."}),"\n"]})]})}function h(e={}){const{wrapper:l}={...(0,a.R)(),...e.components};return l?(0,r.jsx)(l,{...e,children:(0,r.jsx)(c,{...e})}):c(e)}},8453:(e,l,n)=>{n.d(l,{R:()=>s,x:()=>t});var r=n(6540);const a={},i=r.createContext(a);function s(e){const l=r.useContext(i);return r.useMemo((function(){return"function"==typeof e?e(l):{...l,...e}}),[l,e])}function t(e){let l;return l=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:s(e.components),r.createElement(i.Provider,{value:l},e.children)}}}]);