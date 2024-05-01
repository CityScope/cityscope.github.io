---
sidebar_position: 6
---

The CityIO HTTP API enables users to access and update information regarding the projects (grids).


## Endpoints

### List Projects

- **URL**: `/api/table/list`
- **Method**: `GET`
- **Auth Required**: No
- **Permissions Required**: None

#### Parameters

- No parameters allowed.

#### Request Body

- No request body allowed.

#### Success Response

- **Code**: `200`
- **Content**: `JSON`

```json
[
    "test_podzem",
    "nl_haarlem_pbl_bea",
    "ex6_sgp_full_new_landuse_noquay_nostation",
    "test",
    "ex2_sgp_full_new_landuse_quay_bot",
    "group51",
    "test_brix",
    ...
]
```

#### Error Response

- Error response not expected.

#### Example request

`curl --location 'https://cityio-beta.media.mit.edu/cityio/api/table/list'`

### Get Headers

- **URL**: `/api/table/list`
- **Method**: `GET`
- **Auth Required**: No
- **Permissions Required**: None

#### Parameters

- No parameters allowed.

#### Request Body

- No request body allowed.

#### Success Response
  
- **Code**: `200`
- **Content**:

```json
[   {
        "tableHeader": {
            "cellSize": 15,
            "latitude": 42.3664655,
            "longitude": -71.0854323,
            "ncols": 20,
            "nrows": 20,
            "projection": "+proj=lcc +lat_1=42.68333333333333 +lat_2=41.71666666666667 +lat_0=41 +lon_0=-71.5 +x_0=200000 +y_0=750000 +ellps=GRS80 +datum=NAD83 +units=m +no_def",
            "rotation": 0,
            "tableName": "test",
            "tz": -5
        },
        "tableName": "test"
    },
...
]
```

#### Error Response

- Error response not expected.

#### Example request

`curl --location 'https://cityio-beta.media.mit.edu/cityio/api/table/headers'`

### Get Grid

- **URL**: `/api/table/{tableName}/{dataPath}`
- **Method**: `GET`
- **Auth Required**: No
- **Permissions Required**: None

#### Parameters

- `tableName` (String) - Name of the table
- `param2` (String, optional) - Data path to obtain (optional)

#### Request Body

- No request body allowed.

#### Success Response

- **Code**: `200`
- **Content**:

```json
{
    "GEOGRID": {
        "features": [
            {
                "type": "Feature",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [
                        [
                            [
                                -71.0854323,
                                42.36646549999987
                            ],
...
}
```

#### Error Response

- **Code**: `204`
- **Description**: Empty body if the table name or the path cannot be found.

#### Example request

`curl --location 'https://cityio-beta.media.mit.edu/cityio/api/table/test'`

### Create or Update table

- **URL**: `/api/table/{tableName}`
- **Method**: `POST`
- **Auth Required**: No
- **Permissions Required**: None

#### Parameters

- No request body expected.

#### Request Body

```json
{
$TABLE_BODY
}
```

#### Success Response

- **Code**: `200`
- **Content**:

```json
{
$TABLE_BODY
}
```

#### Error Response

- WIP
