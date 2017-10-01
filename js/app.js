var Route = /** @class */ (function () {
    function Route() {
        this.fragment = String;
    }
    Route.prototype.setFragment = function (fragment) {
        this.fragment = fragment;
        return this;
    };
    Route.prototype.setName = function (name) {
        this.name = name;
        return this;
    };
    Route.prototype.getFragment = function () {
        return this.fragment;
    };
    Route.prototype.getName = function () {
        return this.name;
    };
    return Route;
}());
var Config = /** @class */ (function () {
    function Config() {
    }
    return Config;
}());
/**
 * @class App
 * @implements RouterInterface
 */
var Router = /** @class */ (function () {
    function Router() {
        this.config = new Config();
    }
    Router.prototype.add = function (route) {
        this.routes.push(route);
    };
    Router.prototype.remove = function (route) {
    };
    Router.prototype.update = function (route) {
    };
    Router.prototype.listen = function () {
    };
    Router.prototype.go = function (path) {
    };
    return Router;
}());
