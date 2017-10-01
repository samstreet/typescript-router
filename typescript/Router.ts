
interface RouterInterface {
    add( route: Route );

    remove( route: Route );

    update( route: Route );

    listen();

    go( path: string );
}

class Route {
    fragment = String;
    name: String;

    setFragment( fragment ){
        this.fragment = fragment;
        return this;
    }

    setName( name ){
        this.name = name;
        return this;
    }

    getFragment(){
        return this.fragment;
    }

    getName(){
        return this.name;
    }

}

class Config {

}

/**
 * @class App 
 * @implements RouterInterface
 */
class Router implements RouterInterface {

    private routes: Array<Route>;
    private config: Config;
    private route: String;

    constructor(){
        this.config = new Config();
        this.routes = new Array<Route>();
        this.route  = '/';
    }
    
    add( route: Route ){
        this.routes.push( route );
        return this;
    }

    remove( route: Route ){
        return this;
    }
    
    update( route: Route ){
        return this;
    }
    
    listen(){
        
    }
    
    go( path: string ){

    }

}

window.onload = () => {
    let router = new Router();
    router.add( new Route() ).add( new Route() );

    console.log(router);
};
