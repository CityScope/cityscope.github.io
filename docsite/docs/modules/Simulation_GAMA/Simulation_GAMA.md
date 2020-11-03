---
id: Simulation_GAMA
---
Agent-Based Model developped in the [CityScience](https://www.media.mit.edu/groups/city-science/overview/) group using [Gama Platform](https://gama-platform.github.io/) and integrated in [CityScope](https://www.media.mit.edu/projects/cityscope/overview/)


#Tutorial
If you don’t have a specific table, you can create one [here](https://cityscope.media.mit.edu/CS_cityscopeJS/).For this tutorial, we crated one called `dungeonmaster`.
In this tutorial we will see how to load a table in GAMA, instantiate a Grid, run an hello world simulation and send results back. 

## Input
What is geogrid_data? Every time we create a CityScope table, we define a regularly spaced grid which is overlaid on the city district we’re modelling. These grid cells are the basic unit of analysis for the CityScope modules. Every grid cell has properties such as the `Type` which represents the land use and `Height` which represents the number of floors. These data are dynamic and are updated each time a user interacts with the CityScope table, experimenting with the spatial organisation of land uses and infrastructure. These dynamic data are stored the variable `geogrid_data`. This is a list of ojects: one for each grid cell in the CityScope table. 

