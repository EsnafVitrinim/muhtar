function Chip({ item, className, ...props }) {
  const { type, value } = item;
  switch (type) {
    case 'success': return (
      <div className={`flex items-center bg-green-50 text-green-600 border border-green-500 dark:bg-green-800/20 dark:text-green-400 w-max px-2 py-1 rounded-lg ${className}`} {...props}>
        <p className="text-xs">
          {value}
        </p>
      </div>
    );
    case 'error': return (
      <div className={`flex items-center bg-red-50 text-red-600 border border-red-500 dark:bg-red-800/20 dark:text-red-400 w-max px-2 py-1 rounded-lg ${className}`} {...props}>
        <p className="text-xs">
          {value}
        </p>
      </div>
    );
    case 'warning': return (
      <div className={`flex items-center bg-yellow-50 text-yellow-500 border border-yellow-500 dark:bg-yellow-800/20 dark:text-yellow-400 w-max px-2 py-1 rounded-lg ${className}`} {...props}>
        <p className="text-xs">
          {value}
        </p>
      </div>
    );
    case 'info': return (
      <div className={`flex items-center bg-blue-50 text-blue-600 border border-blue-500 dark:bg-blue-800/20 dark:text-blue-400 w-max px-2 py-1 rounded-lg ${className}`} {...props}>
        <p className="text-xs">
          {value}
        </p>
      </div>
    );
    default:
      return (
        <div className={`flex items-center bg-slate-50 text-slate-600 border border-slate-500 dark:bg-slate-800/20 dark:text-slate-400 w-max px-2 py-1 rounded-lg ${className}`} {...props}>
          <p className="text-xs">
            {value}
          </p>
        </div>
      );
  }
}

export default Chip
