import React, { useEffect, useRef } from "react";
import { Toast } from "primereact/toast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { clearToast } from "../../redux/ToastStore/toastReducer";

function ToastComponent() {
  const { severity, summary, message, life } = useSelector<
    RootState,
    RootState["toastReducer"]
  >((state) => state.toastReducer);
  const dispatch = useDispatch<AppDispatch>();
  const toast = useRef<Toast>(null);
  const showMessage = () => {
    const messageContent = { severity, summary, detail: message, life };
    toast.current?.show(messageContent);
    const toastTimeout = setTimeout(() => {
      dispatch(clearToast());
    }, life);
    return () => {
      clearTimeout(toastTimeout);
    };
  };
  useEffect(() => {
    if (message !== "") showMessage();
  }, [message]);

  return <Toast ref={toast} />;
}

export default ToastComponent;
