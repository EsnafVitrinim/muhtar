import { Radio } from "@nextui-org/react";

export const CustomRadio = (props) => {
  const { children, ...otherProps } = props;

  return (
    <Radio
      {...otherProps}
      classNames={{
        base: [
          "m-0 bg-transparent hover:bg-slate-50 dark:hover:bg-dark-200/50 items-center justify-between",
          "flex-row-reverse max-w-full cursor-pointer rounded-lg gap-4 p-4",
          "border-2 border-slate-200 dark:border-dark-200 text-red-200",
          "data-[selected=true]:border-indigo-700 dark:data-[selected=true]:border-indigo-700",
        ],
        label: "font-medium text-black dark:text-dark-50 pb-1",
        wrapper: [
          "group-data-[selected=true]:border-indigo-700",
          ""
        ],
        control: "bg-indigo-700",
        description: 'text-xs text-slate-400 dark:text-dark-100',
      }}
    >
      {children}
    </Radio>
  );
};