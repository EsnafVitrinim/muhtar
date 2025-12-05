import React from 'react';
import { Button } from "@nextui-org/react";
import { AppleIcon } from '@/icons';

function AppleButton({
  className = "",
  variant = "ghost",
  startContent = <AppleIcon className='w-4 h-auto fill-black dark:fill-white' />,
  children = "Log in with Google",
  ...props
}) {
  const defaultClasses = "text-sm border-slate-200 dark:border-dark-200 px-4 py-3 rounded-xl h-auto dark:text-dark-50 hover:!bg-slate-200 dark:hover:!bg-dark-200";

  return (
    <Button
      className={`${defaultClasses} ${className}`}
      variant={variant}
      startContent={startContent}
      {...props}
    >
      {children}
    </Button>
  )
}

export default AppleButton
