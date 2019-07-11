# blue-ui-tests

Blue Kern UI Automation Tests

## APM-M Registry

This repository uses the [tziki library](https://github.build.ge.com/APM-UIAutomation/tziki) which is published in
Artifactory instead of npmjs.org. NPM will know the load tziki from Artifactory because of the `@ge-apm-m` prefix used
in the package name.

To instruct NPM to associate `@ge-apm-m` with Artifactory run the following command. You will be prompted for your GE
SSO and password.

```
npm adduser --registry=https://devcloud.swcoe.ge.com/artifactory/api/npm/APM-M-NPM/ --scope=@ge-apm-m
```

You only need to do this once for your account on your own computer, although you will need to do it again if you
reinstall Node, switch to a new version using `nvm`, or change your GE password.

As we publish more NPM packages to Artifactory they will use this same configuration so you will not need to run the
command again.

## Setup

After cloning the repo:

1. Follow the instructions above under _APM-M Registry_ to setup the Artifactory registry
2. Run `npm install`
3. Run `npm run build`
4. Create a file in the root of the project called `.env` containing the following. This file controls environment
   variables on your computer, so it does not get checked in to GitHub (it is included in the `.gitignore` file).

    ```
    ## Uncomment the following line if you're using Chrome 73
    #chromedriver_ver=2.37

    ## Uncomment the following line if you're using chrome 74
    #chromedriver_ver=74.0.3729.6

    TZIKI_LOG_LEVEL=debug
    ```

    Note: If you have the wrong chromedriver_ver set in your .env file the first time your run,
    you'll have to wipe your node_modules folder, or find and edit a config file that gets created
    in there, after changing the version before it will take effect.

5. Run `npm start`. **Make sure you pick values for suite and tags, use the spacebar to "check" the values.**

## Commands

| Command                | Description                                                        |
| ---------------------- | ------------------------------------------------------------------ |
| `npm run build`        | run prettier, tslint, and compile Typescript code                  |
| `npm start`            | run tests using the tziki launcher                                 |
| `npm start -- --again` | run tests using the last settings you used with the tziki launcher |

## Contributing

Add any documentation here that you want contributors to know.

## Jenkins

Add any documentation about Jenkins jobs here.
