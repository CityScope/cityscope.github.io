---
id: Tutorial
---
# Tutorial

## Basics of building a CityScope indicator

Let’s get to it. First, what table are you building for? If you don’t have a specific table, that is totally okay and you can create one [here](https://cityscope.media.mit.edu/CS_cityscopeJS/). Note: by the time you read this, CityScope might pose some limitations on new projects (`tables`). Please follow instructions in the link above.
For this tutorial, we crated one called `dungeonmaster`.

After creating a table, open the frond end given by the tool and edit the table at least once. Change some blocks, and push those changes to CityIO.

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

## Let’s talk data (input)

What is `geogrid_data`?
Every time we create a CityScope table, we define a regularly spaced grid which is overlaid on the city district we’re modelling. These grid cells are the basic unit of analysis for the CityScope modules. Every grid cell has properties such as the `Type` which represents the land use and `Height` which represents the number of floors. These data are dynamic and are updated each time a user interacts with the CityScope table, experimenting with the spatial organisation of land uses and infrastructure. These dynamic data are stored the variable geogrid_data. This is a list of ojects: one for each grid cell in the CityScope table. The contents of each object really depends on the specific table you are building for and on the properties assigned to your indicator. There are two options that will control what geogrid_data contains which are: `brix.Indicator.requires_geometry` and `brix.Indicator.requires_geogrid_props`. These two properties are set to `False` by default, but you can change them inside the `brix.Indicator.setup()` function depending on the needs of your indicator.

Go ahead, take a look at how this object looks like by instantiating your class and linking it to a table:

```
I = MyIndicator()
I.link_table('dungeonmaster')
I.get_geogrid_data()
```

Bear in mind that the endpoint `GEOGRIDDATA` is created only after your first edit to the table. If you just created your table, you need to go to the front end and edit the table at least once for `GEOGRIDDATA` to show up.

Please note that the `brix.Indicator.link_table()` should only be used when developing the indicator. For deployment, we’ll use the `brix.Handler` class that is more efficient. You can also skip the `brix.Indicator.link_table()` step by defining the `Indicator.table_name='dungeonmaster'` property in your `setup` function. You will also notice that as you change the `brix.Indicator.requires_geometry` and `brix.Indicator.requires_geogrid_props` parameters in `setup`, the output of `brix.Indicator.get_geogrid_data()` will change.

If you are testing and are curious how `geogrid_data` would look like if you set `requires_geometry=True`, you can pass the argument to `get_geogrid_data`:

```
I.get_geogrid_data(include_geometries=True)
```

Please note that `geogrid_data` behaves very much like a list, but it is not a list. It belongs to the class `brix.GEOGRIDDATA`, which is an extension of a list to include additional functions and properties related to the table. For example, you can get the meta-properties of the table (such as type definitions, location, etc.) by using `brix.GEOGRIDDATA.get_geogrid_props()`. This is useful if, for example, you are interested in counting the total number of block types, including those that are not currently on the table. Run the following example to see how geogrid_props looks like:

```
geogrid_data = I.get_geogrid_data()
geogrid_data.get_geogrid_props()
```

Depending on the needs of your indicator, you can generate different views of this object. For example, you can use `brix.GEOGRIDDATA.as_df()` to return the pandas.DataFrame version of your object. Similarly, you can use `brix.GEOGRIDDATA.as_graph()` to return the networkx.Graph representation of GEOGRIDDATA. The graph representation is the network connecting every cell to its 4 closest neighbors.

## Build and test your indicator (output)

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

