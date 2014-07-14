module Controllers {
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