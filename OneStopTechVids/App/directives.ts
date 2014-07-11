module Directives {
    export function uniqueVideoTitleDirective(dataSvc: Services.TechVidsDataSvc): ng.IDirective {
        return {
            require: 'ngModel',
            link: (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ctrl: ng.INgModelController) => {
                element.bind('blur', () => {
                    var viewValue = element.val();
                    dataSvc.checkIfVideoExists(viewValue).then(result => {
                        if (result === "true") {
                            ctrl.$setValidity("uniqueVideoTitle", true);
                        } else {
                            ctrl.$setValidity("uniqueVideoTitle", false);
                        }
                    }, () => {
                        ctrl.$setValidity("uniqueVideoTitle", false);
                    });
                });
            }
        }
    }

    uniqueVideoTitleDirective.$inject = ["techVidsDataSvc"];
}