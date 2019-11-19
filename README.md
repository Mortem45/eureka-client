# Welcome to StackEdit!

A JavaScript implementation of a client for Eureka ([https://github.com/Mortem45/eureka-client](https://github.com/Mortem45/eureka-client))


# Usage

First, install the module into your node project:

    npm install eureka-client-node --save

## Import Packege

    const { eurekaClient } = require('eureka-client-node')
    //OR
    import { eurekaClient } from 'eureka-client-node'


## Instance

    eurekaClient(UrlServer, AppName, AppPort)

## Example with Express

    'use strict'

    const  express  =  require('express')
    const { eurekaClient } =  require('eureka-client-node')

    const  app  =  express()
    const  port  =  3000
    const  appName  =  'MyApp'
    const  urlEureka  =  'http://localhost:8761'

    app.get('/', (req, res)  =>  res.send('Hello World!'))

    app.listen(port, ()  =>  {
    	eurekaClient(urlEureka, appName, port)
    	console.log(`Example app listening on ${port} port!`)
    })
