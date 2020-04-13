Welcome to the [cityscope.github.io](https://cityscope.github.io) wiki!

This organization consists two types of repositories.

We are generally open to different methodologies and suggestions from the City Science Network, we should think together how we work together!! 😃

1. Tools

    Repositories having the prefix of `CS_` are the bare tools that commonly used across city projects.

2. Cities

    Cities have their own repositories that includes links (more exactly submodules) of the above tools and other things. These repos start with `CSL_`.

<div style="text-align:center"><img src ="https://github.com/CityScope/cityscope.github.io/wiki/documentation/Github_CS_Organization_diagram.png" width="1000"/></div>

---

# guidelines for selecting an open source license

The following is not a official nor a fixed statement.
descend if the prior guideline doesn't apply.

## 1. stay to the existing upstream license.

If you are forking/customizing something that is already licensed, respect the original developer and stay to that one.

1. if the library you are using is under GPL, you should generally stick to it. weather static or dynamic linking
2. [although there are ways to go around with it](https://www.softwarefreedom.org/resources/2007/gpl-non-gpl-collaboration.html)
3. [LGPL](https://stackoverflow.com/questions/10130143/gpl-lgpl-and-static-linking) means you don't need to if your using the library dynamically

## 2. Discuss

EACH PROJECT/REPOSITORY should be considered separately.

## 3. when possible use GPL v3.

The code will not be something that everyone will develop, since it has a relatively narrow application domain, and don't want to add another reason to be hidden and utilized.

> To address the concern when going for profit in the future, I will share my standpoint that the city science projects and relations with cities are more like services, or consulting (Noyman, 2017) rather selling the direct code. Moreover, GPL seems better if we want to build a community starting small and later expand. (Bonsen, 2018)

## 4. if 3. does not apply use Apache 2.0

Reason: It has extra protection than MIT (and more words) by Patents.

# About licenses and their concepts

In a nut shell, we have two diverging paths.

## copyleft (aggresivly opensource) : ex GPL

-   sticky license
-   cannot hide it, sell it.
-   may bite you back when you want to go for profit

## permissive (open without ties): ex MIT, Apache 2.0

-   broadly open.
-   Apple, or potential collaboration cities, alumni may hide it, sell it, without permission
-   OK if you do startup in the future
-   "sit back, relax and see what happens" approach.

---

# CityScope Repository Guideline

The intention of this guideline is to make a minimal convention for handling git repositories for this city scope organization. Historically, the group's majority of the people have an architecture background which are self taught 'rogue' programmers. Version control has not been our tradition.

---

## 1. Familiar yourself with Git and GitHub

-   [GitHub Guides](https://guides.github.com/)
-   [git - the simple guide](http://rogerdudler.github.io/git-guide/) as well as the handy [cheat sheet](http://rogerdudler.github.io/git-guide/files/git_cheat_sheet.pdf)
-   [Learn Version Control with Git
    ](https://www.git-tower.com/learn/git/ebook)
-   If you are new to git, commit and push as much as possible.

## 2. Account Access Rights

-   Every current postdoctoral associate, student (master and phd), and research scientists (specialists) should have rights to create and contribute to any repository upon their request.
-   Researchers will have the right to delete repositories
-   When leaving the City Science research group, one should explicitly consult with at least one researcher if he/she wants to maintain the rights, in that case be sure to clarify the expiry date.
-   Abuse of this github organization or repositories will potentially loose rights

## 3. Binary data and Large Files

-   There is little chance that you want to version control binary data, these include compiled code, images, audio and video. Think twice whether you really need to add it, that file will be eternally (unless you delete the repository, or capable of [rewriting history](https://git-scm.com/book/en/v2/Git-Tools-Rewriting-History)) saved to the history. You might consider putting them to other cloud data storage services like Dropbox.
-   The same applies to Large data files like database dumps and log files.
-   If you have compiled code, you should `git tag` and [mark it as a release](https://help.github.com/articles/creating-releases/). By this you will be able to upload and attach that executable as an archive. Attach other binary data to the release. This is a good way to crystalise the project.
-   One exception may be Grasshopper gh definition files, but again be considerate and make it light as possible.
-   The above points should stop you from adding most binary data, but if still need to add for some reason, ensure that its compressed to a moderate size. See [here](https://www.r-bloggers.com/data-on-github-the-easy-way-to-make-your-data-available/) for more details about storing data on gitub

## 4. External Libraries

-   **Avoid putting External Libraries into the repository**, no need to version control. It might be seen as stealing code, and/or may be considered as an act of obscuring the amount of contribution.
    -   Confirm that the code is okay to disclose if you plan to go open source.
    -   See if there is a dependency management / packaging system. Thats way easier to maintain.
    -   If the library has its own repository, you can use `submodules` to point to that. You will want to explicitly say to your cloners you need to `git clone --recursive` to get it working out of the box. This is good because if you want to modify that library, you can fork and still register it as a sub-module.
    -   If it doesn't have its own repo, point to an URL or an archive file using the Guideline 2-3 technique. Be careful for licenses.

## 5. Branching

-   It is likely that one program or script will be modified to fit to different projects / situations. Effectively use **[branching](https://en.wikipedia.org/wiki/Branching_%28version_control%29)**. Leave the `master` branch as generic as possible, and let the branch develop project specific modifications. If there is a feature to update the `master` branch, its time to have a meeting with the team.
-   If you want to experiment and other people is working on the `master` branch, create your own development branch and use it as a sandbox.

## 6. Other Tricks

1. `git clone --recursive git@github.com:ChangingPlaces/repository_name` will clone the repository and any related sub module.

-   `git clone --depth=1 git@github.com:ChangingPlaces/repository_name` will take only the latest history of the repository. Maybe better when cloning to a demo table.
-   Consider using `git rebase` if you just want to overwrite the repository, it will leave a cleaner history. +It's often better when your the only one coding. but **"do not rebase commits that exist outside your repository."**
-   For GitHub beginners, it might be helpful to use [GitHub Desktop](https://desktop.github.com/) -- the GUI of GitHub -- which provide you the basic functionalities of GitHub, including clone, create branches, commit changes, etc. But to a certain point, you will want to use **Git Shell**, which provide you full, more advanced functions.
-   It's good practice to add a predefined `.gitignore` file before your fist commit to maintain the repo clean and tidy. There is a [long list](https://github.com/github/gitignore) which you can choose, [even for Processing](https://github.com/github/gitignore/blob/master/Processing.gitignore).
-   Revert a commit `git push -f origin HEAD^:master`

---

# CityIO Data Structure Standard version 2.1 [2018]

## cityIO example data format

```
{"error":"","grid":[[1,0,270],[0,7,270]...[0,8,90],[4,5,90]],"id":"","objects":{},"timestamp":1528717938368,"meta":{"id":"hnkyCam","timestamp":1528717938347,"apiv":2},"header":{"spatial":{"physical_longitude":-71.087264,"cellsize":10,"longitude":-71.087264,"rotation":217,"nrows":5,"latitude":42.360357,"ncols":7,"physical_latitude":42.360357},"name":"virtual_table","block":["type","height","rotation"],"mapping":{"type":{"0":"RL","1":"RM","2":"RS","3":"OL","4":"OM","5":"OS","6":"ROAD"}},"owner":{"name":"Yasushi Sakai","title":"Research Assistant","institute":"MIT Media Lab"}}}
```

## Example of 20 x 20 grid

An example of this version could be found [here (online)](https://cityio.media.mit.edu/api/table/virtual_table) and [here (offline)](https://github.com/CityScope/CS_CityIO_Backend/blob/master/examples/virtual_table.json)
Note that this format is a minimal protocol. It's ok to have additional information in different tables.
_fields with \* are optional._

---

# Fields

### Note: \* before a field reflects optional/suggested data

## `header` (dictionary)

Contains global data that explains the rest of the data. The header data should be defined for each table, and it is unlikely to change through different states.

### `name` (string)

the name of the table. It is the unique key and should match the regex /\w+/g ([0-9a-zA-Z_]).

### `spatial` (dictionary)

Contains spatial data that indicates the size, location and the physical resolution of the table data.

-   `row` (unsigned short): the number of rows for the table
-   `column` (unsigned short): the number of columns for the table
-   `latitude` (double): latitude value in decimals. The table's origin is the north west corner.
-   `longitude` (double): longitude value in decimals. The table's origin is the north west corner.
-   `physical_latitude` (double): longitude of the physical location where the table is situated.
-   `physical_longitude` (double): latitude of the physical location where the table is situated.
-   `rotation` (double): the clockwise rotation of table in **degrees**. It is x axis relative to the `latitude` and `longitude`.
-   `cellSize` (float): the physical size in **meters** of one cell's edge.

### `owner*` (array) _new_

field indicating the owner of the table. An object that has, "name, title, institution" (all strings).

### `block` (array)

An array of strings to indicate the representation of elements in `grid`. Note it is an array, which is takes account on the order of the information. A Typical `block` element will start with `"type", "height", "rotation"`, but may different across tables.

### `mapping*` (dictionary)

A breakdown containing the necessary mapping of data inside each block. This can be taken as the enumerator field, that you can have a verbose explanation of data types. Often, the "type" field has a mapping of what each block indicates.
Note that you can have multiple mappings, for things like `mask`.

```
"type": {"0": "RL", "1": "RM", "2": "RS"}
```

## `meta [auto-generated by server]`

### users should avoid sending this

meta data reserved for the backend. The server will insert these values.

-   `id` (GUID): hash(sha256, overkill) of the grid_data
-   `timestamp` (int): UNIX epoch timestamp indicating when the table was received in the server. Milliseconds.
-   `apiv` (string): api's version (which is 2)

## `grid`(Array or arrays)

The meat part of the data. A grid field could be:
`"grid":[[1,0,0],[0,7,3]]` where:

-   i[0][0] is the type of the gridcell
-   i[0][1] is the height of the gridcell
-   i[0][2] is the rotation of the gridcell

Note: the specifics of each `grid` object are specified in the `block` field

The direction of the data is illustrated below. The order of each single block is defined according to the `header/block` section.

```
|  0 |  1 |  2 |  3 |
|  4 |  5 |  6 |  7 |
|  8 |  9 | 10 | 11 |
| 12 | 13 | 14 | 15 |
```

## `objects`

Flexible area that you can put whatever field you want. This is a place you want for global variables could potentially change.

---

# Previous API version [should not be used]

## version 1.0

This is the 1.0 format the cityIO table (only used in CityScope Volpe for now)

```json
{
    "grid": [{ "type": -2, "x": 13, "y": 0, "rot": 180 }],
    "objects": {
        "toggle4": 0,
        "density": [1, 1, 12, 19, 19, 3],
        "IDMax": 15,
        "pop_young": 0,
        "dockID": -1,
        "slider1": 0.95,
        "dockRotation": 0,
        "pop_old": 0,
        "pop_mid": 0,
        "toggle1": 5,
        "toggle2": 0,
        "toggle3": 0
    },
    "id": "-Kj4L11NdrdbhHCcGGPo",
    "timestamp": 1493664538794
}
```

---

The following is an **example** of the mapping of ids and block representations.

starting from [API v2.0](Data Format) **different tables may have different mappings**.

Data typeId is a signed int.

the [mapping is also provided as a JSON format](https://cityio.media.mit.edu/api/table/citymatrix_volpe)

| Id  | Type              |
| --- | ----------------- |
| -2  | MASK_TABLE_BOUNDS |
| -1  | MASK_INTERACTIVE  |
| 0   | RL                |
| 1   | RM                |
| 2   | RS                |
| 3   | OL                |
| 4   | OM                |
| 5   | OS                |
| 6   | ROAD              |
| 7   | AMENITIES         |
| 8   | PARK              |
| 9   | PARKING           |

## Enum for types

| type              | description      |
| ----------------- | ---------------- |
| MASK_TABLE_BOUNDS |
| MASK_INTERACTIVE  |
| RL                | Residence Large  |
| RM                | Residence Medium |
| RS                | Residence Small  |
| OL                | Office Large     |
| OM                | Office Medium    |
| OS                | Office Small     |
| ROAD              |                  |
| AMENITIES         |                  |
| PARK              |                  |
| PARKING           |                  |

## Density Number

Right now we are using this value for the Volpe Project (it might change according to the city studied)

| type | density    |
| ---- | ---------- |
| RL   | 89 sqm/ppl |
| RM   | 55 sqm/ppl |
| RS   | 15 sqm/ppl |
| OL   | 30 sqm/ppl |
| OM   | 18 sqm/ppl |
| OS   | 5 sqm/ppl  |

Originally taken from [ChangingPlaces/Andorra/Grasshopper Repo](https://github.com/ChangingPlaces/Andorra/tree/master/Grasshopper)

## Energy Consumption (Buildings)

Right now we are using this value for the Volpe Project (it might change according to the city studied)

| type | Energy           |
| ---- | ---------------- |
| RL   | 5930.34 kWh/ppl  |
| RM   | 2617.20 kWh/ppl  |
| RS   | 2141.59 kWh/ppl  |
| OL   | 10542.83 kWh/ppl |
| OM   | 4652.80 kWh/ppl  |
| OS   | 3807.27 kWh/ppl  |

## CO2 Production (Buildings)

Right now we are using this value for the Volpe Project (it might change according to the city studied)

| type | CO2             |
| ---- | --------------- |
| RL   | 2283.18 CO2/ppl |
| RM   | 1007.26 CO2/ppl |
| RS   | 824.30 CO2/ppl  |
| OL   | 4058.99 CO2/ppl |
| OM   | 1791.33 CO2/ppl |
| OS   | 1465.79 CO2/ppl |

## Energy Consumption (Mobility)

Right now we are using this value for the Volpe Project (it might change according to the city studied)

| type | Energy           |
| ---- | ---------------- |
| Car  | 25437.50 kWh/ppl |
| PEV  | 4500.00 kWh/ppl  |

## CO2 Production (Mobility)

Right now we are using this value for the Volpe Project (it might change according to the city studied)

| type | CO2                 |
| ---- | ------------------- |
| Car  | 6684.97 CO2/vehicle |
| PEV  | 1732.50 CO2/vehicle |

---

the system is still heavily in rapid development, so
the specification is very flexible. At this point the main components of a cityscope table will be:

## Hardware

1. PC (preferably windows, since some software is win only)

2. [Table](https://github.com/CityScope/cityscope.github.io/tree/master/CS_Hardware)

    Not every deployment uses this table configuration, often times its just a table with the most important transparent top and grid, this is often made from acrylic and laser cut.

3. Legos

4. Projectors

5. [Webcam](https://www.amazon.com/gp/product/B006JH8T3S/ref=s9_acsd_top_hd_bw_bisR_c_x_1_w?pf_rd_m=ATVPDKIKX0DER&pf_rd_s=merchandised-search-3&pf_rd_r=W90AXQB8TSWYBB1ZZXG5&pf_rd_t=101&pf_rd_p=0af85809-accb-5a70-bc4f-f9a8f374e48c&pf_rd_i=172511)

6. (Internet connection)

## Software

CityScope is composed of multiple software

1. Scanner (gets input from camera converts it to information that can be parsed through various simulation)
   currently this functionality is provided using one of below:

-   Rhinoceros 3D (win only)
-   Unity game engine
-   Browser, JavaScript

2. Simulation / Visualization
   this differs largely on what to simulate, or the research question on focus.
   In fact, some CityScope table has multiple simulations and visualizations living together.

-   [Gama](http://gama-platform.org/) for agent based simulation
-   General Simulation and visualization
    -   Rhinoceros 3D / Grasshopper
    -   Unity game engine


    _____

(draf)

-> in the perspective of cities, and urban planning

# Why Open Source??

-   we see a lot of cities opening up their data
-   yet when we say data driven planning, opening the tools is as important as the data, to show how we can collect, analyze, visualize (give insights) and even govern to tackle [wicked problems](https://en.wikipedia.org/wiki/Wicked_problem)
-   These tools may have impact in certain decisions, it is **_crucial_** that is transparent, to undergo scrutiny from researchers and the public.
    -   same way it is always better to use a well known crypto algorithm
-   tangible outcome for the City Science Initiative

# Why Git?

-   git is a distributed version control system, heavily used by the software industry (and BTW, city science group)
-   Within a year, the linux kernel handles up to 4,300 developers to work in a single system \*
-   That averages to 8.5 changes/hour \*
-   Clear example of large scale collaboration
    -   Standing on a bold assumption that collaborative urban planning and "coding" is the same thing
    -   Can we extract how this works to a bottom up approach of planning?

*   ref: [Linux foundation 2017 report](https://www.linuxfoundation.org/blog/2017/10/2017-linux-kernel-report-highlights-developers-roles-accelerating-pace-change/)
