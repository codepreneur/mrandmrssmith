# Mr and Mrs Smith App

React front-end for Mr and Mrs Smith.


## Environment setup and installation

### Node and NPM

Project should be preferably used with [NVM](https://github.com/creationix/nvm).

After NVM is installed and setup then run in the root of the project unless
you have the auto detection of the `.nvmrc` file enabled:

```
nvm install && nvm use
```

Never update Node nor NPM manually always specify version of Node in `.nvmrc`
file. When updating the Node version also update the Node to the same version in
the other config file for things like CircleCI, Docker, etc.

Node comes with specific version on NPM by default so this will ensure people
will have the same NPM while installing and prevent from structural differences
of `package-lock.json`.


### Bootstrap

```
npm install
```


## Development

Project is using [Parcel](https://parceljs.org/getting_started.html).

To start the dev build with watch and hot-reloading:

```
npm start
```

Application runs on `http://localhost:9999`.

### Code formatting

[Prettier](https://prettier.io/) is setup to run on staged files - pre-commit
hook ([Husky](https://github.com/typicode/husky))

Trigger formating manually (all files) by:

```
npm run format
```

### Linting

[ESLint](https://eslint.org/) with [React plugin](https://github.com/yannickcr/eslint-plugin-react),
both with the recommended settings used. Code style linting is disabled by
using the Prettier plugin since the formatting is handled by Prettier itself.

The linting is also automatically trigged on the staged files on pre-commit.

To run the linting manually on all files:

```
npm run lint
```

### Unit testing

[Jest](https://jestjs.io/) is used as a test framework, also setup with
[Enzyme](https://github.com/airbnb/enzyme/).

To run the test:

```
npm run unit-test
```

To watch the tests:

```
npm run unit-test -- --watch
```

If you will get _"Error: EMFILE: too many open files, watch"_ install `watchman` -
on macOS:

```
brew install watchman
```

To locally generate code coverage report:

```
npm run unit-test-coverage
```

### Full test - CI task

Run tests with code coverage report and lints code.

```
npm test
```

There is a special variant of the `unit-test` task used for CI that runs as a
part of the `test` task. It includes optimisations that are necessary to lower
the memory footprint on the CI machines that doesn't have much resources. Also
enables the CI mode in Jest that will fail on missing snapshots instead of
creating them as is the default behaviour. Lastly it generates JUnit report that
can be used on CI to display the more details results.

```
npm run unit-test-ci
```

### Conventional commits

Commit message linting is put in place (commit-msg hook).

* [Conventional Commits](https://conventionalcommits.org/)
* [Preset spec](https://github.com/bcoe/conventional-changelog-standard/blob/master/convention.md)
* [Linting rules](https://github.com/marionebl/commitlint/tree/master/@commitlint/config-conventional)
* [Changelog](https://github.com/conventional-changelog/conventional-changelog)

#### The commit message structured

```
<type>[optional scope]: <description>

[optional body]

[optional footer]
```

#### Types

* **chore** - Build process or auxiliary tool changes
* **ci** - CI related changes
* **docs** - Documentation only changes
* **feat** - A new feature
* **fix** - A bug fix
* **perf** - A code change that improves performance
* **refactor** - A code change that neither fixes a bug or adds a feature
* **revert** - A commit that reverts a previous commit
* **style** - Markup, white-space, formatting, missing semi-colons…
* **test** - Adding missing tests

#### Examples

Commit message with description and breaking change in body:

```
feat: allow provided config object to extend other configs

BREAKING CHANGE: `extends` key in config file is now used for extending other config files
```

Commit message with no body:

```
docs: correct spelling of CHANGELOG
```

Commit message with scope:

```
feat(lang): added polish language
```

Commit message for a fix using an (optional) issue number:

```
fix: minor typos in code

see the issue for details on the typos fixed

Fixes #12
```

### Git Flow

More details: [A successful Git branching model](https://nvie.com/posts/a-successful-git-branching-model/)

* `master` branch
  * latest commit is what is currently running in production env
  * branch is automatically deployed to prod when new stuff gets merged in
  * protected branch - no direct pushes, only PRs
  * new releases (merged releases) should be tagged with the version
* `develop` branch
  * latest commit is what is currently running in dev env
  * branch is automatically deployed to prod when new stuff gets merged in
  * release branches are cut from this branch
  * protected branch - no direct pushes, only PRs
* `release-x.x.x` branch
  * cut from develop branch
  * only one release branch active
  * just bug fixes and release related chores (changelog and version bump)
    pushed in this branch
  * merged to master and also back to develop
* `hotfix-x.x.x` branch
  * cut from master branch
  * very much like release branch but unplanned stuff like bug fixes etc.
  * includes also release related chores (changelog and version bump)
  * merged to master and also back to develop
  * when a release branch currently exists, the hotfix changes need to be merged
    into that release branch, instead of develop
* _feature (other)_ branches
  * all other branches apart from the above mentioned
  * branches that are used for actual development
  * through PRs merged to develop branch
  * usually named using the convention commit types as prefixes - example:
    `feat-*`, `fix-*`, `refactor-*`, `test-*`, etc.

To preview how the next release will look like and which version number it will
receive:

```
git checkout develop
npm run next-release
```

To cut new release:

```
git checkout -b release-x.x.x develop
```

When the release branch is ready for a PR run following to do the version bump
and change log generation:

```
npm run release
```


## Production

To build the app in production mode use:

```
npm run build
```

Build artifacts are located in `/dist`.


## Other commands/scripts

### Serving static files locally

To serve the static files (build artifacts) from the `dist` folder:

```
npm run serve
```

### Clean scripts

To clean working directory:

```
npm run clean
```

It is also possible to use the individual clean up tasks:

* `npm run clean:cache` - Parcel bundler cache dir
* `npm run clean:coverage` - Coverage report generated by Jest
* `npm run clean:dist` - Build artefacts generated by Parcel
* `npm run clean:reports` - Report files such as JUnit.xml
