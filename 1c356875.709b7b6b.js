(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{64:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return o})),n.d(t,"metadata",(function(){return l})),n.d(t,"rightToc",(function(){return d})),n.d(t,"default",(function(){return s}));var i=n(2),a=n(6),r=(n(0),n(85)),o={id:"Tutorial"},l={unversionedId:"modules/Brix/Tutorial/Tutorial",id:"modules/Brix/Tutorial/Tutorial",isDocsHomePage:!1,title:"Tutorial",description:"Tutorial",source:"@site/docs/modules/Brix/Tutorial/Tutorial.md",slug:"/modules/Brix/Tutorial/Tutorial",permalink:"/modules/Brix/Tutorial/Tutorial",editUrl:"https://github.com/CityScope/cityscope.github.io/blob/new_docsite/docsite/docs/modules/Brix/Tutorial/Tutorial.md",version:"current"},d=[{value:"Basics of building a CityScope indicator",id:"basics-of-building-a-cityscope-indicator",children:[]},{value:"Let\u2019s talk data (input)",id:"lets-talk-data-input",children:[]},{value:"Build and test your indicator (output)",id:"build-and-test-your-indicator-output",children:[]},{value:"Deploy your indicator",id:"deploy-your-indicator",children:[]},{value:"Additional tools",id:"additional-tools",children:[{value:"Auto-updates of GEOGRIDDATA",id:"auto-updates-of-geogriddata",children:[]}]}],c={rightToc:d};function s(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(r.b)("wrapper",Object(i.a)({},c,n,{components:t,mdxType:"MDXLayout"}),Object(r.b)("h1",{id:"tutorial"},"Tutorial"),Object(r.b)("h2",{id:"basics-of-building-a-cityscope-indicator"},"Basics of building a CityScope indicator"),Object(r.b)("p",null,"Let\u2019s get to it. First, what table are you building for? If you don\u2019t have a specific table, that is totally okay and you can create one ",Object(r.b)("a",{parentName:"p",href:"https://cityscope.media.mit.edu/CS_cityscopeJS/#/editor"},"here"),". Note: by the time you read this, CityScope might pose some limitations on new projects (",Object(r.b)("inlineCode",{parentName:"p"},"tables"),"). Please follow instructions in the link above.\nFor this tutorial, we crated one called ",Object(r.b)("inlineCode",{parentName:"p"},"dungeonmaster"),"."),Object(r.b)("p",null,"After creating a table, open the frond end given by the tool and edit the table at least once. Change some blocks, and push those changes to CityIO."),Object(r.b)("p",null,"An indicator will basically take in data, and produce a result. Each new indicator is built as an subclass of the ",Object(r.b)("inlineCode",{parentName:"p"},"brix.Indicator")," class provided in this library. Make sure you define three functions: ",Object(r.b)("inlineCode",{parentName:"p"},"brix.Indicator.setup()"),", ",Object(r.b)("inlineCode",{parentName:"p"},"brix.Indicator.load_module()"),", and ",Object(r.b)("inlineCode",{parentName:"p"},"brix.Indicator.return_indicator()"),". Here\u2019s a barebones example of an indicator:"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre"},"from brix import Indicator\nclass MyIndicator(Indicator):\n        '''\n        Write a description for your indicator here.\n        '''\n        def setup(self):\n                '''\n                Think of this as your __init__.\n                Here you will define the properties of your indicator.\n                Although there are no required properties, be nice and give your indicator a name.\n                '''\n                self.name = 'Alfonso'\n\n        def load_module(self):\n                '''\n                This function is not strictly necessary, but we recommend that you define it if you want to load something from memory. It will make your code more readable.\n                '''\n                pass\n\n        def return_indicator(self, geogrid_data):\n                '''\n                This is the main course of your indicator.\n                This function takes in `geogrid_data` and returns the value of your indicator.\n                The library is flexible enough to handle indicators that return a number or a dictionary.\n                '''\n                return 1\n")),Object(r.b)("h2",{id:"lets-talk-data-input"},"Let\u2019s talk data (input)"),Object(r.b)("p",null,"What is ",Object(r.b)("inlineCode",{parentName:"p"},"geogrid_data"),"?\nEvery time we create a CityScope table, we define a regularly spaced grid which is overlaid on the city district we\u2019re modelling. These grid cells are the basic unit of analysis for the CityScope modules. Every grid cell has properties such as the ",Object(r.b)("inlineCode",{parentName:"p"},"Type")," which represents the land use and ",Object(r.b)("inlineCode",{parentName:"p"},"Height")," which represents the number of floors. These data are dynamic and are updated each time a user interacts with the CityScope table, experimenting with the spatial organisation of land uses and infrastructure. These dynamic data are stored the variable geogrid_data. This is a list of ojects: one for each grid cell in the CityScope table. The contents of each object really depends on the specific table you are building for and on the properties assigned to your indicator. There are two options that will control what geogrid_data contains which are: ",Object(r.b)("inlineCode",{parentName:"p"},"brix.Indicator.requires_geometry")," and ",Object(r.b)("inlineCode",{parentName:"p"},"brix.Indicator.requires_geogrid_props"),". These two properties are set to ",Object(r.b)("inlineCode",{parentName:"p"},"False")," by default, but you can change them inside the ",Object(r.b)("inlineCode",{parentName:"p"},"brix.Indicator.setup()")," function depending on the needs of your indicator."),Object(r.b)("p",null,"Go ahead, take a look at how this object looks like by instantiating your class and linking it to a table:"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre"},"I = MyIndicator()\nI.link_table('dungeonmaster')\nI.get_geogrid_data()\n")),Object(r.b)("p",null,"Bear in mind that the endpoint ",Object(r.b)("inlineCode",{parentName:"p"},"GEOGRIDDATA")," is created only after your first edit to the table. If you just created your table, you need to go to the front end and edit the table at least once for ",Object(r.b)("inlineCode",{parentName:"p"},"GEOGRIDDATA")," to show up."),Object(r.b)("p",null,"Please note that the ",Object(r.b)("inlineCode",{parentName:"p"},"brix.Indicator.link_table()")," should only be used when developing the indicator. For deployment, we\u2019ll use the ",Object(r.b)("inlineCode",{parentName:"p"},"brix.Handler")," class that is more efficient. You can also skip the ",Object(r.b)("inlineCode",{parentName:"p"},"brix.Indicator.link_table()")," step by defining the ",Object(r.b)("inlineCode",{parentName:"p"},"Indicator.table_name='dungeonmaster'")," property in your ",Object(r.b)("inlineCode",{parentName:"p"},"setup")," function. You will also notice that as you change the ",Object(r.b)("inlineCode",{parentName:"p"},"brix.Indicator.requires_geometry")," and ",Object(r.b)("inlineCode",{parentName:"p"},"brix.Indicator.requires_geogrid_props")," parameters in ",Object(r.b)("inlineCode",{parentName:"p"},"setup"),", the output of ",Object(r.b)("inlineCode",{parentName:"p"},"brix.Indicator.get_geogrid_data()")," will change."),Object(r.b)("p",null,"If you are testing and are curious how ",Object(r.b)("inlineCode",{parentName:"p"},"geogrid_data")," would look like if you set ",Object(r.b)("inlineCode",{parentName:"p"},"requires_geometry=True"),", you can pass the argument to ",Object(r.b)("inlineCode",{parentName:"p"},"get_geogrid_data"),":"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre"},"I.get_geogrid_data(include_geometries=True)\n")),Object(r.b)("p",null,"Please note that ",Object(r.b)("inlineCode",{parentName:"p"},"geogrid_data")," behaves very much like a list, but it is not a list. It belongs to the class ",Object(r.b)("inlineCode",{parentName:"p"},"brix.GEOGRIDDATA"),", which is an extension of a list to include additional functions and properties related to the table. For example, you can get the meta-properties of the table (such as type definitions, location, etc.) by using ",Object(r.b)("inlineCode",{parentName:"p"},"brix.GEOGRIDDATA.get_geogrid_props()"),". This is useful if, for example, you are interested in counting the total number of block types, including those that are not currently on the table. Run the following example to see how geogrid_props looks like:"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre"},"geogrid_data = I.get_geogrid_data()\ngeogrid_data.get_geogrid_props()\n")),Object(r.b)("p",null,"Depending on the needs of your indicator, you can generate different views of this object. For example, you can use ",Object(r.b)("inlineCode",{parentName:"p"},"brix.GEOGRIDDATA.as_df()")," to return the pandas.DataFrame version of your object. Similarly, you can use ",Object(r.b)("inlineCode",{parentName:"p"},"brix.GEOGRIDDATA.as_graph()")," to return the networkx.Graph representation of GEOGRIDDATA. The graph representation is the network connecting every cell to its 4 closest neighbors."),Object(r.b)("h2",{id:"build-and-test-your-indicator-output"},"Build and test your indicator (output)"),Object(r.b)("p",null,"This library ensures that you can focus on what you do best: writing a kick ass ",Object(r.b)("inlineCode",{parentName:"p"},"brix.Indicator.return_indicator()")," function that will make everyone\u2019s urban planning life better."),Object(r.b)("p",null,"To test your function while debugging it, you can use the object returned by ",Object(r.b)("inlineCode",{parentName:"p"},"brix.Indicator.get_geogrid_data()"),":"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre"},"geogrid_data = I.get_geogrid_data()\nI.return_indicator(geogrid_data)\n")),Object(r.b)("p",null,"The property ",Object(r.b)("inlineCode",{parentName:"p"},"brix.Indicator.indicator_type")," will toggle between a Heatmap indicator or a numeric indicator (",Object(r.b)("inlineCode",{parentName:"p"},"numeric")," for numeric and ",Object(r.b)("inlineCode",{parentName:"p"},"heatmap")," for heatmap)."),Object(r.b)("p",null,"For numeric indicators, there are multiple ways in which the front end can display them (e.g. bar chart, radar plot, etc.). This is controlled by the ",Object(r.b)("inlineCode",{parentName:"p"},"brix.Indicator.viz_type")," property of the class. The default value is set to ",Object(r.b)("inlineCode",{parentName:"p"},"self.viz_type=radar")," which means that unless it is specified otherwise, all numeric indicators will be added to the radar plot. When building an indicator that returns a single number you can just change the value of this parameter in the ",Object(r.b)("inlineCode",{parentName:"p"},"brix.Indicator.setup()"),". When building an indicator that returns multiple numbers it will just assume every number should be displayed in the same front end visualization. If you want to have more fine control of where each indicator is displayed, we recommend building your return_indicator function such that it returns a dictionary with the following structure:"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre"},"{\n        'name': 'Social Wellbeing',\n        'value': random.random(),\n        'viz_type': 'bar'\n}\n")),Object(r.b)("p",null,"Note that if you define ",Object(r.b)("inlineCode",{parentName:"p"},"viz_type")," in the return dictionary of ",Object(r.b)("inlineCode",{parentName:"p"},"return_indicator"),", it will overwrite any default property defined in ",Object(r.b)("inlineCode",{parentName:"p"},"setup"),". Remember that your ",Object(r.b)("inlineCode",{parentName:"p"},"return_indicator")," function can also return a list of indicators. In the following example of a return value for the ",Object(r.b)("inlineCode",{parentName:"p"},"return_indicator")," function, the indicator returns two numbers that should be displayed in the radar plot, and one to be displayed as a bar chart."),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre"},"[\n        {'name': 'Social Wellbeing', 'value': 0.3, 'viz_type': 'radar'},\n        {'name': 'Environmental Impact', 'value': 0.1, 'viz_type': 'radar'},\n        {'name': 'Mobility Impact', 'value': 0.5, 'viz_type': 'bar'}\n]\n")),Object(r.b)("h2",{id:"deploy-your-indicator"},"Deploy your indicator"),Object(r.b)("p",null,"Finally, once you have build a series of indicators, the right way to deploy them is to use the ",Object(r.b)("inlineCode",{parentName:"p"},"brix.Handler")," class. A ",Object(r.b)("inlineCode",{parentName:"p"},"brix.Handler")," object should be the go-to connection to the table and will handle all possible exceptions. The two most important methods are ",Object(r.b)("inlineCode",{parentName:"p"},"brix.Handler.add_indicators()")," which takes a list of ",Object(r.b)("inlineCode",{parentName:"p"},"brix.Indicator")," objects and connects them to the table, and ",Object(r.b)("inlineCode",{parentName:"p"},"brix.Handler.listen()")," that is a method that runs continuously waiting for updates in the CityScope table. This method can also creates its own thread, to free up the main thread in case the user needs to connect to other tables (by setting ",Object(r.b)("inlineCode",{parentName:"p"},"new_thread=True"),"). The example below assumes you have already defined indicators named Density, Diversity and Proximity in a file named ",Object(r.b)("inlineCode",{parentName:"p"},"myindicators.py"),"."),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre"},"from brix import Handler\nfrom myindicators import Density, Diversity, Proximity\n\ndens = Density()\ndivs = Diversity()\nprox = Proximity()\n\nH = Handler('dungeonmaster', quietly=False)\nH.add_indicators([\n        dens,\n        divs,\n        prox\n])\nH.listen()\n")),Object(r.b)("p",null,"To see the indicators in the handler you can use ",Object(r.b)("inlineCode",{parentName:"p"},"H.list_indicators()")," to list the indicator names, and use ",Object(r.b)("inlineCode",{parentName:"p"},"H.return_indicator(<indicator_name>)")," to see the value of the indicator. Finally, the function ",Object(r.b)("inlineCode",{parentName:"p"},"H.update_package()")," will return the data that will be posted on CityIO."),Object(r.b)("h2",{id:"additional-tools"},"Additional tools"),Object(r.b)("p",null,"This module also contains a set of other useful functions that integrate with ",Object(r.b)("inlineCode",{parentName:"p"},"brix.Handler")," and ",Object(r.b)("inlineCode",{parentName:"p"},"brix.Indicator"),"."),Object(r.b)("p",null,"The functions ",Object(r.b)("inlineCode",{parentName:"p"},"brix.get_OSM_geometries()")," and ",Object(r.b)("inlineCode",{parentName:"p"},"brix.get_OSM_nodes()")," help you get data from Open Street Maps for your table."),Object(r.b)("h3",{id:"auto-updates-of-geogriddata"},"Auto-updates of GEOGRIDDATA"),Object(r.b)("p",null,"Brix also has the capability of automatically updating GEOGRIDDATA. For simple one-time updates, follow the documentation of ",Object(r.b)("inlineCode",{parentName:"p"},"brix.Handler.update_geogrid_data()"),". To use this feeature, you first need to define a function that takes a ",Object(r.b)("inlineCode",{parentName:"p"},"brix.GEOGRIDDATA")," as an input. When used with ",Object(r.b)("inlineCode",{parentName:"p"},"brix.Handler.update_geogrid_data()"),", this function can take any number of keyword arguments. The following example raises the height of all cells by 3 units:"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre"},"def add_height(geogrid_data, levels=1):\n        for cell in geogrid_data:\n                cell['height'] += levels\n        return geogrid_data\n\nH = Handler('dungeonmaster', quietly=False)\nH.update_geogrid_data(add_height,levels=3)\n")),Object(r.b)("p",null,"Brix also supports GEOGRIDDATA updates everytime there is a registered user interaction in the front end. To add a function to the update schedule, use ",Object(r.b)("inlineCode",{parentName:"p"},"brix.Handler.add_geogrid_data_update_function()"),". This has the limitation that your update funcion cannot take in any arguments other. If this limitation proves too restrictive, please submit an issue and we\u2019ll consider pushing an update."),Object(r.b)("p",null,"The following example updates the whole grid to Light Industrial use everytime there\u2019s a user interaction:"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre"},"def update_g(geogrid_data):\n        for cell in geogrid_data:\n                cell['name'] = 'Light Industrial'\n        return geogrid_data\n\nH = Handler(table_name,quietly=False)\nH.add_geogrid_data_update_function(update_g)\nH.listen()\n")),Object(r.b)("p",null,"The updates triggered by ",Object(r.b)("inlineCode",{parentName:"p"},"brix.Handler.listen()")," follow the following order:"),Object(r.b)("ol",null,Object(r.b)("li",{parentName:"ol"},"get GEOGRIDDATA")),Object(r.b)("ol",{start:2},Object(r.b)("li",{parentName:"ol"},"run all GEOGRIDDATA updates using the result of 1 as input")),Object(r.b)("ol",{start:3},Object(r.b)("li",{parentName:"ol"},"get the new GEOGRIDDATA")),Object(r.b)("ol",{start:4},Object(r.b)("li",{parentName:"ol"},"update all indicators using the GEOGRIDDATA object resulting from 3")))}s.isMDXComponent=!0},85:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return h}));var i=n(0),a=n.n(i);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function d(e,t){if(null==e)return{};var n,i,a=function(e,t){if(null==e)return{};var n,i,a={},r=Object.keys(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=a.a.createContext({}),s=function(e){var t=a.a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},u=function(e){var t=s(e.components);return a.a.createElement(c.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},b=a.a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,r=e.originalType,o=e.parentName,c=d(e,["components","mdxType","originalType","parentName"]),u=s(n),b=i,h=u["".concat(o,".").concat(b)]||u[b]||p[b]||r;return n?a.a.createElement(h,l(l({ref:t},c),{},{components:n})):a.a.createElement(h,l({ref:t},c))}));function h(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=n.length,o=new Array(r);o[0]=b;var l={};for(var d in t)hasOwnProperty.call(t,d)&&(l[d]=t[d]);l.originalType=e,l.mdxType="string"==typeof e?e:i,o[1]=l;for(var c=2;c<r;c++)o[c]=n[c];return a.a.createElement.apply(null,o)}return a.a.createElement.apply(null,n)}b.displayName="MDXCreateElement"}}]);