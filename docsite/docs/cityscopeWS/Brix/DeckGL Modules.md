---
sidebar_position: 2
---

The main difference in using Brix WS compared to the previous version of Brix is the method of sending data to CityScope for visualization. The previous version of Brix allowed for various pre-defined visualizations, such as numeric with bars or graphs, heatmaps, or ABM, among others. While this was useful, it didn't offer enough flexibility for module makers to create complex visualizations with a variety of different elements. They were always constrained to using the same method to display data.

To address this issue, Brix WS introduces **DeckGL modules**, a new type of module that can harness the full power of DeckGL and create robust visualizations using multiple DeckGL layers.

The structure of the data that DeckGL modules should follow is an array of objects, where each object represents one layer of the visualization. Every layer always has the same three properties:
    - `type`: The type of the layer.
    - `data`: The data to be represented.
    - `properties`: Additional properties to configure the visualization of the layer.

```json
[
{"type":"column","data":$data,"properties":{}},
{"type":"arc","data":$data,"properties":{}},
{"type":"column","data":$data,"properties":{}},
...
]
```

## Available DeckGL Layers

At the time being, the available DeckGL layers that can be use in the modules are the following:
    - arc: https://deck.gl/docs/api-reference/layers/arc-layer
    - column: https://deck.gl/docs/api-reference/layers/column-layer
    - contours: https://deck.gl/docs/api-reference/aggregation-layers/contour-layer
    - geojsonbase: https://deck.gl/docs/api-reference/layers/geojson-layer
    - gridlayer: https://deck.gl/docs/api-reference/aggregation-layers/grid-layer
    - gridcell: https://deck.gl/docs/api-reference/layers/grid-cell-layer
    - heatmap: https://deck.gl/docs/api-reference/aggregation-layers/heatmap-layer
    - hexagon: https://deck.gl/docs/api-reference/aggregation-layers/hexagon-layer
    - icon: https://deck.gl/docs/api-reference/layers/icon-layer
    - lines: https://deck.gl/docs/api-reference/layers/line-layer
    - path: https://deck.gl/docs/api-reference/layers/path-layer
    - scatterplot: https://deck.gl/docs/api-reference/layers/scatterplot-layer
    - scenegraph: https://deck.gl/docs/api-reference/mesh-layers/scenegraph-layer
    - simpleMesh: https://deck.gl/docs/api-reference/mesh-layers/simple-mesh-layer
    - textLayer: https://deck.gl/docs/api-reference/layers/text-layer

This list will grow over time to include all the layers in DeckGL. In each of the links, you can view an example of the visualization that the layer creates.

### Arc

The arc layer should follow the schema of the next example:

```json
    {
        "type": "arc",
        "data":[
            {
                "from": {
                    "coordinates": [-122.269029, 37.80787]
                },
                "to": {
                    "coordinates": [-122.271604, 37.803664]
                },
                "sourceColor": [255, 140, 0],
                "targetColor": [100, 140, 0]
            },
        ],
        "properties": {
            "width": 20
        }
    }
   
```

The available properties for this layer are the following:
    - width: integer, default value 12.

### Column

The column layer should follow the schema of the next example:

```json
    {
        "type": "column",
        "data":[
            {"centroid": [-122.4, 37.7], "value": 0.2},
        ],
        "properties": {
            "disResolution": 12,
            "radius": 25
        }
    }
   
```

The available properties for this layer are the following:
    - disResolution: integer, default value 12.
    - radius: integer, default value 30.
    - extruded: boolean, default value true.
    - pickable: boolean, default value true.
    - elevationScale: integer, default value 1.

### Contour

The contour layer should follow the schema of the next example:

```json
    {
        "type": "contour",
        "data":[
            {"coordinates": [-122.42177834, 37.78346622]}
        ],
        "properties": {
            "cellSize": 100
        }
    }
   
```

The available properties for this layer are the following:
    - cellSize: integer, default value 200.

### GeoJson

The GeoJson layer should follow the schema of the next example:

```json
    {
        "type": "geojsonbase",
        "data": $validGeoJsonObject,
        "properties": {
            "filled": false
        }
    }
   
```

The available properties for this layer are the following:
    - pickable: boolean, default value true.
    - stroked: boolean, default value false.
    - filled: boolean, default value true.
    - extruded: boolean, default value true.
    - pointType: string, default value 'circle'.
    - lineWidthScale: integer, default value 20.
    - lineWidthMinPixels: integer, default value 100.
    - pointRadius: integer, default value 100.
    - lineWidth: integer, default value 1.
    - elevation: integer, default value 30.

### Grid

The Grid layer should follow the schema of the next example:

```json
    {
        "type": "gridlayer",
        "data": [{"coordinates": [-122.42177834, 37.78346622]}],
        "properties": {
            "cellSize": 100
        }
    }
   
```

The available properties for this layer are the following:
    - pickable: boolean, default value true.
    - extruded: boolean, default value true.
    - cellSize: integer, default value 200.
    - elevationScale: integer, default value 4.

