import React from "react";
import {
  AlertOctagon,
  AlertTriangle,
  CheckCircle,
  Info,
  X,
} from "react-feather";

import VisuallyHidden from "../VisuallyHidden";

import styles from "./Toast.module.css";

const ICONS_BY_VARIANT = {
  notice: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  error: AlertOctagon,
};

function IconCmp({ icon: Icon }) {
  return <Icon size={24} />;
}

function Toast({ id, message, variant, handleDismiss }) {
  if (variant === "") {
    variant = "notice";
  }

  return (
    <div className={`${styles.toast} ${styles[variant]}`}>
      <div className={styles.iconContainer}>
        <IconCmp icon={ICONS_BY_VARIANT[variant]} />
      </div>
      <p className={styles.content}>
        <VisuallyHidden>{variant} </VisuallyHidden>
        {message}
      </p>
      <button
        className={styles.closeButton}
        onClick={(_) => handleDismiss(id)}
        aria-label="Dismiss message"
        aria-live="off"
      >
        <IconCmp icon={X} />
      </button>
    </div>
  );
}

export default Toast;
