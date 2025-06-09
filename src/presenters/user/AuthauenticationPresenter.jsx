import axios from 'axios';
import { API_ENDPOINTS, getFullUrl } from '../../utils/api';
import { showSuccess, showError } from '../../utils/sweetalert';

class AuthenticationPresenter {
  constructor({ updateCode, focusNextInput, focusPreviousInput, onVerificationSuccess }) {
    this.updateCode = updateCode;
    this.focusNextInput = focusNextInput;
    this.focusPreviousInput = focusPreviousInput;
    this.onVerificationSuccess = onVerificationSuccess;
  }

  handleChange(index, value, currentCode) {
    if (isNaN(value)) return;

    const newCode = [...currentCode];
    newCode[index] = value;
    this.updateCode(newCode);

    if (value !== '' && index < 5) {
      this.focusNextInput(index + 1);
    }
  }

  handleKeyDown(index, e, currentCode) {
    if (e.key === 'Backspace') {
      if (currentCode[index] === '') {
        e.preventDefault();
        this.focusPreviousInput(index - 1);
      }
    }
  }

  async handleSubmit(code, email) {
    const verificationCode = code.join('');
    
    if (verificationCode.length !== 6) {
      showError('Kode verifikasi harus 6 digit!');
      return;
    }

    try {
      const url = getFullUrl(API_ENDPOINTS.auth.verifyEmail);
      const response = await axios.post(url, {
        email: email,
        code: verificationCode
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data) {
        await showSuccess('Email berhasil diverifikasi!');
        this.onVerificationSuccess();
      }
    } catch (err) {
      console.error('Verification error:', err);
      if (err.response?.data?.message) {
        showError(err.response.data.message);
      } else {
        showError('Gagal memverifikasi email. Silakan coba lagi.');
      }
    }
  }
}

export default AuthenticationPresenter;