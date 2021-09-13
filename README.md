# Paint2Help

## General

Simple Node.js Web App based on express.js.

## Configuration

paint2help is configured via the variables in the table below.

The value for a configuration variable may be specified via an environment variable (ENV) or as the contents of a file. If the file method is used, then the filename must be the name of the variable. The following describes the precedence used for obtaining a configuration value:

1. Content of file located in `/secrets` path. Example: `/secrets/PORT`
2. Value of environment variable. Example: `$PORT`
3. Default value for configuration variable. Example: `80`

| Name                 | Required | Type        | Default Value | Description                                   |
|----------------------|----------|-------------|---------------|-----------------------------------------------|
| PORT                 | YES      | ENV         | 80            | The port that the web app will listen on.     |

