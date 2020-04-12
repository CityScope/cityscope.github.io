The following is an **example** of the mapping of ids and block representations. 

starting from [API v2.0](Data Format) **different tables may have different mappings**.

Data typeId is a signed int. 

the [mapping is also provided as a JSON format](https://cityio.media.mit.edu/api/table/citymatrix_volpe)

| Id | Type |
| -- | ----------- |
| -2 | MASK_TABLE_BOUNDS |
| -1 | MASK_INTERACTIVE |
| 0  | RL |
| 1  | RM |
| 2  | RS |
| 3  | OL |
| 4  | OM |
| 5  | OS |
| 6  | ROAD |
| 7  | AMENITIES |
| 8  | PARK |
| 9  | PARKING |

## Enum for types
| type | description |
| --- | --- |
| MASK_TABLE_BOUNDS | 
| MASK_INTERACTIVE  |
| RL | Residence Large|
| RM | Residence Medium|
| RS | Residence Small |
| OL | Office Large |
| OM | Office Medium |
| OS | Office Small|
| ROAD | |
| AMENITIES | |
| PARK | |
| PARKING | |


## Density Number
Right now we are using this value for the Volpe Project (it might change according to the city studied)

| type | density |
| --- | --- |
| RL | 89 sqm/ppl|
| RM | 55 sqm/ppl|
| RS | 15 sqm/ppl |
| OL | 30 sqm/ppl |
| OM | 18 sqm/ppl |
| OS | 5 sqm/ppl|

Originally taken from [ChangingPlaces/Andorra/Grasshopper Repo](https://github.com/ChangingPlaces/Andorra/tree/master/Grasshopper)

## Energy Consumption (Buildings)
Right now we are using this value for the Volpe Project (it might change according to the city studied)

| type | Energy |
| --- | --- |
| RL | 5930.34 kWh/ppl|
| RM | 2617.20 kWh/ppl|
| RS | 2141.59 kWh/ppl|
| OL | 10542.83 kWh/ppl|
| OM | 4652.80 kWh/ppl|
| OS | 3807.27 kWh/ppl|

## CO2 Production (Buildings) 
Right now we are using this value for the Volpe Project (it might change according to the city studied)

| type | CO2 |
| --- | --- |
| RL | 2283.18 CO2/ppl|
| RM | 1007.26 CO2/ppl|
| RS | 824.30 CO2/ppl|
| OL | 4058.99 CO2/ppl|
| OM | 1791.33 CO2/ppl|
| OS | 1465.79 CO2/ppl|

## Energy Consumption (Mobility) 
Right now we are using this value for the Volpe Project (it might change according to the city studied)

| type | Energy |
| --- | --- |
| Car | 25437.50 kWh/ppl|
| PEV | 4500.00 kWh/ppl|

## CO2 Production (Mobility) 
Right now we are using this value for the Volpe Project (it might change according to the city studied)

| type | CO2 |
| --- | --- |
| Car | 6684.97 CO2/vehicle|
| PEV | 1732.50 CO2/vehicle|
