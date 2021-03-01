---
id: Examples
---
# Examples

## Short examples

### Numeric indicator: diversity

Indicators are built as subclasses of the :class”brix.Indicator class, with three functions that need to be defined: `brix.Indicator.setup()`, `brix.Indicator.load_module()`, and `brix.Indicator.return_indicator()`. The function `brix.Indicator.setup()` acts like an **init**. It can take any argument and runs when the object is instantiated. The function `brix.Indicator.load_module()` is also run when the indicator in initialized, but it cannot take any arguments. Any inputs needed to run `brix.Indicator.load_module()` should be passed to `brix.Indicator.setup()` and defined as class attributes. The function `brix.Indicator.return_indicator()` is the only required one and should take in a geogrid_data object (returned from `brix.Handler.get_geogrid_data()` or from `brix.Indicator.get_geogrid_data()`) and return the value of the indicator either as a number, a dictionary, or a list of dictionaries/numbers. Sometimes, the indicator requires geographic information from the table to calculate it. To get geographic information from the table, set the property `brix.Indicator.requires_geometry` to True (see Noise heatmap as an example).

The following example implements a diversity-of-land-use indicator

```
from brix import Indicator
from brix import Handler
from numpy import log
from collections import Counter

class Diversity(Indicator):
        def setup(self):
                self.name = 'Entropy'

        def load_module(self):
                pass

        def return_indicator(self, geogrid_data):
                uses = [cell['land_use'] for cell in geogrid_data]
                uses = [use for use in uses if use != 'None']
                frequencies = Counter(uses)
                total = sum(frequencies.values(), 0.0)
                entropy = 0
                for key in frequencies:
                        p = frequencies[key]/total
                        entropy += -p*log(p)
                return entropy

div = Diversity()
H = Handler('dungeonmaster', quietly=False)
H.add_indicator(div)
H.listen()
```

### Composite indicator: average

In some settings, it might be useful to aggregate different indicators to get a average feel of what the neighborhood looks like. For this use case, brix provides a simplified CompositeIndicator class that only needs an aggregation function.

Let’s create an indicator that averages Innovation Potential, Mobility Inmpact, and Economic Impact. We use the `brix.CompositeIndicator` class for this. This class takes an aggregate function as input. This function should take the result of `brix.Handler.get_indicator_values()` as input and returns a number. If you want to have more control over what the `brix.CompositeIndicator` does you can always extend the class.

Here is the simplest example that averages the values of three indicators:

```
from brix import Handler, CompositeIndicator
from brix.examples import RandomIndicator

def innovation_average(indicator_values):
    avg = (indicator_values['Innovation Potential']+indicator_values['Mobility Impact']+indicator_values['Economic Impact'])/3
    return avg

H = Handler('dungeonmaster')
R = RandomIndicator()
avg_I = CompositeIndicator(innovation_average,name='Composite')
H.add_indicators([R,avg_I])
```

In some cases, the aggregation function is too simple to write it again. In the example before, you can also pass it a pre-existing function, such as np.mean, making sure that you select the indicators that will be passed as input, by their name.

```
from brix import Handler, CompositeIndicator
from brix.examples import RandomIndicator
import numpy as np

H = Handler('dungeonmaster')
R = RandomIndicator()
avg_I = CompositeIndicator(np.mean,selected_indicators=['Innovation Potential','Mobility Impact','Economic Impact'],name='Composite')
H.add_indicators([R,avg_I])
```

### Heatmap indicator

The same class can be used to define a heatmap or accessiblity indicator, as opposed to a numeric indicator. First, set the class property `brix.Indicator.indicator_type` equal to heatmap or to access. This will flag the indicator as a heatmap and will tell the Handler class what to do with it.
Second, make sure that the `brix.Indicator.return_indicator()` function returns a list of features or a geojson.
The example below shows an indicator that returns noise for every point in the center of a grid cell. Because this indicator needs the coordinates of table to return the geojson, it sets the property `brix.Indicator.requires_geometry` to True.

