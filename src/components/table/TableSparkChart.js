"use client"

import { SparkChartHero } from "../charts/SparkChartUI"
import Chip from "../chip";

function TableSparkChart({ cellValue }) {
  const { data, categories } = cellValue;
  return (
    <>
      {
        data.length > 1 ? (
          <div className='w-[110px]'>
            <SparkChartHero chartData={cellValue} />
            <div className='flex items-center justify-between'>
              {
                <span className='text-[10px] text-slate-500 dark:text-dark-100'>{data[0][categories[0]]}</span>
              }
              {
                <span className='text-[10px] text-slate-500 dark:text-dark-100'>{data[data.length - 1][categories[0]]}</span>
              }
            </div>
          </div>
        ) : <Chip item={{ type: 'warning', value: 'Haftalık kilolar yok!' }} />
      }
    </>
  )
}

export default TableSparkChart
