/*
 * Copyright (c) 2013-2015 by The SeedStack authors. All rights reserved.
 *
 * This file is part of SeedStack, An enterprise-oriented full development stack.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

define([
    '{angular}/angular',
    '{w20-core}/modules/culture',
    '{angular-mocks}/angular-mocks'
], function (angular) {
    'use strict';

    describe('The Forms module', function () {
        var injector,
            rootScope,
            compile,
            scope,
            element;

        beforeEach(function () {

            angular.mock.module('w20ComponentsForms');

            angular.mock.inject(function (_$injector_, _$rootScope_, _$compile_) {
                injector = _$injector_;
                rootScope = _$rootScope_;
                compile = _$compile_;

                scope = rootScope.$new();
                rootScope.$digest();
            });
        });

        it('s directive w20FormElementAttributes should set the attributes value on the element', function () {

            scope.options = {
                templateOptions: {
                    label: 'testLabel',
                    placeholder: 'testPlaceholder'
                }
            };

            element = compile(angular.element('<input w20-form-element-attributes />'))(scope);
            scope.$digest();

            expect(element).toBeDefined();
            expect(element.attr('label')).toEqual('testLabel');
            expect(element.attr('placeholder')).toEqual('testPlaceholder');
        });


    });

});