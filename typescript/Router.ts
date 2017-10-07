
interface RouterInterface {
    add( route: Route );

    remove( name: String );

    update( route: Route );

    listen();

    flush();

    check( fragment: String );

    go( path: string );
}

class Route {
    fragment: String;
    name: String;
    callback: Function;

    constructor( name: String, fragment: String, callback: Function  ){
        this.name = name;
        this.fragment = fragment;

        if(typeof callback == 'function'){
            this.callback = callback;
        }

    }

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

/**
 * @class App 
 * @implements RouterInterface
 */
class Router implements RouterInterface {

    private routes: Array<Route>;
    private root: String;
    private interval: any;

    constructor(){
        this.routes = new Array<Route>();
        this.root  = '/';
    }

    private getFragment(){
        let match = window.location.href.match(/#(.*)$/);
        let fragment = match ? match[1] : '';
        return this.clean( fragment );
    }

    private clean( path: String ){
        return path.toString().replace(/\/$/, '').replace(/^\//, '');
    }

    check( fragment: String ){
        let f = fragment || this.getFragment();
        
        for(let i=0; i<this.routes.length; i++) {
            let frag = this.routes[i].fragment.toString();
            console.log(frag);
            let match = f.match(frag);
            if(match) {
                match.shift();
                this.routes[i].callback.apply({}, match);
                return this;
            }           
        }
        return this;
    }
    
    add( route: Route ){
        this.routes.push( route ); 
        return this;
    }

    remove( name: String ){
        for(var i = 0; i<this.routes.length; i++){
            if(this.routes[i].name == name){
                this.routes.splice(i, 1); 
                return this;
            }
        }
        return this;
    }
    
    update( route: Route ){
        return this;
    }
    
    listen(){
        let self = this;
        let current = self.getFragment();
        
        let fn = () => {
            if(current !== self.getFragment()) {
                current = self.getFragment();
                self.check(current);
            }
        }
        clearInterval(this.interval);
        this.interval = setInterval(fn, 50);
        return this;
    }

    flush(){
        this.routes = [];
        this.root = '/';
        return this;
    }
    
    go( path: string ){
        window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + path;
        return this;
    }

}

window.onload = () => {
    let router = new Router();
    
    router.add( new Route( 'about', 'about', () => { console.log("about page"); }) )
        .add( new Route( 'contact', 'contact', () => { console.log("contact page"); } ) )
        .listen(); 
};
