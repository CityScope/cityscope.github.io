---
id: CS_Brix
---
# Brix

Brix is a python library for CityScope modules which handles communication with [City I/O](http://cityio.media.mit.edu/).

Full documentation can be found [here](https://cityscope.media.mit.edu/CS_Brix/).

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

## Tutorial

### Basics of building a CityScope indicator

Let’s get to it. First, what table are you building for? If you don’t have a specific table, that is totally okay and you can create one [here](https://cityscope.media.mit.edu/CS_cityscopeJS/). Note: by the time you read this, CityScope might pose some limitations on new projects (`tables`). Please follow instructions in the link above.
For this tutorial, we crated one called `dungeonmaster`.

An indicator will basically take in data, and produce a result. Each new indicator is built as an subclass of the `brix.Indicator` class provided in this library. Make sure you define three functions: `brix.Indicator.setup()`, `brix.Indicator.load_module()`, and `brix.Indicator.return_indicator()`. Here’s a barebones example of an indicator:

```
from brix import Indicator
class MyIndicator(Indicator):
        '''
        Write a description for your indicator here.
        '''
        def setup(self):
                '''
                Think of this as your __init__.
                Here you will define the properties of your indicator.
                Although there are no required properties, be nice and give your indicator a name.
                '''
                self.name = 'Alfonso'

        def load_module(self):
                '''
                This function is not strictly necessary, but we recommend that you define it if you want to load something from memory. It will make your code more readable.
                '''
                pass

        def return_indicator(self, geogrid_data):
                '''
                This is the main course of your indicator.
                This function takes in `geogrid_data` and returns the value of your indicator.
                The library is flexible enough to handle indicators that return a number or a dictionary.
                '''
                return 1
```

### Let’s talk data (input)

What is `geogrid_data`?
Every time we create a CityScope table, we define a regularly spaced grid which is overlaid on the city district we’re modelling. These grid cells are the basic unit of analysis for the CityScope modules. Every grid cell has properties such as the `Type` which represents the land use and `Height` which represents the number of floors. These data are dynamic and are updated each time a user interacts with the CityScope table, experimenting with the spatial organisation of land uses and infrastructure. These dynamic data are stored the variable geogrid_data. This is a list of ojects: one for each grid cell in the CityScope table. The contents of each object really depends on the specific table you are building for and on the properties assigned to your indicator. There are two options that will control what geogrid_data contains which are: `brix.Indicator.requires_geometry` and `brix.Indicator.requires_geogrid_props`. These two properties are set to `False` by default, but you can change them inside the `brix.Indicator.setup()` function depending on the needs of your indicator.

Go ahead, take a look at how this object looks like by instantiating your class and linking it to a table:

```
I = MyIndicator()
I.link_table('dungeonmaster')
I.get_geogrid_data()
```

Please note that the `brix.Indicator.link_table()` should only be used when developing the indicator. For deployment, we’ll use the `brix.Handler` class that is more efficient. You can also skip the `brix.Indicator.link_table()` step by defining the `Indicator.table_name='dungeonmaster'` property in your `setup` function. You will also notice that as you change the `brix.Indicator.requires_geometry` and `brix.Indicator.requires_geogrid_props` parameters in `setup`, the output of `brix.Indicator.get_geogrid_data()` will change.

If you are testing and are curious how `geogrid_data` would look like if you set `requires_geometry=True`, you can pass the argument to `get_geogrid_data`:

```
I.get_geogrid_data(include_geometries=True)
```

### Build and test your indicator (output)

This library ensures that you can focus on what you do best: writing a kick ass `brix.Indicator.return_indicator()` function that will make everyone’s urban planning life better.

To test your function while debugging it, you can use the object returned by `brix.Indicator.get_geogrid_data()`:

```
geogrid_data = I.get_geogrid_data()
I.return_indicator(geogrid_data)
```

The property `brix.Indicator.indicator_type` will toggle between a Heatmap indicator or a numeric indicator (`numeric` for nueric and `heatmap` for heatmap).

For numeric indicators, there are multiple ways in which the front end can display them (e.g. bar chart, radar plot, etc.). This is controlled by the `brix.Indicator.viz_type` property of the class. The default value is set to `self.viz_type=radar` which means that unless it is specified otherwise, all numeric indicators will be added to the radar plot. When building an indicator that returns a single number you can just change the value of this parameter in the `brix.Indicator.setup()`. When building an indicator that returns multiple numbers it will just assume every number should be displayed in the same front end visualization. If you want to have more fine control of where each indicator is displayed, we recommend building your return_indicator function such that it returns a dictionary with the following structure:

```
{
        'name': 'Social Wellbeing',
        'value': random.random(),
        'viz_type': 'bar'
}
```

Note that if you define `viz_type` in the return dictionary of `return_indicator`, it will overwrite any default property defined in `setup`. Remember that your `return_indicator` function can also return a list of indicators. In the following example of a return value for the `return_indicator` function, the indicator returns two numbers that should be displayed in the radar plot, and one to be displayed as a bar chart.

```
[
        {'name': 'Social Wellbeing', 'value': 0.3, 'viz_type': 'radar'},
        {'name': 'Environmental Impact', 'value': 0.1, 'viz_type': 'radar'},
        {'name': 'Mobility Impact', 'value': 0.5, 'viz_type': 'bar'}
]
```

### Deploy your indicator

Finally, once you have build a series of indicators, the right way to deploy them is to use the `brix.Handler` class. A `brix.Handler` object should be the go-to connection to the table and will handle all possible exceptions. The two most important methods are `brix.Handler.add_indicators()` which takes a list of `brix.Indicator` objects and connects them to the table, and `brix.Handler.listen()` that is a method that runs continuously waiting for updates in the CityScope table. The example below assumes you have already defined indicators named Density, Diversity and Proximity in a file named `myindicators.py`.

```
from brix import Handler
from myindicators import Density, Diversity, Proximity

dens = Density()
divs = Diversity()
prox = Proximity()

H = Handler('dungeonmaster', quietly=False)
H.add_indicators([
        dens,
        divs,
        prox
])
H.listen()
```

To see the indicators in the handler you can use `H.list_indicators()` to list the indicator names, and use `H.return_indicator(<indicator_name>)` to see the value of the indicator. Finally, the function `H.update_package()` will return the data that will be posted on CityIO.


# Classes

## Handler class

## Indicator class

## Indicator sub-classes
