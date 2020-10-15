import React, { forwardRef } from "react";
import { createPortal } from "react-dom";

import styles from "./ModalContent.module.css";

const ModalContent = forwardRef(
  ({
    children,
    title,
    openModal,
    closeModal,
    onCancel,
    onOk,
    isOpened,
    isLoading,
    isClosing
  }, ref) => (
  createPortal(
    <div
      className={styles.modal}
      role="dialog"
      aria-labelledby="modal-label"
      aria-modal="true"
      tabIndex="-1"
      data-opened={isOpened}
      data-closing={isClosing}
    >
      <div
        className={styles.modal__content}
        ref={ref}
        role="document"
      >
        <button
          className={styles.modal__content__close}
          type="button"
          onClick={closeModal}
          title="Close"
          aria-label="Close"
        >
          <span
            className={styles["close-icon"]}
            role="img"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
            >
              <path
                d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
              />
            </svg>
          </span>
        </button>
        <div
          className={styles.modal__content__header}
        >
          <div
            id="modal-label"
          >
            {title}
          </div>
        </div>
        <div
          className={styles.modal__content__body}
        >
          {children}
        </div>
        <div
          className={styles.modal__content__footer}
        >
          <button
            type="button"
            onClick={onCancel}
            className="button button--cancel"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onOk}
            className="button button--ok"
            disabled={isLoading}
          >
            OK
          </button>
        </div>
      </div>
      <div
        className={styles.modal__backdrop}
      />
    </div>,
    document.getElementById("modal-root")
  )
));

export default ModalContent;
