import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { API_ENDPOINTS, getFullUrl } from '../../utils/api';

const RegisterPresenter = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password) {
      setError('Semua field harus diisi');
      return false;
    }

    if (formData.password.length < 6) {
      setError('Password harus minimal 6 karakter');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Format email tidak valid');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    const registerData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      password: formData.password
    };

    try {
      const url = getFullUrl(API_ENDPOINTS.auth.register);
      console.log('API URL:', url);
      console.log('Sending registration data:', registerData);

      const response = await axios.post(url, registerData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Registration response:', response.data);
      
      if (response.data) {
        // After successful registration, navigate to validation code page with the email
        navigate('/validation-code', { 
          state: { email: formData.email.trim() }
        });
      }
    } catch (err) {
      console.error('Registration error:', err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.response?.status === 400) {
        setError('Data yang dimasukkan tidak valid');
      } else {
        setError('Terjadi kesalahan saat registrasi');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNavigateValidation = () => {
    navigate("/validation-code");
  };
  const handleExit = () => {
    navigate("/");
  };

  return {
    showPassword,
    formData,
    error,
    loading,
    togglePasswordVisibility,
    handleSubmit,
    handleInputChange,
    handleNavigateValidation,
    handleExit
  };
};

export default RegisterPresenter;
