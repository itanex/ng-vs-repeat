(function () {

    /**
     * Element.width
     * Container.width
     * Window.outerWidth
     * Document.screen.width
     * 
     * -------------------------
     * 
     * currentColumnCount = Container.width / Element.width
     * possibleColumnCount = Document.screen.width / Element.width
     * 
     * -------------------------
     * 
     * mediaQueryTexts = Array.prototype
     *                      .apply(null, possibleColumnCount)
     *                      .map((val, idx, arr) => `(min-width: ${(idx + 1) * Element.width})`)
     * 
     * -------------------------
     * 
     * Each mediaQueryText is used to reflow the Container. This provides a performance better 
     *    than resize event handlers, or custom resize-end event handler.
     * 
     */

    var module = angular.module('proto-repeat', [])
        .directive('protoRepeat', ['$compile', '$parse', function ($compile, $parse) {

            // pre-factory method processes


            function validateChildElement(parentElement) {
                if (!parentElement.children().length > 0) {
                    throw new Error('proto-repeat: provided element has no child elements');
                }

                var element = angular.element(parentElement.children()[0]);

                var options = ['ng-repeat', 'data-ng-repeat', 'ng-repeat-start', 'data-ng-repeat-start'];

                for (var i = 0; i < options.length; i++) {
                    var opt = options[i];

                    if (element.attr(opt)) {
                        return [opt, element.attr(opt), opt.indexOf('-start') >= 0];
                    }
                }

                throw new Error('proto-repeat: no ng-repeat directive on a child element');
            }

            return {
                restrict: 'A',
                scope: true,
                compile: function (tElement, tAttrs, transclude) {
                    var parentElement = angular.element(this.tElement);

                    // compile process
                    var result = validateChildElement(parentElement);

                    return {
                        pre: function (scope, iElement, iAttrs, controller) {

                            // pre processes

                        }
                    };
                }
            };
        }]);
})();