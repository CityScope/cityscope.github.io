---
id: Brix
---
Brix is a python library for CityScope modules which handles communication with [City I/O](http://cityio.media.mit.edu/).

Full documentation can be found [here](https://cityscope.media.mit.edu/CS_Brix/).

# Introduction

What is this library for? If you have never heard of a CityScope before, you might want to stop reading and learn about them [here](https://cityscope.media.mit.edu/). CityScope is an awesome way to interact, explore, and co-create urban interventions in a way that can be accessed by multiple people with different background. If you know what they are, please keep reading.

What is a CityScope table? a ‘table’ is our way of describing a CityScope project. Why table then? Since historically, most CityScope instances were composed of a mesh between a physical table-top 3D model of a city, augmented with projections, software, and other interface hardware. So a table => project.

What is an indicator? An indicator is the result of running a module for CityScope. Indicators work by listening for updated from the CityScope table they are linked to, calculating some values by using a model, some function of the data, or a simulation, and then post the result of the calculations to CityIO to be displayed in the table.

What are the types of indicators you can build? Indicators can be anything that could be displayed on a CityScope table, including the supporting screens associated to it. For the purpose of this library, we distinguish three types of indicator: numeric, heatmap, simulation.


* Numeric: Numeric indicators are just a number or set of numbers. They are usually displayed in a chart (bar chart, radar chart, etc) next to the table. The most common numeric indicator are the numbers that go in the radar plot, which display information about density, diversity, and proximity.


* Heatmap: These indicators are geodata. They are made up of geometries (points, lines, or polygons) and properties associated to them. These indicators are displayed as layers directly on the CityScope table.


* Simulation: These type of indicators are also displayed on the table but they are the result of an agent based simulation and are therefore displayed as a dynamic layer. They change over time like a short movie. These are not yet supported by this library.

# Installation

Brix is now on pip. Just do:

```
pip install cs-brix
```

# Tutorial

## Basics of building a CityScope indicator

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

## Let’s talk data (input)

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

Finally, once you have build a series of indicators, the right way to deploy them is to use the `brix.Handler` class. A `brix.Handler` object should be the go-to connection to the table and will handle all possible exceptions. The two most important methods are `brix.Handler.add_indicators()` which takes a list of `brix.Indicator` objects and connects them to the table, and `brix.Handler.listen()` that is a method that runs continuously waiting for updates in the CityScope table. This method creates its own thread by default, to free up the main thread in case the user needs to connect to other tables. The example below assumes you have already defined indicators named Density, Diversity and Proximity in a file named `myindicators.py`.

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


### class brix.Handler(table_name, GEOGRIDDATA_varname='GEOGRIDDATA', GEOGRID_varname='GEOGRID', quietly=True, host_mode='remote', reference=None)
Class to handle the connection for indicators built based on data from the GEOGRID. To use, instantiate the class and use the `add_indicator()` method to pass it a set of `Indicator` objects.


* **Parameters**

    
    * **table_name** (*str*) – Table name to lisen to.
    [https://cityio.media.mit.edu/api/table/table_name](https://cityio.media.mit.edu/api/table/table_name)


    * **GEOGRIDDATA_varname** (str, defaults to GEOGRIDDATA) – Name of geogrid-data variable in the table API.
    The object located at:
    [https://cityio.media.mit.edu/api/table/table_name/GEOGRIDDATA_varname](https://cityio.media.mit.edu/api/table/table_name/GEOGRIDDATA_varname)
    will be used as input for the return_indicator function in each indicator class.


    * **GEOGRID_varname** (str, defaults to GEOGRID) – Name of variable with geometries.


    * **quietly** (boolean, defaults to True) – If True, it will show the status of every API call.


    * **reference** (*dict**, **optional*) – Dictionary for reference values for each indicator.



#### add_indicator(I, test=True)
Adds indicator to handler object.


* **Parameters**

    
    * **I** (`brix.Indicator`) – Indicator object to handle. If indicator has name, this will use as identifier. If indicator has no name, it will generate an identifier.


    * **test** (boolean, defaults to True) – If True it will ensure the indicator runs before adding it to the `brix.Handler`.



#### add_indicators(indicator_list, test=True)
Same as `brix.Handler.add_indicator()` but it takes in a list of `brix.Indicator` objects.


* **Parameters**

    **indicator_list** (*list*) – List of `brix.Indicator` objects.



#### check_table(return_value=False)
Prints the front end url for the table.


* **Parameters**

    **return_value** (boolean, defaults to False) – If True it will print and return the front end url.



* **Returns**

    **front_end_url** – Onlye if return_value=True.



* **Return type**

    str



#### clear_table()
Clears all indicators from the table.


#### property daemon()
A boolean value indicating whether this thread is a daemon thread.

This must be set before start() is called, otherwise RuntimeError is
raised. Its initial value is inherited from the creating thread; the
main thread is not a daemon thread and therefore all threads created in
the main thread default to daemon = False.

The entire Python program exits when only daemon threads are left.


#### getName()

#### get_geogrid_data(include_geometries=False, with_properties=False, as_df=False)
Returns the geogrid data from:
[http://cityio.media.mit.edu/api/table/table_name/GEOGRIDDATA](http://cityio.media.mit.edu/api/table/table_name/GEOGRIDDATA)


* **Parameters**

    
    * **include_geometries** (boolean, defaults to False) – If True it will also add the geometry information for each grid unit.


    * **as_df** (boolean, defaults to False) – If True it will return data as a pandas.DataFrame.



* **Returns**

    **geogrid_data** – Data taken directly from the table to be used as input for `brix.Indicator.return_indicator`.



* **Return type**

    dict



#### get_geogrid_props()
Gets the GEOGRID properties defined for the table. These properties are not dynamic and include things such as the NAICS and LBCS composition of each lego type.


* **Returns**

    **geogrid_props** – Table GEOGRID properties.



* **Return type**

    dict



#### get_grid_hash()
Retreives the GEOGRID hash from:
[http://cityio.media.mit.edu/api/table/table_name/meta/hashes](http://cityio.media.mit.edu/api/table/table_name/meta/hashes)


#### get_indicator_values(include_composite=False)
Returns the current values of numeric indicators. Used for developing a composite indicator.


* **Parameters**

    **include_composite** (boolean, defaults to False) – If True it will also include the composite indicators, using the `brix.Indicator` is_composite parameter.



* **Returns**

    **indicator_values** – Dictionary with values for each indicator formatted as: `{indicator_name: indicator_value, ...}`



* **Return type**

    dict



#### get_table_properties()
Gets table properties. This info can also be accessed through `brix.Handler.get_geogrid_props()`.


#### property ident()
Thread identifier of this thread or None if it has not been started.

This is a nonzero integer. See the get_ident() function. Thread
identifiers may be recycled when a thread exits and another thread is
created. The identifier is available even after the thread has exited.


#### indicator(name)
Returns the `brix.Indicator` with the given name.


* **Parameters**

    **name** (*str*) – Name of the indicator. See `brix.Handler.list_indicators()`.



* **Returns**

    **selected_indicator** – Selected indicator object.



* **Return type**

    `brix.Indicator`



#### isAlive()
Return whether the thread is alive.

This method is deprecated, use is_alive() instead.


#### isDaemon()

#### is_alive()
Return whether the thread is alive.

This method returns True just before the run() method starts until just
after the run() method terminates. The module function enumerate()
returns a list of all alive threads.


#### join(timeout=None)
Wait until the thread terminates.

This blocks the calling thread until the thread whose join() method is
called terminates – either normally or through an unhandled exception
or until the optional timeout occurs.

When the timeout argument is present and not None, it should be a
floating point number specifying a timeout for the operation in seconds
(or fractions thereof). As join() always returns None, you must call
is_alive() after join() to decide whether a timeout happened – if the
thread is still alive, the join() call timed out.

When the timeout argument is not present or None, the operation will
block until the thread terminates.

A thread can be join()ed many times.

join() raises a RuntimeError if an attempt is made to join the current
thread as that would cause a deadlock. It is also an error to join() a
thread before it has been started and attempts to do so raises the same
exception.


#### list_indicators()
Returns list of all indicator names.


* **Returns**

    **indicators_names** – List of indicator names.



* **Return type**

    list



#### listen(new_thread=True, showFront=True, append=False)
Listens for changes in the table’s geogrid and update all indicators accordingly.
You can use the update_package method to see the object that will be posted to the table.
This method starts with an update before listening.
This runs in a separate thread by default.


* **Parameters**

    
    * **new_thread** (boolean, defaults to True.) – If True it will run in a separate thread, freeing up the main thread for other tables.
    We recommend setting this to False when debugging, to avoid needed to recreate the object.


    * **showFront** (boolean, defaults to True) – If True it will open the front-end URL in a webbrowser at start.
    Only works if new_tread=False.


    * **append** (boolean, defaults to False) – If True it will append the new indicators to whatever is already there.
    This option will be deprecated soon. We recommend not using it unless strictly necessary.



#### property name()
A string used for identification purposes only.

It has no semantics. Multiple threads may be given the same name. The
initial name is set by the constructor.


#### property native_id()
Native integral thread ID of this thread, or None if it has not been started.

This is a non-negative integer. See the get_native_id() function.
This represents the Thread ID as reported by the kernel.


#### perform_update(grid_hash_id=None, append=True)
Performs single table update.


* **Parameters**

    
    * **grid_hash_id** (*str**, **optional*) – Current grid hash id. If not provided, it will retrieve it.


    * **append** (boolean, defaults to True) – If True, it will append the new indicators to whatever is already there.



#### return_indicator(indicator_name)
Returns the value returned by `brix.Indicator.return_indicator()` function of the selected indicator.


* **Parameters**

    **indicator_name** (*str*) – Name or identifier of the indicator. See `brix.Handler.list_indicators()`



* **Returns**

    **indicator_value** – Result of `brix.Indicator.return_indicator()` function for the selected indicator.



* **Return type**

    dict or float



#### rollback()
`brix.Handler` keeps track of the previous value of the indicators and access values.This function rollsback the current values to whatever the locally stored values are.
See also `brix.Handler.previous_indicators()` and `brix.Handler.previous_access()`.


#### run()
Run method to be called by `threading.Thread.start()`.
It runs `brix.Handler._listen()`.


#### see_current(indicator_type='numeric')
Returns the current values of the indicators posted for the table.


* **Parameters**

    **indicator_type** (str, defaults to numeric) – Type of the indicator. Choose either numeric, access, or heatmap (access and heatmap refer to the same type).



* **Returns**

    **current_status** – Current value of selected indicators.



* **Return type**

    dict



#### setDaemon(daemonic)

#### setName(name)

#### start()
Start the thread’s activity.

It must be called at most once per thread object. It arranges for the
object’s run() method to be invoked in a separate thread of control.

This method will raise a RuntimeError if called more than once on the
same thread object.


#### test_indicators()
Dry run over all indicators.


#### update_package(geogrid_data=None, append=False)
Returns the package that will be posted in CityIO.


* **Parameters**

    
    * **geogrid_data** (*dict**, **optional*) – Result of `brix.Handler.get_geogrid_data()`. If not provided, it will be retrieved.


    * **append** (boolean, defaults to False) – If True, it will append the new indicators to whatever is already there.



* **Returns**

    **new_values** – Note that all heatmat indicators have been grouped into just one value.



* **Return type**

    list


## Indicator class


### class brix.Indicator(\*args, \*\*kwargs)
Parent class to build indicators from. To use, you need to define a subclass than inherets properties from this class. Doing so, ensures your indicator inherets the necessary methods and properties to connect with a CityScipe table.


#### get_geogrid_data(as_df=False, include_geometries=None, with_properties=None)
Returns the geogrid data from the linked table. Function mainly used for development. See `brix.Indicator.link_table()`. It returns the exact object that will be passed to return_indicator


* **Parameters**

    
    * **as_df** (boolean, defaults to False) – If True it will return data as a pandas.DataFrame.


    * **include_geometries** (boolean, defaults to `brix.Indicator.requires_geometry`) – If True, it will override the default parameter of the Indicator.


    * **with_properties** (boolean, defaults to `brix.Indicator.requires_geogrid_props`) – If True, it will override the default parameter of the Indicator.



* **Returns**

    **geogrid_data** – Data that will be passed to the `brix.Indicator.return_indicator()` function by the `brix.Handler` when deployed.



* **Return type**

    str or pandas.DataFrame



#### get_table_properties()
Gets table properties from the linked table. See `brix.Indicator.link_table()` and `brix.Handler.get_table_properties()`.


#### link_table(table_name)
Creates a `brix.Handler` and links the table to the indicator. This function should be used only for developing the indicator.


* **Parameters**

    **table_name** (str or `brix.Handler`) – Name of the table or Handler object.



#### load_module()
User defined function. Used to load any data necessary for the indicator to run. In principle, you could do everything using `brix.Indicator.setup()` but we encourage to separte data loading and module definition into two functions.


#### return_baseline(geogrid_data)
User defined function. Used to return a baseline value.
[This function might get deprecated]


#### return_indicator(geogrid_data)
User defined function. This function defines the value of the indicator as a function of the table state passed as geogrid_data. Function must return either a dictionary, a list, or a number. When returning a dict follow the format: `{'name': 'Indicator_NAME', 'value': 1.00}`.


* **Parameters**

    **geogrid_data** (*dict*) – Current state of the table. See `brix.Indicator.get_geogrid_data()` and `brix.Handler.get_geogrid_data()`. The content of this object will depend on the needs of the indicator. In particular, the values of `brix.Indicator.requires_geometry` and `brix.Indicator.requires_geogrid_props`.



* **Returns**

    **indicator_value** – Value of indicator or list of values. When returning a dict, please use the format `{'name': 'Indicator Name', 'value': indicator_value}`. When returning a list, please return a list of dictionaries in the same format.



* **Return type**

    list, dict, or float



#### setup()
User defined function. Used to set up the main attributed of the custom indicator. Acts similar to an __init__ method.

## Indicator sub-classes


### class brix.CompositeIndicator(\*args, \*\*kwargs)
Subclass used to define composite indicators. Composite indicators are functions of already defined indicators. By defining `brix.Indicator.setup()` and `brix.Indicator.return_indicator()`, this class allows you to define a composite indicator by just passing an aggregation function.


#### get_geogrid_data(as_df=False, include_geometries=None, with_properties=None)
Returns the geogrid data from the linked table. Function mainly used for development. See `brix.Indicator.link_table()`. It returns the exact object that will be passed to return_indicator


* **Parameters**

    
    * **as_df** (boolean, defaults to False) – If True it will return data as a pandas.DataFrame.


    * **include_geometries** (boolean, defaults to `brix.Indicator.requires_geometry`) – If True, it will override the default parameter of the Indicator.


    * **with_properties** (boolean, defaults to `brix.Indicator.requires_geogrid_props`) – If True, it will override the default parameter of the Indicator.



* **Returns**

    **geogrid_data** – Data that will be passed to the `brix.Indicator.return_indicator()` function by the `brix.Handler` when deployed.



* **Return type**

    str or pandas.DataFrame



#### get_table_properties()
Gets table properties from the linked table. See `brix.Indicator.link_table()` and `brix.Handler.get_table_properties()`.


#### link_table(table_name)
Creates a `brix.Handler` and links the table to the indicator. This function should be used only for developing the indicator.


* **Parameters**

    **table_name** (str or `brix.Handler`) – Name of the table or Handler object.



#### load_module()
User defined function. Used to load any data necessary for the indicator to run. In principle, you could do everything using `brix.Indicator.setup()` but we encourage to separte data loading and module definition into two functions.


#### return_baseline(geogrid_data)
User defined function. Used to return a baseline value.
[This function might get deprecated]


#### return_indicator(indicator_values)
Applies `brix.CompositeIndicator.compose_function` to the indicator values to return the composite indicator.


* **Parameters**

    **indicator_values** (*dict*) – Dictionary with indicator values. See `brix.Handler.get_indicator_values()`.



* **Returns**

    **indicator_values** – List of one indicator.



* **Return type**

    list



#### setup(compose_function, selected_indicators=[], \*args, \*\*kwargs)
Indicator setup. This function is called upon __init__ so user does not need to call it independently.


* **Parameters**

    
    * **compose_function** (*function*) – Function to aggregate values of selected indicators. The function should be build to accept a dictionary with indicator values. See `brix.Handler.get_indicator_values()`.


    * **selected_indicators** (*list**, **optional*) – List of indicators to use to aggregate.

