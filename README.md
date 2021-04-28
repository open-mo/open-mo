# open-mo

:warning: This is a work-in-progress, everything you see now can and probably will change.

## Running the project
We use [lerna](https://github.com/lerna/lerna) to manage our [packages](#packages). Although, in this initial stage we can work in each package individually, so you can check individual running instructions in packages section below. 

## Packages:
### [Client](packages/client)
- Frontend engine's source. Currently in initial stage.

#### Running the project (using packages/client as working directory)
- `yarn setup` to get its dependencies (you'll need parcel globally installed)
- `yarn start:dev` to run the engine (which already supports HMR :fire:)

#### Technologies
- TypeScript
- Pixi.JS
- Parcel


### [Server](packages/server)
- Game server engine and general usage. Will have business rules for the game and state management. See [old-orpg-server](https://github.com/open-mo/old-orpg-server) as a initial reference of how will this be architected. We'll probably have a new individual package such as 'database' for handling all database abstractions*.

*TBD if it's really needed.

####
- TypeScript
- TBD

## Contributing
This repository adheres to [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#summary), and also attempts to follow [The seven rules of a great Git commit message](https://chris.beams.io/posts/git-commit/#seven-rules).

## Roadmap
WIP
