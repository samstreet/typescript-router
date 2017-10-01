
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
    private route: '/';

    constructor(){
        this.config = new Config();
    }
    
    add( route: Route ){
        this.routes.push( route )
    }

    remove( route: Route ){
        
    }
    
    update( route: Route ){

    }
    
    listen(){

    }
    
    go( path: string ){

    }

}
