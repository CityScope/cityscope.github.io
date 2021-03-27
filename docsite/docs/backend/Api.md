---
id: API
---

Here is a list of APIs exposed for cityio.

# list tables

``` bash
curl https://cityiotest.mirage.city/api/tables/list/
```

``` text
["test"]
```

# get a table

``` bash
curl https://cityiotest.mirage.city/api/table/test/ | jq .
```

`| jq .` is just to pretty format the result.

``` text
{
  "data": 42,
  "grid": [
    0,
    1,
    0
  ],
  "meta": {
    "hash": "BGuzwcPaxADXvLkR2uciX1pkRumFGJV25UENUur4mUfa",
    "hashes": {
      "data": "8kzzuAWtRcnhd4SnD2zeEuieq5VtuA8nsNcBgzpRaLuE",
      "grid": "D9VCvyZn98K9BfSAX26Nm22DTsCfbULokywhdTFKs9Ca"
    },
    "id": "F4tCJsaHmvqu2VRGht4Z4GdMttEArHewfUKiFFVz1w78",
    "timestamp": "2021-03-27T15:41:45.457952355+00:00"
  }
}
```

# post a table

``` bash
curl -X POST -d '{"grid":[0,1,1]}' \
-H "Content-Type:application/json" \
https://cityiotest.mirage.city/api/table/test/ | jq .
```

``` text
{
  "id": "6xU8W2WTzwMpyX3vQyRxkbKFxVLfpeV6dERkK9ATukBT",
  "name": "test",
  "status": "ok"
}
```

# get deeper data

``` bash
curl https://cityiotest.mirage.city/api/table/test/grid | jq .
```

``` text
[
  0,
  1,
  1
]
```

# post deeper data

``` bash
curl -X POST -d '{"setting":{"cars":true}}' \
-H "Content-Type:application/json" \
https://cityiotest.mirage.city/api/table/test/new_module | jq .
```

``` text
{
  "id": "9Dqq91fFjfL5sse9AKyXoUsYXF3Tg62ALpo6fC2B3epB",
  "status": "ok"
}
```

ver3 lets you send even deeper data, if it's the base data already
exists

``` bash
curl -X POST -d '{"pev": true, "cars":false}' \
-H "Content-Type:application/json" \
https://cityiotest.mirage.city/api/table/test/new_module/setting | jq .
```

``` text
{
  "commit": "BTLvsmmQbJc5JiMZEsrhzMFgBjRRxcH8irDKz99WbC3b",
  "status": "ok"
}
```

this case the commit changes

# delete table

``` bash
curl -X DELETE https://cityiotest.mirage.city/api/table/test/
```

``` text
ok
```

``` bash
curl https://cityiotest.mirage.city/api/tables/list/
```

``` text
[]
```

# dump data

``` bash
curl https://cityiotest.mirage.city/api/dump/ | jq .
```

This gives a good overview of how cityio is internally saving data.

