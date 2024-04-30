---
id: Build
---

From version 3, the Dockerfile inside the repository can be used for
easy deployment through docker.

It is a two step process, `building` and `running`.

# Building

(make sure you have docker in your system)

``` bash
git clone https://github.com/CityScope/CS_CityIO cityio
cd cityio
docker build -t cityio .
```

This will build the container image to the latest version. `git pull` to
update the code.

# Running

The cityio container assumes that a redis instance is running in
`127.0.0.1:6379` (the default), this can be a docker container itself,
if redis is running inside a different address or/and port, you can
change the what is written in the DockerFile.

``` text
ENV REDIS_ADDR=127.0.0.1
ENV REDIS_PORT=6379
```

With that, the container can run by the following command.

``` bash
docker run -p 8080:8080 --net=host cityio
```

the `--net=host` option is for the container to access the host side
localhosts' ports, to have the container access redis.

This will output the logs in that session, where we usually run cityio
in a tmux session for realtime observation. The `-d` option can be added
to run in deamon mode.
