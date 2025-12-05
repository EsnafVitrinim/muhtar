"use client"

import { AreaChart } from '@tremor/react';

const dataFormatter = (number) =>
  `$${Intl.NumberFormat('us').format(number).toString()}`;

export function AreaChartHero({ chartData }) {
  return (
    <AreaChart
      className="h-80 px-4"
      data={chartData}
      index="date"
      categories={['SolarPanels', 'Inverters']}
      colors={['indigo', 'rose']}
      valueFormatter={dataFormatter}
      yAxisWidth={60}
      onValueChange={() => { }}
    />
  );
}