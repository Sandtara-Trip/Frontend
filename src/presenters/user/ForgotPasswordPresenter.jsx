import axios from 'axios';
import { API_ENDPOINTS, getFullUrl } from '../../utils/api';
import { showSuccess, showError } from '../../utils/sweetalert';

class ForgotPasswordPresenter {
    constructor({ navigate }) {
      this.navigate = navigate;
    }
  
    validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return email && email.trim() !== "" && emailRegex.test(email);
    }
  
    async handleResetPassword(email) {
      if (!this.validateEmail(email)) {
        showError("Email tidak valid!");
        return;
      }
  
      try {
        const url = getFullUrl(API_ENDPOINTS.auth.forgotPassword);
        const response = await axios.post(url, {
          email: email.trim()
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
  
        if (response.data) {
          await showSuccess("Kode verifikasi telah dikirim ke email Anda.");
          // Navigate to reset password page with email
          this.navigate("/reset-password", {
            state: { email: email.trim() }
          });
        }
      } catch (err) {
        console.error('Forgot password error:', err);
        if (err.response?.data?.message) {
          showError(err.response.data.message);
        } else {
          showError("Gagal mengirim kode verifikasi. Silakan coba lagi.");
        }
      }
    }
  
    goToLogin() {
      this.navigate("/login");
    }
  }
  
  export default ForgotPasswordPresenter;
  