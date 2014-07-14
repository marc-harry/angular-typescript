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
 }