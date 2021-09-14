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
| PORT                 | YES      | ENV         | 8080            | The port that the web app will listen on.     |

## Run in Docker

Simple build:

```bash
docker build -f Dockerfile -t "paint2help/website:1.0" .
```

To build the image for release:

```bash
docker build --no-cache --build-arg IMAGE_VERSION="1.0" --build-arg IMAGE_CREATE_DATE="`date -u +"%Y-%m-%dT%H:%M:%SZ"`" --build-arg IMAGE_SOURCE_REVISION="`git rev-parse HEAD`" -f Dockerfile -t "paint2help/website:1.0" .
```

To run the image

```bash
# Example 1 - Set config values via environment variables
docker run -d -p 8080:80 --name p2h-website -e "PORT=80" paint2help/website:1.0
```

## Testing

Request landing page.

```bash
curl -iv http://localhost:8080/ 
```

## Docker Commands

### How to list containers

~~~~bash
$ docker image ls
~~~~

