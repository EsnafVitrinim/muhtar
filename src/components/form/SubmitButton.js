import { Button } from "@nextui-org/react";

function SubmitButton({ children, className, ...props }) {
  return (
    <Button
      type="submit"
      className={`text-sm px-4 py-3 bg-indigo-700 text-white rounded-xl h-auto dark:text-slate-200 hover:!bg-indigo-600 hover:!opacity-100 dark:hover:!bg-indigo-700 ${className ? className : ''}`}
      {...props}
    >
      {children}
    </Button>
  )
}

export default SubmitButton
