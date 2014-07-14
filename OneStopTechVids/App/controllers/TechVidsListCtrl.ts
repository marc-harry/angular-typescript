module Controllers {
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
                this.dataSvc.setRating(id, rating + 1).then(() => {
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
}