```
from brix import Indicator
class Noise(Indicator):
        '''
        Example of Noise heatmap indicator for points centered in each grid cell.

        Note that this class requires the geometry of the table as input, which is why it sets:
        requires_geometry = True
        in the setup.

        '''
        def setup(self):
                self.indicator_type = 'heatmap'
                self.requires_geometry = True

        def load_module(self):
                pass

        def return_indicator(self, geogrid_data):
                features = []
                for cell in geogrid_data:
                        feature = {}
                        lat,lon = zip(*cell['geometry']['coordinates'][0])
                        lat,lon = mean(lat),mean(lon)
                        feature['geometry'] = {'coordinates': [lat,lon],'type': 'Point'}
                        feature['properties'] = {self.name:random()}
                        features.append(feature)
                out = {'type':'FeatureCollection','features':features}
                return out
```

### Multiple tables simultaneously

The following examples instantiates three `brix.Handler` objects for three different tables (dungeonA, dungeonB, and dungeonC) and adds a diversity of land use indicator to each. It then runs `brix.Handler.listen()` for each table in its own separate thread.

```
from brix import Handler
from brix.examples import Diversity, RandomIndicator

table_list = ['dungeona','dungeonb','dungeonc']

handler_list = []
for table_name in table_list:
        H = Handler(table_name)
        div = Diversity()
        rand = RandomIndicator()
        H.add_indicators([div,rand])
        handler_list.append(H)

for h in handler_list:
        h.listen()
```

## Step by step examples

### Diversity of land-use indicator - step by step

As an example, we’ll build a diversity of land use indicator for the test table. The process is the same for any table, provided that it has a GEOGRID variable. Indicators are built as subclasses of the `brix.Indicator` class, with three functions that need to be defined: `brix.Indicator.setup()`, `brix.Indicator.load_module()`, and `brix.Indicator.return_indicator()`. The function `brix.Indicator.setup()` acts like an **init**. It can take any argument and runs when the object is instantiated. The function `brix.Indicator.load_module()` is also run when the indicator in initialized, but it cannot take any arguments. Any inputs needed to run `brix.Indicator.load_module()` should be passed to `brix.Indicator.setup()` and defined as class attributes. The function `brix.Indicator.return_indicator()` is the only required one and should take in a geogrid_data object (returned from `brix.Handler.get_geogrid_data()` or from `brix.Indicator.get_geogrid_data()`) and return the value of the indicator either as a number, a dictionary, or a list of dictionaries/numbers.

To start developing the diversity indicator, you can use the Handler class to get the `geogrid_data` that is an input of the `brix.Indicator.return_indicator()` function.

```
from brix import Handler
H = Handler('dungeonmaster')
geogrid_data = H.geogrid_data()
```

The returned `geogrid_data` object depends on the table, but for dungeonmaster it looks like this:

```
[
        {
                'color': [0, 0, 0, 0],
                'height': 0.1,
                'id': 0,
                'interactive': True,
                'land_use': 'None',
                'name': 'empty',
                'tui_id': None
        },
        {
                'color': [247, 94, 133, 180],
                'height': [0, 80],
                'id': 1,
                'interactive': True,
                'land_use': 'PD',
                'name': 'Office Tower',
                'old_color': [133, 94, 247, 180],
                'old_height': [0, 10],
                'tui_id': None
        },
        {
                'color': [0, 0, 0, 0],
                'height': 0.1,
                'id': 2,
                'interactive': True,
                'land_use': 'None',
                'name': 'empty',
                'tui_id': None
        },
        ...
]
```

We build the diversity indicator by delecting the `land_use` variable in each cell and calculating the Shannon Entropy for this:

```
from numpy import log
from collections import Counter
uses = [cell['land_use'] for cell in geogrid_data]
uses = [use for use in uses if use != 'None']

frequencies = Counter(uses)

total = sum(frequencies.values(), 0.0)
entropy = 0
for key in frequencies:
        p = frequencies[key]/total
        entropy += -p*log(p)
```

Now, we wrap this calculation in the `brix.Indicator.return_indicator()` in a Diversity class that inherits the properties from the `brix.Indicator` class:

```
from brix import Indicator
from numpy import log
from collections import Counter

class Diversity(Indicator):

        def setup(self):
                self.name = 'Entropy'

        def load_module(self):
                pass

        def return_indicator(self, geogrid_data):
                uses = [cell['land_use'] for cell in geogrid_data]
                uses = [use for use in uses if use != 'None']

                frequencies = Counter(uses)

                total = sum(frequencies.values(), 0.0)
                entropy = 0
                for key in frequencies:
                        p = frequencies[key]/total
                        entropy += -p*log(p)

                return entropy
```

Because this indicator is very simple, it does not need any parameters or data to calculate the value, which is why the `load_module` function is empty. The `setup` function defines the properties of the module, which in this case is just the name.

