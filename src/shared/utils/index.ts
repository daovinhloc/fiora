import { iconOptions } from '@/shared/constants/data';
import { Filter } from '@growthbook/growthbook';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { OrderByFields } from '../types/Common.types';
import { Prisma } from '@prisma/client';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export const useGetIconLabel = (icon: string): string => {
  return (
    iconOptions
      .find((option) => option.options.some((o) => o.value === icon))
      ?.options.find((o) => o.value === icon)?.label || ''
  );
};

export const formatCurrency = (value: number, currency: string = 'VND') => {
  // Handle compact notation for large numbers
  let formattedValue = value;
  let suffix = '';

  if (Math.abs(value) >= 1_000_000) {
    // Convert to millions (M)
    formattedValue = value / 1_000_000;
    suffix = 'M';
  } else if (Math.abs(value) >= 1_000) {
    // Convert to thousands (K)
    formattedValue = value / 1_000;
    suffix = 'K';
  }

  // Determine the locale and currency format
  const formatter =
    currency === 'USD'
      ? new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: suffix ? 2 : 0, // Use 2 decimals for compact notation
          maximumFractionDigits: suffix ? 2 : 0, // Limit decimals for compact notation
        })
      : new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND',
          minimumFractionDigits: suffix ? 2 : 0, // Use 2 decimals for compact notation
          maximumFractionDigits: suffix ? 2 : 0, // Limit decimals for compact notation
        });

  // Format the number and insert suffix before the currency symbol
  const formatted = formatter.format(formattedValue);
  if (suffix) {
    if (currency === 'USD') {
      // For USD, move the suffix after the number but keep $ at the start
      const numericPart = formatted.replace('$', '').trim();
      return `$${numericPart}${suffix}`;
    } else {
      // For VND, split at ₫ and place suffix before the currency symbol
      const parts = formatted.split('₫').map((part) => part.trim());
      return `${parts[0]}${suffix} ₫${parts[1] || ''}`;
    }
  }

  return formatted;
};

export const convertVNDToUSD = (amountVND: number): number => {
  const exchangeRate = 25000; // 1 USD = 25000 VND
  return amountVND / exchangeRate;
};

export const convertUSDToVND = (amountUSD: number): number => {
  const exchangeRate = 25000; // 1 USD = 25000 VND
  return amountUSD * exchangeRate;
};

export const calculateAvailableLimit = (limit: string, balance: string): string => {
  const limitValue = Number.parseFloat(limit) || 0;
  const balanceValue = Number.parseFloat(balance) || 0;
  return (limitValue + balanceValue).toFixed(2);
};

// Helper function to build Prisma where clause
export function buildWhereTransactionClause(restFilters: Record<string, any>): Record<string, any> {
  const whereClause: Record<string, any> = {
    isDeleted: false,
  };

  if (restFilters.date) {
    if (restFilters.date) {
      whereClause.date = {
        equals: new Date(restFilters.date),
      };
    } else if (typeof restFilters.date === 'object') {
      whereClause.date = {};
      if (restFilters.date.from) {
        whereClause.date.gte = new Date(restFilters.date.from);
      }
      if (restFilters.date.to) {
        whereClause.date.lte = new Date(restFilters.date.to);
      }
    }
  }

  // Type filter (supports single or multiple types)
  if (restFilters.type) {
    if (Array.isArray(restFilters.type)) {
      whereClause.type = {
        in: restFilters.type,
      };
    } else {
      whereClause.type = {
        in: [restFilters.type],
      };
    }
  }

  // From Account filter
  if (restFilters.fromAccount) {
    whereClause.fromAccount = {
      name: {
        equals: restFilters.fromAccount,
      },
    };
  }

  // To Account filter
  if (restFilters.toAccount) {
    whereClause.toAccount = {
      name: {
        equals: restFilters.toAccount,
      },
    };
  }
  // Partner filter
  if (restFilters.partner) {
    whereClause.partner = {
      name: {
        equals: restFilters.partner,
      },
    };
  }

  return whereClause;
}

export function buildOrderByTransaction(orderBy: Record<string, any>): Record<string, any> {
  const orderByClause: Record<string, any> = [];

  if (orderBy['date']) {
    // add object to array
    orderByClause.push({ date: orderBy.date });
  }
  // Type filter (supports single or multiple types)
  if (orderBy['type']) {
    orderByClause.push({ type: orderBy.type });
  }

  // From Account filter
  if (orderBy['fromAccount']) {
    orderByClause.push({ fromAccount: { name: orderBy.fromAccount } });
  }

  // To Account filter
  if (orderBy['toAccount']) {
    orderByClause.push({ toAccount: { name: orderBy.toAccount } });
  }
  // Partner filter
  if (orderBy['partner']) {
    orderByClause.partner = orderBy.partner;
  }

  if (orderBy['amount']) {
    orderByClause.push({ amount: orderBy.amount });
  }

  return orderByClause;
}

export function buildOrderByTransactionV2(
  orderBy: OrderByFields,
): Prisma.TransactionOrderByWithRelationInput {
  const orderByObj = Object.entries(orderBy).reduce((acc, [key, value]) => {
    if (!value) return acc;

    if (key === 'fromAccount' || key === 'toAccount') {
      acc[key] = { name: value };
    } else {
      acc[key as keyof typeof Prisma.TransactionOrderByRelevanceFieldEnum] = value;
    }

    return acc;
  }, {} as Prisma.TransactionOrderByWithRelationInput);

  return orderByObj;
}
export function buildWhereClause(filters: Filter) {
  const whereClause: any = {};

  if (!filters) {
    return whereClause;
  }

  for (const [key, value] of Object.entries(filters)) {
    if (key === 'AND' || key === 'OR' || key === 'NOT') {
      whereClause[key] = value.map((subFilter: Filter) => buildWhereClause(subFilter));
    } else if (typeof key === 'object' && !Array.isArray(key)) {
      // incorporate conditional operators like contains, startsWith
      const [operator, operand] = Object.entries(key)[0];
      whereClause[key] = { [operator]: operand };
    } else {
      whereClause[key] = value;
    }
  }

  return whereClause;
}

export const isImageUrl = (str: string): boolean => {
  return str.startsWith('http') || str.startsWith('https') || str.startsWith('data:');
};
