class VerificationFailedPresenter {
    constructor({ setEmail }) {
      this.setEmail = setEmail;
    }
  
    validateEmail(email) {
      return email && email.trim() !== "";
    }
  
    handleEmailChange(event) {
      this.setEmail(event.target.value);
    }
  
    handleSubmit(email) {
      if (!this.validateEmail(email)) {
        alert("Email tidak boleh kosong!");
        return;
      }
      alert(`Mengirim verifikasi ke: ${email}`);
    }
  }
  
  export default VerificationFailedPresenter;
  