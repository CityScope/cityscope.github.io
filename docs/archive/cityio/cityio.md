---
id: CityIO
---

# [Archive] CityIO

- data-hub (dump?) to have several clients work together

- (lower case)architecture to enforce collaboration within network

- server program
  - saves tables to have different software (visualization, simulation) read/write information
  - exposes a REST API (=url's) to serve json files, representiving table info

# Resources

- [API](https://github.com/mitmedialab/cityioserver/wiki/API)

  shows the endpoint URLs for clients to operate various request through HTTP. (ex. Getting a table data, Updating table data... etc.)

- [Client Examples](https://github.com/mitmedialab/cityioserver/wiki/Client-Examples)

  shows hello world examples from each client in different frameworks (GAMA, Grasshopper, Unity ... etc)

## [welcome page](https://cityio.media.mit.edu) with links to available tables

# API

[baseurl] https://cityio.media.mit.edu

## dev endpoints

endpoints in development will have /dev before the api

`https://cityio.media.mit.edu/dev/api/table/:tableName`

## list available tables

```
[GET] https://cityio.media.mit.edu/api/tables/list
```

## get table data

```
[GET] https://cityio.media.mit.edu/api/table/:tableName
```

params:

tableName : name of table

format: json/application

https://cityio.media.mit.edu/table/:tableName is **deprecated**

## post table data

```
[POST] https://cityio.media.mit.edu/api/table/update/:tableName
```

params:

tableName: name of table

body

`text/plain` or `json/application` format accepted.

text will be converted to json internally, will throw an error if it's not
valid json. Server welcomes any valid json, but only things inside `objects` and `grid` objects
will be used for comparison to detect uniqueness.

https://cityio.media.mit.edu/table/update/:tableName is **deprecated**

## delete table data

```
[GET] https://cityio.media.mit.edu/api/table/clear/:tablename
```

params:

tableName: name of table

**be careful! will delete all data from memory cache and DB**

## delete module data

```
[GET] https://cityio.media.mit.edu/api/table/clear/:tablename/:modulename
```

params:

tablename: name of table
modulename: name of module

**be careful! will delete all data from memory cache and DB**

# How to run it Locally

The current version is developed using rust.

1. install [rust](https://www.rust-lang.org/tools/install)

2. clone this repository

3. clone [sha256 repo](https://github.com/yasushisakai/sha256)

   this repo should live in the same directory as the main repo

4. get db credentials from yasushi, save it in the root of this repo

5. `cargo run --bin server --release`

this will compile the program and run it in port 8080

the server will now run locally
