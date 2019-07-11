module.exports = function(grunt) {
    'use strict';

    require('jit-grunt')(grunt, {
        protractor: 'grunt-protractor-runner',
        shell: 'grunt-shell-spawn'
    });

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        execute: executeConfig(),
        shell: shellConfig(),
        protractor: protractorConfig(grunt)
    });

    grunt.registerTask('pretest', ['execute:updateChromeDriver', 'shell:compile', 'shell:update_chrome_driver']);
    grunt.registerTask('default', ['pretest', 'protractor:default']);
    grunt.registerTask('test', ['pretest', 'protractor:test']);
    grunt.registerTask('noSuite', ['pretest', 'protractor:noSuite']);
    grunt.registerTask('browser', ['pretest', 'protractor:browser']);
};

function executeConfig() {
    return {
        updateChromeDriver: {
            src: ['./node_modules/proui-utils/updateChromeDriver.js']
        }
    };
}

function shellConfig() {
    return {
        options: {
            stdout: true
        },
        compile: {
            command: 'npm run compile'
        },
        update_chrome_driver: {
            command:
                'node ./node_modules/protractor/bin/webdriver-manager update --proxy=http://americas-cincinnati-internal.proxy.corporate.ge.com:80/'
        },
        update_ie_driver: {
            command: 'node ./node_modules/protractor/bin/webdriver-manager update --ie'
        }
    };
}

function protractorConfig(grunt) {
    return {
        default: protractorDefaultConfig(grunt),
        test: protractorTestConfig(grunt),
        browser: protractorBrowserConfig(grunt),
        noSuite: protractorNoSuiteConfig(grunt),
        auto: protractorAutoConfig()
    };
}

function protractorDefaultConfig(grunt) {
    return {
        options: {
            keepAlive: false,
            configFile: 'conf/protractor.cucumber.common.conf.js',
            args: {
                suite: 'asset',
                params: {
                    login: {
                        baseUrl: grunt.option('baseUrl'),
                        username: grunt.option('username'),
                        password: grunt.option('password'),
                        adminusername: grunt.option('adminusername'),
                        adminpassword: grunt.option('adminpassword')
                    }
                }
            }
        }
    };
}

function protractorTestConfig(grunt) {
    return {
        options: {
            keepAlive: false,
            configFile: grunt.option('conf'),
            args: {
                cucumberOpts: {
                    tags: cucumberTags(grunt)
                },
                suite: grunt.option('suite')
            }
        }
    };
}

function cucumberTags(grunt) {
    const tags = grunt.option('tags');
    if (tags) {
        return '@always,' + tags;
    }
    return tags;
}

function protractorBrowserConfig(grunt) {
    return {
        options: {
            keepAlive: false,
            configFile: grunt.option('conf'),
            args: {
                cucumberOpts: grunt.option('spec'),
                suite: grunt.option('suite'),
                browser: grunt.option('browser')
            }
        }
    };
}

function protractorNoSuiteConfig(grunt) {
    return {
        options: {
            keepAlive: false,
            configFile: grunt.option('conf')
        }
    };
}

function protractorAutoConfig() {
    return {
        keepAlive: false,
        options: {
            args: {
                seleniumPort: 4444
            }
        }
    };
}
