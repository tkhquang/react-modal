import React, { useState } from "react";
import { useModal } from "hooks/useModal";
import ModalContent from "./ModalContent";

const withModal = (Trigger) => {
  const ModalContainer = ({
    children,
    inititalOpen,
    lockIn,
    title = "",
    onOk = () => {},
    onCancel = () => {}
  }) => {
    const {
      modalRef,
      isOpened,
      openModal,
      closeModal
    } = useModal({
      inititalOpen,
      lockIn,
      beforeClose: async () => {
        await new Promise(resolve => {
          setIsClosing(true);
          setTimeout(resolve, 501);
        });
      },
      afterClose: () => {
        setIsClosing(false);
      }
    });

    const [isLoading, setIsLoading] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
  
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
  
    return (
      <>
        <Trigger onClick={openModal} />
        {isOpened && (
          <ModalContent
            ref={modalRef}
            title={title}
            isOpened={isOpened}
            closeModal={closeModal}
            openModal={openModal}
            isLoading={isLoading}
            isClosing={isClosing}
            onCancel={handleCancel}
            onOk={handleOk}
          >
            {children}
          </ModalContent>
        )}
      </>
    );
  }

  return ModalContainer;
}

export default withModal;