var Directives;
(function (Directives) {
    function uniqueVideoTitleDirective(dataSvc) {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, ctrl) {
                element.bind('blur', function () {
                    var viewValue = element.val();
                    dataSvc.checkIfVideoExists(viewValue).then(function (result) {
                        if (result === "true") {
                            ctrl.$setValidity("uniqueVideoTitle", true);
                        } else {
                            ctrl.$setValidity("uniqueVideoTitle", false);
                        }
                    }, function () {
                        ctrl.$setValidity("uniqueVideoTitle", false);
                    });
                });
            }
        };
    }
    Directives.uniqueVideoTitleDirective = uniqueVideoTitleDirective;

    uniqueVideoTitleDirective.$inject = ["techVidsDataSvc"];
})(Directives || (Directives = {}));
//# sourceMappingURL=directives.js.map
