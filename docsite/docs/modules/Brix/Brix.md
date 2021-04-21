---
id: Brix
---
# Documentation for cs-brix library

Brix is a python library for CityScope modules which handles communication with [City I/O](http://cityio.media.mit.edu/).

## Introduction

What is this library for? If you have never heard of a CityScope before, you might want to stop reading and learn about them [here](https://cityscope.media.mit.edu/). CityScope is an awesome way to interact, explore, and co-create urban interventions in a way that can be accessed by multiple people with different background. If you know what they are, please keep reading.

What is a CityScope table? a ‘table’ is our way of describing a CityScope project. Why table then? Since historically, most CityScope instances were composed of a mesh between a physical table-top 3D model of a city, augmented with projections, software, and other interface hardware. So a table => project.

What is an indicator? An indicator is the result of running a module for CityScope. Indicators work by listening for updated from the CityScope table they are linked to, calculating some values by using a model, some function of the data, or a simulation, and then post the result of the calculations to CityIO to be displayed in the table.

What are the types of indicators you can build? Indicators can be anything that could be displayed on a CityScope table, including the supporting screens associated to it. For the purpose of this library, we distinguish three types of indicator: numeric, heatmap, simulation.


* Numeric: Numeric indicators are just a number or set of numbers. They are usually displayed in a chart (bar chart, radar chart, etc) next to the table. The most common numeric indicator are the numbers that go in the radar plot, which display information about density, diversity, and proximity.


* Heatmap: These indicators are geodata. They are made up of geometries (points, lines, or polygons) and properties associated to them. These indicators are displayed as layers directly on the CityScope table.


* Simulation: These type of indicators are also displayed on the table but they are the result of an agent based simulation and are therefore displayed as a dynamic layer. They change over time like a short movie. These are not yet supported by this library.

## Installation

Brix is now on pip. Just do:

```
pip install cs-brix
```


* Tutorial


    * Basics of building a CityScope indicator


    * Let’s talk data (input)


    * Build and test your indicator (output)


    * Deploy your indicator


    * Additional tools


* Classes


    * Handler class


    * Indicator class


    * GEOGRIDDATA class


    * Indicator sub-classes


* Functions


    * Helper functions


    * Wrapper functions


    * OSM functions


* Examples


    * Short examples


    * Step by step examples


## Indices and tables


* Index


* Search Page

