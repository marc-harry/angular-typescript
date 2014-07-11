module Services {
    export class TechVidsDataSvc {
        private videos: Array<Extensions.Video>;
        private categories: Array<Extensions.Category>;
        private techVidsApiPath: string;
        private categoriesApiPath: string;
        private httpService: ng.IHttpService;
        private qService: ng.IQService;

        getAllVideos(fetchFromService?: boolean): ng.IPromise<any> {
            var self = this;
            if (fetchFromService) {
                return getVideosFromService();
            } else {
                if (self.videos !== undefined) {
                    return self.qService.when(self.videos);
                } else {
                    return getVideosFromService();
                }
            }

            function getVideosFromService(): ng.IPromise<any> {
                var deferred = self.qService.defer();

                self.httpService.get(self.techVidsApiPath).then((result: any) => {
                    self.videos = result.data;
                    deferred.resolve(self.videos);
                }, error => {
                    deferred.reject(error);
                });

                return deferred.promise;
            }
        }

        checkIfVideoExists(title: string): ng.IPromise<any> {
            var self = this;
            var deferred = self.qService.defer();

            self.httpService.get(self.techVidsApiPath + "?title=" + title)
                .then(result => {
                deferred.resolve(result.data);
            }, error => {
                deferred.reject(error);
            });

            return deferred.promise;
        }

        getVideosByCategory(id: number): ng.IPromise<any> {
            var self = this;
            var filteredVideos: Array<Extensions.Video> = [];
            if (self.videos !== undefined) {
                return self.qService.when(filterVideos());
            } else {
                var deferred = self.qService.defer();
                self.getAllVideos().then(() => {
                    deferred.resolve(filterVideos());
                }, error => {
                    deferred.reject(error);
                });

                return deferred.promise;
            }

            function filterVideos() {
                for (var counter = 0; counter < self.videos.length; counter++) {
                    if (self.videos[counter].category === id) {
                        filteredVideos.push(self.videos[counter]);
                    }
                }

                return filteredVideos;
            }
        }

        getVideo(id: number): ng.IPromise<any> {
            var self = this;
            if (self.videos !== undefined) {
                return self.qService.when(filterVideo());
            } else {
                var deferred = self.qService.defer();

                self.getAllVideos().then(() => {
                    deferred.resolve(filterVideo());
                }, error => {
                    deferred.reject(error);
                });

                return deferred.promise;
            }

            function filterVideo() {
                for (var counter = 0; counter < self.videos.length; counter++) {
                    if (id === self.videos[counter].id) {
                        return self.videos[counter];
                    }
                }

                return null;
            }
        }

        getAllCategories(): ng.IPromise<any> {
            var self = this;
            if (self.categories !== undefined) {
                return self.qService.when(self.categories);
            } else {
                var deferred = self.qService.defer();

                self.httpService.get(self.categoriesApiPath).then((result: any) => {
                    self.categories = result.data;
                    deferred.resolve(self.categories);
                }, error => {
                    deferred.reject(error);
                });

                return deferred.promise;
            }
        }

        getCategory(id: number): ng.IPromise<any> {
            var self = this;
            if (self.categories !== undefined) {
                return self.qService.when(filterCategory());
            } else {
                var deferred = self.qService.defer();

                self.getAllCategories().then(() => {
                    deferred.resolve(filterCategory());
                }, error => {
                    deferred.reject(error);
                });

                return deferred.promise;
            }

            function filterCategory() {
                for (var counter = 0; counter < self.categories.length; counter++) {
                    if (self.categories[counter].id === id) {
                        return self.categories[counter];
                    }
                }
                return null;
            }

        }

        updateVideo(video: Extensions.Video): ng.IPromise<any> {
            var self = this;
            var deferred = self.qService.defer();

            self.httpService.put(self.techVidsApiPath + "/" + video.id, video)
                .then(() => {
                for (var counter = 0; counter < self.videos.length; counter++) {
                    if (self.videos[counter].id === video.id) {
                        self.videos[counter] = video;
                        break;
                    }
                }
                deferred.resolve();
            }, error => {
                deferred.reject(error);
            });

            return deferred.promise;
        }

        addVideo(video: Extensions.Video): ng.IPromise<any> {
            var self = this;
            var deferred = self.qService.defer();

            self.httpService.post(self.techVidsApiPath, video)
                .then(result => {
                video.id = result.data.id;
                self.videos.push(video);
                deferred.resolve();
            }, error => {
                deferred.reject(error);
            });

            return deferred.promise;
        }

        deleteVideo(id: number): ng.IPromise<any> {
            var self = this;
            var deferred = self.qService.defer();

            self.httpService.delete(self.techVidsApiPath + "/" + id).then(() => {
                for (var counter = 0; counter < self.videos.length; counter++) {
                    if (self.videos[counter].id === id) {
                        self.videos.splice(counter, 1);
                        break;
                    }
                }
                deferred.resolve();
            }, error => {
                deferred.reject(error);
            });

            return deferred.promise;
        }

        setRating(id: number, rating: number): ng.IPromise<any> {
            var self = this;
            var deferred = self.qService.defer();

            self.httpService({
                method: "patch",
                url: self.techVidsApiPath + "/" + id,
                data: { id: id, rating: rating }
            }).then(() => {

                for (var counter = 0; counter < self.videos.length; counter++) {
                    if (self.videos[counter].id === id) {
                        self.videos[counter].rating = rating;
                        break;
                    }
                }
                deferred.resolve();
            }, error => {
                deferred.reject(error);
            });

            return deferred.promise;
        }

        constructor($http: ng.IHttpService, $q: ng.IQService) {
            var self = this;
            self.techVidsApiPath = "api/techVideos";
            self.categoriesApiPath = "api/categories";

            self.httpService = $http;
            self.qService = $q;
        }

        public static techVidsDataSvcFactory($http: ng.IHttpService, $q: ng.IQService): TechVidsDataSvc {
            return new TechVidsDataSvc($http, $q);
        }
    }
}