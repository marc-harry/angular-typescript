/// <reference path="../scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../scripts/typings/angularjs/angular-route.d.ts" />

module Extensions {
    export class Video {
        id: number;
        title: string;
        description: string;
        author: string;
        rating: number;
        category: number;
    }

    export class Category {
        id: number;
        name: string;
    }

    export interface ITechVidsScope extends ng.IScope {
        videos: Array<Video>;
        upRate(id: number, rating: number): void;
        downRate(id: number, rating: number): void;
    }

    export interface ITechVidEditScope extends ng.IScope {
        video: Video;
        category: Category;
        categories: Array<Category>;
        name: RegExp;
        techVidForm: ng.IFormController;

        editVideo();
        deleteVideo(id: number);
    }

    export interface ITechVidsRouteParams extends ng.route.IRouteParamsService {
        id: string;
    }

    export interface ITechVidsCategoryScope extends ng.IScope {
        categories: Array<Category>;
    }

    export interface IAddTechVidScope extends ng.IScope {
        video: Video;
        name: RegExp;
        categories: Array<Category>;
        category: Category;
        addVideo(): void;
        cancelVideo(): void;
        techVidForm: ng.IFormController;
    }
}