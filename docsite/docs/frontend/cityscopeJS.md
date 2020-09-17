---
id: CityScopeJS
---

## CityScope platform for the web

CityScopeJS is the unified front-end for the [MIT CityScope](https://cityscope.media.mit.edu/) project. CityScopeJS allows users to examine different urban-design alternatives and observe their impact through different KPIs and matrices. CityScopeJS brings together different urban analytics modules, such as traffic simulation, ABM, noise, storm-water, access.

## What is it for?

CityScopeJS is an online tool with a web interface or tangible user interface (TUI). Using the tool, users can input land uses, buildings, open spaces or transport routes, categorize them and enrich their description with details on usability, density and other parameters. This input forms the basis for calculating the various modules and indicators.

###### CityScopeJS Web interface

![TUI](img/web_ui.jpg)

###### CityScopeJS TUI

![TUI](img/CityScopeJS.jpg)

---

**CityScopeJS exposes two main features: `CityScopeJS Grid Editor` and `CityScopeJS Palyground`**

# CSjs Playground

CSjs Playground is where users interact with the design of urban areas. The tool is built to allow snappy, real-time intervention with various land-uses. The design is then evaluated using different urban analytics modules.

## Quick Start

To explore the app for a known CityScope project, add a CityScope project name to this page URL (for example, `__URL__/?cityscope=corktown` will run [CityScopeJS Corktown](https://cityscope.media.mit.edu/CS_cityscopeJS/?cityscope=corktown) project). You can also explore a list of active CityScope projects [here](https://cityio.media.mit.edu).

When in the app, edit the grid using the editing tool, and explore the different analytics updating

## Development

CityScopeJS is being constantly developed through its frontend, backend and modules. This repo is subject to breaking changes.

In the project directory, you can run: `npm start` Runs the app in the development mode.<br /> Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

#### Hard-Reset cityIO `GEOGRIDDATA` field

**Note!** This feature involves permanent data loss. If your dev created odd data for the grid, you can quickly reset it via:

```
`$ curl https://cityio.media.mit.edu/api/table/clear/__TABLE_NAME__/GEOGRIDDATA`
```

---

# CSjs Grid Editor

The CSjs Grid Editor is a helper tool to bootstrap new CityScope projects. It allow a quick creation of:

-   a CityScope endpoint on CityIO
-   a geo-located, 3D, editable and contextual CityScope grid
-   a list of land-uses to be used during the project

## CityScopeJS schema

This document illustrates the data format and standards for the deployment of a CityScopeJS instance. Being a WIP project, this is subject to change.

## Data Requirements

### `geogrid:geojson`

Minimal data for initiation is a valid GeoJson `FeatureCollection` of at least one `Polygon` feature.
Ideally, this field should be read once on init, due to its size and static state. User should not iterate over it.

```
{
  "type": "FeatureCollection",
  "properties": {
    "header": {},
    "interactive_mapping": {"1245":{"TUI":"1"},"1472":{"WEB":"1"}}
  },

  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
             __lat__,
              __long__
            ],
            ...
          ]
        ]
      }
    }...
  ]
}
```

**optional fields**

`interactive_mapping`: maps the grid cells that are interactable via the HCI/TUI CityScope interface or web/mobile UI. This allow mixing of different interactions without overwriting. Format

```
{
	"__feature_number__": {
		"TUI": "__TUI_CELL_NUMBER__"
	},
	"__feature_number__": {
		"WEB": "__WEB_INTERACTION_CELL_NUMBER__"
	}
}
```

---

# CityScopeJS Ecosystem

CityScopeJS is a modular, open-ended architecture for MIT CityScope project.

![CityScopeJS Architecture](img/CityScopeJS_arch.png)

CityScopeJS includes several other modules for building, testing and deploying an end-to-end CityScope platform. Each module is developed as a standalone part of the system with minimal dependency on others. Data flow between modules is done using [cityIO](https://cityio.media.mit.edu), which operates between the different modules.

## Analysis modules

Different analysis modules calculate various indicators on urban performance, such as noise, mobility, energy and others. These analysis modules are developed by experts in each evaluation field.

-   Urban Indicators module ("Radar"): https://github.com/CityScope/CS_Urban_Indicators
-   A service providing mobility simulation, Agent Based Simulation, and aggregated mobility prediction for CityScope projects https://github.com/CityScope/CS_Mobility_Service
-   Noise Modeling for Grasbrook, Hamburg: https://github.com/CityScope/CSL_Hamburg_Noise
-   Agent Based Modeling https://github.com/CityScope/CS_Simulation_GAMA
-   Traffic Simulation module using DLR SUMO https://github.com/CityScope/CS_SUMOscope

## CityScope Server (cityIO)

https://github.com/CityScope/CS_CityIO

## Tools for Tangible User Interfaces

-   CityScope Scanner: https://github.com/CityScope/CS_CityScoPy
-   CityScopeJS tool for projecting websites, images or video slideshows on a physical table: https://github.com/CityScope/CS_CityScopeJS_Projection

## Past CityScopeJS Work

-   Archive of past CSjs projects https://github.com/CityScope/CS_cityscopeJS_Modules
-   AngularJS version of CityScope Project in Grasbrook, Hamburg: https://github.com/CityScope/CSL_Hamburg_Grasbrook