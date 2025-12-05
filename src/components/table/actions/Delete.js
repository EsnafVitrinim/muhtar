"use client"

import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  useDisclosure
} from "@nextui-org/react";
import { useDispatch } from 'react-redux';
import moment from "moment";
import { TrashIcon } from '@/icons';
import { modalClasses } from "@/constants/styles";

function Delete({ getButtonBaseClass, item, action }) {
  const dispatch = useDispatch();
  const { modalContent } = action;
  const { id } = item;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleDelete = (e) => {
    e.preventDefault();
    const deletedAt = moment().format('YYYY-MM-DD');
    const data = {
      deleted_at: deletedAt,
    };
    dispatch(modalContent.endpoint({ id, data }));
  }

  return (
    modalContent && (
      <>
        <Button
          startContent={<TrashIcon className='w-4' />}
          className={`${getButtonBaseClass('red')} px-2 h-auto min-w-max gap-1`}
          size='sm'
          onClick={onOpen}
        >{modalContent.buttonText || 'Sil'}</Button>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          classNames={modalClasses}
          placement='center'
        >
          <ModalContent>
            {(onClose) => (
              <>
                <div
                  className="text-lg font-semibold text-black dark:text-dark-50 p-4 border-b border-slate-100 dark:border-dark-200">
                  {modalContent.title}
                </div>
                <ModalBody>
                  <p className="text-sm">
                    {modalContent.description}
                  </p>
                </ModalBody>
                <div className="flex items-center justify-end gap-2 p-4 border-t border-slate-100 dark:border-dark-200">
                  <Button color="default" variant="light" size="sm" onClick={onClose}>
                    Vazgeç
                  </Button>
                  <Button
                    startContent={<TrashIcon width={14} />}
                    color="danger"
                    size="sm"
                    onClick={(e) => { handleDelete(e), onClose() }}>
                    Evet, Sil
                  </Button>
                </div>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    )
  )
}

export default Delete
