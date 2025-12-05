"use client"

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";

function ModalUI({ open, onClose, modalTitle, children, modalFooter, ...props }) {
  return (
    <Modal
      backdrop='blur'
      isOpen={open}
      onClose={onClose}
      size='lg'
      placement='center'
      classNames={{
        body: "py-8 md:px-8 px-4",
        backdrop: "bg-gradient-to-t from-slate-900/20 to-indigo-900/50",
        base: "bg-slate-50 dark:bg-dark-400",
        header: "border-b-[1px] border-slate-200 dark:border-dark-200",
        footer: "border-t-[1px] border-slate-200 dark:border-dark-200",
        closeButton: "hover:bg-slate-200 active:bg-slate-200 dark:hover:bg-dark-200 dark:active:bg-dark-200",
      }}
      {...props}
    >
      <ModalContent>
        {modalTitle && <ModalHeader className="flex flex-col gap-1 text-black dark:text-dark-50">{modalTitle}</ModalHeader>}
        <ModalBody>
          {children}
        </ModalBody>
        {modalFooter && <ModalFooter>{modalFooter}</ModalFooter>}
      </ModalContent>
    </Modal>
  );
}

export default ModalUI
