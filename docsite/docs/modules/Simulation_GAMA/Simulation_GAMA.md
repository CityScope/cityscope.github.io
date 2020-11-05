---
id: Simulation_GAMA
---
Agent-Based Model developped in the [CityScience](https://www.media.mit.edu/groups/city-science/overview/) group using [Gama Platform](https://gama-platform.github.io/) and integrated in [CityScope](https://www.media.mit.edu/projects/cityscope/overview/)


#Tutorial
If you don’t have a specific table, you can create one [here](https://cityscope.media.mit.edu/CS_cityscopeJS/).For this tutorial, we crated one called `dungeonmaster`.
In this tutorial we will see how to load a table in GAMA, instantiate a Grid, run an hello world simulation and send results back. 

## Input
What is geogrid_data? Every time we create a CityScope table, we define a regularly spaced grid which is overlaid on the city district we’re modelling. These grid cells are the basic unit of analysis for the CityScope modules. Every grid cell has properties such as the `Type` which represents the land use and `Height` which represents the number of floors. These data are dynamic and are updated each time a user interacts with the CityScope table, experimenting with the spatial organisation of land uses and infrastructure. These dynamic data are stored the variable `geogrid_data`. This is a list of ojects: one for each grid cell in the CityScope table. 

In GAMA, the user does not need to be aware of `geogrid_data`. The `udpateGrid` action should make sure that the state of the simulated world matches the state of the table, and then the user just interacts with the simulated world. All the indicators are then a funcion of the local GAMA world, and not a direct function of `geogrid_data`. 

The user will eventually interact with the `block` species. 

## Output

# Examples

## Basic numeric indicator

In GAMA, indicators are defined as agents from an indicator species. The species for numeric indicators is called `cityio_numeric_indicator`. There are two ways of creating a numeric indicator. 

First, for simple calculations, you can create an agent of the `cityio_numeric_indicator` species and pass it the formula to be evaluated as:
```
create cityio_numeric_indicator with: (viz_type:"bar",indicator_name: "Max Height", indicator_value: "max(block collect each.height)");
```

This line of code creates a numeric indicator, called `Max height`, to be displayed as a `bar`, and that performs the calculation `max(block collect each.height)`, which gets the maximum height of all blocks. 

Second, for more complex indicators it might make sense for the user to define its own species. This is done by creating a sub-species of the `cityio_numeric_indicator` species. The sub-species needs to define a `return_indicator` function that should return a `float`. The following example implements the same indicator as above:

```
species my_cool_indicator parent: cityio_numeric_indicator {
	float return_indicator {
		return max(block collect each.height);
	}
}
```
and in the `global init`  the useer creates:
```
create my_cool_indicator with: (viz_type:"bar",indicator_name: "Number of blocks");
```

If the species is not created as a sub-species of `cityio_numeric_indicator`, the indicator will not update. 





