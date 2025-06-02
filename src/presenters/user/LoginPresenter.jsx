class LoginPresenter {
  constructor({ navigate }) {
    this.navigate = navigate;
  }

  handleLogin(event) {
    event.preventDefault();
    this.navigate("/hotel");
  }

  handleExit() {
    this.navigate("/");
  }
}

export default LoginPresenter;
