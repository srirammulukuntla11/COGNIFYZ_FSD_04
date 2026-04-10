class DashboardComponent {
    constructor() {
        this.users = this.loadUsers();
    }
    
    loadUsers() {
        const users = localStorage.getItem('app_users');
        return users ? JSON.parse(users) : [];
    }
    
    saveUsers() {
        localStorage.setItem('app_users', JSON.stringify(this.users));
    }
    
    render() {
        const totalUsers = this.users.length;
        const recentUsers = this.users.slice(-5).reverse();
        
        return `
            <div class="dashboard-page">
                <h2>User Dashboard</h2>
                <p style="color: #6c757d; margin-bottom: 30px;">Manage and view all registered users</p>
                
                <div class="stats-grid">
                    <div class="stat-card">
                        <h3>Total Users</h3>
                        <div class="stat-number" id="totalUsers">${totalUsers}</div>
                    </div>
                    <div class="stat-card">
                        <h3>Recent Signups</h3>
                        <div class="stat-number">${recentUsers.length}</div>
                        <p>Last 5 users</p>
                    </div>
                    <div class="stat-card">
                        <h3>Storage Status</h3>
                        <div class="stat-number">Local</div>
                        <p>Data persists in browser</p>
                    </div>
                </div>
                
                <div class="user-list">
                    <h3 style="margin-bottom: 20px;">👥 Registered Users</h3>
                    <div id="userListContainer">
                        ${this.renderUserList()}
                    </div>
                </div>
                
                <div style="margin-top: 20px; text-align: center;">
                    <button class="btn btn-primary" onclick="window.router.navigate('/register')">
                        + Add New User
                    </button>
                    <button class="btn btn-secondary" onclick="dashboardComponent.clearAllUsers()">
                        Clear All Users
                    </button>
                </div>
            </div>
        `;
    }
    
    renderUserList() {
        if (this.users.length === 0) {
            return `
                <div style="text-align: center; padding: 40px; color: #6c757d;">
                    <p>No users registered yet.</p>
                    <p>Click "Add New User" to get started!</p>
                </div>
            `;
        }
        
        return this.users.map(user => `
            <div class="user-item" data-user-id="${user.id}">
                <div class="user-info">
                    <div class="user-name">${this.escapeHtml(user.username)}</div>
                    <div class="user-email">📧 ${this.escapeHtml(user.email)}</div>
                    <div style="font-size: 0.75em; color: #6c757d; margin-top: 5px;">
                        🎂 Age: ${user.age} | 📱 Phone: ${user.phone} | 📅 Registered: ${new Date(user.registeredAt).toLocaleDateString()}
                    </div>
                </div>
                <div class="user-actions">
                    <button class="delete-btn" onclick="dashboardComponent.deleteUser(${user.id})">Delete</button>
                </div>
            </div>
        `).join('');
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    init() {
        // Store reference to this component for global access
        window.dashboardComponent = this;
        this.updateDashboard();
    }
    
    updateDashboard() {
        const totalUsersElement = document.getElementById('totalUsers');
        if (totalUsersElement) {
            totalUsersElement.textContent = this.users.length;
        }
        
        const userListContainer = document.getElementById('userListContainer');
        if (userListContainer) {
            userListContainer.innerHTML = this.renderUserList();
        }
    }
    
    deleteUser(userId) {
        if (confirm('Are you sure you want to delete this user?')) {
            this.users = this.users.filter(user => user.id !== userId);
            this.saveUsers();
            this.updateDashboard();
            this.showToast('User deleted successfully!', 'success');
            
            // Update the main users array in register component if it exists
            if (window.registerComponent) {
                window.registerComponent.users = this.users;
            }
        }
    }
    
    clearAllUsers() {
        if (confirm('⚠️ WARNING: This will delete ALL users. Are you absolutely sure?')) {
            this.users = [];
            this.saveUsers();
            this.updateDashboard();
            this.showToast('All users have been cleared!', 'success');
            
            if (window.registerComponent) {
                window.registerComponent.users = this.users;
            }
        }
    }
    
    showToast(message, type) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }
}

window.DashboardComponent = DashboardComponent;