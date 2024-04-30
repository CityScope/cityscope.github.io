---
id: Tutorial
---
# Tutorials

This module also contains a set of other useful functions that integrate with `brix.Handler` and `brix.Indicator`.

The functions `brix.get_OSM_geometries()` and `brix.get_OSM_nodes()` help you get data from Open Street Maps for your table.

## Auto-updates of GEOGRIDDATA

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

## Creating a table from python

Brix provides a class for creating spatial grids for CityScope projects: `brix.Grid_maker` a subclass of `brix.Handler`.

For most use cases, you will create your table using the web-app editor found [here](https://cityscope.media.mit.edu/CS_cityscopeJS/#/editor). For more complex projects, you might need to create your own table from an existing dataset. For example, you might want to select the grid area using a polygon defined in a shapefile. The tools we highlight here can be use for this purpose.

The first step is to instantiate the class by defining the location of your table and its name. The lat,lon provided to the `brix.Grid_maker` constructor correspond to the top left corner of the grid (North-West).

```
from brix import Grid_maker
table_name = 'dungeonmaster'
lat,lon = 42.361875, -71.105713
G = Grid_maker(table_name, lat, lon)
```

If the table already exists, you can either use `brix.Handler.delete_table()` to delete it or wait to be prompted if you want to rewrite it. You can check if the table exists by using `brix.Handler.is_table()`. Please note that since `brix.Grid_maker` is a subclass of `brix.Handler`, most functions available for a `brix.Handler` object are also available for a `brix.Grid_maker` object. The table constructor also allows you to specify the cell_size, the nrows and ncols, as well as other parameters.

Once the grid maker object has been instatiated, we set the grid by running `brix.Grid_maker.set_grid_geojson()`:

```
G.set_grid_geojson()
```

This will create the geojson that will be posted to CityIO to create the table. You can check the object by using `brix.Grid_maker.get_grid_geojson()`.

The next step is to define the cell types that the user will be able to choose frorm. Defining the necessary types and the properties of each type is a very complex process that involves data collection and analysis as well as community engagement and simulation that is beyond the scope of this tutorial. The default table created with the Grid constructor only contains a simple type called Default. To see this, you can use `brix.Grid_maker.grid_types()`. If you wish to change this, you can use `brix.Grid_maker.edit_types()`. This function will either take a json-like object (dict of dicts) with the name of the type as the key, or a list of names of types that will be automatically completed with default values. Once the types have been defined, they can be expressed in the following way, adding as many properties as needed by your table:

```
{
        'Default': {
                'color': [0, 0, 0],
                'height': 0,
                'interactive': 'Web',
                ...
        },
        ...
}
```

The bare minimum properties that need to be defined are color, height, and interactive. If not provided, brix will assign them automatically.

The following line of code replaces the Default type by there other cell types callsed Type 1, Type 2, and Type 3, letting brix assign the color to each of them.

```
G.edit_types(['Type 1','Type 2','Type 3'])
```

For most applications, you will want to turn off some of the cells and make them non-interactive. Usually, this will involve a shapefile or a geojson that contains the polygon that defines the interactive part of the table. If you have a Shapely polygon stored in poly you can set the non-interactive cells by using `brix.Grid_maker.set_noninteractive()`:

```
G.set_noninteractive(poly)
```

The final step is to commit the grid to CityIO. Use `brix.Grid_maker.commit_grid()`:

```
G.commit_grid()
```

Putting it all together:

```
from brix import Grid_maker
table_name = 'dungeonmaster'
lat,lon = 42.361875, -71.105713
G = Grid_maker(table_name, lat, lon)
G.set_grid_geojson()
G.edit_types(['Type 1','Type 2','Type 3'])
G.set_noninteractive(poly)
G.commit_grid()
```

Alternatively, you can use poly as an argument to `brix.grid_from_poly()`. This function will calculate the location and the cell size based on the given polygon, and set the non-interactive parts. The following block of code achieves the same as the block above:

```
from brix import Grid_maker, grid_from_poly
table_name = 'dungeonmaster'
G = grid_from_poly(table_name, poly)
G.edit_types(['Type 1','Type 2','Type 3'])
G.commit_grid()
```

## Testing your module

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

