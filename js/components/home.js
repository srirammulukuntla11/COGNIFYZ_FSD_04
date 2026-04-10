class HomeComponent {
    render() {
        return `
            <div class="home-page">
                <div style="text-align: center; margin-bottom: 40px;">
                    <h2>Welcome to Form Validation Demo</h2>
                    <p style="color: #6c757d; margin-top: 10px;">Learn about complex form validation and dynamic DOM manipulation</p>
                </div>
                
                <div class="stats-grid">
                    <div class="stat-card">
                        <h3>📝 Real-time Validation</h3>
                        <div class="stat-number">Live</div>
                        <p>Instant feedback as you type</p>
                    </div>
                    <div class="stat-card">
                        <h3>🔒 Password Strength</h3>
                        <div class="stat-number">Complex</div>
                        <p>Advanced password checking</p>
                    </div>
                    <div class="stat-card">
                        <h3>🎨 Dynamic UI</h3>
                        <div class="stat-number">Interactive</div>
                        <p>Responsive user interface</p>
                    </div>
                    <div class="stat-card">
                        <h3>🔄 Client Routing</h3>
                        <div class="stat-number">SPA</div>
                        <p>Smooth page transitions</p>
                    </div>
                </div>
                
                <div style="background: #f8f9fa; padding: 30px; border-radius: 12px; margin-top: 20px;">
                    <h3>Features Implemented:</h3>
                    <ul style="margin-top: 15px; line-height: 2;">
                        <li>✅ Complex form validation with multiple rules</li>
                        <li>✅ Password strength indicator with visual feedback</li>
                        <li>✅ Dynamic DOM manipulation (add/delete users)</li>
                        <li>✅ Client-side routing without page reload</li>
                        <li>✅ Real-time form validation</li>
                        <li>✅ Local storage persistence</li>
                        <li>✅ Toast notifications for user feedback</li>
                        <li>✅ Responsive design for all devices</li>
                    </ul>
                </div>
                
                <div style="text-align: center; margin-top: 30px;">
                    <button class="btn btn-primary" onclick="window.router.navigate('/register')">
                        Get Started → Register Now
                    </button>
                </div>
            </div>
        `;
    }
    
    init() {
        console.log('Home page initialized');
    }
}

// Make sure component is globally available
window.HomeComponent = HomeComponent;