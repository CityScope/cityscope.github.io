---
id: CS_Proxymix
---
You don't need to write any line of code to be able to run the model (though your contribution is always welcome), here are the 3 mandatory steps in order to run the ABM Proxymix on your specific sites. If one of the 3 following step doesn't work please report an issue [here](https://github.com/CityScope/CS_Proxymix/issues) 

# DXF Input Production:

To be compatible with the ABM framework, the **DXF file import** needs to respect some specifications.

Each element (closed polylines) of the dxf file describes physical space that have a different function in a separated layer. 

A compatible dxf should specify at least
- "Walls";"Entrance";"Offices" or "Meeting rooms";

Optional layer can be 
- "Supermarket";"Coffee";"Storage";"Furniture";"Toilets";"Elevators";"Stairs";"Doors";"Chair";

Make sure that units are in cm;


Ones the dxf is ready please place it in
````includes/MY_NEW_SITE/building.dxf````  
*Depending on your version of AutoCad it might work or not, we recommend to save it in a version lower than 2018.* 

# DXF Validation 
1. Open ```` models/ToolKit/DXF_Validator.gaml````
2. Add your dataset in the useCase at the end of the ````ValidatedDXF```` experiment (also in the among list)
`````
experiment ValidatedDXF type: gui
{   
parameter 'fileName:' var: useCase category: 'file' <- "MY_NEW_SITE" among: ["MY_NEW_SITE","MediaLab",...];
  output
  {	
  ....
  }
}
`````
3. Run the ValidatedDXF 
4. An error pop up wil show up if some elements are missing of if there are useless ones 
5. Press ````Ok````
6. The dxf file is finally displayed in a ```map```window 

# ABM Validation.
Ones your dxf file is ready its now time to run the ABM model. 
## Generate pedestrian path
1. Open ````generate_pedestrian_network.gaml````
2. Specify the right use case ````string useCase <- "MY_USE_CASE";````
3. Run `````generate_pedestrian_network`````experiment. In case of succes it will automatically create the corresponding pedestrian_path.shp and walking_area.shp in the MY_USE_CASE folder.


## Run the DailyRoutine model
Ones the pedestrian path has been generated the model is now ready to run
1. Open ````models/Current Models/DailyRoutine.gaml````
2. Specify your use case `````parameter 'fileName:' var: useCase category: 'file' <- "MY_USE_CASE" among: ["MY_USE_CASE", "MediaLab",...];````` 
3. Run the ````DailyRoutine````experiment
4. Press play to run the simulation