### GridCell

The GridCell layer should follow the schema of the next example:

```json
    {
        "type": "gridcell",
        "data": [{"centroid": [-122.42177834, 37.78346622], "value": 100}],
        "properties": {
            "cellSize": 100
        }
    }
   
```

The available properties for this layer are the following:
    - pickable: boolean, default value true.
    - extruded: boolean, default value true.
    - cellSize: integer, default value 200.
    - elevationScale: integer, default value 5000.

### Heatmap

The heatmap layer should follow the schema of the next example:

```json
    {
        "type": "heatmap",
        "data": [{"coordinates": [-122.42177834, 37.78346622], "weight": 100}],
        "properties": {
        }
    }
   
```

### Hexagon

The Hexagon layer should follow the schema of the next example:

```json
    {
        "type": "hexagon",
        "data": [{"coordinates": [-122.42177834, 37.78346622]}],
        "properties": {
            "elevationScale": 3
        }
    }
   
```

The available properties for this layer are the following:
    - pickable: boolean, default value true.
    - extruded: boolean, default value true.
    - radius: integer, default value 200.
    - elevationScale: integer, default value 4.

### Icon

The Icon layer should follow the schema of the next example:

```json
    {
        "type": "icon",
        "data": [{"coordinates": [-122.42177834, 37.78346622], "icon": $url, "width": 128, "height": 128, "anchorY": 128, "elevation": 30}],
        "properties": {
            "sizeScale": 3
        }
    }
   
```

The available properties for this layer are the following:
    - pickable: boolean, default value true.
    - sizeScale: integer, default value 10.
    - sizeMaxPixels: integer, default value 10.

### Line

The line layer should follow the schema of the next example:

```json
    {
        "type": "line",
        "data":[
            {
                "from": {
                    "coordinates": [-122.269029, 37.80787]
                },
                "to": {
                    "coordinates": [-122.271604, 37.803664]
                },
                "color": [255, 140, 0]
            },
        ],
        "properties": {
            "width": 20
        }

    }
   
```

The available properties for this layer are the following:
    - pickable: boolean, default value true.
    - width: integer, default value 50.

### Path

The Path layer should follow the schema of the next example:

```json
    {
        "type": "path",
        "data":[
            {
                "path": [[-122.269029, 37.80787],[-122.271604, 37.803664],[-122.271604, 38.803664]],
                "color": [255, 140, 0],
                "width": 5
            },
        ],
        "properties": {
            "widthScale": 30
        }

    }
   
```

The available properties for this layer are the following:
    - pickable: boolean, default value true.
    - widthScale: integer, default value 20.
    - widthMinPixels: integer, default value 2.

### ScatterPlot

The ScatterPlot layer should follow the schema of the next example:

```json
    {
        "type": "scatterplot",
        "data":[
             {"name": "Colma (COLM)", "address”: "365 D Street, Colma CA 94014", "exits”: 4214, "coordinates": [-122.466233, 37.684638]},
        ],
        "properties": {
            "lineWidthMinPixels": 2
        }

    }
   
```

The available properties for this layer are the following:
    - pickable: boolean, default value true.
    - stroked: boolean, default value true.
    - filled: boolean, default value true.
    - radiusScale: integer, default value 6.
    - radiusMinPixels: integer, default value 1.
    - radiusMaxPixels: integer, default value 100.
    - lineWidthMinPixels: integer, default value 1.

### Scenegraph

The Scenegraph layer should follow the schema of the next example:

```json
    {
        "type": "scenegraph",
        "data":[
             {"coordinates": [-122.466233, 37.684638]},
        ],
        "properties": {
            "scenegraph": "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoxAnimated/glTF-Binary/BoxAnimated.glb"
        }

    }
   
```

The available properties for this layer are the following:
    - pickable: boolean, default value true.
    - scenegraph: string, url of the glb object.
    - sizeScale: integer, default value 500.

### SimpleMesh

The SimpleMesh layer should follow the schema of the next example:

```json
    {
        "type": "simpleMesh",
        "data":[
             {
                "position": [-122.45, 37.7],
                "angle": 0,
                "color": [255, 0, 0]
            },
            {
                "position": [-122.46, 37.73],
                "angle": 90,
                "color": [0, 255, 0]
            },
        ],
        "properties": {
            "mesh": "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/humanoid_quad.obj"
        }

    }
   
```

The available properties for this layer are the following:
    - sizeScale: integer, default value 1.
    - mesh: string, url of the obj object.

### TextLayer

The Text layer should follow the schema of the next example:

```json
    {
        "type": "textLayer",
        "data":[
             {
                "coordinates": [-122.45, 37.7],
                "text": "example",
            },
            {
                "position": [-122.46, 37.73],
                "text": "example",
            },
        ],
        "properties": {
        }

    }
   
```

The available properties for this layer are the following:
    - pickable: boolean, default value true.
