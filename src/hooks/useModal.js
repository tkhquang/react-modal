import { useRef, useState, useCallback, useEffect } from "react";
import { useWindowEvent } from "hooks/useWindowEvent";

export const useModal = ({
  inititalOpen = false,
  lockIn = false,
  beforeOpen = () => {},
  beforeClose = () => {},
  afterOpen = () => {},
  afterClose = () => {}
}) => {
  const modalRef = useRef(null);
  const [isOpened, setIsOpened] = useState(inititalOpen);

  const openModal = useCallback(async() => {
    try {
      await beforeOpen();
      setIsOpened(true);
      await afterOpen();
    } catch (error) {
      console.log(error);
    }
  }, [beforeOpen, afterOpen]);

  const closeModal = useCallback(async() => {
    try {
      await beforeClose();
      setIsOpened(false);
      await afterClose();
    } catch (error) {
      console.log(error);
    }
  }, [beforeClose, afterClose]);

  function lockScrolling() {
    document.body.style.overflow = "hidden";
  }

  function restoreScrolling() {
    document.body.style.overflow = "unset";
  }

  // Handle outside clicks
  useWindowEvent("mousedown", useCallback(({ target }) => {
    if (!isOpened) {
      return;
    }

    if (lockIn === true) {
      return;
    }

    if (modalRef.current && modalRef.current.contains(target)) {
      return;
    }

    closeModal();
  }, [lockIn, modalRef, closeModal, isOpened]));

  // Handle ESC presses
  useWindowEvent("keydown", useCallback(({ keyCode, key }) => {
    if (!isOpened) {
      return;
    }

    if (lockIn === true) {
      return;
    }

    if (keyCode === 27 || key === "Escape" || key === "Esc") {
      closeModal();
    }
  }, [lockIn, closeModal, isOpened]));

  useEffect(() => {
    if (isOpened) {
      lockScrolling()
    } else {
      restoreScrolling();
    }

    return () => {
      restoreScrolling();
    };
  }, [isOpened]);

  return {
    modalRef,
    isOpened,
    openModal,
    closeModal
  }
}
