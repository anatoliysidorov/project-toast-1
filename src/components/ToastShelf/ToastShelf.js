import React from "react";

import Toast from "../Toast";
import styles from "./ToastShelf.module.css";
import { ToastContext } from "../ToastProvider/ToastProvider";

function ToastShelf() {
  const { toasts, removeItem } = React.useContext(ToastContext);

  React.useEffect(() => {
    function handleEscape(event) {
      if (event?.code === "Escape") {
        removeItem(-1);
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <ol
      className={styles.wrapper}
      role="region"
      aria-live="polite"
      aria-label="Notification"
    >
      {toasts &&
        toasts.map((toast) => (
          <li className={styles.toastWrapper} key={toast.id}>
            <Toast
              id={toast.id}
              message={toast.message}
              variant={toast.variant}
              handleDismiss={removeItem}
            />
          </li>
        ))}
    </ol>
  );
}

export default ToastShelf;
