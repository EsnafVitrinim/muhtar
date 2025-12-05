function Card(props) {
  const { extraClass, children, ...rest } = props;
  return (
    <div
      className={`relative p-4 rounded-[12px] shadow-md shadow-slate-100 bg-white border border-slate-200 dark:border-dark-200 dark:bg-dark-300 dark:text-white dark:shadow-none ${extraClass}`}
      {...rest}
    >
      {children}
    </div>
  );
}

export default Card;
