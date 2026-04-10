class Router {
    constructor() {
        this.routes = {};
        this.currentComponent = null;
        this.currentPath = '/';
        this.init();
    }
    
    init() {
        // Handle hash changes (for better compatibility)
        window.addEventListener('hashchange', () => {
            const path = this.getPathFromHash();
            this.handleRoute(path);
        });
        
        // Handle initial load
        const initialPath = this.getPathFromHash();
        this.handleRoute(initialPath);
    }
    
    getPathFromHash() {
        let hash = window.location.hash;
        if (hash === '' || hash === '#') {
            return '/';
        }
        // Remove the # and return the path
        let path = hash.substring(1);
        if (path === '' || path === '/') {
            return '/';
        }
        return path;
    }
    
    addRoute(path, componentClass) {
        this.routes[path] = componentClass;
    }
    
    navigate(path) {
        // Update hash for routing
        window.location.hash = path === '/' ? '' : path;
        this.handleRoute(path);
    }
    
    handleRoute(path) {
        this.currentPath = path;
        const ComponentClass = this.routes[path];
        const appElement = document.getElementById('app');
        
        if (!appElement) {
            console.error('App element not found!');
            return;
        }
        
        if (ComponentClass) {
            try {
                // Create component instance
                const component = new ComponentClass();
                this.currentComponent = component;
                
                // Render component
                appElement.innerHTML = component.render();
                
                // Initialize component after DOM is updated
                if (component.init && typeof component.init === 'function') {
                    setTimeout(() => {
                        component.init();
                    }, 0);
                }
                
                // Update active nav link
                this.updateActiveNav(path);
            } catch (error) {
                console.error('Error rendering component:', error);
                appElement.innerHTML = '<div class="loading">Error loading page. Please refresh.</div>';
            }
        } else {
            console.warn('Route not found:', path);
            // Handle 404 - redirect to home
            if (path !== '/') {
                this.navigate('/');
            } else {
                appElement.innerHTML = '<div class="loading">Page not found</div>';
            }
        }
    }
    
    updateActiveNav(path) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            const route = link.getAttribute('data-route');
            if ((route === 'home' && (path === '/' || path === '/home')) ||
                (route === path.substring(1))) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
}

window.Router = Router;