import { API_BASE_URL } from '../../config/api';

class LoginPresenter {
  constructor({ navigate }) {
    this.navigate = navigate;
    this.auth = null;
    this.email = '';
    this.password = '';
  }

  setAuth(auth) {
    this.auth = auth;
  }

  setEmail(email) {
    this.email = email;
  }

  setPassword(password) {
    this.password = password;
  }

  async handleLogin(event) {
    event.preventDefault();
    
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.email,
          password: this.password
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Assuming the API returns a token and user data
      if (data.token) {
        // Save to localStorage and update auth context
        localStorage.setItem('token', data.token);
        localStorage.setItem('userName', data.user?.name || 'User');
        localStorage.setItem('userId', data.user?.id || '');
        
        // Update auth context if available
        if (this.auth) {
          this.auth.login({
            token: data.token,
            name: data.user?.name || 'User',
            id: data.user?.id || ''
          });
        }
        
        // Navigate to home page after successful login
        this.navigate('/');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert(error.message || 'Login failed. Please try again.');
    }
  }

  handleExit() {
    this.navigate('/');
  }
}

export default LoginPresenter;
