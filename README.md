# Paint2Help
## General
### Topic

## Application Insights

### How to add Client Side Telemetry (RUM)?
https://docs.microsoft.com/en-us/azure/azure-monitor/app/javascript

Add the Application Insights JavaScript SDK to your web page or app via one of the following two options:

- npm Setup
- JavaScript Snippet

The RUM snipped itself can be configured as described here:
https://docs.microsoft.com/en-us/azure/azure-monitor/app/javascript#snippet-configuration-options

## How to match client to server events?


operation_Name
GET /autsch/autsch.png

operation_Id
4767bf7b6d75478c90a81def2f8ea970

operation_ParentId
4767bf7b6d75478c90a81def2f8ea970

session_Id
Dg7dedsP4JUx75wV9Nn3Xq

user_Id
/xwjkT2MxCewXyu8TTwhMd


operation_Name
GET /autsch/

operation_Id
262154cc965b42169f1565822c59d99d

operation_ParentId
262154cc965b42169f1565822c59d99d

session_Id
Dg7dedsP4JUx75wV9Nn3Xq

user_Id
/xwjkT2MxCewXyu8TTwhMd



### Can I find the Pageview events inside the Browser?

Inside the browser you can call the AI object as follow:

~~~~JavaScript
appInsights.version
appInsights.context.internal.snippetVer
~~~~

### When will Server Events be send?

maxBatchSize and this.maxBatchIntervalMs are the parameters which needs to be configured:

- When buffer exceeds batch size (default to 250)
- When timeout period exceeded (default to 15,000 milliseconds)

### How does Session Management work on Client and Server?

AI does set a cookie at client which will be send with each Request (Basepage and Embedded Objects):

For Basepages:

~~~~http
GET /stella/ HTTP/1.1
Cookie: ai_user=/xwjkT2MxCewXyu8TTwhMd|2021-03-02T00:00:01.183Z; ai_session=2xnBkXX9LexnNX0S/sLrc9|1614688057129|1614688057129
~~~~

For Embbeded Objects:

~~~~http
GET /javascripts/plugins/unitegallery/css/unite-gallery.css HTTP/1.1
Cookie: ai_user=/xwjkT2MxCewXyu8TTwhMd|2021-03-02T00:00:01.183Z; ai_session=2xnBkXX9LexnNX0S/sLrc9|1614688057129|1614688057129
~~~~

This value can also be found inside the envlopment data 

~~~~JSON
ai.session.id: "2xnBkXX9LexnNX0S/sLrc9"
ai.user.id: "/xwjkT2MxCewXyu8TTwhMd"
~~~~

This value will be match with the corresponding values on server side.

### Which kind of data does the client (RUM) send?

Data send by the Client is classified by baseTypes: 

- MetricData (e.g. PageVisitTime)
- PageviewData (e.g. duration)
- PageviewPerformanceData (e.g. receivedResponse)

NOTE: Can be seen inside the Data send via the https://dc.services.visualstudio.com/v2/track POST request.

### How to verify if sampling is used?

sampling Percentage can be configured on Client and Server.

You can verify if sampling is used from the azure logs

~~~~Kusto
union requests,dependencies,pageViews,browserTimings,exceptions,traces
| where timestamp > ago(1d)
| summarize RetainedPercentage = 100/avg(itemCount) by bin(timestamp, 1h), itemType
~~~~

### How to match W3C Nav Time API

- https://docs.microsoft.com/en-us/azure/azure-monitor/app/javascript#explore-browserclient-side-data

Example of Report in myedge.org tenant:

- https://portal.azure.com/#@myedge.org/blade/Microsoft_Azure_MonitoringAz/MetricsV4/Referer/MetricsExplorer/ResourceId/%2Fsubscriptions%2Ff474dec9-5bab-47a3-b4d3-e641dac87ddb%2FresourceGroups%2Fpaint2help-rg%2Fproviders%2Fmicrosoft.insights%2Fcomponents%2Fpaint2help/TimeContext/%7B%22relative%22%3A%7B%22duration%22%3A86400000%7D%2C%22showUTCTime%22%3Afalse%2C%22grain%22%3A1%7D/ChartDefinition/{"isCompressed":true,"value":"eJzVlEGP0zAQhf%2BK5XNC1DRQ6A2BxAGBELvigvbg2NNkRGKbGSe7pcp%2FZ9J0tQuLllul5uQ48948fxP5oMfStoYS6%2B33g%2B4hEdplTcBhIAufIBlnktHbg0ant7rgoWZLGBMGz8Wu2lQO7Jv8ZW3qvNqYdV5Xbp3Dq2rljH29ca4u7s0%2BUBgiF9GgT2ULXcypKSKFER0QFz1aChx26QV6xqZNXNjQx%2BDBp8cqPWXamx4kTU3hloGusUffcOEh3Qb68X4gM8fTmTZNQ9Ac3673USTVouVo7GzwbE%2FRL0y%2BIQ%2Bmw1%2BLq6BwyLEz%2B89Lii%2BmAdUF49QpgLLBe7BJJZSCacouFSiDd%2BemeSU9FcHPAfjyARJYwBHOzfDrsa0kEJAsWoaLJyleFphlfW6Y7zqUcvUQ4J7lTaYTpm6ueTs26vlrIFNzzZOfO1NGdkoVUgukTlew2gVSj6Cc%2BnxEL2NaZXr8O%2FDxFl8IrDPdQSNtnpwKWbawnvMmGiDTMTAuH8tMtzKoq6E%2BHWhnOgaZhbk7qv40uvun21y6RChFuP9PzWqS52b6DS9uXX4%3D"}


Channel.js to see the collected payloads.

### How to retrieve logs via CLI?

NOTE: Make sure the corresonding CLI Module is installed:

~~~~pwsh
az extension add --name application-insights
~~~~


~~~~pwsh
az monitor app-insights query --apps paint2help -g paint2help-rg --analytics-query 'pageViews | where timestamp > datetime("2021-03-06T16:12:00.000Z") and timestamp < datetime("2021-03-06T16:20:00.000Z") | where cloud_RoleName ==\"Gotham-Angular\"' -o jsonc
~~~~

### How to get my AI appid?

~~~~bash
curl  https://dc.services.visualstudio.com/api/profiles/e1e6db5e-75e1-4917-b29a-4daf09a2ec2e/appId

63c1fb8e-087e-480e-9776-23228f0a6f22
~~~~


## Good Examples:
- https://github.com/guidoipsy/dependabot-demo
- 
- 
- 
- 