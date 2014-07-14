module Controllers {
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
} 