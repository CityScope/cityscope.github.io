---
id: Tutorial
---
# Tutorial

## Basics of building a CityScope indicator

Let’s get to it. First, what table are you building for? If you don’t have a specific table, that is totally okay and you can create one [here](https://cityscope.media.mit.edu/CS_cityscopeJS/#/editor). Note: by the time you read this, CityScope might pose some limitations on new projects (`tables`). Please follow instructions in the link above.
For this tutorial, we crated one called `dungeonmaster`.

After creating a table, open the frond end given by the tool and edit the table at least once. Change some blocks, and push those changes to CityIO.

An indicator will take in data and produce a result. Depending on the type of indicator you are building, the result can be a number, a heatmap, an annotation, or a complex simulation of agents moving around the screen. If you are building a very complex module, your indicator might return all of the above. Each new indicator is built as an subclass of the `brix.Indicator` class provided in this library. Make sure you define three functions: `brix.Indicator.setup()`, `brix.Indicator.load_module()`, and `brix.Indicator.return_indicator()`. Here’s a barebones example of an indicator:

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
                All data loading actions should go here.
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

## Let’s talk data (input)

What is `geogrid_data`?
Every time we create a CityScope table, we define a regularly spaced grid which is overlaid on the city district we’re modelling. These grid cells are the basic unit of analysis for the CityScope modules. Every grid cell has properties such as the `Type` which represents the land use and `Height` which represents the number of floors. These data are dynamic and are updated each time a user interacts with the CityScope table, experimenting with the spatial organisation of land uses and infrastructure. These dynamic data are stored the variable geogrid_data. This is a list of ojects: one for each grid cell in the CityScope table. The contents of each object really depends on the specific table you are building for and on the properties assigned to your indicator. There are two options that will control what geogrid_data contains which are: `brix.Indicator.requires_geometry` and `brix.Indicator.requires_geogrid_props`. These two properties are set to `False` by default, but you can change them inside the `brix.Indicator.setup()` function depending on the needs of your indicator.

To access `geogrid_data` you will need to instantiate a `brix.Handler` object that will handle all communication with the table. Go ahead, take a look at how this object looks like by creating a `brix.Handler` and linking it to a table:

```
from brix import Handler
H = Handler('dungeonmaster',quietly=False)
H.get_geogrid_data()
```

By default, each `brix.Handler` is set to work quietly in the background. If you wish to get feedback on what your Handler is doing, you can set `quietly=False` when you create your Handler. This is useful for debugging.

Bear in mind that the endpoint `GEOGRIDDATA` is created only after your first edit to the table. If you just created your table, you need to go to the front end and edit the table at least once for `GEOGRIDDATA` to show up.

The function `brix.Handler.get_geogrid_data()` accepts to optional keyword arguments `include_geometries` and `with_properties`. These arguments correspond to `brix.Indicator.requires_geometry` and `brix.Indicator.requires_geogrid_props` parameters defined in the Indicator `setup` function. For example, if `requires_geogrid_props=True` in the setup, and the Indicator is linked to the table, the Handler will know to return `geogrid_data` with `with_properties=True`.

Go ahead and see how `geogrid_data` would look like if you set `requires_geometry=True`:

```
H.get_geogrid_data(include_geometries=True)
```

Please note that `geogrid_data` behaves very much like a list of dictionaries, but it is not a list. It belongs to the class `brix.GEOGRIDDATA`, which is an extension of a list to include additional functions and properties related to the table. For example, you can get the meta-properties of the table (such as type definitions, location, etc.) by using `brix.GEOGRIDDATA.get_geogrid_props()`. This is useful if, for example, you are interested in counting the total number of block types, including those that are not currently on the table. Run the following example to see how geogrid_props looks like:

```
geogrid_data = H.get_geogrid_data()
geogrid_data.get_geogrid_props()
```

Depending on the needs of your indicator, you can generate different views of this object. For example, you can use `brix.GEOGRIDDATA.as_df()` to return the pandas.DataFrame version of your object. Similarly, you can use `brix.GEOGRIDDATA.as_graph()` to return the networkx.Graph representation of GEOGRIDDATA. The graph representation is the network connecting every cell to its 4 closest neighbors.

Try seeing your `geogrid_data` as a pandas.DataFrame:

```
geogrid_data = H.get_geogrid_data()
geogrid_data.as_df()
```

Additionally, you can remove non-interactive cells from `geogrid_data` by using `brix.GEOGRIDDATA.remove_noninteractive()` and get the table bounds by using `brix.GEOGRIDDATA.bounds()`.

The following example gets a grid, remove all non interactive cells and transforms it to a dataframe:

```
from brix import Handler
H = Handler('dungeonmaster')
geogrid_data = H.get_geogrid_data()
geogrid_data = geogrid_data.remove_noninteractive()
geogrid_data.as_df()
```

## Build and test your indicator (output)

This library ensures that you can focus on what you do best: writing a kick ass `brix.Indicator.return_indicator()` function that will make everyone’s urban planning life better.

To recap, an indicator is build by defining at least a `brix.Indicator.setup()` function that takes care of configuring the indicator and a `brix.Indicator.return_indicator()` that will calculate the value of the indicator for a given `geogrid_data`.

Here’s an example of simple `brix.Indicator.setup()` and `brix.Indicator.return_indicator()` functions for a numeric indicator:

```
def setup(self):
        self.name = 'My numeric indicator'
        self.indicator_type = 'numeric'
        self.viz_type = 'radar'

def return_indicator(self,geogrid_data):
        return 1
```

To test your `brix.Indicator.return_indicator()` function while debugging it, you can use the object returned by `brix.Handler.get_geogrid_data()`:

```
H = Handler('dungeonmaster')
geogrid_data = H.get_geogrid_data()
I.return_indicator(geogrid_data)
```

Brix distinguish between four different types of indicators defined using the attribute `brix.Indicator.indicator_type` defined in `brix.Indicator.setup()`: `numeric`, `heatmap`, `textual`, and `hybrid`.

`indicator_type='numeric'` is the default and refers to a simple numeric indicator (e.g. average, density, diversity, etc.). When defining a numeric indicator, there are multiple ways in which the front end can display them (e.g. bar chart, radar plot, etc.). This is controlled by the `brix.Indicator.viz_type` attribute, also defined in the `brix.Indicator.setup()`. The default value is set to `self.viz_type=radar` which means that unless it is specified otherwise, all numeric indicators will be added to the radar plot. For a `numeric` indicator, the `brix.Indicator.return_indicator()` function can simply return a number or a list of numbers, all of which will be added to the same front end visualization (e.g. all bar charts, all radar numbers). If you want to have more fine control of where each indicator is displayed, we recommend building your `brix.Indicator.return_indicator()` function such that it returns a dictionary with the following structure:

```
[
        {'name': 'Social Wellbeing', 'value': 0.3, 'viz_type': 'radar'},
        {'name': 'Environmental Impact', 'value': 0.1, 'viz_type': 'radar'},
        {'name': 'Mobility Impact', 'value': 0.5, 'viz_type': 'bar'}
]
```

Note that if you define `viz_type` in the return dictionary of `return_indicator`, it will overwrite any default property defined in `brix.Indicator.setup()`.

`indicator_type='heatmap'` refers to a heatmap indicator that will be displayed not in a chart but projected directly on the table (e.g. density, traffic congestion, etc.). For a `heatmap` indicator, the `brix.Indicator.return_indicator()` function should return a geojson of points with attributes, or a geopandas.GeoDataFrame also with points and attributes. This type of indicator is a bit more complicated to build and will often require knowledge of spatial analytics. See the examples if you are interested.

`indicator_type='textual'` refers to an indicator that is displayed as a text annotation in one of the cells. This can be used to highlight something important about that cell to the front end user. For a `textual` indicator, the `brix.Indicator.return_indicator()` function should return a list of dictionaries, each with two keys, `id` that identified the cell to annotate, and `info` with a string that will be projected over that cell in the front end. Here’s an example of a list that annotated cell `450` with `yes!` and cell `40` with `no!`:

```
[{
        "id": 450,
        "info": "yes!"
},{
        "id": 40,
        "info": "no!"
}]
```

Finally, `indicator_type='hybrid'` is used when building a very complex module that returns information to be displayed in multiple different formats. Think of a complex energy usage simulation that will display the total energy consumed as bar in the bar chart, that will show the energy used by each cell projected on the table as a heatmap, and that might annotate some cells when they do not have enough energy available to them. For a `hybrid` indicators, you have two ways of organization your code. You can define your own `brix.Indicator.return_indicator()` function, or you can define specific functions for each of the available types of indicators: `brix.Indicator.return_indicator_numeric()`, `brix.Indicator.return_indicator_heatmap()`, and `brix.Indicator.return_indicator_textual()`. If you do not define a `brix.Indicator.return_indicator()` function, brix will run first the heatmap, then the numeric indicator, and finally the textual indicator. If you chose to have tighter control of the order in which the simulation runs, you can also define your own `brix.Indicator.return_indicator()` by calling these three functions. This function should return a dictionary with three keys: `heatmap`, `numeric`, and `textual`. Not all three keys have to be present. See the example below:

```
def return_indicator(self, geogrid_data):
out = {}
out['heatmap'] = self.return_indicator_heatmap(geogrid_data)
out['numeric'] = self.return_indicator_numeric(geogrid_data)
out['textual'] = self.return_indicator_textual(geogrid_data)
return out
```

## Deploy your indicator

Finally, once you have build a series of indicators, the right way to deploy them is to use the `brix.Handler` class. A `brix.Handler` object should be the go-to connection to the table and will handle all possible exceptions. The two most important methods are `brix.Handler.add_indicators()` which takes a list of `brix.Indicator` objects and connects them to the table, and `brix.Handler.listen()` that is a method that runs continuously waiting for updates in the CityScope table. This method can also creates its own thread, to free up the main thread in case the user needs to connect to other tables (by setting `new_thread=True`). The example below assumes you have already defined indicators named Density, Diversity and Proximity in a file named `myindicators.py`.

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

## Additional tools

This module also contains a set of other useful functions that integrate with `brix.Handler` and `brix.Indicator`.

The functions `brix.get_OSM_geometries()` and `brix.get_OSM_nodes()` help you get data from Open Street Maps for your table.

### Auto-updates of GEOGRIDDATA

Brix also has the capability of automatically updating GEOGRIDDATA. For simple one-time updates, follow the documentation of `brix.Handler.update_geogrid_data()`. To use this feeature, you first need to define a function that takes a `brix.GEOGRIDDATA` as an input. When used with `brix.Handler.update_geogrid_data()`, this function can take any number of keyword arguments. The following example raises the height of all cells by 3 units:

```
def add_height(geogrid_data, levels=1):
        for cell in geogrid_data:
                cell['height'] += levels
        return geogrid_data

H = Handler('dungeonmaster', quietly=False)
H.update_geogrid_data(add_height,levels=3)
```

Brix also supports GEOGRIDDATA updates everytime there is a registered user interaction in the front end. To add a function to the update schedule, use `brix.Handler.add_geogrid_data_update_function()`. This has the limitation that your update funcion cannot take in any arguments other. If this limitation proves too restrictive, please submit an issue and we’ll consider pushing an update.

The following example updates the whole grid to Light Industrial use everytime there’s a user interaction:

```
def update_g(geogrid_data):
        for cell in geogrid_data:
                cell['name'] = 'Light Industrial'
        return geogrid_data

H = Handler(table_name,quietly=False)
H.add_geogrid_data_update_function(update_g)
H.listen()
```

The updates triggered by `brix.Handler.listen()` follow the following order:


1. get GEOGRIDDATA


2. run all GEOGRIDDATA updates using the result of 1 as input


3. get the new GEOGRIDDATA


4. update all indicators using the GEOGRIDDATA object resulting from 3

### Testing your module

To automatically test your module, this library provides the `brix.User` class that simulates the behavior of a user interacting with your grid. This user runs in its own new thread to free up your main thread so that you can keep wokring on your indicator.

The following example consists of a `brix.Handler` that contains a diversity `brix.Indicator` that reponds to the updates of the `brix.User`:

```
from brix import Handler
from brix.examples import Diversity
from brix.test_tools import User
table_name = 'dungeonmaster'
U = User(table_name)
H = Handler(table_name,quietly=False)
div = Diversity()
H.add_indicator(div)
U.start_user()
H.listen()
```

