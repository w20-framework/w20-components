define([
    'module',
    'require',
    '{angular}/angular',
    '{lodash}/lodash',
    '{angular-formly}/formly',
    '[optional]!{css-framework}/modules/css-framework',

    '{angular-messages}/angular-messages'

], function (module, require, angular, _, formly, cssFramework) {
    'use strict';

    /**
     * @ngdoc object
     * @name w20ComponentsForms
     *
     * @description
     *
     * This module provides a support for programmatic configuration of forms. It heavily uses angular-formly internally.
     */
    var w20ComponentsForms = angular.module('w20ComponentsForms', ['formly', 'ngMessages', 'w20CoreCulture']);

    /**
     * @ngdoc service
     * @name w20ComponentsForms.service:FormsService
     *
     * @description
     *
     * The FormService allows the registration of custom form element type, custom validation messages and custom wrapper
     * among other things. It exposes the formlyConfig and formlyValidationMessages services.
     */
    w20ComponentsForms.factory('FormsService', ['formlyConfig', 'formlyValidationMessages', function (formlyConfig, formlyValidationMessages) {
        return {
            /**
             * @ngdoc object
             * @name w20ComponentsForms.service:FormsService#config
             * @propertyOf w20ComponentsForms.service:FormsService
             * @returns {Object} The formlyConfig service
             */
            config: formlyConfig,
            /**
             * @ngdoc object
             * @name w20ComponentsForms.service:FormsService#validation
             * @propertyOf w20ComponentsForms.service:FormsService
             * @returns {Object} The formlyValidationMessages service
             */
            validation: formlyValidationMessages
        };
    }]);

    /**
     * @ngdoc directive
     * @name w20ComponentsForms.directive:w20Form
     *
     * @description
     *
     * w20Form is an alias for the formlyForm directive. The model attribute specify the data model on the scope which
     * will hold the form data. The fields attribute specify the array on the scope which holds the fields of the form.
     *
     * ```
     * <form ng-submit="submit()" name="formName">
     *    <div data-w20-form data-model="model" data-fields="fields">
     *       <button class="btn btn-primary" type="submit">Submit</button>
     *    </div>
     * </form>
     * ```
     */
    w20ComponentsForms.directive('w20Form', ['formlyFormDirective', function (formlyFormDirective) {
        return formlyFormDirective[0];
    }]);

    w20ComponentsForms.directive('setTouched', [function () {
        return {
            link: function (scope, element) {

                function setTouched() {
                    var firstInvalid = {};
                    angular.forEach(scope.form.$error, function (field) {
                        angular.forEach(field, function (errorField, index) {
                            if (index === 0) {
                                firstInvalid = errorField;
                            }
                            errorField.$setTouched();
                        });
                    });
                    angular.element('#' + firstInvalid.$name).focus();
                }

                element.click(function () {
                    if (scope.form.$invalid && scope.form.$pristine) {
                        setTouched();
                    } else if (scope.form.$invalid) {
                        setTouched();
                    } else if (scope.form.$valid) {
                        scope.to.submit(scope.form);
                    }
                });

            }
        };
    }]);

    w20ComponentsForms.directive('w20FormElementAttributes', ['CultureService', 'EventService', function (cultureService, eventService) {
        return {
            link: function (scope, element, attrs) {
                var refresh = function () {
                    angular.forEach(scope.options.templateOptions, function (value, key) {
                        if (key !== 'required' && key !== 'disabled') {
                            attrs.$set(key, cultureService.localize(value, [], value));
                        }
                    });
                };
                eventService.on('w20.culture.culture-changed', refresh);
                refresh();
            }
        };
    }]);

    w20ComponentsForms.filter('localizeSubstring', ['CultureService', function (cultureService) {
        var filter = function (input) {
            if (typeof input !== 'string') {
                return '';
            }
            var string = '';
            angular.forEach(input.split(' '), function (substring) {
                string += cultureService.localize(substring, Array.prototype.slice.call(arguments, 1), substring) + ' ';
            });
            return string;
        };
        filter.$stateful = true;
        return filter;
    }]);

    w20ComponentsForms.directive('focusErase', [function () {
        return {
            link: function (scope, element) {
                element.click(function () {
                    scope.fc[0].$setViewValue('');
                    scope.fc[0].$render();
                    angular.element('#' + scope.id).focus();
                });
            }
        };
    }]);

    w20ComponentsForms.run(['FormsService', function (formsService) {

        var formElementTypes = [
            {
                name: 'text',
                template: inputTemplate
            },
            {
                name: 'email',
                template: inputTemplate
            },
            {
                name: 'tel',
                template: inputTemplate
            },
            {
                name: 'search',
                template: inputTemplate
            },
            {
                name: 'range',
                template: inputTemplate
            },
            {
                name: 'color',
                template: inputTemplate
            },
            {
                name: 'password',
                template: inputTemplate
            },
            {
                name: 'date',
                template: inputTemplate
            },
            {
                name: 'number',
                template: inputTemplate
            },
            {
                name: 'url',
                template: inputTemplate
            },
            {
                name: 'datetime-local',
                template: inputTemplate
            },
            {
                name: 'time',
                template: inputTemplate
            },
            {
                name: 'week',
                template: inputTemplate
            },
            {
                name: 'month',
                template: inputTemplate
            },
            {
                name: 'checkbox',
                template: boxTemplate
            },
            {
                name: 'radio',
                template: boxTemplate
            },
            {
                name: 'textarea',
                template: textAreaTemplate
            },
            {
                name: 'select',
                template: selectTemplate
            },
            {
                name: 'submit',
                template: submitTemplate
            },
            {
                name: 'reset',
                template: resetTemplate
            }
        ];

        formsService.config.setType(formElementTypes);
        formsService.config.setWrapper({
            template: validationTemplate
        });

        formsService.validation.addStringMessage('required', 'w20.ui.forms.validation.required');
        formsService.validation.addStringMessage('email', 'w20.ui.forms.validation.email');
        formsService.validation.addStringMessage('number', 'w20.ui.forms.validation.number');
        formsService.validation.addStringMessage('url', 'w20.ui.forms.validation.url');
        formsService.validation.addStringMessage('date', 'w20.ui.forms.validation.date');
        formsService.validation.addStringMessage('datetimelocal', 'w20.ui.forms.validation.datetimelocal');
        formsService.validation.addStringMessage('time', 'w20.ui.forms.validation.time');
        formsService.validation.addStringMessage('week', 'w20.ui.forms.validation.week');
        formsService.validation.addStringMessage('month', 'w20.ui.forms.validation.month');

        formsService.validation.addTemplateOptionValueMessage('pattern', 'pattern', 'w20.ui.forms.validation.pattern-prefix', '', 'w20.ui.forms.validation.pattern');
        formsService.validation.addTemplateOptionValueMessage('max', 'max', 'w20.ui.forms.validation.max-prefix', '', 'w20.ui.forms.validation.max');
        formsService.validation.addTemplateOptionValueMessage('maxlength', 'maxlength', 'w20.ui.forms.validation.maxlength-prefix', '', 'w20.ui.forms.validation.maxlength');
        formsService.validation.addTemplateOptionValueMessage('min', 'min', 'w20.ui.forms.validation.min-prefix', '', 'w20.ui.forms.validation.min');
        formsService.validation.addTemplateOptionValueMessage('minlength', 'minlength', 'w20.ui.forms.validation.minlength-prefix', '', 'w20.ui.forms.validation.minlength');
    }]);

    var inputTemplate,
        textAreaTemplate,
        boxTemplate,
        validationTemplate,
        selectTemplate,
        submitTemplate,
        resetTemplate;

    return {
        angularModules: ['w20ComponentsForms'],
        lifecycle: {
            pre: function (modules, fragments, callback) {

                function loadTemplates(path) {

                    var templates = [
                        '[text]!{w20-components}/templates/forms/' + path + '/input.html',
                        '[text]!{w20-components}/templates/forms/' + path + '/textarea.html',
                        '[text]!{w20-components}/templates/forms/' + path + '/box.html',
                        '[text]!{w20-components}/templates/forms/' + path + '/validation.html',
                        '[text]!{w20-components}/templates/forms/' + path + '/select.html',
                        '[text]!{w20-components}/templates/forms/' + path + '/submit.html',
                        '[text]!{w20-components}/templates/forms/' + path + '/reset.html'
                    ];

                    require(templates, function () {

                        templates = Array.prototype.slice.call(arguments);

                        inputTemplate = templates[0];
                        textAreaTemplate = templates[1];
                        boxTemplate = templates[2];
                        validationTemplate = templates[3];
                        selectTemplate = templates[4];
                        submitTemplate = templates[5];
                        resetTemplate = templates[6];

                        callback(modules);
                    });
                }

                switch (cssFramework.name) {
                    default:
                        loadTemplates('bootstrap-3');
                        break;
                }
            }
        }
    };
});