``` text
{
  "blob": [
    {
      "setting": {
        "cars": true
      }
    },
    [
      0,
      1,
      0
    ],
    42,
    "hello",
    {
      "setting": {
        "cars": false,
        "pev": true
      }
    },
    [
      0,
      1,
      1
    ]
  ],
  "commit": [
    {
      "parent": "oPuhrsgmJU3aUS5pc2StUrftqUwTDUX3tEweF4NE4fD",
      "timestamp": "2021-03-27T15:41:45.457952355+00:00",
      "tree_id": "BGuzwcPaxADXvLkR2uciX1pkRumFGJV25UENUur4mUfa"
    },
    {
      "parent": "F4tCJsaHmvqu2VRGht4Z4GdMttEArHewfUKiFFVz1w78",
      "timestamp": "2021-03-27T15:44:52.177075895+00:00",
      "tree_id": "TCMSkt5Sy4MBqb1p6ve6t85CzKyTcuGexgvsHpm26tL"
    },
    {
      "parent": "0",
      "timestamp": "2021-03-27T15:02:32.840592341+00:00",
      "tree_id": "55qnpsNMspv9kJJuvQKvoq51s8kRoTN3YX11mVirKnRn"
    },
    {
      "parent": "9Dqq91fFjfL5sse9AKyXoUsYXF3Tg62ALpo6fC2B3epB",
      "timestamp": "2021-03-27T15:50:19.380681197+00:00",
      "tree_id": "BKLV9yuZB4fQmdPfgBqf3dNAWendRvCnMbjM4JBGEYdo"
    },
    {
      "parent": "BTLvsmmQbJc5JiMZEsrhzMFgBjRRxcH8irDKz99WbC3b",
      "timestamp": "2021-03-27T17:04:55.305024404+00:00",
      "tree_id": "UeD3pVhfBUrnoUjRbVR4W9Sh35gw2zBnWZu86qYFyBg"
    },
    {
      "parent": "6xU8W2WTzwMpyX3vQyRxkbKFxVLfpeV6dERkK9ATukBT",
      "timestamp": "2021-03-27T15:48:17.106557974+00:00",
      "tree_id": "8tFUU1YRaENHRBdsWg5q8FFC7jgwZi2Uxi9HAApDsVo1"
    }
  ],
  "tag": [
    {
      "commit": "GmJxu8Lq4vT2xx2HaW9nrmTJdprdKkkrFYFkQ8Mq8UcC",
      "name": "test"
    }
  ],
  "tree": [
    {
      "data": "8kzzuAWtRcnhd4SnD2zeEuieq5VtuA8nsNcBgzpRaLuE",
      "grid": "J1XtoDM5DGKZt97qBy3krz3ihhdtD9mJaxNMf62BAJhU",
      "new_module": "2tBViau8ebNWqxbxvqu5pjwFeMk7KjHCVRG4A7e7gubY"
    },
    {
      "data": "8kzzuAWtRcnhd4SnD2zeEuieq5VtuA8nsNcBgzpRaLuE",
      "grid": "D9VCvyZn98K9BfSAX26Nm22DTsCfbULokywhdTFKs9Ca"
    },
    {
      "data": "8kzzuAWtRcnhd4SnD2zeEuieq5VtuA8nsNcBgzpRaLuE",
      "grid": "J1XtoDM5DGKZt97qBy3krz3ihhdtD9mJaxNMf62BAJhU"
    },
    {
      "data": "8kzzuAWtRcnhd4SnD2zeEuieq5VtuA8nsNcBgzpRaLuE",
      "grid": "J1XtoDM5DGKZt97qBy3krz3ihhdtD9mJaxNMf62BAJhU",
      "new_module": "76sjJZQF22BsNYdTP71xpFTHwquQqXzwbfVPiQe5dsYm"
    },
    {
      "data": "8kzzuAWtRcnhd4SnD2zeEuieq5VtuA8nsNcBgzpRaLuE"
    },
    {
      "data": "8kzzuAWtRcnhd4SnD2zeEuieq5VtuA8nsNcBgzpRaLuE",
      "grid": "J1XtoDM5DGKZt97qBy3krz3ihhdtD9mJaxNMf62BAJhU",
      "new_module": "B8UAsPeLZskSvLDiWffD1vruGewxMBhMNwQF7xipQpGP"
    }
  ]
}
```

# get module by Id

a `module` is recorded as `blob`. Files are recorded as `blobs` in git.

``` bash
curl https://cityiotest.mirage.city/api/module/8kzzuAWtRcnhd4SnD2zeEuieq5VtuA8nsNcBgzpRaLuE/
```

``` text
42
```

# get hashes by Id

the `hashes` entry in the meta is recorded as a `tree`. Directories are
recorded as `trees` in git.

``` bash
curl https://cityiotest.mirage.city/api/hashes/BGuzwcPaxADXvLkR2uciX1pkRumFGJV25UENUur4mUfa/ | jq .
```

``` text
{
  "data": "8kzzuAWtRcnhd4SnD2zeEuieq5VtuA8nsNcBgzpRaLuE",
  "grid": "D9VCvyZn98K9BfSAX26Nm22DTsCfbULokywhdTFKs9Ca"
}
```

# get a commit by Id (and roll back)

``` bash
curl https://cityiotest.mirage.city/api/commit/GmJxu8Lq4vT2xx2HaW9nrmTJdprdKkkrFYFkQ8Mq8UcC/ | jq .
```

``` text
{
  "tree_id": "UeD3pVhfBUrnoUjRbVR4W9Sh35gw2zBnWZu86qYFyBg",
  "parent": "BTLvsmmQbJc5JiMZEsrhzMFgBjRRxcH8irDKz99WbC3b",
  "timestamp": "2021-03-27T17:04:55.305024404+00:00"
}
```

the `parent` field of this points to other commits. You can roll back to
different states using this endpoint.

``` bash
curl https://cityiotest.mirage.city/api/commit/BTLvsmmQbJc5JiMZEsrhzMFgBjRRxcH8irDKz99WbC3b/ | jq .
```

``` text
{
  "tree_id": "BKLV9yuZB4fQmdPfgBqf3dNAWendRvCnMbjM4JBGEYdo",
  "parent": "9Dqq91fFjfL5sse9AKyXoUsYXF3Tg62ALpo6fC2B3epB",
  "timestamp": "2021-03-27T15:50:19.380681197+00:00"
}
```

# Post a table by 'tagging', similar to branching

``` bash
curl -X POST https://cityiotest.mirage.city/api/table/raw/new_table/BTLvsmmQbJc5JiMZEsrhzMFgBjRRxcH8irDKz99WbC3b/ | jq .
```

``` bash
curl https://cityiotest.mirage.city/api/tables/list/
```

``` text
["new_table","test"]
```

This can be seen as branching, or copying states. You can force merge if
you have a commit id to overwrite.
