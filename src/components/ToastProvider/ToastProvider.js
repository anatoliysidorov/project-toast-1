import React from "react";

import useEscapeKey from "../../hooks/EscapeHook";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  useEscapeKey(removeAllItems);

  function removeAllItems() {
    const newArr = [];
    setToasts(newArr);
  }

  function removeItem(id) {
    const newArr = [...toasts].filter((toast) => {
      return toast.id !== id;
    });
    setToasts(newArr);
  }

  function pushItem(variant, message) {
    const newArr = [...toasts];
    newArr.push({
      id: crypto.randomUUID(),
      message: message,
      variant: variant,
    });
    setToasts(newArr);
  }

  return (
    <ToastContext.Provider
      value={{
        toasts,
        removeItem,
        pushItem,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
