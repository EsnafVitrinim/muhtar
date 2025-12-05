function TitleWithIcon({ icon, title, description }) {
  return (
    <div className="flex items-center gap-2">
      {icon && (
        <span className="flex items-center justify-center text-lg rounded-full text-indigo-600 dark:text-indigo-400 bg-lightPrimary dark:bg-dark-200 w-12 h-12">
          {icon}
        </span>
      )}
      <div>
        <h3 className="text-base font-semibold">{title}</h3>
        <p className="text-xs text-slate-400 dark:text-dark-100">{description}</p>
      </div>
    </div>
  )
}

export default TitleWithIcon
