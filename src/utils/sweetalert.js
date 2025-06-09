import Swal from 'sweetalert2';

// Success alert
export const showSuccess = (message) => {
  return Swal.fire({
    icon: 'success',
    title: 'Berhasil!',
    text: message,
    confirmButtonColor: '#FB923C',
  });
};

// Error alert
export const showError = (message) => {
  return Swal.fire({
    icon: 'error',
    title: 'Error!',
    text: message,
    confirmButtonColor: '#FB923C',
  });
};

// Warning alert
export const showWarning = (message) => {
  return Swal.fire({
    icon: 'warning',
    title: 'Peringatan!',
    text: message,
    confirmButtonColor: '#FB923C',
  });
};

// Confirmation dialog
export const showConfirmation = (message) => {
  return Swal.fire({
    icon: 'question',
    title: 'Konfirmasi',
    text: message,
    showCancelButton: true,
    confirmButtonColor: '#FB923C',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Ya',
    cancelButtonText: 'Tidak'
  });
};

// Info alert
export const showInfo = (message) => {
  return Swal.fire({
    icon: 'info',
    title: 'Informasi',
    text: message,
    confirmButtonColor: '#FB923C',
  });
};

// Toast notification
export const showToast = (message, type = 'success') => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });

  return Toast.fire({
    icon: type,
    title: message
  });
}; 