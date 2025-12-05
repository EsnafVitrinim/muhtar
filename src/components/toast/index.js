"use client"

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const showToast = (type, message, promiseProps) => {
  switch (type) {
    case 'success':
      toast.success(message);
      break;
    case 'error':
      toast.error(message);
      break;
    case 'info':
      toast.info(message);
      break;
    case 'warning':
      toast.warning(message);
      break;
    case 'promise':
      toast.promise(
        promiseProps.func,
        {
          pending: {
            render() {
              return promiseProps.loading
            },
          },
          success: {
            render() {
              return promiseProps.success
            },
          },
          error: {
            render() {
              return promiseProps.error
            }
          }
        }
      );
      break;
    default:
      toast(message);
  }
};

const ToastMessage = () => {
  return (
    <ToastContainer
      role="alert"
      stacked
      toastClassName='bg-white shadow-md !text-black text-sm dark:bg-dark-300 border-2 shadow-md border-slate-1 00 dark:border-dark-200 dark:!text-dark-50'
      position="bottom-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
};

export { showToast, ToastMessage };
