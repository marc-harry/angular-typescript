var Controllers;
(function (Controllers) {
    var TechVidsCategoryCtrl = (function () {
        function TechVidsCategoryCtrl($scope, techVidsDataSvc) {
            this.$scope = $scope;
            this.dataSvc = techVidsDataSvc;

            this.init();
        }
        TechVidsCategoryCtrl.prototype.init = function () {
            var _this = this;
            this.dataSvc.getAllCategories().then(function (data) {
                _this.$scope.categories = data;
            });
        };
        return TechVidsCategoryCtrl;
    })();
    Controllers.TechVidsCategoryCtrl = TechVidsCategoryCtrl;
    TechVidsCategoryCtrl.$inject = ['$scope', 'techVidsDataSvc'];

    var TechVidsListCtrl = (function () {
        function TechVidsListCtrl($scope, $routeParams, dataSvc) {
            var _this = this;
            this.$scope = $scope;
            this.$routeParams = $routeParams;
            this.dataSvc = dataSvc;

            this.$scope.upRate = function (id, rating) {
                _this.dataSvc.setRating(id, rating + 1).then(function () {
                    _this.init();
                });
            };

            this.$scope.downRate = function (id, rating) {
                _this.dataSvc.setRating(id, rating - 1).then(function () {
                    _this.init();
                });
            };

            this.init();
        }
        TechVidsListCtrl.prototype.init = function () {
            var _this = this;
            //Fetching all videos if id is not found in route path
            if (this.$routeParams.id !== undefined) {
                this.dataSvc.getVideosByCategory(parseInt(this.$routeParams.id)).then(function (data) {
                    _this.$scope.videos = data;
                });
            } else {
                this.dataSvc.getAllVideos().then(function (data) {
                    _this.$scope.videos = data;
                });
            }
        };
        return TechVidsListCtrl;
    })();
    Controllers.TechVidsListCtrl = TechVidsListCtrl;
    TechVidsListCtrl.$inject = ['$scope', '$routeParams', 'techVidsDataSvc'];

    var EditTechVideoCtrl = (function () {
        function EditTechVideoCtrl($scope, $routeParams, $window, dataSvc) {
            var _this = this;
            this.$scope = $scope;
            this.$routeParams = $routeParams;
            this.dataSvc = dataSvc;

            this.$scope.editVideo = function () {
                _this.$scope.video.category = _this.$scope.category.id;
                dataSvc.updateVideo(_this.$scope.video).then(function () {
                    _this.$scope.techVidForm.$setPristine();
                    $window.location.href = "#/list/"; // + this.$scope.video.category;
                });
            };

            this.$scope.deleteVideo = function () {
                dataSvc.deleteVideo(_this.$scope.video.id).then(function () {
                    _this.$scope.techVidForm.$setPristine();
                    $window.location.href = "#/list/" + _this.$scope.video.category;
                });
            };

            this.init();
        }
        EditTechVideoCtrl.prototype.init = function () {
            var _this = this;
            this.$scope.name = /^[a-zA-Z ]*$/;
            this.dataSvc.getVideo(parseInt(this.$routeParams.id)).then(function (data) {
                _this.$scope.video = data;
                _this.dataSvc.getCategory(_this.$scope.video.category).then(function (result) {
                    _this.$scope.category = result;
                });
            });

            this.dataSvc.getAllCategories().then(function (data) {
                _this.$scope.categories = data;
            });
        };
        return EditTechVideoCtrl;
    })();
    Controllers.EditTechVideoCtrl = EditTechVideoCtrl;
    EditTechVideoCtrl.$inject = ['$scope', '$routeParams', '$window', 'techVidsDataSvc'];

    var AddVideoCtrl = (function () {
        function AddVideoCtrl($scope, $window, dataSvc) {
            var _this = this;
            this.$scope = $scope;
            this.$window = $window;
            this.dataSvc = dataSvc;

            this.$scope.name = /^[a-zA-Z ]*$/;

            this.$scope.addVideo = function () {
                _this.$scope.video.rating = 4;
                _this.$scope.video.category = _this.$scope.category.id;
                dataSvc.addVideo(_this.$scope.video).then(function () {
                    var category = _this.$scope.video.category;

                    _this.$scope.video = { id: 0, title: "", description: "", category: 0, author: "", rating: 0 };
                    _this.$scope.techVidForm.$setPristine();
                    _this.$window.location.href = "#/list/" + category;
                });
            };

            this.$scope.cancelVideo = function () {
                _this.$scope.video = new Extensions.Video();
                _this.$scope.category = null;
                _this.$scope.techVidForm.$setPristine();
            };

            this.init();
        }
        AddVideoCtrl.prototype.init = function () {
            var _this = this;
            this.dataSvc.getAllCategories().then(function (data) {
                _this.$scope.categories = data;
            });
        };
        return AddVideoCtrl;
    })();
    Controllers.AddVideoCtrl = AddVideoCtrl;
    AddVideoCtrl.$inject = ['$scope', '$window', 'techVidsDataSvc'];
})(Controllers || (Controllers = {}));
//# sourceMappingURL=controllers.js.map
