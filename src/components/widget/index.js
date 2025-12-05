import Card from "../card"

function Widget(props) {
  const { icon, title, subTitle } = props;

  return (
    <Card extraClass='w-max flex flex-grow items-center gap-4 hover:scale-105 duration-200'>
      <div className="w-max flex-row items-center rounded-full bg-lightPrimary dark:bg-dark-200 p-4">
        <span className="flex items-center text-indigo-600 dark:text-indigo-400">
          {icon}
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-sm text-slate-400 dark:text-dark-100">{title}</p>
        <h4 className="text-xl font-semibold text-black dark:text-dark-50">
          {subTitle}
        </h4>
      </div>
    </Card>
  )
}

export default Widget