class AuthenticationPresenter {
    constructor(view) {
      this.view = view;
    }
  
    // Handle input 
    handleChange(index, value, code) {
      if (value.length > 1) return;
  
      const newCode = [...code];
      newCode[index] = value;
      this.view.updateCode(newCode);
  
      // Auto-focus 
      if (value && index < 5) {
        this.view.focusNextInput(index + 1);
      }
    }
  
    // Handle backspace navigation
    handleKeyDown(index, e, code) {
      if (e.key === "Backspace" && !code[index] && index > 0) {
        this.view.focusPreviousInput(index - 1);
      }
    }
  
    // Validate and submit the code
    handleSubmit(code) {
      if (code.some((digit) => !digit)) {
        this.view.showError("Please fill all the code inputs.");
        return;
      }
      this.view.showSuccess(`Submitted code: ${code.join("")}`);
    }
  }
  
  export default AuthenticationPresenter;
  