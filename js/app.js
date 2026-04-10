// Wait for everything to load
window.addEventListener('load', () => {
    console.log('App initializing...');
    
    // Check if all components are loaded
    if (typeof Router === 'undefined') {
        console.error('Router not loaded!');
        return;
    }
    
    if (typeof HomeComponent === 'undefined') {
        console.error('HomeComponent not loaded!');
        return;
    }
    
    if (typeof RegisterComponent === 'undefined') {
        console.error('RegisterComponent not loaded!');
        return;
    }
    
    if (typeof DashboardComponent === 'undefined') {
        console.error('DashboardComponent not loaded!');
        return;
    }
    
    // Create router instance
    const router = new Router();
    
    // Register routes
    router.addRoute('/', HomeComponent);
    router.addRoute('/home', HomeComponent);
    router.addRoute('/register', RegisterComponent);
    router.addRoute('/dashboard', DashboardComponent);
    
    // Store router globally for navigation
    window.router = router;
    
    console.log('App initialized successfully!');
});