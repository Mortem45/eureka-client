'use strict'

const ip = require('ip')
const request = require('request')
const chalk = require('chalk')

function eurekaClient (uriServer, appName, port) {
  const eurekaUrl = uriServer
  console.log(chalk.green(`Registering [${appName}] to Eureka`))
  request.post(
    {
      headers: { 'content-type': 'application/json' },
      url: `${eurekaUrl}/apps/${appName}`,
      body: JSON.stringify({
        instance: {
          hostName: `localhost`,
          instanceId: `${appName}-${port}`,
          vipAddress: `${appName}`,
          app: `${appName.toUpperCase()}`,
          ipAddr: ip.address(),
          status: `UP`,
          port: {
            $: port,
            '@enabled': true
          },
          dataCenterInfo: {
            '@class': `com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo`,
            name: `MyOwn`
          }
        }
      })
    },
    (error, response, body) => {
      if (!error) {
        console.log(chalk.green('Registered with Eureka'))
        setInterval(() => {
          request.put(
            {
              headers: { 'content-type': 'application/json' },
              url: `${eurekaUrl}/apps/${appName}/${appName}-${port}`
            },
            (error,
            response,
            body => {
              if (error) {
                console.log(chalk.red('The sending of pulses to Eureka failed'))
              } else {
                console.log(
                  chalk.green('Successfully sent of pulses to Eureka')
                )
              }
            })
          )
        }, 100000)
      } else {
        console.log(chalk.red(`Not registered with eureka due to: ${error}`))
      }
    }
  )
}

module.exports = {
  eurekaClient
}
