var Controllers;
(function (Controllers) {
    var TechVidsCategoryCtrl = (function () {
        function TechVidsCategoryCtrl($scope, techVidsDataSvc) {
            this.$scope = $scope;
            this.dataSvc = techVidsDataSvc;

            this.init();
        }
        TechVidsCategoryCtrl.prototype.init = function () {
            var self = this;

            self.dataSvc.getAllCategories().then(function (data) {
                self.$scope.categories = data;
            });
        };
        return TechVidsCategoryCtrl;
    })();
    Controllers.TechVidsCategoryCtrl = TechVidsCategoryCtrl;
    TechVidsCategoryCtrl.$inject = ['$scope', 'techVidsDataSvc'];

    var TechVidsListCtrl = (function () {
        function TechVidsListCtrl($scope, $routeParams, dataSvc) {
            var self = this;

            self.$scope = $scope;
            self.$routeParams = $routeParams;
            self.dataSvc = dataSvc;

            self.$scope.upRate = function (id, rating) {
                self.dataSvc.setRating(id, rating + 1).then(function () {
                    self.init();
                });
            };

            self.$scope.downRate = function (id, rating) {
                self.dataSvc.setRating(id, rating - 1).then(function () {
                    self.init();
                });
            };

            self.init();
        }
        TechVidsListCtrl.prototype.init = function () {
            var self = this;

            //Fetching all videos if id is not found in route path
            if (self.$routeParams.id !== undefined) {
                self.dataSvc.getVideosByCategory(parseInt(this.$routeParams.id)).then(function (data) {
                    self.$scope.videos = data;
                });
            } else {
                self.dataSvc.getAllVideos().then(function (data) {
                    self.$scope.videos = data;
                });
            }
        };
        return TechVidsListCtrl;
    })();
    Controllers.TechVidsListCtrl = TechVidsListCtrl;
    TechVidsListCtrl.$inject = ['$scope', '$routeParams', 'techVidsDataSvc'];

    var EditTechVideoCtrl = (function () {
        function EditTechVideoCtrl($scope, $routeParams, $window, dataSvc) {
            var self = this;

            self.$scope = $scope;
            self.$routeParams = $routeParams;
            self.dataSvc = dataSvc;

            self.$scope.editVideo = function () {
                self.$scope.video.category = self.$scope.category.id;
                dataSvc.updateVideo(self.$scope.video).then(function (parameters) {
                    self.$scope.techVidForm.$setPristine();
                    $window.location.href = "#/list/" + self.$scope.video.category;
                });
            };

            self.$scope.deleteVideo = function () {
                dataSvc.deleteVideo(self.$scope.video.id).then(function () {
                    self.$scope.techVidForm.$setPristine();
                    $window.location.href = "#/list/" + self.$scope.video.category;
                });
            };

            self.init();
        }
        EditTechVideoCtrl.prototype.init = function () {
            var self = this;

            self.$scope.name = /^[a-zA-Z ]*$/;
            self.dataSvc.getVideo(parseInt(this.$routeParams.id)).then(function (data) {
                self.$scope.video = data;
                self.dataSvc.getCategory(self.$scope.video.category).then(function (result) {
                    self.$scope.category = result;
                });
            });

            self.dataSvc.getAllCategories().then(function (data) {
                self.$scope.categories = data;
            });
        };
        return EditTechVideoCtrl;
    })();
    Controllers.EditTechVideoCtrl = EditTechVideoCtrl;
    EditTechVideoCtrl.$inject = ['$scope', '$routeParams', '$window', 'techVidsDataSvc'];

    var AddVideoCtrl = (function () {
        function AddVideoCtrl($scope, $window, dataSvc) {
            var self = this;

            self.$scope = $scope;
            self.$window = $window;
            self.dataSvc = dataSvc;

            self.$scope.name = /^[a-zA-Z ]*$/;

            self.$scope.addVideo = function () {
                self.$scope.video.rating = 4;
                self.$scope.video.category = self.$scope.category.id;
                dataSvc.addVideo(self.$scope.video).then(function () {
                    var category = self.$scope.video.category;

                    self.$scope.video = { id: 0, title: "", description: "", category: 0, author: "", rating: 0 };
                    self.$scope.techVidForm.$setPristine();
                    self.$window.location.href = "#/list/" + category;
                });
            };

            self.$scope.cancelVideo = function () {
                self.$scope.video = new Extensions.Video();
                self.$scope.category = null;
                self.$scope.techVidForm.$setPristine();
            };

            self.init();
        }
        AddVideoCtrl.prototype.init = function () {
            var self = this;

            self.dataSvc.getAllCategories().then(function (data) {
                self.$scope.categories = data;
            });
        };
        return AddVideoCtrl;
    })();
    Controllers.AddVideoCtrl = AddVideoCtrl;
    AddVideoCtrl.$inject = ['$scope', '$window', 'techVidsDataSvc'];
})(Controllers || (Controllers = {}));
//# sourceMappingURL=techVidsApp.js.map
