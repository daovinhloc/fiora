import { CustomBarItem } from '@/components/common/stacked-bar-chart/type';
import { COLORS, STACK_TYPE } from '@/shared/constants/chart';
import { Currency } from '@/shared/types';
import { BudgetGetDataResponse } from '../domain/entities/Budget';
import { convertCurrency } from '@/shared/utils/convertCurrency';

export const mapBudgetToData = (
  budget: BudgetGetDataResponse,
  budgetCurrency: Currency,
  targetCurrency: Currency,
): CustomBarItem[] => {
  // Use convertCurrency for each budget value
  const convertedActExpense = convertCurrency(
    budget.budgetActExpense,
    budgetCurrency,
    targetCurrency,
  );
  const convertedTopExpense = convertCurrency(
    budget.budgetTopExpense,
    budgetCurrency,
    targetCurrency,
  );
  const convertedBotExpense = convertCurrency(
    budget.budgetBotExpense,
    budgetCurrency,
    targetCurrency,
  );
  const convertedActIncome = convertCurrency(
    budget.budgetActIncome,
    budgetCurrency,
    targetCurrency,
  );
  const convertedTopIncome = convertCurrency(
    budget.budgetTopIncome,
    budgetCurrency,
    targetCurrency,
  );
  const convertedBotIncome = convertCurrency(
    budget.budgetBotIncome,
    budgetCurrency,
    targetCurrency,
  );

  // Calculate profit using the converted values
  const convertedActProfit = convertedActIncome - convertedActExpense;
  // Ensure Top/Bot profit is not negative after conversion if income is less than expense
  const convertedTopProfit = Math.max(convertedTopIncome - convertedTopExpense, 0);
  const convertedBotProfit = Math.max(convertedBotIncome - convertedBotExpense, 0);

  return [
    {
      name: 'Expense',
      type: STACK_TYPE.EXPENSE,
      icon: 'banknoteArrowDown',
      A: convertedActExpense,
      T: convertedTopExpense,
      B: convertedBotExpense,
      colors: {
        A: COLORS.DEPS_DANGER.LEVEL_1,
        T: COLORS.DEPS_DANGER.LEVEL_1,
        B: COLORS.DEPS_DANGER.LEVEL_1,
      },
    },
    {
      name: 'Income',
      type: STACK_TYPE.INCOME,
      icon: 'banknote',
      A: convertedActIncome,
      T: convertedTopIncome,
      B: convertedBotIncome,
      colors: {
        A: COLORS.DEPS_SUCCESS.LEVEL_1,
        T: COLORS.DEPS_SUCCESS.LEVEL_1,
        B: COLORS.DEPS_SUCCESS.LEVEL_1,
      },
    },
    {
      name: 'Profit',
      type: STACK_TYPE.PROFIT,
      icon: 'handCoins',
      A: convertedActProfit,
      T: convertedTopProfit,
      B: convertedBotProfit,
      colors: {
        A: COLORS.DEPS_INFO.LEVEL_1,
        T: COLORS.DEPS_INFO.LEVEL_1,
        B: COLORS.DEPS_INFO.LEVEL_1,
      },
    },
  ];
};

export const legendItems = [
  {
    name: 'Expense',
    color: COLORS.DEPS_DANGER.LEVEL_1,
  },
  {
    name: 'Income',
    color: COLORS.DEPS_SUCCESS.LEVEL_1,
  },
  {
    name: 'Profit',
    color: COLORS.DEPS_INFO.LEVEL_1,
  },
];