Finally, we run the indicator by instantiating the new class and passing it to a Handler object:

```
from brix import Handler

div = Diversity()

H = Handler('dungeonmaster', quietly=False)
H.add_indicator(div)
H.listen()
```

### Composite indicator – step by step tutorial

Let’s create an indicator that averages Innovation Potential, Mobility Inmpact, and Economic Impact.
First, we load the RandomIndicator and pass it to a Handler.

```
from brix import Handler, CompositeIndicator
from brix.examples import RandomIndicator

H = Handler('dungeonmaster')
R = RandomIndicator()
H.add_indicator(R)
```

To develop the aggregate function, we use the `brix.Handler.get_indicator_values` function from the handler class. We need to make sure our aggregate function works with that the Handler is returning:

```
indicator_values = H.get_indicator_values()
```

In this case, the `indicator_values` is a dictionary with the following elements:

```
{
        'Social Wellbeing': 0.9302328967423512,
        'Environmental Impact': 0.8229183561962108,
        'Mobility Impact': 0.3880460148817071,
        'Economic Impact': 0.13782084927373295,
        'Innovation Potential': 0.8913823890081203
}
```

We do not need to use all of the values returned by the Handler for our indicator.

Next, we write our simple average function that takes `indicator_values` as input and returns a value, and pass it as an argument to the `brix.CompositeIndicator` class constructor.

```
def innovation_average(indicator_values):
        avg = (indicator_values['Innovation Potential']+indicator_values['Mobility Impact']+indicator_values['Economic Impact'])/3
        return avg

avg_I = CompositeIndicator(innovation_average,name='Composite')
```

To make sure it is running, we can test it as usual:

```
avg_I.return_indicator(indicator_values)
```

We finally add it to the Handler:

```
H.add_indicator(avg_I)
```

### Heatmap indicator – step by step tutorial

This section will show you step by step how to build a proximity to parks indicator.

Let’s start by setting up a simple subclass of the Indicator class, give it a name, and set it as a `heatmap` indicator:

```
from brix import Indicator
class ProximityIndicator(Indicator):
        def setup(self):
                self.name = 'Parks'
                self.indicator_type = 'heatmap'

        def return_indicator(self, geogrid_data):
                pass
```

Next, we link it to the table. This step is only for building the indicator as we use a `brix.Handler` object when deploying it.

```
P = ProximityIndicator()
P.link_table('dungeonmaster')
P.get_geogrid_data()
```

When running `brix.Indicator.get_geogrid_data()` we see that every cell has a `name` property and some cells are classified as `Park`. You’ll also notice that by default, when building a `heatmap` indicator, `geogrid_data` returns the geometries. You can change this behavior by setting `self.requires_geometry=False` in your `setup`.

Next, we define the `return_indicator` function. For debugging and testing you can define this function as stand alone function before adding it as a method to the ProximityIndicator. Some useful functions for debugging are `brix.Indicator.get_geogrid_data()` and `brix.Indicator.get_table_properties()` that will list general properties of the linked table.

In this example, the proximity indicator is defined as one over the distance to the closest park. When the cell is a park, we define the proximity as 1/(half size of each cell) to avoid dividing by zero.

```
import numpy as np
from geopy.distance import distance as geodistance # Function for distance between coordinates

def return_indicator(self,geogrid_data):
        parks = [cell for cell in geogrid_data if cell['name']=='Park'] # Find all parks
        parks_locations = [np.mean(cell['geometry']['coordinates'][0],0) for cell in parks] # Filter out the center of all park locations (locations are lon,lat format)

        features = []
        for cell in geogrid_data: # Calculate a value for the indicator for each cell
                cell_coords = np.mean(cell['geometry']['coordinates'][0],0) # Calculate center of cell (locations are lon,lat format)
                if cell['name']=='Park': # If cell is park, set distance to zero
                        park_distance = 25 # This is based on half the cell size (see P.get_table_properties())
                else:
                        distances = [geodistance(cell_coords[::-1],park_loc[::-1]).m for park_loc in parks_locations] # Distance between cell and each park. Notice that we reverse the coordinates for geodistance.
                        park_distance = min(distances) # get distance to closest park

                proximity = 1/park_distance
                scaled_proximity = (proximity-0.002)/(0.03-0.002) # this ensures the indicator is between zero and one

                # Generate feature with points (lon,lat format) and properties.
                feature = {}
                feature['geometry'] = {'coordinates': list(cell_coords),'type': 'Point'} # cell_coords should be a list
                feature['properties'] = {self.name: scaled_proximity} # Use the indicator name to tag the value

                features.append(feature) # add to features list for export

        out = {'type':'FeatureCollection','features':features}
        return out
```

