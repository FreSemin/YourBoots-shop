# YourBootsShopApp

[See app](https://yourboots.netlify.app)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Secret file for server

In this file link to database and 'jwt' string for server work.

- You need to have 'secrets' folder on one level with 'src', 'node_modules',
- You need to have file 'secrets.js' in folder 'secrets'.

What strings you need?
| String | Where you can get |
| ------ | ------ |
| MongoDB Data Base connection | https://docs.atlas.mongodb.com/driver-connection/ |
|JWT (Json Web Token) for verify (see example) | you need thing by yourself |

File structure example:

```sh
const mongoDBConnectStr =
  mongodb+srv://<DBName>:<password>@cluster0.8fws0.mongodb.net/<dbname>?retryWrites=true&w=majority;
const jwtSecretStr = "secret_this_need_get_by_yourself_for_verify";

module.exports.mongoDBConnectStr = mongoDBConnectStr;
module.exports.jwtSecretStr = jwtSecretStr;
```

Also you can delete this folder from ".gitignore" file
