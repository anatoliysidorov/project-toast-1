import React from "react";

import Toast from "../Toast";
import styles from "./ToastShelf.module.css";

function ToastShelf({ toastList, removeItem }) {
  const tList = [...toastList];
  return (
    <ol className={styles.wrapper}>
      {tList.map((toast) => (
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
