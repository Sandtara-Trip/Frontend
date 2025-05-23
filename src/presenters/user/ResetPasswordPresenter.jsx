class ResetPasswordPresenter {
    constructor({ navigate }) {
      this.navigate = navigate;
    }
  
    handleReset() {
      // TODO: Tambahkan logic reset password di sini kalau sudah ada
  
      this.navigate("/login");
    }
  
    goToLogin() {
      this.navigate("/login");
    }
  }
  
  export default ResetPasswordPresenter;
  