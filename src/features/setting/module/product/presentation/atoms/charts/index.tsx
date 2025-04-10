'use client';

import ChartLegend from '@/components/common/nested-bar-chart/atoms/ChartLegend';
import CustomYAxisTick from '@/components/common/nested-bar-chart/atoms/CustomYAxisTick';
import { useIsMobile } from '@/hooks/useIsMobile';
import {
  BASE_BAR_HEIGHT,
  DEFAULT_CURRENCY,
  DEFAULT_LOCALE,
  MIN_CHART_HEIGHT,
} from '@/shared/constants/chart';
import { getChartMargins, useWindowSize } from '@/shared/utils/device';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { ContentType } from 'recharts/types/component/Tooltip';
import { ProductFormValues } from '../../schema/addProduct.schema';
import BarLabel from '../BarLabel';
import CustomTooltip from '../CustomTooltip';

export type BarItem = {
  id?: string;
  name: string;
  description: string;
  taxRate: number;
  icon?: string;
  createdAt: string;
  updatedAt: string;
  value: number;
  color?: string;
  type: string;
  parent?: string;
  children?: BarItem[];
  isChild?: boolean;
  depth?: number;
  product?: ProductFormValues;
  expense?: number;
  income?: number;
};

export type LevelConfig = {
  totalName?: string;
  colors: {
    [depth: number]: string;
  };
};

export type PositiveAndNegativeBarChartProps = {
  data: BarItem[];
  title?: string;
  currency?: string;
  locale?: string;
  xAxisFormatter?: (value: number) => string;
  tooltipContent?: ContentType<ValueType, NameType>;
  legendItems: { name: string; color: string }[];
  maxBarRatio?: number;
  tutorialText?: string;
  callback?: (item: any) => void;
  callbackYAxis?: (item: any) => void;
  levelConfig?: LevelConfig;
};

