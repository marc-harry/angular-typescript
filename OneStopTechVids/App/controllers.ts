module Controllers {
    export class TechVidsCategoryCtrl {
        private $scope: Extensions.ITechVidsCategoryScope;
        private dataSvc: Services.TechVidsDataSvc;

        private init(): void {
            this.dataSvc.getAllCategories().then(data => {
                this.$scope.categories = data;
            });
        }

        constructor($scope: Extensions.ITechVidsCategoryScope, techVidsDataSvc: Services.TechVidsDataSvc) {
            this.$scope = $scope;
            this.dataSvc = techVidsDataSvc;

            this.init();
        }
    }
    TechVidsCategoryCtrl.$inject = ['$scope', 'techVidsDataSvc'];

    export class TechVidsListCtrl {
        private $scope: Extensions.ITechVidsScope;
        private $routeParams: Extensions.ITechVidsRouteParams;
        private dataSvc: Services.TechVidsDataSvc;

        private init(): void {
            this.$scope.videos = [];

            //Fetching all videos if id is not found in route path
            if (this.$routeParams.id !== undefined) {
                this.dataSvc.getVideosByCategory(parseInt(this.$routeParams.id))
                    .then(data => {
                    this.$scope.videos = data;
                });
            }
            //Fetching videos specific to category if id is found in route path
            else {
                this.dataSvc.getAllVideos().then(data => {
                    this.$scope.videos = data;
                });
            }
        }

        constructor($scope: Extensions.ITechVidsScope, $routeParams: Extensions.ITechVidsRouteParams, dataSvc: Services.TechVidsDataSvc) {
            this.$scope = $scope;
            this.$routeParams = $routeParams;
            this.dataSvc = dataSvc;

            this.$scope.upRate = (id: number, rating: number) => {
                this.dataSvc.setRating(id, rating+1).then(() => {
                    this.init();
                });
            };

            this.$scope.downRate = (id: number, rating: number) => {
                this.dataSvc.setRating(id, rating - 1).then(() => {
                    this.init();
                });
            };

            this.init();
        }
    }
    TechVidsListCtrl.$inject = ['$scope', '$routeParams', 'techVidsDataSvc'];

    export class EditTechVideoCtrl {
        private $scope: Extensions.ITechVidEditScope;
        private dataSvc: Services.TechVidsDataSvc;
        private $routeParams: Extensions.ITechVidsRouteParams;

        private init(): void {
            this.$scope.name = /^[a-zA-Z ]*$/;
            this.dataSvc.getVideo(parseInt(this.$routeParams.id)).then(data => {
                this.$scope.video = data;
                this.dataSvc.getCategory(this.$scope.video.category)
                    .then(result => {
                        this.$scope.category = result;
                    });
            });

            this.dataSvc.getAllCategories().then(data => {
                this.$scope.categories = data;
            });
        }

        constructor($scope: Extensions.ITechVidEditScope, $routeParams: Extensions.ITechVidsRouteParams, $window: ng.IWindowService, dataSvc: Services.TechVidsDataSvc) {
            this.$scope = $scope;
            this.$routeParams = $routeParams;
            this.dataSvc = dataSvc;

            this.$scope.editVideo = () => {
                this.$scope.video.category = this.$scope.category.id;
                dataSvc.updateVideo(this.$scope.video).then(() => {
                    this.$scope.techVidForm.$setPristine();
                    $window.location.href = "#/list/"; // + this.$scope.video.category;
                });
            };

            this.$scope.deleteVideo = () => {
                dataSvc.deleteVideo(this.$scope.video.id).then(() => {
                    this.$scope.techVidForm.$setPristine();
                    $window.location.href = "#/list/" + this.$scope.video.category;    
                });
                
            };

            this.init();
        }
    }
    EditTechVideoCtrl.$inject = ['$scope', '$routeParams', '$window', 'techVidsDataSvc'];

    export class AddVideoCtrl {
        $scope: Extensions.IAddTechVidScope;
        $window: ng.IWindowService;
        dataSvc: Services.TechVidsDataSvc;

        constructor($scope: Extensions.IAddTechVidScope, $window: ng.IWindowService, dataSvc: Services.TechVidsDataSvc) {
            this.$scope = $scope;
            this.$window = $window;
            this.dataSvc = dataSvc;

            this.$scope.name = /^[a-zA-Z ]*$/;

            this.$scope.addVideo = () => {
                this.$scope.video.rating = 4;
                this.$scope.video.category = this.$scope.category.id;
                dataSvc.addVideo(this.$scope.video).then(() => {
                    var category = this.$scope.video.category;

                    this.$scope.video = { id: 0, title: "", description: "", category: 0, author: "", rating: 0 };
                    this.$scope.techVidForm.$setPristine();
                    this.$window.location.href = "#/list/" + category;
                });

            };

            this.$scope.cancelVideo = () => {
                this.$scope.video = new Extensions.Video();
                this.$scope.category = null;
                this.$scope.techVidForm.$setPristine();
            };

            this.init();
        }

        private init(): void {
            this.dataSvc.getAllCategories().then(data => {
                this.$scope.categories = data;
            });
        }
    }
    AddVideoCtrl.$inject = ['$scope', '$window', 'techVidsDataSvc'];
}