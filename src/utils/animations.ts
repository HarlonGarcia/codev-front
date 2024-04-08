import { ToastOptions } from 'react-toastify';

export const defaultTransition = {
  ease: 'easeInOut',
  duration: 1,
};

export const defaultToastConfig: ToastOptions = {
  position: 'top-right',
  autoClose: 1000 * 1,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'dark',
};