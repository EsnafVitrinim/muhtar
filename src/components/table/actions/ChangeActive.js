"use client"

import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  Tooltip,
  useDisclosure
} from "@nextui-org/react";
import { useDispatch } from 'react-redux';
import { modalClasses } from "@/constants/styles";
import { updateCustomer } from "@/api/endpoints";

function ChangeActive({ tooltipBaseClass, getButtonBaseClass, item, action }) {
  const dispatch = useDispatch();
  const { modalContent } = action;
  const { id } = item;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleChangeActive = (e) => {
    e.preventDefault();
    const data = {
      id: id,
      aktif: modalContent.data
    }
    dispatch(updateCustomer(id, data));
  }

  return (
    modalContent && (
      <>
        <Tooltip className={tooltipBaseClass || 'text-xs text-black dark:text-white'} content={modalContent.triggerTooltip}>
          <Button
            startContent={modalContent.triggerIcon}
            className={`${getButtonBaseClass(modalContent.triggerColor)} px-1 h-auto min-w-max`}
            size='sm'
            onClick={onOpen}
          />
        </Tooltip>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          classNames={modalClasses}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <div
                  className="text-lg font-semibold text-black dark:text-dark-50 p-4 border-b border-slate-100 dark:border-dark-200">
                  {modalContent.title}
                </div>
                <ModalBody>
                  <p className="text-sm my-4">
                    {modalContent.description}
                  </p>
                </ModalBody>
                <div className="flex items-center justify-end gap-2 p-4 border-t border-slate-100 dark:border-dark-200">
                  <Button color="danger" variant="light" size="sm" onClick={onClose}>
                    Vazgeç
                  </Button>
                  <Button color="primary" size="sm" onClick={(e) => { handleChangeActive(e), onClose() }}>
                    Onayla
                  </Button>
                </div>
              </>
            )}
          </ModalContent>
        </Modal >
      </>
    )
  )
}

export default ChangeActive
