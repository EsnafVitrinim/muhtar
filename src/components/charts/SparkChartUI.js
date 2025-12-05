"use client"

import { SparkAreaChart } from '@tremor/react';

export function SparkChartHero({ chartData }) {
  const { data, index, categories, colors } = chartData;
  return (
    <SparkAreaChart
      data={data}
      index={index}
      categories={categories}
      colors={colors}
    />
  );
}
