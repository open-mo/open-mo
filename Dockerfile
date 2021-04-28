FROM node:14.16-alpine as node_base

FROM node_base as client_deps
WORKDIR /app
COPY packages/client/package.json ./packages/client/package.json
COPY packages/client/yarn.lock ./packages/client/yarn.lock
WORKDIR /app/packages/client
RUN apk --no-cache --virtual build-dependencies add \
    python \
    make \
    g++ \
    && yarn \
    && yarn global add parcel-bundler

FROM node_base as client
WORKDIR /app

COPY --from=client_deps /app/packages/client/node_modules /app/packages/client/node_modules
COPY . /app

EXPOSE 1234
CMD /bin/sh -c "cd packages/client && yarn start:dev"
