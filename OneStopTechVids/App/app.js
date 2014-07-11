﻿var AngularTypeScriptApp;
(function (AngularTypeScriptApp) {
    var Config = (function () {
        function Config($routeProvider) {
            $routeProvider.when("/list", {
                templateUrl: "App/Templates/VideoList.html",
                controller: "TechVidsListCtrl"
            }).when("/list/:id", {
                templateUrl: "App/Templates/VideoList.html",
                controller: "TechVidsListCtrl"
            }).when("/add", {
                templateUrl: "App/Templates/AddVideo.html",
                controller: "AddTechVideoCtrl"
            }).when("/edit/:id", {
                templateUrl: "App/Templates/EditVideo.html",
                controller: "EditTechVideoCtrl"
            }).otherwise({ redirectTo: '/list' });
        }
        return Config;
    })();
    AngularTypeScriptApp.Config = Config;

    Config.$inject = ['$routeProvider'];

    var app = angular.module("angularTypeScript", ['ngRoute']);
    app.config(Config);
    app.factory('techVidsDataSvc', ['$http', '$q', Services.TechVidsDataSvc.techVidsDataSvcFactory]);
    app.controller('TechVidsListCtrl', Controllers.TechVidsListCtrl);
    app.controller('TechVidsCategoryCtrl', Controllers.TechVidsCategoryCtrl);
    app.controller('EditTechVideoCtrl', Controllers.EditTechVideoCtrl);
    app.controller('AddTechVideoCtrl', Controllers.AddVideoCtrl);
    app.directive('uniqueVideoTitle', ['techVidsDataSvc', Directives.uniqueVideoTitleDirective]);
})(AngularTypeScriptApp || (AngularTypeScriptApp = {}));
//# sourceMappingURL=app.js.map
