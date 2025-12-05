'use client';

import { DonutChart, List, ListItem } from '@tremor/react';
import Card from '../card';

const currencyFormatter = (number) => {
  return '$' + Intl.NumberFormat('us').format(number).toString();
};

export default function DonutChartHero({ chartData }) {
  const colors = ['cyan', 'indigo', 'fuchsia', 'blue', 'violet', 'emerald', 'pink', 'amber', 'lime'];
  return (
    <Card>
      <DonutChart
        className="mt-8"
        data={chartData}
        category="amount"
        index="name"
        valueFormatter={currencyFormatter}
        showTooltip={true}
        colors={colors}
      />
      <p className="mt-8 flex items-center justify-between text-xs text-slate-400 dark:text-dark-100">
        <span>Category</span>
        <span>Amount / Share</span>
      </p>
      <List className="mt-2">
        {chartData.map((item, index) => (
          <ListItem key={item.name} className="space-x-6">
            <div className="flex items-center space-x-2.5 truncate">
              <span
                className={`bg-${colors[index]}-500 size-2.5 shrink-0 rounded-sm`}
                aria-hidden={true}
              />
              <span className="truncate text-black dark:text-dark-50">
                {item.name}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="tabular-nums font-medium text-black dark:text-dark-50">
                {currencyFormatter(item.amount)}
              </span>
              <span className="rounded-sm bg-slate-100 px-1.5 py-0.5 text-xs font-medium tabular-nums text-slate-600 dark:bg-dark-200 dark:text-dark-50">
                {item.share}
              </span>
            </div>
          </ListItem>
        ))}
      </List>
    </Card>
  );
}