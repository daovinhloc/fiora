import { Response } from '@/shared/types/Common.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createAccount, fetchAccounts, fetchParents, updateAccount } from './actions';
import { Account, initialAccountState } from './types';

const accountSlice = createSlice({
  name: 'account',
  initialState: initialAccountState,
  reducers: {
    setAccountDialogOpen(state, action: PayloadAction<boolean>) {
      state.accountCreateDialog = action.payload;
    },
    setAccountDeleteDialog(state, action: PayloadAction<boolean>) {
      state.accountDeleteDialog = action.payload;
    },
    setAccountUpdateDialog(state, action: PayloadAction<boolean>) {
      state.accountUpdateDialog = action.payload;
    },
    setSelectedAccount(state, action: PayloadAction<Account | null>) {
      state.selectedAccount = action.payload;
    },
    setAccounts(state, action: PayloadAction<Response<Account[]>>) {
      state.accounts.data = action.payload.data;
      state.accounts.isLoading = false;
      state.accounts.error = null;
    },
    setRefresh(state, action: PayloadAction<boolean>) {
      state.refresh = action.payload;
    },
    reset: () => initialAccountState,
  },
  extraReducers: (builder) => {
    builder
      // Fetch accounts
      .addCase(fetchAccounts.pending, (state) => {
        state.accounts.isLoading = true;
      })
      .addCase(fetchAccounts.fulfilled, (state, action) => {
        state.accounts.isLoading = false;
        state.accounts.data = action.payload.data;
      })
      .addCase(fetchAccounts.rejected, (state, action) => {
        state.accounts.isLoading = false;
        state.accounts.error = (action.payload as { message: string })?.message || 'Unknown error';
      })

      // Fetch parents accounts
      .addCase(fetchParents.pending, (state) => {
        state.parentAccounts.isLoading = true;
      })
      .addCase(fetchParents.fulfilled, (state, action) => {
        state.parentAccounts.isLoading = false;
        state.parentAccounts.data = action.payload.data;
      })
      .addCase(fetchParents.rejected, (state, action) => {
        state.parentAccounts.isLoading = false;
        state.parentAccounts.error =
          (action.payload as { message: string })?.message || 'Unknown error';
      })

      // Create new account
      .addCase(createAccount.pending, (state) => {
        state.accounts.isLoading = true;
      })
      .addCase(createAccount.fulfilled, (state, action) => {
        state.accounts.isLoading = false;
        if (state.accounts.data) {
          state.accounts.data.push(action.payload.data);
        } else {
          state.accounts.data = [action.payload.data];
        }
      })
      .addCase(createAccount.rejected, (state, action) => {
        state.accounts.isLoading = false;
        state.accounts.error = (action.payload as { message: string })?.message || 'Unknown error';
      })

      // Update account
      .addCase(updateAccount.pending, (state) => {
        state.accounts.isLoading = true;
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .addCase(updateAccount.fulfilled, (state, action) => {
        state.accounts.isLoading = false;
      })
      .addCase(updateAccount.rejected, (state, action) => {
        state.accounts.isLoading = false;
        state.accounts.error = (action.payload as { message: string })?.message || 'Unknown error';
      });
  },
});

export const {
  setAccountDialogOpen,
  setAccountDeleteDialog,
  setAccountUpdateDialog,
  setSelectedAccount,
  setAccounts,
  setRefresh,
  reset,
} = accountSlice.actions;
export default accountSlice.reducer;
