import DateRangeFilter from '@/components/common/filters/DateRangeFilter';
import MultiSelectFilter from '@/components/common/filters/MultiSelectFilter';
import NumberRangeFilter from '@/components/common/filters/NumberRangeFilter';
import GlobalFilter from '@/components/common/filters/GlobalFilter';
import useDataFetcher from '@/shared/hooks/useDataFetcher';
import { FilterColumn, FilterComponentConfig, FilterCriteria } from '@/shared/types/filter.types';
import { useAppSelector } from '@/store';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { TransactionFilterOptionResponse } from '../types';
import { DEFAULT_TRANSACTION_FILTER_CRITERIA } from '../utils/constants';

type FilterParams = {
  dateRange?: DateRange;
  types: string[];
  partners: string[];
  categories: string[];
  accounts: string[];
  amountMin: number;
  amountMax: number;
};

const filterParamsInitState: FilterParams = {
  dateRange: undefined,
  types: [],
  partners: [],
  categories: [],
  accounts: [],
  amountMin: 0,
  amountMax: 10000,
};

type FilterMenuProps<T> = {
  callBack: (newFilter: FilterCriteria) => void;
  components?: FilterComponentConfig[];
  filterParams?: T;
};

const options = [
  { value: 'Expense', label: 'Expense' },
  { value: 'Income', label: 'Income' },
  { value: 'Transfer', label: 'Transfer' },
];

