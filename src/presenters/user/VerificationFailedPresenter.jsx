import axios from 'axios';
import { API_ENDPOINTS, getFullUrl } from '../../utils/api';
import { showSuccess, showError } from '../../utils/sweetalert';

class VerificationFailedPresenter {
    constructor({ setEmail, navigate }) {
      this.setEmail = setEmail;
      this.navigate = navigate;
    }
  
    validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return email && email.trim() !== "" && emailRegex.test(email);
    }
  
    handleEmailChange(event) {
      this.setEmail(event.target.value);
    }
  
    async handleSubmit(email) {
      if (!this.validateEmail(email)) {
        showError("Email tidak valid!");
        return;
      }
  
      try {
        const url = getFullUrl(API_ENDPOINTS.auth.resendVerification);
        const response = await axios.post(url, {
          email: email.trim()
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
  
        if (response.data) {
          await showSuccess("Email verifikasi telah dikirim ulang. Silakan cek email Anda.");
          // Redirect to validation code page with email state
          this.navigate('/validation-code', { 
            state: { email: email.trim() }
          });
        }
      } catch (err) {
        console.error('Resend verification error:', err);
        if (err.response?.data?.message) {
          showError(err.response.data.message);
        } else {
          showError("Gagal mengirim ulang email verifikasi. Silakan coba lagi.");
        }
      }
    }
  }
  
  export default VerificationFailedPresenter;
  