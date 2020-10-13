import React, { useState, useEffect, useCallback, useRef } from "react";

import { useWindowEvent } from "hooks/useWindowEvent";

import ModalContent from './ModalContent';

const ModalContainer = ({
  trigger,
  content,
  title = "",
  onCancel = () => {},
  onOk = () => {}
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const modalRef = useRef();

  function closeModal() {
    if (modalRef.current) {
      setIsClosing(true);
      // Wait for the animation to finish
      setTimeout(() => {
        setIsOpened(false);
        setIsClosing(false);
      }, 501);
    }
  }

  function openModal() {
    setIsOpened(true);
  }

  function lockScrolling() {
    document.body.style.overflow = "hidden";
  }

  function restoreScrolling() {
    document.body.style.overflow = "unset";
  }

  async function handleCancel() {
    setIsLoading(true);

    try {
      await onCancel();
      closeModal();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleOk() {
    setIsLoading(true);

    try {
      await onOk();
      closeModal();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  // Handle outside clicks
  useWindowEvent("mousedown", useCallback(({ target }) => {
    if (modalRef.current && modalRef.current.contains(target)) {
      return;
    }

    closeModal();
  }, []));

  // Handle ESC presses
  useWindowEvent("keydown", useCallback(({ keyCode, key }) => {
    if (keyCode === 27 || key === "Escape" || key === "Esc") {
      closeModal();
    }
  }, []));

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

  return (
    <>
      {trigger(openModal)}
      {isOpened && (
        <ModalContent
          ref={modalRef}
          title={title}
          closeModal={closeModal}
          onCancel={handleCancel}
          onOk={handleOk}
          isOpened={isOpened}
          isLoading={isLoading}
          isClosing={isClosing}
        >
          {content(closeModal)}
        </ModalContent>
      )}
    </>
  );
};

export default ModalContainer;
