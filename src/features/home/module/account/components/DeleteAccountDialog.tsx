'use client';
import { Icons } from '@/components/Icon';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useDeleteAccount } from '@/features/home/module/account/hooks/useDeleteAccount';
import { useAppSelector } from '@/store';
import { cn } from '@/shared/utils';
import type React from 'react';

const DeleteAccountDialog: React.FC = () => {
  const { accountDeleteDialog, selectedAccount, isDeleting, handleDeleteAccount, handleClose } =
    useDeleteAccount();
  const { accounts } = useAppSelector((state) => state.account);

  return (
    <Dialog open={accountDeleteDialog} onOpenChange={handleClose}>
      <DialogContent
        className={cn(
          'p-0 overflow-hidden border-none shadow-2xl',
          'dark:bg-gray-900 dark:text-gray-100',
          'w-[95vw] max-w-md rounded-lg sm:rounded-xl',
          'transition-all duration-200',
        )}
      >
        <div className="absolute top-2 right-2 z-10">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className={cn(
              'rounded-full h-8 w-8 p-0',
              'hover:bg-gray-100 dark:hover:bg-gray-800',
              'transition-colors',
            )}
          >
            <Icons.close className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </Button>
        </div>

        <div className={cn('px-4 sm:px-6 md:px-8 pt-6 sm:pt-8 pb-4 sm:pb-6', 'flex flex-col')}>
          <div className="flex flex-col items-center mb-4 sm:mb-6">
            <div
              className={cn(
                'w-10 h-10 sm:w-12 sm:h-12 rounded-full',
                'bg-red-100 dark:bg-red-900/30',
                'flex items-center justify-center mb-3 sm:mb-4',
              )}
            >
              <Icons.warning
                className={cn('h-5 w-5 sm:h-6 sm:w-6', 'text-red-500 dark:text-red-400')}
              />
            </div>
            <DialogTitle
              className={cn(
                'text-lg sm:text-xl font-semibold',
                'text-gray-800 dark:text-gray-100',
                'text-center',
              )}
            >
              Confirm Delete
            </DialogTitle>

            <p
              className={cn(
                'text-center text-sm sm:text-base',
                'text-gray-600 dark:text-gray-400',
                'mt-2 max-w-xs',
              )}
            >
              You are going to delete your Account. Please carefully review your action!
            </p>

            <p
              className={cn(
                'text-center text-sm sm:text-base',
                'text-gray-600 dark:text-gray-400',
                'mt-8 max-w-xs',
              )}
            >
              Click <span className="text-blue-500">←</span> to stay back
            </p>
            <p
              className={cn(
                'text-center text-sm sm:text-base',
                'text-gray-600 dark:text-gray-400',
                'max-w-xs',
              )}
            >
              Or click <span className="text-green-500">✓</span> to confirm delete.
            </p>
          </div>

          <div className={cn('flex gap-2 sm:gap-3 mt-2 sm:mt-4', 'flex-row')}>
            <Button
              variant="outline"
              onClick={handleClose}
              className={cn(
                'flex-1 font-medium',
                'border-gray-200 dark:border-gray-700',
                'bg-transparent dark:bg-transparent',
                'text-gray-700 dark:text-gray-300',
                'hover:bg-gray-50 dark:hover:bg-gray-800',
                'order-2 sm:order-1',
              )}
              aria-label="Cancel"
            >
              <Icons.circleArrowLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteAccount}
              disabled={!selectedAccount || accounts.isLoading || isDeleting}
              className={cn(
                'flex-1 font-medium',
                'bg-red-500 hover:bg-red-600',
                'dark:bg-red-600 dark:hover:bg-red-700',
                'transition-colors',
                'order-1 sm:order-2',
              )}
              aria-label="Delete"
            >
              {isDeleting ? (
                <span className="flex items-center justify-center gap-2">
                  <Icons.spinner className="h-4 w-4 animate-spin" />
                </span>
              ) : (
                <Icons.check className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAccountDialog;
