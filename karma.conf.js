/*
 * Copyright (c) 2013-2015 by The SeedStack authors. All rights reserved.
 *
 * This file is part of SeedStack, An enterprise-oriented full development stack.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/* global module: false, config: false */
module.exports = function(config) {
    'use strict';

    config.set({
        frameworks: [ 'jasmine', 'requirejs' ],
        files: [
            'test-main.js',
            { pattern: '*.json', included: false },
            { pattern: 'modules/**/*.js', included: false },
            { pattern: 'specs/**/*.js', included: false },
            { pattern: 'node_modules/w20/*.json', included: false },
            { pattern: 'node_modules/w20/modules/!(spec).*', included: false },
            { pattern: 'node_modules/angular/!(spec).*', included: false },
            { pattern: 'node_modules/api-check/dist/!(spec).*', included: false },
            { pattern: 'node_modules/angular-formly/dist/!(spec).*', included: false },
            { pattern: 'node_modules/angular-ui-grid/!(spec).*', included: false },
            { pattern: 'node_modules/angular-ui-select/!(spec).*', included: false },
            { pattern: 'node_modules/angular-messages/!(spec).*', included: false },
            { pattern: 'node_modules/angular-mocks/!(spec).*', included: false },
            { pattern: 'node_modules/angular-resource/!(spec).*', included: false },
            { pattern: 'node_modules/angular-route/!(spec).*', included: false },
            { pattern: 'node_modules/angular-sanitize/!(spec).*', included: false },
            { pattern: 'node_modules/globalize/lib/**/!(spec).*', included: false },
            { pattern: 'node_modules/jgrowl/!(spec).*', included: false },
            { pattern: 'node_modules/jquery/dist/!(spec).*', included: false },
            { pattern: 'node_modules/lodash/!(spec).*', included: false },
            { pattern: 'node_modules/requirejs-text/!(spec).*', included: false },
            { pattern: 'node_modules/require-css/!(spec).*', included: false },
            { pattern: 'node_modules/requirejs/!(spec).*', included: false },
            { pattern: 'node_modules/tv4/!(spec).*', included: false },
            { pattern: 'node_modules/uri-templates/!(spec).*', included: false }
        ],
        preprocessors: {
            'modules/*.js': 'coverage'
        },
        reporters: ['dots', 'coverage' ],
        coverageReporter: {
            type: 'lcov',
            dir: 'coverage/',
            subdir: '.'
        },
        port: 9876,
        colors: true,
        logLevel: 'INFO',
        browsers: [ 'PhantomJS' ]
    });
};