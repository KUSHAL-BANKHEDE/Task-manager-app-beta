import { toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toastConfig = {
  autoClose: 1000,
  transition: Slide,
  position: toast?.POSITION?.TOP_RIGHT,
  closeOnClick: true,
  pauseOnHover: false,
};

export const showToast = (message, type = 'success') => {
  switch (type) {
    case 'success':
      toast.success(message, toastConfig);
      break;
    case 'error':
      toast.error(message, toastConfig);
      break;
    case 'info':
      toast.info(message, toastConfig);
      break;
    case 'warning':
      toast.warning(message, toastConfig);
      break;
    default:
      toast(message, toastConfig);
  }
};