const TwoSideBarChart = ({
  data,
  title,
  currency = DEFAULT_CURRENCY,
  locale = DEFAULT_LOCALE,
  xAxisFormatter = (value) =>
    new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value),
  tooltipContent,
  legendItems,
  tutorialText,
  callback,
  callbackYAxis,
  levelConfig,
}: PositiveAndNegativeBarChartProps) => {
  const isMobile = useIsMobile();
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const [chartHeight, setChartHeight] = useState(MIN_CHART_HEIGHT);
  const { width } = useWindowSize();

  const toggleExpand = useCallback((name: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  }, []);

  const getIcon = (item: BarItem) => {
    if (item.icon) {
      return item.icon;
    }

    if (!item.icon && item.product && item.product.icon) {
      return item.product.icon;
    }
    return null;
  };

  // Process data to combine expense and income, and handle children
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { chartData, visibleData } = useMemo(() => {
    let totalIncome = 0;
    let totalExpense = 0;
    const groupedData: Record<string, BarItem> = {};

    // Group top-level data by name
    data.forEach((item) => {
      if (!groupedData[item.name]) {
        groupedData[item.name] = {
          ...item,
        };
      }
      if (item.type === 'expense') {
        groupedData[item.name].expense = -Math.abs(item.value);
        totalExpense += item.value;
      } else if (item.type === 'income') {
        groupedData[item.name].income = item.value;
        totalIncome += item.value;
      }

      // Handle children: group them by name as well
      if (item.children && item.children.length > 0) {
        groupedData[item.name].children = item.children.map((child) => ({
          ...child,
          parent: item.name,
          isChild: true,
        }));
      }
    });

    // Create the combined dataset with "Total" as the first row
    const totalName = levelConfig?.totalName || 'Total';
    const totalColor = levelConfig?.colors[0] || '#888888';
    const combinedData = [
      {
        name: totalName,
        expense: -totalExpense,
        income: totalIncome,
        type: 'total',
        children: [],
        color: totalColor,
        depth: 0,
      },
      ...Object.entries(groupedData).map(([name, values]) => ({
        id: values.id,
        description: values.description,
        taxRate: values.taxRate,
        name,
        expense: values.expense,
        income: values.income,
        type: 'product',
        children: values.children || [],
        color: values || '#888888',
        depth: 0,
        product: values.product,
        icon: values.icon,
        createdAt: values.createdAt,
        updatedAt: values.updatedAt,
        isChild: false,
      })),
    ];

    // Flatten the data to include children when expanded
    const flattenedData: any[] = [];
    const buildProcessedData = (items: any[], depth: number = 0) => {
      items.forEach((item) => {
        // Process the current item
        const currentItem = {
          ...item,
          depth,
          color: item.color || levelConfig?.colors[depth] || '#888888',
          parent: item.parent || undefined,
          isChild: !!item.parent,
          expense: item.expense ?? 0, // Default to 0 if undefined
          income: item.income ?? 0, // Default to 0 if undefined,
          product: item.product,
          type: item.type || 'product',
          icon: getIcon(item),
        };

        // If the item is a child and has a `value` and `type`, convert to `expense` and `income`
        if (item.value !== undefined && item.type) {
          currentItem.expense = item.type === 'expense' ? -Math.abs(item.value) : 0;
          currentItem.income = item.type === 'income' ? item.value : 0;
          delete currentItem.value; // Remove the `value` field
          delete currentItem.type; // Remove the `type` field
        }

        flattenedData.push(currentItem);

        // Process children if expanded
        if (expandedItems[item.name] && item.children && item.children.length > 0) {
          buildProcessedData(item.children, depth + 1);
        }
      });
    };

    buildProcessedData(combinedData);

    return { chartData: combinedData, visibleData: flattenedData };
  }, [data, expandedItems, levelConfig]);

  // Calculate the maximum absolute value for the X-axis domain
  const maxAbsValue = useMemo(() => {
    const absValues = visibleData.flatMap((item) =>
      [Math.abs(item.expense || 0), Math.abs(item.income || 0)].filter((v) => v !== 0),
    );
    return Math.max(...absValues, 0) || 1;
  }, [visibleData]);

  // Define bar height and gap
  const BAR_HEIGHT = BASE_BAR_HEIGHT;
  const BAR_GAP = 0;
  const BAR_CATEGORY_GAP = 10;

  // Calculate chart height based on the number of visible bars (including children)
  useEffect(() => {
    const numBars = visibleData.length;
    const newHeight = numBars * (BAR_HEIGHT + BAR_CATEGORY_GAP);
    setChartHeight(Math.max(newHeight, MIN_CHART_HEIGHT));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleData]);

  // Adjust margins to remove space between charts
  const expenseChartMargins = useMemo(
    () => ({
      ...getChartMargins(width),
      right: 0, // Remove right margin for expense chart
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [width, isMobile],
  );

  const incomeChartMargins = useMemo(
    () => ({
      ...getChartMargins(width),
      left: isMobile ? 10 : 0,
    }),
    [width, isMobile],
  );

  const customTooltipWithConfig = useCallback(
    (props: any) => (
      <CustomTooltip
        {...props}
        currency={currency}
        locale={locale}
        tutorialText={tutorialText}
        formatter={xAxisFormatter}
      />
    ),
    [currency, locale, tutorialText, xAxisFormatter],
  );

  return (
    <div className="w-full transition-colors rounded-lg py-4 duration-200">
      {title && (
        <h2 className="text-xl text-center font-semibold text-gray-800 dark:text-gray-200 mb-4">
          {title}
        </h2>
      )}
      <div
        style={{ height: `${chartHeight}px` }}
        className="transition-all duration-300 flex flex-col md:flex-row"
      >
        {/* Expense Chart (bars extend from 0 to the left) */}
        <ResponsiveContainer width="100%" height={chartHeight} className="md:w-1/2">
          <BarChart
            data={visibleData}
            layout="vertical"
            margin={expenseChartMargins}
            barCategoryGap={BAR_CATEGORY_GAP}
            barGap={BAR_GAP}
            className="transition-all duration-300"
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#E5E7EB"
              className="dark:stroke-gray-600 transition-colors duration-200"
            />
            <XAxis
              type="number"
              domain={[maxAbsValue, 0]}
              tickFormatter={(value) => xAxisFormatter(Math.abs(value))}
              className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200"
            />
            <YAxis
              type="category"
              dataKey="name"
              tickLine={false}
              axisLine={false}
              className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200"
              tick={(props) => (
                <CustomYAxisTick
                  {...props}
                  processedData={visibleData}
                  expandedItems={expandedItems}
                  onToggleExpand={toggleExpand}
                  callback={callbackYAxis}
                />
              )}
            />
            <Tooltip trigger="hover" content={tooltipContent || customTooltipWithConfig} />
            <Bar
              dataKey="expense"
              barSize={BAR_HEIGHT}
              label={(props) => <BarLabel {...props} formatter={xAxisFormatter} />}
              onClick={(props) => callback && callback(props)}
              className="transition-all duration-300 cursor-pointer"
            >
              {visibleData.map((entry, index) => {
                const color = entry.isChild ? legendItems[2].color : legendItems[0].color;
                return <Cell key={`expense-cell-${index}`} fill={color} />;
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        {/* Income Chart (bars extend from 0 to the right) */}
        <ResponsiveContainer
          width="100%"
          height={chartHeight}
          className={`"md:w-1/2" ${isMobile && 'mt-10'}`}
        >
          <BarChart
            data={visibleData}
            layout="vertical"
            margin={incomeChartMargins}
            barCategoryGap={BAR_CATEGORY_GAP}
            barGap={BAR_GAP}
            className="transition-all duration-300"
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#E5E7EB"
              className="dark:stroke-gray-600 transition-colors duration-200"
            />
            <XAxis
              type="number"
              domain={[0, maxAbsValue]}
              tickFormatter={(value) => xAxisFormatter(Math.abs(value))}
              className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200"
            />
            <YAxis
              type="category"
              dataKey="name"
              tickLine={false}
              axisLine={false}
              width={isMobile ? 70 : 0}
              tick={(props) => (
                <CustomYAxisTick
                  {...props}
                  processedData={visibleData}
                  expandedItems={expandedItems}
                  onToggleExpand={toggleExpand}
                  callback={callbackYAxis}
                />
              )}
              className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200"
            />
            <Tooltip trigger="hover" content={tooltipContent || customTooltipWithConfig} />
            <Bar
              dataKey="income"
              barSize={BAR_HEIGHT}
              label={(props) => <BarLabel {...props} formatter={xAxisFormatter} />}
              onClick={(props) => callback && callback(props)}
              className="transition-all duration-300 cursor-pointer"
            >
              {visibleData.map((entry, index) => {
                const color = entry.isChild ? legendItems[3].color : legendItems[1].color;
                return <Cell key={`income-cell-${index}`} fill={color} className="mr-20" />;
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        {isMobile && <ChartLegend items={legendItems} />}
      </div>
      {!isMobile && <ChartLegend items={legendItems} />}
    </div>
  );
};

export default TwoSideBarChart;
