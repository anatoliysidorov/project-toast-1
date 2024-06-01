import React from "react";

import Button from "../Button";

import styles from "./ToastPlayground.module.css";

import Toast from "../Toast";
import ToastShelf from "../ToastShelf";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

function useToggle(initialValue = false) {
  if (typeof initialValue !== "boolean") {
    console.warn("Invalid type for useToggle");
  }

  const [value, setValue] = React.useState(initialValue);

  const toggleValue = React.useCallback(() => {
    setValue((currentValue) => !currentValue);
  }, []);

  return [value, toggleValue];
}

function ToastPlayground() {
  const [message, setMessage] = React.useState("test");
  const [variant, setVariant] = React.useState("notice");

  const [toasts, setToasts] = React.useState([]);

  function removeItem(id) {
    const newArr = [...toasts].filter((toast) => {
      return toast.id !== id;
    });
    setToasts(newArr);
  }

  function pushToast() {
    const newArr = [...toasts];
    newArr.push({
      id: crypto.randomUUID(),
      message: message,
      variant: variant,
    });
    setToasts(newArr);
  }

  function submitForm(e) {
    e.preventDefault();
    pushToast();
  }

  /*
  React.useEffect(() => {
    function handleEscape(event) {
      if (event.code === "Escape" && isModalOpen) {
        toggleIsModalOpen();
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isModalOpen, toggleIsModalOpen]);
  */

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>
      <ToastShelf toastList={toasts} removeItem={removeItem} />

      <form className={styles.controlsWrapper} onSubmit={submitForm}>
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: "baseline" }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              id="message"
              required
              className={styles.messageInput}
              value={message}
              onChange={(event) => {
                setMessage(event.target.value);
              }}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            {VARIANT_OPTIONS.map((option) => {
              const id = `variant-${option}`;
              return (
                <label htmlFor={id} key={id}>
                  <input
                    id={id}
                    type="radio"
                    name="variant"
                    value={option}
                    checked={option === variant}
                    onChange={(event) => setVariant(event.target.value)}
                  />
                  {option}
                </label>
              );
            })}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            <Button onClick={submitForm}>Pop Toast!</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
