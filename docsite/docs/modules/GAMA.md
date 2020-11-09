---
id: GAMA
---
Agent-Based Model developped in the [CityScience](https://www.media.mit.edu/groups/city-science/overview/) group using [Gama Platform](https://gama-platform.github.io/) and integrated in [CityScope](https://www.media.mit.edu/projects/cityscope/overview/)


#  Tutorial

If you don’t have a specific table, you can create one [here](https://cityscope.media.mit.edu/CS_cityscopeJS/). For this tutorial, we crated one called `dungeonmaster`. In this tutorial we will see how to load a table in GAMA, instantiate a Grid, run an hello world simulation and send results back. 

The first step is to add the import from the `GAMABrix.gaml` file. Right after declaring your model, import the necessary species and functions by running:

```
import "GAMABrix.gaml"
```

This will add to `global` the necessary functions to communicate with `CityIO` and three very important species that you will use to give your agents the properties they need to also live in CityIO: `cityio_numeric_indicator`, `cityio_heatmap_indicator`, and `cityio_agent`.


Think of `cityio_numeric_indicator` and `cityio_heatmap_indicator` as two observers in your model that will report information back to CityIO. Later, we'll talk about how to create sub-species of these two species and how to create agents. `cityio_agent` is used as the parent class of any species that you want to visualize in CityIO. There are some specific parameters your sub-species needs to define, and we'll talk about them later.


## The CityIO global

To connect your world to a table you need to declare the table name inside your `global`. For example, we named our table `dungeonmaster`:

```
string city_io_table<-"dungeonmaster";
```

While you are building your model, we recommend turning `GAMABrix` off speed up the process (the default). By setting `post_on<-false`, the model will only update your local grid without posting any of the indicators to cityio. This will reduce your bandwidth usage and allow you to debug your model faster. 

Once you are done and want to deploy, change:
```
bool post_on<-true;
```



## Input

What is geogrid_data? Every time we create a CityScope table, we define a regularly spaced grid which is overlaid on the city district we’re modelling. These grid cells are the basic unit of analysis for the CityScope modules. Every grid cell has properties such as the `Type` which represents the land use and `Height` which represents the number of floors. These data are dynamic and are updated each time a user interacts with the CityScope table, experimenting with the spatial organisation of land uses and infrastructure. These dynamic data are stored the variable `geogrid_data`. This is a list of ojects: one for each grid cell in the CityScope table. 

In GAMA, the user does not need to be aware of `geogrid_data`. The `udpateGrid` action should make sure that the state of the simulated world matches the state of the table, and then the user just interacts with the simulated world. All the indicators are then a funcion of the local GAMA world, and not a direct function of `geogrid_data`. 

The user will eventually interact with the `block` species. 

## Output


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




# Running GAMA on a server with ssh access

We highly recommend using a docker container to run GAMA on a headless server. This will take care of compatibility issues between platforms. 

First, pull the image from dockerhub. This step only needs to be performed once per server. We will be using [this image](https://hub.docker.com/r/gamaplatform/gama).
```
> docker pull gamaplatform/gama
```

Second, we will build the `xml` file with the model meta parameters. You will only need to do this once for each model. From your repo (the folder that contains models, results, etc), run:
```
> docker run --rm -v "$(pwd)":/usr/lib/gama/headless/my_model gamaplatform/gama -xml CityScopeHeadless my_model/models/cityIO.gaml my_model/headless/myHeadlessModel.xml
```

This creates a file called `myHeadlessModel.xml` in your `headless` folder. If you know how to edit this file, feel free to modify it now. For more information about this file, check the [documentation](https://gama-platform.github.io/wiki/Headless).

Finally, we will run this model inside a container. This final step is what you will repeat everytime you modify your model. Run the following command, again from your model director:
```
> docker run --rm -v "$(pwd)":/usr/lib/gama/headless/my_model gamaplatform/gama my_model/headless/myHeadlessModel.xml my_model/results/
```

# Examples

Agents that randomly move on road network.
1) Pull road network from OSM
2) Place agents in network and make them move randomly.

