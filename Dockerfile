FROM node:12-alpine

ARG IMAGE_CREATE_DATE
ARG IMAGE_VERSION
ARG IMAGE_SOURCE_REVISION

ENV PORT=80 \
    TITLE="paint2help" \
    BGCOLOR="white" \
    CONFIG_FILES_PATH="/secrets"

# Metadata as defined in OCI image spec annotations - https://github.com/opencontainers/image-spec/blob/master/annotations.md
LABEL org.opencontainers.image.title="Paint2Help Node.js Express Web App" \
      org.opencontainers.image.description="Simple Web App to show images." \
      org.opencontainers.image.created=$IMAGE_CREATE_DATE \
      org.opencontainers.image.version=$IMAGE_VERSION \
      org.opencontainers.image.authors="cpinotossi@web.de" \
      org.opencontainers.image.url="https://raw.githubusercontent.com/cpinotossi/paint2help/aks/Dockerfile" \
      org.opencontainers.image.documentation="https://raw.githubusercontent.com/cpinotossi/paint2help/aks/README.md" \
      org.opencontainers.image.vendor="cpinotossi@web.de" \
      org.opencontainers.image.licenses="MIT" \
      org.opencontainers.image.source="https://github.com/cpinotossi/paint2help.git" \
      org.opencontainers.image.revision=$IMAGE_SOURCE_REVISION 

# add debugging utilities
RUN apk --no-cache add \
  curl \
  ca-certificates \
  jq \
  less \
  vim

# bundle app and install dependencies 
COPY . /app
WORKDIR /app
RUN npm install

# run application
EXPOSE $PORT
CMD npm start