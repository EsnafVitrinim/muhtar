"use client"

import { useState } from 'react';
import { useCopyToClipboard } from 'react-use';
import { Tooltip, Button } from '@nextui-org/react';
import { CheckIcon, CopyIcon } from '@/icons';

function CopyButton({ code }) {
  const [isCopied, copyToClipboard] = useCopyToClipboard();
  const [isCopying, setIsCopying] = useState(false);

  const copyCode = () => {
    copyToClipboard(code);
    setIsCopying(true);

    setTimeout(() => {
      setIsCopying(false);
    }, 3000);
  };

  return (
    <Tooltip className='text-gray-900 dark:text-dark-100' content="Copy Code">
      <Button
        className="text-gray-700 dark:text-dark-100 px-2 py-1 min-w-0 h-auto"
        onClick={copyCode}
        variant="light"
      >
        {isCopying && isCopied ? <CheckIcon width={16} /> : <CopyIcon width={16} />}
      </Button>
    </Tooltip>
  );
}

export default CopyButton;
