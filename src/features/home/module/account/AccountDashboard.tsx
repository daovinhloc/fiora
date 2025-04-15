'use client';

import PositiveAndNegativeBarChart, {
  BarItem,
} from '@/components/common/positive-negative-bar-chart';
import { Icons } from '@/components/Icon';
import { fetchAccounts, fetchParents } from '@/features/home/module/account/slices/actions';
import { getAccountColorByType } from '@/features/home/module/account/slices/utils';
import { COLORS } from '@/shared/constants/chart';
import { useAppDispatch, useAppSelector } from '@/store';
import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Account } from '@/features/home/module/account/slices/types';
import { formatCurrency } from '@/shared/utils';
import DeleteAccountDialog from '@/features/home/module/account/components/DeleteAccountDialog';
import NavigateToAccountDialog from '@/features/home/module/account/components/NavigateToAccountDialog';
import ChartSkeleton from '@/components/common/organisms/ChartSkeleton';
import { MODULE } from '@/shared/constants';

const AccountDashboard = ({ module = MODULE.ACCOUNT }: { module: string | undefined }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const chartRef = useRef<HTMLDivElement>(null);
  const [showNavigateDialog, setShowNavigateDialog] = useState(false);
  const { accounts, refresh } = useAppSelector((state) => state.account);

  useEffect(() => {
    dispatch(fetchAccounts());
    dispatch(fetchParents());
  }, [dispatch, refresh]);

  const chartData: BarItem[] = useMemo(() => {
    if (!accounts.data) return [];
    return accounts.data
      .filter((account: Account) => !account?.parentId)
      .map((account: Account) => ({
        id: account.id,
        name: account.name,
        icon: account.icon,
        value: Number(account.balance) || 0,
        type: account.type,
        color: getAccountColorByType(account.type),
        children: account.children?.map((child) => ({
          id: child.id,
          name: child.name,
          icon: child.icon,
          value: Number(child.balance) || 0,
          type: child.type,
          color: getAccountColorByType(child.type),
        })),
      }));
  }, [accounts]);

  const handleDisplayDetail = (item: any) => {
    if (item.id) {
      router.push(`/account/update/${item.id}`);
    }
  };

  const handleChartClick = () => {
    if (module === MODULE.HOME) {
      setShowNavigateDialog(true);
    }
  };

  const handleNavigateConfirm = () => {
    setShowNavigateDialog(false);
    router.push('/account');
  };

  if (accounts.error) return <div className="text-red-600">Error: {accounts.error}</div>;

  return (
    <>
      {module === MODULE.ACCOUNT && (
        <div className="flex justify-end">
          <Link href="/account/create">
            <button className="p-2 mb-4 rounded-full bg-blue-500 hover:bg-blue-700 text-white">
              <Icons.add className="h-6 w-6" />
            </button>
          </Link>
        </div>
      )}
      {accounts.isLoading ? (
        <ChartSkeleton />
      ) : (
        <div
          ref={chartRef}
          onClick={handleChartClick}
          className={module === MODULE.HOME ? 'cursor-pointer relative' : ''}
        >
          {module === 'HOME' && (
            <span className="absolute top-2 right-2 text-sm text-gray-500">
              Click to view details
            </span>
          )}
          <PositiveAndNegativeBarChart
            title={module === MODULE.ACCOUNT ? 'Accounts' : undefined}
            data={chartData}
            xAxisFormatter={(value) => formatCurrency(value)}
            levelConfig={{
              totalName: 'Net Balance',
              colors: { 0: COLORS.DEPS_SUCCESS.LEVEL_1 },
            }}
            callback={module === MODULE.ACCOUNT ? handleDisplayDetail : undefined}
            header={
              module === MODULE.HOME ? (
                <h3 className="text-lg font-semibold p-6">Account Balance</h3>
              ) : undefined
            }
          />
        </div>
      )}
      {module === MODULE.ACCOUNT && <DeleteAccountDialog />}
      {module === MODULE.HOME && (
        <NavigateToAccountDialog
          isOpen={showNavigateDialog}
          onClose={() => setShowNavigateDialog(false)}
          onConfirm={handleNavigateConfirm}
        />
      )}
    </>
  );
};

export default AccountDashboard;
