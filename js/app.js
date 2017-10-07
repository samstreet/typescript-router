var Route = /** @class */ (function () {
    function Route(name, fragment, callback) {
        this.name = name;
        this.fragment = fragment;
        if (typeof callback == 'function') {
            this.callback = callback;
        }
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
/**
 * @class App
 * @implements RouterInterface
 */
var Router = /** @class */ (function () {
    function Router() {
        this.routes = new Array();
        this.root = '/';
    }
    Router.prototype.getFragment = function () {
        var match = window.location.href.match(/#(.*)$/);
        var fragment = match ? match[1] : '';
        return this.clean(fragment);
    };
    Router.prototype.clean = function (path) {
        return path.toString().replace(/\/$/, '').replace(/^\//, '');
    };
    Router.prototype.check = function (fragment) {
        var f = fragment || this.getFragment();
        for (var i = 0; i < this.routes.length; i++) {
            var frag = this.routes[i].fragment.toString();
            console.log(frag);
            var match = f.match(frag);
            if (match) {
                match.shift();
                this.routes[i].callback.apply({}, match);
                return this;
            }
        }
        return this;
    };
    Router.prototype.add = function (route) {
        this.routes.push(route);
        return this;
    };
    Router.prototype.remove = function (name) {
        for (var i = 0; i < this.routes.length; i++) {
            if (this.routes[i].name == name) {
                this.routes.splice(i, 1);
                return this;
            }
        }
        return this;
    };
    Router.prototype.update = function (route) {
        return this;
    };
    Router.prototype.listen = function () {
        var self = this;
        var current = self.getFragment();
        var fn = function () {
            if (current !== self.getFragment()) {
                current = self.getFragment();
                self.check(current);
            }
        };
        clearInterval(this.interval);
        this.interval = setInterval(fn, 50);
        return this;
    };
    Router.prototype.flush = function () {
        this.routes = [];
        this.root = '/';
        return this;
    };
    Router.prototype.go = function (path) {
        window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + path;
        return this;
    };
    return Router;
}());
window.onload = function () {
    var router = new Router();
    router.add(new Route('about', 'about', function () { console.log("about page"); }))
        .add(new Route('contact', 'contact', function () { console.log("contact page"); }))
        .listen();
};