const FilterMenu = <T = any,>(props: FilterMenuProps<T>) => {
  const { callBack, components } = props;
  const { amountMin, amountMax, filterCriteria } = useAppSelector((state) => state.transaction);

  // State for managing filter parameters
  const [filterParams, setFilterParams] = useState<FilterParams>({
    ...filterParamsInitState,
    amountMin: amountMin || 0,
    amountMax: amountMax || 10000,
  });

  // Fetch filter options
  const { data, isLoading } = useDataFetcher<TransactionFilterOptionResponse>({
    endpoint: '/api/transactions/options',
    method: 'GET',
  });

  // Extract filter data from complex filter structure
  const extractFilterData = useCallback(
    (filters: any) => {
      const types: Set<string> = new Set();
      const partners: Set<string> = new Set();
      const categories: Set<string> = new Set();
      const accounts: Set<string> = new Set();
      let currentAmountMin = amountMin;
      let currentAmountMax = amountMax;
      let dateFrom: Date | undefined;
      let dateTo: Date | undefined;

      // Handle AND array structure
      if (Array.isArray(filters?.AND)) {
        filters.AND.forEach((condition: any) => {
          // Direct type conditions
          if (condition.type && typeof condition.type === 'string') {
            types.add(condition.type);
          }

          // Direct partner conditions
          if (condition.partner?.name) {
            partners.add(condition.partner.name);
          }

          // Direct account/category conditions
          if (condition.fromAccount?.name) categories.add(condition.fromAccount.name);
          if (condition.fromCategory?.name) categories.add(condition.fromCategory.name);
          if (condition.toAccount?.name) accounts.add(condition.toAccount.name);
          if (condition.toCategory?.name) accounts.add(condition.toCategory.name);

          // Handle OR conditions within AND
          if (Array.isArray(condition.OR)) {
            condition.OR.forEach((orCondition: any) => {
              // OR type conditions
              if (orCondition.type && typeof orCondition.type === 'string') {
                types.add(orCondition.type);
              }

              // OR partner conditions
              if (orCondition.partner?.name) {
                partners.add(orCondition.partner.name);
              }

              // OR account/category conditions
              if (orCondition.fromAccount?.name) categories.add(orCondition.fromAccount.name);
              if (orCondition.fromCategory?.name) categories.add(orCondition.fromCategory.name);
              if (orCondition.toAccount?.name) accounts.add(orCondition.toAccount.name);
              if (orCondition.toCategory?.name) accounts.add(orCondition.toCategory.name);
            });
          }
        });
      }

      // Process flat filter structure
      if (!Array.isArray(filters?.AND) && typeof filters === 'object' && filters) {
        const flatFilters = filters;
        // Handle date range
        if (flatFilters.date) {
          dateFrom = flatFilters.date.gte ? new Date(flatFilters.date.gte) : undefined;
          dateTo = flatFilters.date.lte ? new Date(flatFilters.date.lte) : undefined;
        }

        // Process amount range
        if (flatFilters.amount) {
          currentAmountMin =
            flatFilters.amount.gte !== undefined ? flatFilters.amount.gte : amountMin;
          currentAmountMax =
            flatFilters.amount.lte !== undefined ? flatFilters.amount.lte : amountMax;
        }
      }

      return {
        types: Array.from(types),
        partners: Array.from(partners),
        categories: Array.from(categories),
        accounts: Array.from(accounts),
        amountMin: currentAmountMin,
        amountMax: currentAmountMax,
        dateRange: dateFrom || dateTo ? { from: dateFrom, to: dateTo } : undefined,
      };
    },
    [amountMin, amountMax],
  );

  // Sync filter params when filter criteria changes
  useEffect(() => {
    const extractedData = extractFilterData(filterCriteria.filters);
    setFilterParams(extractedData);
  }, [filterCriteria, extractFilterData]);

  const handleEditFilter = useCallback((target: keyof FilterParams, value: any) => {
    setFilterParams((prevParams) => ({
      ...prevParams,
      [target]: value,
    }));
  }, []);

  // Options for filter selects - memoized to prevent re-renders
  const partnerOptions = useMemo(() => {
    if (!data?.data?.partners) {
      return [{ label: 'No option available', value: 'none', disabled: true }];
    }

    return data.data.partners.map((option: string) => ({
      value: option,
      label: option,
    }));
  }, [data]);

  const accountOptions = useMemo(() => {
    if (!data?.data?.accounts) {
      return [{ label: 'No option available', value: 'none', disabled: true }];
    }

    return data.data.accounts.map((option: string) => ({
      value: option,
      label: option,
    }));
  }, [data]);

  const categoryOptions = useMemo(() => {
    if (!data?.data?.categories) {
      return [{ label: 'No option available', value: 'none', disabled: true }];
    }

    return data.data.categories.map((option: string) => ({
      value: option,
      label: option,
    }));
  }, [data]);

  // Create filter components configuration - each component is memoized
  const filterComponents = useMemo(() => {
    // Create memoized filter components
    const typeFilterComponent = (
      <MultiSelectFilter
        options={options}
        selectedValues={filterParams.types}
        onChange={(values) => handleEditFilter('types', values)}
        label="Transaction Types"
        placeholder="Select types"
        disabled={isLoading}
      />
    );

    const categoryFilterComponent = (
      <MultiSelectFilter
        options={categoryOptions}
        selectedValues={filterParams.categories}
        onChange={(values) => handleEditFilter('categories', values)}
        label="Categories"
        placeholder="Select categories"
        disabled={isLoading}
      />
    );

    const amountFilterComponent = (
      <NumberRangeFilter
        minValue={filterParams.amountMin}
        maxValue={filterParams.amountMax}
        minRange={0}
        maxRange={150000000}
        onValueChange={(target, value) =>
          handleEditFilter(target === 'minValue' ? 'amountMin' : 'amountMax', value)
        }
        label="Amount"
        minLabel="Min Amount"
        maxLabel="Max Amount"
        formatValue={(value, isEditing) => (isEditing ? value : value.toLocaleString())}
        tooltipFormat={(value) => `${value.toLocaleString()} USD`}
        step={1000}
      />
    );

    const dateFilterComponent = (
      <DateRangeFilter
        dateRange={filterParams.dateRange}
        onChange={(values) => handleEditFilter('dateRange', values)}
        label="Date"
      />
    );

    const accountFilterComponent = (
      <MultiSelectFilter
        options={accountOptions}
        selectedValues={filterParams.accounts}
        onChange={(values) => handleEditFilter('accounts', values)}
        label="Accounts"
        placeholder="Select accounts"
        disabled={isLoading}
      />
    );

    const partnerFilterComponent = (
      <MultiSelectFilter
        options={partnerOptions}
        selectedValues={filterParams.partners}
        onChange={(values) => handleEditFilter('partners', values)}
        label="Partners"
        placeholder="Select partners"
        disabled={isLoading}
      />
    );

    return [
      {
        key: 'typeFilter',
        component: typeFilterComponent,
        column: FilterColumn.LEFT,
        order: 0,
      },
      {
        key: 'categoryFilter',
        component: categoryFilterComponent,
        column: FilterColumn.LEFT,
        order: 1,
      },
      {
        key: 'amountFilter',
        component: amountFilterComponent,
        column: FilterColumn.LEFT,
        order: 2,
      },
      {
        key: 'dateFilter',
        component: dateFilterComponent,
        column: FilterColumn.RIGHT,
        order: 0,
      },
      {
        key: 'accountFilter',
        component: accountFilterComponent,
        column: FilterColumn.RIGHT,
        order: 1,
      },
      {
        key: 'partnerFilter',
        component: partnerFilterComponent,
        column: FilterColumn.RIGHT,
        order: 2,
      },
    ];
  }, [
    filterParams,
    categoryOptions,
    accountOptions,
    partnerOptions,
    amountMin,
    amountMax,
    isLoading,
    handleEditFilter,
  ]);

  // Creates the filter structure from the UI state
  const createFilterStructure = useCallback((params: FilterParams): Record<string, any> => {
    const updatedFilters: Record<string, any> = {};
    const andConditions: any[] = [];

    // Handle date range
    if (params.dateRange?.from || params.dateRange?.to) {
      updatedFilters.date = {
        gte: params.dateRange?.from ? params.dateRange.from.toISOString() : null,
        lte: params.dateRange?.to ? params.dateRange.to.toISOString() : null,
      };
    }

    // Types OR group
    if (params.types?.length) {
      andConditions.push({
        OR: params.types.map((type) => ({ type })),
      });
    }

    // Partners OR group
    if (params.partners?.length) {
      andConditions.push({
        OR: params.partners.map((partner) => ({ partner: { name: partner } })),
      });
    }

    // Categories OR group
    if (params.categories?.length) {
      andConditions.push({
        OR: params.categories.map((from) => ({ fromCategory: { name: from } })),
      });
    }

    // Accounts OR group
    if (params.accounts?.length) {
      andConditions.push({
        OR: params.accounts.map((to) => ({
          OR: [{ toAccount: { name: to } }, { toCategory: { name: to } }],
        })),
      });
    }

    // Amount as a separate condition
    andConditions.push({
      amount: {
        gte: params.amountMin,
        lte: params.amountMax,
      },
    });

    // Add AND conditions if there are any
    if (andConditions.length > 0) {
      updatedFilters.AND = andConditions;
    }

    return updatedFilters;
  }, []);

  return (
    <GlobalFilter<FilterParams>
      filterParams={filterParams}
      filterComponents={components || filterComponents}
      onFilterChange={(newFilter) => {
        callBack({
          ...filterCriteria,
          filters: newFilter.filters,
        });
      }}
      defaultFilterCriteria={DEFAULT_TRANSACTION_FILTER_CRITERIA}
      structureCreator={createFilterStructure}
    />
  );
};

export default FilterMenu;
