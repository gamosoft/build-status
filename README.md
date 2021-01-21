# Build status

This is a very simple POC to create a build status page, where you can see at a glance the history of the last N builds.

This uses the free https://my-json-server.typicode.com/ service which is valid for OSS and has some limits (10Kb max file size, 30 items per reply, etc).

If you need more power you can also install the server (https://github.com/typicode/json-server) or host the DB elsewhere.

Check the demo working here: https://gamosoft.github.io/build-status/

Another option can be to just display an image using a service like https://shields.io

![](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/gamosoft/build-status/master/shields-io.json&link=https://github.com/gamosoft&link=https://github.com/gamosoft)

HTH
