'use client'
import { useDispatch } from 'react-redux';
import { Button, modal, Tooltip } from '@nextui-org/react';
import { EyeIcon, PenSquareIcon, XMarkIcon } from '@/icons';
import Link from 'next/link';
import Delete from './actions/Delete';

function TableActions({ item, cellValue }) {
  const dispatch = useDispatch();
  const sefPath = item.keyValue.value;
  const getButtonBaseClass = (color) => `bg-${color}-50 text-${color}-600 border border-${color}-500 dark:bg-${color}-800/20 dark:text-${color}-400`
  const tooltipBaseClass = 'text-xs text-black dark:text-white';

  const getAction = (action, index) => {
    const { type, path, text } = action;
    switch (type) {
      case 'VIEW': return (
        <Button
          key={index}
          as={Link}
          href={`${path}${sefPath}`}
          startContent={<EyeIcon className='w-4' />}
          className={`${getButtonBaseClass('green')} px-1 h-auto min-w-max gap-1`}
          size='sm'
        >
          {text && text}
        </Button>
      );
      case 'EDIT': return (
        <Tooltip key={index} className={tooltipBaseClass} content="Düzenle">
          <Button
            as={Link}
            href={`${path}${sefPath}`}
            startContent={<PenSquareIcon className='w-4' />}
            className={`${getButtonBaseClass('blue')} px-1 h-auto min-w-max`}
            size='sm'
          />
        </Tooltip>
      );
      case 'UPDATE_MODAL': return (
        <Button
          key={index}
          onClick={() => {
            const payload = {
              data: { ...item, keyValue: item.keyValue.value },
              isOpen: true,
            };
            dispatch(action.modal(payload));
          }}
          startContent={<EyeIcon className='w-4' />}
          className={`${getButtonBaseClass('green')} px-1 h-auto min-w-max gap-1`}
          size='sm'
        >
          {text && text}
        </Button>
      );
      case 'DELETE': return (
        <Delete
          key={index}
          getButtonBaseClass={getButtonBaseClass}
          item={item}
          action={action}
        />
      );
      default: return (
        <Tooltip key={index} className={tooltipBaseClass} content="Belirsiz">
          <Button
            startContent={<XMarkIcon className='w-4' />}
            className={`${getButtonBaseClass('red')} px-1 h-auto min-w-max`}
            size='sm'
          />
        </Tooltip>
      );
    }
  }
  return (
    <div key={item.id} className='flex gap-2 items-center'>
      {
        cellValue.actions?.map((action, index) => getAction(action, index))
      }
    </div>
  )
}

export default TableActions
