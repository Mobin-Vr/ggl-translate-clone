import { useEffect, useRef, useState } from "react";

export function useHistoryModal(onCloseCallback) {
  const modalRef = useRef(null);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalOpen(false);
        if (onCloseCallback) onCloseCallback();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onCloseCallback]);

  return {
    modalRef,
    isModalOpen,
    openModal: () => setModalOpen(true),
    closeModal: () => setModalOpen(false),
  };
}
