function Progress({ item , ...props}) {
  const { value, color, width } = item;

  const getColorClass = (color) => {
    switch (color) {
      case "red":
        return "bg-red-500 dark:bg-red-400";
      case "blue":
        return "bg-blue-500 dark:bg-blue-400";
      case "green":
        return "bg-green-500 dark:bg-green-400";
      case "yellow":
        return "bg-yellow-500 dark:bg-yellow-400";
      case "orange":
        return "bg-orange-500 dark:bg-orange-400";
      case "teal":
        return "bg-teal-500 dark:bg-teal-400";
      case "navy":
        return "bg-navy-500 dark:bg-navy-400";
      case "lime":
        return "bg-lime-500 dark:bg-lime-400";
      case "cyan":
        return "bg-cyan-500 dark:bg-cyan-400";
      case "pink":
        return "bg-pink-500 dark:bg-pink-400";
      case "purple":
        return "bg-purple-500 dark:bg-purple-400";
      case "amber":
        return "bg-amber-500 dark:bg-amber-400";
      case "indigo":
        return "bg-indigo-500 dark:bg-indigo-400";
      case "gray":
        return "bg-gray-500 dark:bg-gray-400";
      default:
        return "bg-indigo-500 dark:bg-indigo-400";
    }
  };

  return (
    <div className='min-w-[100px] w-full flex gap-2 items-center text-navy-700 dark:text-white' {...props}>
      <div
        className={`h-2 ${width ? width : "w-full"} rounded-full bg-gray-200 dark:bg-dark-200`}
      >
        <div
          className={`flex h-full items-center justify-center rounded-full ${getColorClass(color)}`}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className='text-sm font-medium dark:text-dark-50'>{value}%</span>
    </div>
  );
};

export default Progress;
