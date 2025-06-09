import axios from 'axios';
import { API_ENDPOINTS, getFullUrl } from '../../utils/api';
import { showSuccess, showError } from '../../utils/sweetalert';

class ResetPasswordPresenter {
    constructor({ navigate }) {
      this.navigate = navigate;
    }
  
    validateForm(code, password, confirmPassword) {
      if (!code || code.length !== 6) {
        showError("Kode verifikasi harus 6 digit!");
        return false;
      }
  
      if (!password || password.length < 6) {
        showError("Kata sandi harus minimal 6 karakter!");
        return false;
      }
  
      if (password !== confirmPassword) {
        showError("Kata sandi tidak cocok!");
        return false;
      }
  
      return true;
    }
  
    async handleReset(email, code, password, confirmPassword) {
      if (!this.validateForm(code, password, confirmPassword)) {
        return;
      }
  
      try {
        const url = getFullUrl(API_ENDPOINTS.auth.resetPassword);
        const response = await axios.post(url, {
          email: email,
          code: code,
          password: password
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
  
        if (response.data) {
          await showSuccess("Kata sandi berhasil diubah!");
          this.navigate("/login");
        }
      } catch (err) {
        console.error('Reset password error:', err);
        if (err.response?.data?.message) {
          showError(err.response.data.message);
        } else {
          showError("Gagal mengubah kata sandi. Silakan coba lagi.");
        }
      }
    }
  
    goToLogin() {
      this.navigate("/login");
    }
  }
  
  export default ResetPasswordPresenter;
  