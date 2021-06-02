---
id: Classes
---
# Classes

## Handler class


### class brix.Handler(table_name, quietly=False, host_mode='remote', host_name=None, reference=None, shell_mode=False)
Class to handle the connection for indicators built based on data from the GEOGRID. To use, instantiate the class and use the `add_indicator()` method to pass it a set of `Indicator` objects.


* **Parameters**

    
    * **table_name** (*str*) – Table name to lisen to.
    [https://cityio.media.mit.edu/api/table/table_name](https://cityio.media.mit.edu/api/table/table_name)


    * **quietly** (boolean, defaults to False) – If True, it will show the status of every API call.


    * **host_mode** (*str**, **defaults to 'remote'*) – If ‘local’ it will use [http://127.0.0.1:5000/](http://127.0.0.1:5000/) as host.


    * **host_name** (*str**, **defaults to class remote_host*) – If passed, it will override the class host.


    * **reference** (*dict**, **optional*) – Dictionary for reference values for each indicator.


    * **shell_mode** (*Boolean**, **optional defaults to False*) – If True, it will not get the current hash when instantiating the class. Useful for testing.



#### GEOGRIDDATA_endpoint( = 'GEOGRIDDATA')

#### GEOGRID_endpoint( = 'GEOGRID')

#### add_geogrid_data_update_function(update_func)
Adds a function to update GEOGRIDDATA.

See `brix.Handler.update_geogrid_data()`.


* **Parameters**

    **update_func** (*function*) – Function to update the geogriddadata (list of dicts)
    Function should take a `brix.Handler` as the first and only positional argument.
    No keyword arguments are supported when using this feature.
    Function should return a list of dicts that represents a valid geogriddata object.



#### add_indicator(I, test=True)
Adds indicator to handler object.


* **Parameters**

    
    * **I** (`brix.Indicator`) – Indicator object to handle. If indicator has name, this will use as identifier. If indicator has no name, it will generate an identifier.


    * **test** (boolean, defaults to True) – If True it will ensure the indicator runs before adding it to the `brix.Handler`.



#### add_indicators(indicator_list, test=True)
Same as `brix.Handler.add_indicator()` but it takes in a list of `brix.Indicator` objects.


* **Parameters**

    **indicator_list** (*list*) – List of `brix.Indicator` objects.



#### classmethod all_indicator_instances()
Returns a generator with every indicator instance.


#### center_grid_view()
Sets the initial grid view to the center of the grid.


#### check_rest()
Checks if module should be put in resting mode


#### check_table(return_value=False)
Prints the front end url for the table.


* **Parameters**

    **return_value** (boolean, defaults to False) – If True it will print and return the front end url.



* **Returns**

    **front_end_url** – Onlye if return_value=True.



* **Return type**

    str



#### cityio_post_headers( = {'Content-Type': 'application/json'})

#### clear_endpoints()
Clears the table of all pre-existing numeric, heatmap, and textual indicators.


#### clear_table()
Clears all indicators from the table.


#### property daemon()
A boolean value indicating whether this thread is a daemon thread.

This must be set before start() is called, otherwise RuntimeError is
raised. Its initial value is inherited from the creating thread; the
main thread is not a daemon thread and therefore all threads created in
the main thread default to daemon = False.

The entire Python program exits when only daemon threads are left.


#### delete_table()
Deletes table if it exists.
Will prompt user to make sure this function was not run by mistake.


#### getName()

#### get_GEOGRID(force_get=False)
Returns geogrid object stored locally. If force_get=True, it will return remote object and overwrite local object.


* **Parameters**

    **force_get** (boolean, defaults to False) – If True it will GET request the geogrid object and overwrite the locally stored one.



#### get_GEOGRIDDATA()
Returns the raw GEOGRIDDATA object.
This function should be treated as a low-level function, please use `brix.Handler.get_geogrid_data()` instead.


#### get_GEOGRID_EDGES()
Gets the edges of a graph that connects each cell to its nearest neighbors.


* **Returns**

    **GEOGRID_EDGES** – Edge list of cell ids. Each cell has at most 4 neighbors.



* **Return type**

    list



#### get_geogrid_data(include_geometries=False, with_properties=False)
Returns the geogrid data from:
[http://cityio.media.mit.edu/api/table/table_name/GEOGRIDDATA](http://cityio.media.mit.edu/api/table/table_name/GEOGRIDDATA)


* **Parameters**

    
    * **include_geometries** (boolean, defaults to False) – If True it will also add the geometry information for each grid unit.


    * **with_properties** (boolean, defaults to False) – If True it will add the properties of each grid unit as defined when the table was constructed (e.g. LBCS code, NAICS code, etc.)



* **Returns**

    **geogrid_data** – Data taken directly from the table to be used as input for `brix.Indicator.return_indicator`.
    Object behaves as a list of dicts.



* **Return type**

    `brix.GEOGRIDDATA`



#### get_geogrid_props()
Gets the GEOGRID properties defined for the table. These properties are not dynamic and include things such as the NAICS and LBCS composition of each lego type.


* **Returns**

    **geogrid_props** – Table GEOGRID properties.



* **Return type**

    dict



#### get_grid_hash()
Retreives the GEOGRID hash from:
[http://cityio.media.mit.edu/api/table/table_name/meta/hashes](http://cityio.media.mit.edu/api/table/table_name/meta/hashes)


#### get_indicator_values(geogrid_data=None, include_composite=False)
Returns the current values of NUMERIC indicators. Used for developing a composite indicator.


* **Parameters**

    **include_composite** (boolean, defaults to False) – If True it will also include the composite indicators, using the `brix.Indicator` is_composite parameter.



* **Returns**

    **indicator_values** – Dictionary with values for each indicator formatted as: `{indicator_name: indicator_value, ...}`



* **Return type**

    dict



#### get_table_properties()
Gets table properties. This info can also be accessed through `brix.Handler.get_geogrid_props()`.


#### grid_bounds(bbox=False, buffer_percent=None)
Returns the bounds of the geogrid.
Wrapper around `brix.GEOGRIDDATA.bounds()`


* **Parameters**

    
    * **bbox** (*boolean**, **defaults to False*) – If True, it will return a bounding box instead of a polygon. [W, S, E, N]


    * **buffer_percent** (*float**, **optional*) – If given, this will add a buffer around the table.
    Size of buffer in units of the grid diameter
    See `brix.get_buffer_size()`.



* **Returns**

    **limit** – Bounds of the table. If bbox=True it will return a horizontal bounding box.



* **Return type**

    shapely.Polygon or list



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


#### is_table()
Checks it table exists by getting the base url.


* **Returns**

    **self.is_table** – True if table exists.



* **Return type**

    boolean



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


#### classmethod list_all_indicator_instances()
Returns a list with all indicator instances.


#### list_all_unlinked_indicators()
Returns the names of all the unlinked indicators.


* **Returns**

    **indicators_names** – List of indicator names.



* **Return type**

    list



#### list_indicators()
Returns list of all indicator names.


* **Returns**

    **indicators_names** – List of indicator names.



* **Return type**

    list



#### listen(new_thread=False, showFront=False, append=False, clear_endpoints=False, robust=False)
Listens for changes in the table’s geogrid and update all indicators accordingly.
You can use the update_package method to see the object that will be posted to the table.
This method starts with an update before listening.
Can run in a separate thread.
Does not support updating GEOGRIDDATA.


* **Parameters**

    
    * **new_thread** (boolean, defaults to False.) – If True it will run in a separate thread, freeing up the main thread for other tables.
    We recommend setting this to False when debugging, to avoid needing to recreate the object.


    * **showFront** (boolean, defaults to False) – If True it will open the front-end URL in a webbrowser at start.
    Only works if new_tread=False.


    * **append** (boolean, defaults to False) – If True it will append the new indicators to whatever is already there.
    This option will be deprecated soon. We recommend not using it unless strictly necessary.


    * **clear_endpoints** (boolean, defaults to False) – If True, it will clear all existing heatmap, numeric, and textual indicators.
    This is not recommended for deployment, only for testing.


    * **robust** (boolean, defaults to False) – If True, whenever a grid configuration breaks an indicator, the module will not stop, but rather wait until the grid changes and try to update again.
    Incompatible with new_thread=True



#### property name()
A string used for identification purposes only.

It has no semantics. Multiple threads may be given the same name. The
initial name is set by the constructor.


#### property native_id()
Native integral thread ID of this thread, or None if it has not been started.

This is a non-negative integer. See the get_native_id() function.
This represents the Thread ID as reported by the kernel.


#### normalize_codes(code_proportion)
Helper function to transform:
[{‘proportion’: 0.3, ‘use’: {‘6700’: 1}}, {‘proportion’: 0.7, ‘use’: {‘2310’: 0.3, ‘4100’: 0.7}}]

into:
{‘6700’: 0.3, ‘2310’: 0.21, ‘4100’: 0.49}


#### parse_classifications(geogrid)
Helper function to parse the LBCS and NAICS strings into dictionaries of the form:
{‘6700’: 0.3, ‘2310’: 0.21, ‘4100’: 0.49}


#### perform_geogrid_data_update(geogrid_data=None)
Performs GEOGRIDDATA update using the functions added to the `brix.Handler` using `brix.Hanlder.add_geogrid_data_update_function()`.

Returns True if an update happened, and Flase otherwise.

Any grid indicator will overrule any grid function.


#### perform_update(grid_hash_id=None, append=False, return_update_package=False)
Performs single table update.


* **Parameters**

    
    * **grid_hash_id** (*str**, **optional*) – Current grid hash id. If not provided, it will retrieve it.


    * **append** (boolean, defaults to True) – If True, it will append the new indicators to whatever is already there.


    * **return_update_package** (boolean, defaults to False) – If True this funciton will return the posted object.



#### post_geogrid_data(geogrid_data, override_verification=False)
Posts the given geogrid_data object, ensuring that the object is valid.

Function can be called by itself or using `brix.Handler.update_geogrid_data()`.


* **Parameters**

    
    * **geogrid_data** (*dict*) – Dictionary corresponding to a valid `brix.GEOGRIDDATA` object.


    * **override_verification** (boolean, defaults to False) – If True, it will override the verification of the input as a valid object.



#### remote_host( = 'https://cityio.media.mit.edu')

#### reset_geogrid_data(override_verification=True)
Resets the GEOGRIDDATA endpoint to the initial value.
If the GEOGRIDDATA has not been updated, this will update it.


* **Parameters**

    **override_verification** (boolean, defaults to True) – If True, it will ensure the object defined in GEOGRID/features is a valid GEOGRIDDATA object.
    If False, it will post the object in GEOGRID/features to GEOGRIDDATa without any verification.



#### return_indicator(indicator_name)
Returns the unformatted value returned by `brix.Indicator.return_indicator()` function of the selected indicator.


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

#### set_opacity(alpha, default_alpha=1)
Sets opacity values in GEOGRID.
To see updates in GEOGRIDDATA, reset GEOGRIDDATA using `brix.Handler.reset_geogrid_data()`.


* **Parameters**

    
    * **alpha** (*float** or **dict*) – Values of opacity between 0 and 1.
    If dict, use the types as keys and opacity as values.
    Non-specificed types will be set to default_alpha.
    If float, this will change the opacity for all types equally.


    * **default_alpha** (*float**, **defaults to 1*) – Opacity value to use when type not specified in alpha.



#### set_timezone()
Sets the time zone of the table based on its coordinates.
Useful for front end shadow simulation.


#### sleep_time()
Returns sleep time in seconds, handling whether the table is in rest_mode or not.


#### start()
Start the thread’s activity.

It must be called at most once per thread object. It arranges for the
object’s run() method to be invoked in a separate thread of control.

This method will raise a RuntimeError if called more than once on the
same thread object.


#### test_indicators()
Dry run over all indicators.


#### update_geogrid_data(update_func, geogrid_data=None, \*\*kwargs)
Function to update table GEOGRIDDATA.


* **Parameters**

    **update_func** (*function*) – Function to update the geogriddadata (list of dicts)
    Function should take a `brix.GEOGRIDDATA` as the first and only positional argument plus any number of keyword arguments.
    Function should return a list of dicts that represents a valid geogriddata object.


### Example

```python
>>> def add_height(get_geogrid_data, levels=1):
                for cell in geogrid_data:
                        cell['height'] += levels
                return geogrid_data
>>> levels = 3
>>> H = Handler('tablename', quietly=False)
>>> H.update_geogrid_data(add_height, levels=levels)
```


#### update_package(geogrid_data=None, append=False)
Returns the package that will be posted in CityIO.


* **Parameters**

    
    * **geogrid_data** (*dict**, **optional*) – Result of `brix.Handler.get_geogrid_data()`. If not provided, it will be retrieved.


    * **append** (boolean, defaults to False) – If True, it will append the new indicators to whatever is already there.



* **Returns**

    **new_values** – Note that all heatmat indicators have been grouped into just one value.



* **Return type**

    list



#### wake_up()
Turns off rest mode.

## Indicator class


### class brix.Indicator(\*args, \*\*kwargs)
Parent class to build indicators from. To use, you need to define a subclass than inherets properties from this class. Doing so, ensures your indicator inherets the necessary methods and properties to connect with a CityScipe table.


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



#### return_indicator_heatmap(geogrid_data)
Placeholder for user to define.


#### return_indicator_numeric(geogrid_data)
Placeholder for user to define.


#### return_indicator_textual(geogrid_data)
Placeholder for user to define.


#### set_return_indicator(return_indicator)
Used to set the return_indicator method by passing a function.


* **Parameters**

    **return_indicator** (*func*) – Function that takes geogrid_data as input.



#### setup()
User defined function. Used to set up the main attributed of the custom indicator. Acts similar to an __init__ method.

## GEOGRIDDATA class


### class brix.GEOGRIDDATA(geogrid_data)
Class to package the input needed by each indicator.
This class extends a simple list to charge it with additional properties, if needed.
It’s mainly used for internal purposes.


* **Parameters**

    **geogrid_data** (*list*) – List to converg to GEOGRIDDATA object.



#### append()
Append object to the end of the list.


#### as_df(include_geometries=None)
Returns the dataframe version of the geogriddata object.


* **Parameters**

    **include_geometries** (*None*) – If set, it will override the default option.



#### as_graph(edges_only=False)
Returns the geogriddata object as a networkx.Graph.


* **Parameters**

    **edges_only** (boolean, defaults to False) – If True, it will return the edgelist instead



* **Returns**

    **G** – Graph connecting each cell to its first neighbors.
    If edges_only=True, returns a list of edges instead.



* **Return type**

    networkx.Graph



#### bounds(bbox=False, buffer_percent=None)
Returns the bounds of the geogrid.


* **Parameters**

    
    * **bbox** (*boolean**, **defaults to False*) – If True, it will return a bounding box instead of a polygon. [W, S, E, N]


    * **buffer_percent** (*float**, **optional*) – If given, this will add a buffer around the table.
    Size of buffer in units of the grid diameter
    See `brix.get_buffer_size()`.



* **Returns**

    **limit** – Bounds of the table. If bbox=True it will return a horizontal bounding box.



* **Return type**

    shapely.Polygon or list



#### check_id_validity(quietly=True)
Checks if all ids are in GEOGRIDDATA or if some are missing by comparing the number of unique ids of the current object with the grid size as return by `brix.GEOGRIDDATA.grid_size()`.
Does not raise an error, but returns a boolean.
See `brix.GEOGRIDDATA.fill_missing_cells()`


* **Returns**

    **validity** – If False, the number of unique ids does not match the grid size.



* **Return type**

    boolean



#### check_type_validity(raise_error=True)
Checks if all types in the given GEOGRIDDATA object correspond to a type defined in GEOGRID.
This function raises an error by default.


* **Parameters**

    **raise_error** (boolean, defaults to True) – If False, it will not raise the error by return a boolean of whether the types are valid or not.



#### clear()
Remove all items from list.


#### copy()
Return a shallow copy of the list.


#### count()
Return number of occurrences of value.


#### extend()
Extend list by appending elements from the iterable.


#### fill_missing_cells()
Fills missing cells from GEOGRID.

This is useful when working only with interactive cells.


#### get_geogrid()
Get the value of GEOGRIDDATA from the corresponding `brix.Handler`.


* **Returns**

    **GEOGRID** – Value of GEOGRID



* **Return type**

    dict



#### get_geogrid_props()
Get the value of `brix.Handler.geogrid_props` from the corresponding `brix.Handler`.


* **Returns**

    **geogrid_props** – Value of `brix.Handler.geogrid_props`



* **Return type**

    dict or list



#### get_type_info()

#### get_type_set()
Returns set with all types defined in GEOGRID.


#### grid_size()
Returns size of the grid (total numer of cells).


#### index()
Return first index of value.

Raises ValueError if the value is not present.


#### insert()
Insert object before index.


#### link_table(table_name)
Sets geogrid using set_geogrid.
This function should use if GEOGRID needs to be updated.


* **Parameters**

    **table_name** (str or `brix.Handler`) – Name of the table or Handler object.



#### number_of_types()

#### pop()
Remove and return item at index (default last).

Raises IndexError if list is empty or index is out of range.


#### pop_geometries()

#### remap_colors()
Forces the colors to match the define colors of the cell type.
Requires that GEOGRIDDATA is set.


#### remap_interactive()
Forces the colors to match the define colors of the cell type.
Requires that GEOGRIDDATA is set


#### remove()
Remove first occurrence of value.

Raises ValueError if the value is not present.


#### remove_noninteractive()
Remove noninteractive cells from object.
Modification is done in-place, meaning the object is modified.
The function will also return the object.


* **Returns**

    **self** – Modified object.



* **Return type**

    brix.GEOGRIDDATA



#### reverse()
Reverse *IN PLACE*.


#### set_classification_list(classification_list)

#### set_geogrid(GEOGRID)

#### set_geogrid_edges(GEOGRID_EDGES)

#### sort()
Sort the list in ascending order and return None.

The sort is in-place (i.e. the list itself is modified) and stable (i.e. the
order of two equal elements is maintained).

If a key function is given, apply it once to each list item and sort them,
ascending or descending, according to their function values.

The reverse flag can be set to sort in descending order.

## Indicator sub-classes


### class brix.CompositeIndicator(\*args, \*\*kwargs)
Subclass used to define composite indicators. Composite indicators are functions of already defined indicators. By defining `brix.Indicator.setup()` and `brix.Indicator.return_indicator()`, this class allows you to define a composite indicator by just passing an aggregation function.


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



#### return_indicator_heatmap(geogrid_data)
Placeholder for user to define.


#### return_indicator_numeric(geogrid_data)
Placeholder for user to define.


#### return_indicator_textual(geogrid_data)
Placeholder for user to define.


#### set_return_indicator(return_indicator)
Used to set the return_indicator method by passing a function.


* **Parameters**

    **return_indicator** (*func*) – Function that takes geogrid_data as input.



#### setup(compose_function, selected_indicators=[], \*args, \*\*kwargs)
Indicator setup. This function is called upon __init__ so user does not need to call it independently.


* **Parameters**

    
    * **compose_function** (*function*) – Function to aggregate values of selected indicators. The function should be build to accept a dictionary with indicator values. See `brix.Handler.get_indicator_values()`.


    * **selected_indicators** (*list**, **optional*) – List of indicators to use to aggregate.



### class brix.StaticHeatmap(\*args, \*\*kwargs)
Wrapper to create a simple static heatmap indicator.
The indicator will post the given shapefile to the table.


* **Parameters**

    
    * **shapefile** (*geopandas.GeoDataFrame** or **str*) – Shapefile with values for each point, or path to shapefile.


    * **columns** (*list*) – Columns to plot. If not provided, it will return all numeric columns.
    The name of the indicator will be given by the name of the column.


    * **name** (*str**, **optional*) – Name of the indicator.
    If not provided, it will generate a name by hashing the column names.


    * **normalize_values** (boolean, defaults to True) – If True, it will ensure all values are between 0 and 1.



* **Returns**

    **Heatmap** – Heatmap indicator that posts the given shapefile to the table.



* **Return type**

    brix.Indicator



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



#### return_indicator_heatmap(geogrid_data)
Placeholder for user to define.


#### return_indicator_numeric(geogrid_data)
Placeholder for user to define.


#### return_indicator_textual(geogrid_data)
Placeholder for user to define.


#### set_return_indicator(return_indicator)
Used to set the return_indicator method by passing a function.


* **Parameters**

    **return_indicator** (*func*) – Function that takes geogrid_data as input.



#### setup(shapefile, columns=None, name=None, normalize_values=True)
User defined function. Used to set up the main attributed of the custom indicator. Acts similar to an __init__ method.

## User class


### class brix.User(\*args, sleep_time=7, name=None, \*\*kwargs)
Class that simulates a user doing changes to the grid.

To use, instantiate the class, and run User.start_user().
This will create a new thread with a user running.


#### add_indicator(I, test=True)
Adds indicator to handler object.


* **Parameters**

    
    * **I** (`brix.Indicator`) – Indicator object to handle. If indicator has name, this will use as identifier. If indicator has no name, it will generate an identifier.


    * **test** (boolean, defaults to True) – If True it will ensure the indicator runs before adding it to the `brix.Handler`.



#### classmethod getinstances()

#### listen(new_thread=False, showFront=True, append=False)
Listens for changes in the table’s geogrid and update all indicators accordingly.
You can use the update_package method to see the object that will be posted to the table.
This method starts with an update before listening.
Can run in a separate thread.
Does not support updating GEOGRIDDATA.


* **Parameters**

    
    * **new_thread** (boolean, defaults to False.) – If True it will run in a separate thread, freeing up the main thread for other tables.
    We recommend setting this to False when debugging, to avoid needing to recreate the object.


    * **showFront** (boolean, defaults to False) – If True it will open the front-end URL in a webbrowser at start.
    Only works if new_tread=False.


    * **append** (boolean, defaults to False) – If True it will append the new indicators to whatever is already there.
    This option will be deprecated soon. We recommend not using it unless strictly necessary.


    * **clear_endpoints** (boolean, defaults to False) – If True, it will clear all existing heatmap, numeric, and textual indicators.
    This is not recommended for deployment, only for testing.


    * **robust** (boolean, defaults to False) – If True, whenever a grid configuration breaks an indicator, the module will not stop, but rather wait until the grid changes and try to update again.
    Incompatible with new_thread=True



#### run()
Run method to be called by `threading.Thread.start()`.


#### start_user()

#### stop_user()

#### update_package(geogrid_data=None, append=False)
Returns the package that will be posted in CityIO.


* **Parameters**

    
    * **geogrid_data** (*dict**, **optional*) – Result of `brix.Handler.get_geogrid_data()`. If not provided, it will be retrieved.


    * **append** (boolean, defaults to False) – If True, it will append the new indicators to whatever is already there.



* **Returns**

    **new_values** – Note that all heatmat indicators have been grouped into just one value.



* **Return type**

    list



#### user_sim(quietly=True)
Simulates a user that changes the grid every sleep_time seconds.
The user flips a random cell 90% of the time, and shuffles the whole grid the other 10% of the time.
There is a small chance that the user will reset the grid to its original setting.


#### user_status()

