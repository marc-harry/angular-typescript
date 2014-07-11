var Services;
(function (Services) {
    var TechVidsDataSvc = (function () {
        function TechVidsDataSvc($http, $q) {
            var self = this;
            self.techVidsApiPath = "api/techVideos";
            self.categoriesApiPath = "api/categories";

            self.httpService = $http;
            self.qService = $q;
        }
        TechVidsDataSvc.prototype.getAllVideos = function (fetchFromService) {
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

            function getVideosFromService() {
                var deferred = self.qService.defer();

                self.httpService.get(self.techVidsApiPath).then(function (result) {
                    self.videos = result.data;
                    deferred.resolve(self.videos);
                }, function (error) {
                    deferred.reject(error);
                });

                return deferred.promise;
            }
        };

        TechVidsDataSvc.prototype.checkIfVideoExists = function (title) {
            var self = this;
            var deferred = self.qService.defer();

            self.httpService.get(self.techVidsApiPath + "?title=" + title).then(function (result) {
                deferred.resolve(result.data);
            }, function (error) {
                deferred.reject(error);
            });

            return deferred.promise;
        };

        TechVidsDataSvc.prototype.getVideosByCategory = function (id) {
            var self = this;
            var filteredVideos = [];
            if (self.videos !== undefined) {
                return self.qService.when(filterVideos());
            } else {
                var deferred = self.qService.defer();
                self.getAllVideos().then(function () {
                    deferred.resolve(filterVideos());
                }, function (error) {
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
        };

        TechVidsDataSvc.prototype.getVideo = function (id) {
            var self = this;
            if (self.videos !== undefined) {
                return self.qService.when(filterVideo());
            } else {
                var deferred = self.qService.defer();

                self.getAllVideos().then(function () {
                    deferred.resolve(filterVideo());
                }, function (error) {
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
        };

        TechVidsDataSvc.prototype.getAllCategories = function () {
            var self = this;
            if (self.categories !== undefined) {
                return self.qService.when(self.categories);
            } else {
                var deferred = self.qService.defer();

                self.httpService.get(self.categoriesApiPath).then(function (result) {
                    self.categories = result.data;
                    deferred.resolve(self.categories);
                }, function (error) {
                    deferred.reject(error);
                });

                return deferred.promise;
            }
        };

        TechVidsDataSvc.prototype.getCategory = function (id) {
            var self = this;
            if (self.categories !== undefined) {
                return self.qService.when(filterCategory());
            } else {
                var deferred = self.qService.defer();

                self.getAllCategories().then(function () {
                    deferred.resolve(filterCategory());
                }, function (error) {
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
        };

        TechVidsDataSvc.prototype.updateVideo = function (video) {
            var self = this;
            var deferred = self.qService.defer();

            self.httpService.put(self.techVidsApiPath + "/" + video.id, video).then(function () {
                for (var counter = 0; counter < self.videos.length; counter++) {
                    if (self.videos[counter].id === video.id) {
                        self.videos[counter] = video;
                        break;
                    }
                }
                deferred.resolve();
            }, function (error) {
                deferred.reject(error);
            });

            return deferred.promise;
        };

        TechVidsDataSvc.prototype.addVideo = function (video) {
            var self = this;
            var deferred = self.qService.defer();

            self.httpService.post(self.techVidsApiPath, video).then(function (result) {
                video.id = result.data.id;
                self.videos.push(video);
                deferred.resolve();
            }, function (error) {
                deferred.reject(error);
            });

            return deferred.promise;
        };

        TechVidsDataSvc.prototype.deleteVideo = function (id) {
            var self = this;
            var deferred = self.qService.defer();

            self.httpService.delete(self.techVidsApiPath + "/" + id).then(function () {
                for (var counter = 0; counter < self.videos.length; counter++) {
                    if (self.videos[counter].id === id) {
                        self.videos.splice(counter, 1);
                        break;
                    }
                }
                deferred.resolve();
            }, function (error) {
                deferred.reject(error);
            });

            return deferred.promise;
        };

        TechVidsDataSvc.prototype.setRating = function (id, rating) {
            var self = this;
            var deferred = self.qService.defer();

            self.httpService({
                method: "patch",
                url: self.techVidsApiPath + "/" + id,
                data: { id: id, rating: rating }
            }).then(function () {
                for (var counter = 0; counter < self.videos.length; counter++) {
                    if (self.videos[counter].id === id) {
                        self.videos[counter].rating = rating;
                        break;
                    }
                }
                deferred.resolve();
            }, function (error) {
                deferred.reject(error);
            });

            return deferred.promise;
        };

        TechVidsDataSvc.techVidsDataSvcFactory = function ($http, $q) {
            return new TechVidsDataSvc($http, $q);
        };
        return TechVidsDataSvc;
    })();
    Services.TechVidsDataSvc = TechVidsDataSvc;
})(Services || (Services = {}));
//# sourceMappingURL=services.js.map
