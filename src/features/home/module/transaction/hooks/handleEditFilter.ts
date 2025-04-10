import {
  IRelationalTransaction,
  TransactionAccount,
  TransactionCategory,
  TransactionFilterComparator,
  TransactionFilterCriteria,
  TransactionFilterOperator,
  TransactionPartner,
} from '../types';

type FilterProps = {
  currentFilter: TransactionFilterCriteria;
  callBack: (newFilter: TransactionFilterCriteria) => void;
  target: keyof IRelationalTransaction;
  value: string | number | boolean;
  comparator?: TransactionFilterComparator;
  subTarget?:
    | keyof TransactionAccount
    | keyof TransactionCategory
    | keyof TransactionPartner
    | keyof IRelationalTransaction;
  operator?: TransactionFilterOperator;
};

export const handleEditFilter = (props: FilterProps) => {
  const { currentFilter, callBack, target, value, comparator, subTarget, operator } = props;

  let newFilterCriteria: TransactionFilterCriteria = { ...currentFilter };

  if (!operator && !subTarget) {
    newFilterCriteria = {
      ...newFilterCriteria,
      filters: {
        ...newFilterCriteria.filters,
        [target]: comparator ? { [comparator]: value } : value,
      },
    };
  } else if (!operator && subTarget) {
    newFilterCriteria = {
      ...newFilterCriteria,
      filters: {
        ...newFilterCriteria.filters,
        [target]: { [subTarget as string]: comparator ? { [comparator]: value } : value },
      },
    };
  } else if (operator && subTarget) {
    newFilterCriteria = {
      ...newFilterCriteria,
      filters: {
        ...newFilterCriteria.filters,
        [operator]: {
          ...((newFilterCriteria.filters?.[operator] as object) ?? {}),
          [target]: { [subTarget as string]: comparator ? { [comparator]: value } : value },
        },
      },
    };
  }

  callBack(newFilterCriteria);
};
