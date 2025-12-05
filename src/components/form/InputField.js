import { Input } from "@nextui-org/react";

const InputField = ({ ...props }) => {
  return (
    <Input
      key='outside-left'
      label={props.label}
      type={props.type || 'text'}
      placeholder={props.placeholder || ''}
      radius="sm"
      size="sm"
      labelPlacement='outside-left'
      required={props.isRequired || false}
      classNames={{
        label: "text-xs text-navy-700 dark:text-dark-50 pb-1 w-[90px] text-left !ps-0 !pe-0",
        input: [
          "!w-full bg-transparent text-xs",
          "!text-slate-900 dark:!text-dark-50",
          "placeholder:text-xs placeholder:text-slate-400 dark:placeholder:text-dark-100",
        ],
        innerWrapper: "bg-transparent",
        inputWrapper: [
          'p-2 h-auto',
          '!bg-transparent border-2 border-slate-200 dark:border-dark-200 shadow-none',
          'data-[hover=true]:!bg-slate-50 dark:data-[hover=true]:!bg-dark-200/50',
          'group-data-[focus=true]:!bg-transparent dark:group-data-[focus=true]:!bg-transparent',
          'caret-black dark:caret-dark-50 rounded-lg'
        ],
        mainWrapper: 'w-full',
        clearButton: [
          'text-black dark:text-dark-50'
        ],
        description: [
          "text-slate-400 dark:text-dark-100 text-xs",
        ],
        base: 'gap-1'
      }}
      {...props}
    />
  )
}

export default InputField