You can test your function by running: `return_indicator(P,geogrid_data)`.

Finally, let’s put it all together:

```
from brix import Indicator
import numpy as np
from geopy.distance import distance as geodistance

class ProximityIndicator(Indicator):
        def setup(self):
                self.name = 'Parks'
                self.indicator_type = 'heatmap'

        def return_indicator(self,geogrid_data):
                parks = [cell for cell in geogrid_data if cell['name']=='Park']
                parks_locations = [np.mean(cell['geometry']['coordinates'][0],0) for cell in parks]

                features = []
                for cell in geogrid_data:
                        cell_coords = list(np.mean(cell['geometry']['coordinates'][0],0) )
                        if cell['name']=='Park':
                                park_distance = 45
                        else:
                                distances = [geodistance(cell_coords[::-1],park_loc[::-1]).m for park_loc in parks_locations]
                                park_distance = min(distances)

                        proximity = 1/park_distance
                        scaled_proximity = (proximity-0.002)/(0.03-0.002)

                        feature = {}
                        feature['geometry'] = {'coordinates': cell_coords,'type': 'Point'}
                        feature['properties'] = {self.name: scaled_proximity}

                        features.append(feature)

                out = {'type':'FeatureCollection','features':features}
                return out
```

And to deploy it:

```
from brix import Handler
H = Handler('dungeonmaster')
P = ProximityIndicator()
H.add_indicator(P)
H.listen()
```

### Static-Heatmap indicator

The `brix.Indicator` class provides a flexible way to define any type of indicator. In some cases, a simple approach is needed. Let’s assume we want to build a simple heatmap indicator that just visualizes a given shapefile, and does not react to changes in geogriddata. We can use `brix.StaticHeatmap` to build that.

In this example, we will use the number of houses by block in Guadalajara, Mexico. You can download the shapefile from [HERE](https://www.inegi.org.mx/contenidos/masiva/indicadores/inv/14_Manzanas_INV2016_shp.zip). We will not be using our trusted dungeonmaster table, as it does not overlap with the data. Instead we will use jalisco.

The first step will be to “griddify” our shapefile, meaning we will transform it from polygons to sampling points. Please note that you can use any sampling method for this, and that the sampling points do not need to match the grid. To make things easier, we have provided `brix.griddify()`, which uses the centroids of the grid to sample the values of the heatmap.

We start by loading the shapefile and removing the missing values:

```
import geopandas as gpd
shapefile = gpd.read_file('/Users/username/Downloads/14_Manzanas_INV2016_shp/14_Manzanas_INV2016.shp')
shapefile = shapefile[shapefile['VIVTOT']!='N.D.']
```

Next, we load a table and use its grid to sample the heatmap.

```
from brix import Handler
table_name = 'jalisco'
H = Handler(table_name)
geogrid_data = H.get_geogrid_data()
```

The next step is to use the grid to sample the values of the heatmap. We will use the VIVTOT column, and save the resulting heatmap to a file so we can load it later.

```
from brix import griddify
heatmap = griddify(geogrid_data,shapefile,columns=['VIVTOT'])
heatmap.to_file('/Users/username/Downloads/14_Manzanas_INV2016_shp/HEATMAP.shp')
```

This shapefile is a table of points and their properties. To build your indicator you can either load the file and pass it to the :class:brix.StaticHeatmap\` constructor, or have the constructor load it for you.

```
from brix import StaticHeatmap
N = StaticHeatmap('/Users/username/Downloads/14_Manzanas_INV2016_shp/HEATMAP.shp',columns=['VIVTOT'])
```

Finally, we add it to a Handler class and check the update package:

```
H = Handler(table_name)
H.add_indicator(N)
H.update_package()
```

To wrap up, once the heatmap file has been saved, all you need to do deploy the indicator is:

```
from brix import Handler, StaticHeatmap
table_name = 'jalisco'
N = StaticHeatmap('/Users/username/Downloads/14_Manzanas_INV2016_shp/HEATMAP.shp',columns=['VIVTOT'])
H = Handler(table_name)
H.add_indicator(N)
H.listen()
```

