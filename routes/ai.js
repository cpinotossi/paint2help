var express = require('express');
var router = express.Router();
const appInsights = require('applicationinsights');
const OS = require('os');

let client = null;
if (process.env.APPINSIGHTS_INSTRUMENTATIONKEY) {
  delete process.env.APPLICATION_INSIGHTS_NO_DIAGNOSTIC_CHANNEL
  const appInsights = require('applicationinsights');
  appInsights.setup();
  appInsights.defaultClient.context.tags[appInsights.defaultClient.context.keys.cloudRole] = "paint2help";
  appInsights.defaultClient.context.tags[appInsights.defaultClient.context.keys.cloudRoleInstance] = OS.hostname();
  appInsights.defaultClient.config.samplingPercentage = 100;
  appInsights.start();
  
  var config = {
    target: "http://localhost:3000", 
    dependencyTypeName: "HTTP",
    name: "paint2help"
  }
  appInsights.defaultClient.trackDependency(config);
} else {
  console.log("Cannot init AI because of missing AI Key env variable.")
}

router.get('/', function (req, res, next) {
  if (client) {
    console.log("AI was called server side from %s", req.baseUrl);
  }
  next();
});

module.exports = router;