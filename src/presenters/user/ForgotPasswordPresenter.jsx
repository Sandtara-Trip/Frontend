class ForgotPasswordPresenter {
    constructor({ navigate }) {
      this.navigate = navigate;
    }
  
    handleResetPassword() {
      this.navigate("/reset-password");
    }
  }
  
  export default ForgotPasswordPresenter;
  