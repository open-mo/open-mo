# open-mo

:warning: This is a work-in-progress, everything you see now can and probably will change.

## Running the project
<sup>Disclaimer that I know that this setup not being the best right now. Things will be better. Feel free to suggest changes and open PRs regarding this.</sup>
- `cp .env.client.sample ./packages/client/.env` to get client environment
- `cp .env.server.sample ./packages/server/.env` to get server environment
- `yarn setup` to get dependencies from both client and server
- `yarn client` to start client
- `yarn server` to start server

## Packages:
### [Client](packages/client)
- Frontend engine's source. Currently in initial stage.

#### Running the project (using packages/client as working directory)
- `yarn` to get its dependencies
- `yarn dev` to run the engine (which already supports HMR :fire:)

#### Technologies
- TypeScript
- Pixi.JS
- Parcel


### [Server](packages/server)
- Game server engine and general usage. Will have business rules for the game and state management. See [old-orpg-server](https://github.com/open-mo/old-orpg-server) as a initial reference of how will this be architected. We'll probably have a new individual package such as 'database' for handling all database abstractions*.

<supb>:warning: - missing build script and start script for compiled code.</supb>

*TBD if it's really needed.

####
- TypeScript
- TBD

#### Running the project (using packages/server as working directory)
- `yarn`
- `yarn dev`

## Contributing
This repository adheres to [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#summary), and also attempts to follow [The seven rules of a great Git commit message](https://chris.beams.io/posts/git-commit/#seven-rules).

## Roadmap
WIP
