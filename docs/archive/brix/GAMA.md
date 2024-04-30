---
id: GAMA
---
Agent-Based Model developped in the [CityScience](https://www.media.mit.edu/groups/city-science/overview/) group using [Gama Platform](https://gama-platform.github.io/) and integrated in [CityScope](https://www.media.mit.edu/projects/cityscope/overview/)


# Introduction

What is this library for? If you have never heard of a CityScope before, you might want to stop reading and learn about them [here](https://cityscope.media.mit.edu/). CityScope is an awesome way to interact, explore, and co-create urban interventions in a way that can be accessed by multiple people with different background. If you know what they are, please keep reading.

What is a CityScope table? a ‘table’ is our way of describing a CityScope project. Why table then? Since historically, most CityScope instances were composed of a mesh between a physical table-top 3D model of a city, augmented with projections, software, and other interface hardware. So a table => project.

What is an indicator? An indicator is the result of running a module for CityScope. Indicators work by listening for updated from the CityScope table they are linked to, calculating some values by using a model, some function of the data, or a simulation, and then post the result of the calculations to CityIO to be displayed in the table.

What are the types of indicators you can build? Indicators can be anything that could be displayed on a CityScope table, including the supporting screens associated to it. For the purpose of this library, we distinguish three types of indicator: numeric, heatmap, simulation.


* Numeric: Numeric indicators are just a number or set of numbers. They are usually displayed in a chart (bar chart, radar chart, etc) next to the table. The most common numeric indicator are the numbers that go in the radar plot, which display information about density, diversity, and proximity.


* Heatmap: These indicators are geodata. They are made up of geometries (points, lines, or polygons) and properties associated to them. These indicators are displayed as layers directly on the CityScope table.


* Agent: These type of indicators are also displayed on the table but they are the result of an agent based simulation and are therefore displayed as a dynamic layer. They change over time like a short movie. 


# Setup

To setup GAMABrix copy the file `GAMABrix.gaml` into your model directory and import it into your model. You can download `GAMABrix.gaml` from [here](https://github.com/CityScope/CS_Simulation_GAMA/blob/master/CS_CityScope_GAMA/models/cityIO/models/GAMABrix.gaml) Right after declaring your model, import the necessary species and functions by running:
```
import "GAMABrix.gaml"
```

This will add to `global` the necessary functions to communicate with `CityIO` and two very important species that you will use to give your agents the properties they need to also live in CityIO: `cityio_numeric_indicator` and `cityio_agent`. Additionally, it sets up a series of `brix` agents that will ensure your world is a copy of the world in the table you have selected.


# Tutorial 

## Basics of building a CityScope indicator in GAMA

Let’s get to it. First, what table are you building for? If you don’t have a specific table, that is totally okay and you can create one [here](https://cityscope.media.mit.edu/CS_cityscopeJS/). Note: by the time you read this, CityScope might pose some limitations on new projects (`tables`). Please follow instructions in the link above.

For this tutorial, we crated one called `dungeonmaster`.

An indicator will basically take in the properties of the `brix` agents in the world or the properties of any other simulated agent and produce a result. Each new indicator is built as an subclass of the `cityio_agent` class. `cityio_agent` is your friend, so we'll spend some time discussing it here.

When you setup a model by importing `GAMABrix`, the model will run for one whole day of simulation, then posts the results of this simulation to cityio, and then stay idle waiting for an update from the table. This can be a bit annoying when you are only starting to build your model, so you can turn off this behavior and just keep the local grid update. 

Think of each indicator as an observer in your model that will report information back to CityIO. When it's a numeric indicator, the agent will just report a number that it calculates based on the `brix`s, when it's a heatmap indicator, the agent will report some numbers along with its location, and when it's an agent, the agent will report it's location over time. `cityio_agent` is used as the parent class of any species that you want to visualize in CityIO. There are some specific parameters your sub-species needs to define to set the agent as a numeric, heatmap, or agent indicator.


## GAMABrix for `cs-brix` users

If you are familiar with the python library [cs-brix](https://cityscope.media.mit.edu/CS_Brix/), keep reading. Otherwise, skip to the next section of the tutorial. `brix` is relies on defining classes that contain functions that take `geogrid_data` as an input. For `GAMABrix` this is not necessary. Since `GAMA` relies on setting up a world with agents, the input data is already in the world in the form of `brix`. Therefore, when building urban indicators in `GAMA` you do not need to worry about input, and you can just get the necessary information from the `brix` agents that will be automatically created in your world. 

In terms of output, `brix` relies on a series of return functions passed to a `Handler` class. In `GAMA`, the world itself acts as the `Handler` class, so there is no need to explicitly add your indicators to the `Handler` as they are already contained in the `global` species. The way to flag your indicators to be sent to `cityIO` is to define them as a subclass of `cityio_agent`. 

While `brix` can handle multiple tables at the same time by creating multiple threads for each `Handler`, `GAMA` is constrained to one table per model.


## The CityIO global

To connect your world to a table you need to declare the table name inside your `global` and set the geometry of your world based on this table. For example, we named our table `dungeonmaster`:
```
string city_io_table<-"dungeonmaster";
geometry shape <- envelope(setup_cityio_world());
```

While you are building your model, we recommend turning off `GAMABrix` to speed up the process (the default). By setting `post_on<-false`, the model will only update your local grid without posting any of the indicators to cityio. In other words, you will only be *getting* from `cityIO` not *posting*. This will reduce your bandwidth usage and allow you to debug your model faster. By doing this, the model will still keep track of the day and enter idle mode once the day is over. 

For early stages of model building, you might also want to set `pull_only<-true`. This will tell turn off most of the functionality of the module and just make sure you are updating the local grid by pulling from your table. The simulation will not enter idle mode and the day will never reset. 

Once you are done and want to deploy, change:
```
bool post_on<-true;
```

Additionally, the following variables can be defined in the `global` and allow for a finer control of how the `global` communicates with `cityIO`. You do not need to set them up now, as the default should work fine.
* `city_io_table`: String, name of the table to connect to.
* `post_on`: Boolean, used to turn the posting feature on or off. Keep it off while building the model and turn it on to post to the table.
* `update_frequency`: Intenger, frequency, in number of simulation ticks, by which to update local grid by checking for changes in gridhash. This is not the posting frequency. Optional, and defaults to `10`.
* `send_first_batch`: Boolean, if `false` it will only send the results of the simulation once the full day has run. Optional and defaults to `true`.
* `cycle_first_batch`: Integer, simulation tick in which to send the first batch of data to the server. Optional and defaults to `100`.
* `step`: Float, time between two simulation ticks. Defaults to `60 #sec`.
* `saveLocationInterval`: Float, frequency in second by which to save locally the location of agents. This is not the post frequency. Optional and defaults to `10` steps.	
* `totalTimeInSec`: Integer, total time in seconds that the simulation will run for. Defaults to a whole day. Please note that `CityIO` will not render more than 1 day of simulation.
* `idle_update_frequency`: Float, time in real world seconds (not simulation seconds) between two get requests to check hash when in idle mode. 
* `pull_only`: Boolean, used to use GAMABrix only to update the local grid. This is very useful for the early stages of model building.

When you import `GAMABrix` you will also see an additional experiment called `CityScopeHeadless`. This experiment is used to run your model as a headless process in a server.

By default, `GAMABrix` will run its init (which creates the grid) right after your model's init. This means that you will not have access to any `brix` object inside your init. You can always change this behavior by forcing `GAMABrix` to run its init earlyer by adding `do brix_init` where needed. 


## Let's talk input

`GAMA` will keep a copy of the `cityIO` grid locally by creating the necessary `brix` agents. This makes all the grid information accessible to all the agents by interacting with the `brix` agents. 

The main properties that `brix` agents have are:
* type: String that identifies the type of the block. This is editable (e.g. `Residential`).
* height: Float, height of the block.
* color: RGB object.
* block_lbcs: `map<string, float>` Map that connects strings (LBCS codes) and float (proportion of the block in each code).
* block_naics: `map<string, float>` Map that connects strings (NAICS codes) and float (proportion of the block in each code).

Note that `block_lbcs` and `block_naics` are the same for each `type` and are defined when you create the table. 

## Building an indicator (output)


Now, we'll turn some agents into observers that will report information to `cityIO`. All three different types of indicators report different types of information, and an agent can be reporting any type of information to `cityIO`.

* Numeric: Reports numbers (e.g. average commuting time, total energy consumption, etc.). Turn this on by setting `is_numeric<-true`.
* Heatmap: Reports numbers with location (e.g. traffic in a particular intersection, total sunlight in a specific location). Turn this on by setting `is_heatmap<-true`.
* Agent: Report all their locations during one whole day of simulation. Turn this on by setting `is_visible<-true`. Note that the variable `is_visible` refers only to wether you'll see the agent in your CityScope table. You still need to `display` them in your local GAMA interfase if you want to see them. 

When creating a numeric indicator you need to write a `reflex` for your agent that updates either `numeric_values` or `heatmap_values`. These two variables should be `map<string,float>`. Here is a simple example that `numeric_values` with the number of blocks.

```
reflex update_numeric {
	numeric_values<-[];
	numeric_values<+"Number of blocks"::length(brix);
}
```

Similarly, here is another example that updates `heatmap_values` with two layers, `heat` and `map` defined as random numbers:
```
reflex update_heatmap {
	heatmap_values<-[];
	heatmap_values<+ "heat"::rnd(10);
	heatmap_values<+ "map"::rnd(10);
}
```

For an agent indicator there is no value to be updated, as the indicator just reports its location. However, if your agent does not move, you will get a very boring dot so you might want to update the location. Here is a simple `reflex` that updates the location:
```
reflex move{
	do wander;
}
```

Additionally, `GAMABrix` provides a shortcut to create numeric indicators that do not require you to define a subspecies. This is meant for straightforward indicators that can be calculated in one line of code. To create a simple numeric indicator, just create and agent of the `cityio_numeric_indicator` species and pass your function as a string to `indicator_value`. For example, a numeric indicator that returns the average height of blocks:
```
create cityio_numeric_indicator with: (viz_type:"bar",indicator_name: "Mean Height", indicator_value: "mean(brix collect each.height)");
```

## Deploy your indicator 

Let's say you finished writing your model and are ready to leave it running forever (in a server with ssh access, for example). 

We highly recommend using a docker container to run headless GAMA on a server. This will take care of compatibility issues between platforms. 

First, pull the image from dockerhub. This step only needs to be performed once per server. We will be using [this image](https://hub.docker.com/r/gamaplatform/gama).
```
> docker pull gamaplatform/gama
```

Second, we will build the `xml` file with the model meta parameters. You will only need to do this once for each model. Ensure you model directory (the folder that contains models, results, etc) contains a `headless` folder, and then run the following command adding the name of your gama file (`model_file.gaml`) where needed:
```
> docker run --rm -v "$(pwd)":/usr/lib/gama/headless/my_model gamaplatform/gama -xml CityScopeHeadless my_model/models/[model_file.gaml] my_model/headless/myHeadlessModel.xml
```

This creates a file called `myHeadlessModel.xml` in your `headless` folder. If you know how to edit this file, feel free to modify it now. For more information about this file, check the [documentation](https://gama-platform.github.io/wiki/Headless). Please note that by default the simulation will only run 1000 steps. If you wish to change this, edit the `xml` and change the `finalStep` property to a higher number or just delete if you wish the model to run continuosly.

Finally, we will run this model inside a container. This final step is what you will repeat everytime you modify your model. Run the following command, again from your model director:
```
> docker run --rm -v "$(pwd)":/usr/lib/gama/headless/my_model gamaplatform/gama my_model/headless/myHeadlessModel.xml my_model/results/
```

# Examples

## Basic numeric indicator

To create a numeric indicator, the recommended way is to define a species of agents that will act as *observers* that will report the information to `cityIO`. This species needs to have `cityio_agent` as parent species.

You need to define four things:
* Set `is_numeric` to `true`.
* Define a reflex that updates the `numeric_values` map (`map<string,float>`).
* Define an `indicator_name` either in the species definition or in the create statement.
* Set the `viz_type` to either `bar` or `radar` (defaults to `bar` if you don't change it).

Here's a simple example:
```
species my_numeric_indicator parent: cityio_agent {
	bool is_numeric<-true;
	string viz_type <- "bar";
	string indicator_name<-"Table Size";
	
	reflex update_numeric {
		numeric_values<-[];
		numeric_values<+indicator_name::length(brix);
	}
}
```

Don't forget to create an agent of this species in the `global` `init`.
```
create my_numeric_indicator;
```

For simple indicators, you can rely on creating an agent of the `cityio_numeric_indicator` species in your `global` `init`. Here's an example:
```
create cityio_numeric_indicator with: (viz_type:"bar", indicator_name: "Max Height",  indicator_value: "max(brix collect each.height)");
```

## Basic heatmap indicator

To create a heatmap indicator, define a species of agents that will act as *observers* that will report the information to `cityIO`. These agents need to have a location assigned to them. This species needs to have `cityio_agent` as parent species.

You need to define three things:
* Set `is_heatmap` to `true`.
* Define a reflex that updates the `heatmap_values` map (`map<string,float>`).
* Define an `indicator_name` either in the species definition or in the create statement.

```
species thermometer parent: cityio_agent {
	bool is_heatmap<-true;
	string indicator_name<-"thermometer";
	
	reflex update_heatmap {
		heatmap_values<-[];
		heatmap_values<+ "heat"::rnd(10);
		heatmap_values<+ "map"::rnd(10);
	}	
}
```

## Basic agent indicator

Finally, you can easily add agents to be displayed in `cityIO`. Interestingly, these are the easiest indicators to define. In fact, you can turn any species into a `cityio_agent` by defining their parent class. 

You need to is_visible two things:
* Set `is_heatmap` to `true`.
* Define a reflex that updates the agent's location. 

```
species people parent: cityio_agent skills:[moving]{ 
	bool is_visible<-true;
	
	reflex move{
		do wander;
	}
}
```

Additionally, you can define the integers `profile` and `mode` that will control the way they are displayed in the front end. You can also define reflexes that update these two properties. For example, you can differentiate between drivers and walkers, or between day workers and night workers, etc. 

## Full module example (with comments)

```
model citIOGAMA

// Import GAMABrix (this needs to be in the same directory as your model)
import "GAMABrix.gaml" 

global {
	// Define the table you'll be working with
	string city_io_table<-"dungeonmaster";
    geometry shape <- envelope(setup_cityio_world());

    // Set post to true so that GAMABrix can post to cityIO
	bool post_on<-true;
	
	init {
		// Create people based on species defined below
		create people number:10; 

		// Create 100 points of a heatmap indicator (species defined below)
		create thermometer number:100;

		// Use cityio_numeric_indicator to define a mean block height numeric indicator
		create cityio_numeric_indicator with: (viz_type:"bar",indicator_name: "Mean Height", indicator_value: "mean(brix collect each.height)");
		
		// Create a numeric indicator based on the species defined below
		create my_numeric_indicator     with: (viz_type:"bar",indicator_name: "Number of blocks");
	}
	
	
}

// Define a custom numeric indicator
species my_numeric_indicator parent: cityio_agent {
	// Set the indicator as numeric
	bool is_numeric<-true;

	// Visualize it as a bar chart
	string viz_type <- "bar";
	
	// Define reflex that updates numeric_values
	reflex update_numeric {
		numeric_values<-[];
		numeric_values<+indicator_name::length(brix);
	}
}

// Define custom heatmap indicator
species thermometer parent: cityio_agent {
	// Set the indicator as heatmap
	bool is_heatmap<-true;

	// Define reflex that updates heatmap_values
	reflex update_heatmap {
		heatmap_values<-[];
		heatmap_values<+ "heat"::rnd(10);
		heatmap_values<+ "map"::rnd(10);
	}	
}

// Define people, to be used as agent indicators
species people parent: cityio_agent skills:[moving]{ 
	// Set agents as visible in cityIO
	bool is_visible<-true;
	
	// Update the agents location at every step
	reflex move{
		do wander;
	}
	
	// Set base aspect to visualize in GAMA GUI
	aspect base{
		draw circle(10) color:#blue;
	}
}

// Define a experiment to visualize in GUI
experiment CityScope type: gui autorun:false{
	output {
		display map_mode type:opengl background:#black{	
			species brix aspect:base;
			species people aspect:base position:{0,0,0.1};
		}
	}
}
```


<!-- Agents that randomly move on road network.
1) Pull road network from OSM
2) Place agents in network and make them move randomly. -->

