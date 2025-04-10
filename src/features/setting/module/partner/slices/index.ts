import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'sonner';
import { Partner } from '../domain/entities/Partner';
import { fetchPartners } from './actions/fetchPartnersAsyncThunk';
import { updatePartner } from './actions/updatePartnerAsyncThunk';
import { deletePartner } from './actions/deletePartnerAsyncThunk'; // Import the delete thunk
import { initialPartnerState } from './types';

const partnerManagementSlice = createSlice({
  name: 'partnerManagement',
  initialState: {
    ...initialPartnerState,
    selectedPartner: null as Partner | null,
    isAddPartnerDialogOpen: false,
    isUpdatePartnerDialogOpen: false,
    isDeleteConfirmOpen: false, // Add this line
    refresh: false,
  },
  reducers: {
    resetPartnerManagementState: () => ({
      ...initialPartnerState,
      selectedPartner: null,
      isAddPartnerDialogOpen: false,
      isUpdatePartnerDialogOpen: false,
      isDeleteConfirmOpen: false, // Add this line
      refresh: false,
    }),
    setSelectedPartner(state, action: PayloadAction<Partner | null>) {
      state.selectedPartner = action.payload;
    },
    setAddPartnerDialogOpen(state, action: PayloadAction<boolean>) {
      state.isAddPartnerDialogOpen = action.payload;
    },
    setUpdatePartnerDialogOpen(state, action: PayloadAction<boolean>) {
      state.isUpdatePartnerDialogOpen = action.payload;
    },
    setDeleteConfirmOpen(state, action: PayloadAction<boolean>) {
      // Add this reducer
      state.isDeleteConfirmOpen = action.payload;
    },
    triggerRefresh(state) {
      state.refresh = !state.refresh;
    },
  },
  extraReducers: (builder) => {
    // Fetch Partners
    builder
      .addCase(fetchPartners.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPartners.fulfilled, (state, action: PayloadAction<Partner[]>) => {
        state.isLoading = false;
        state.partners = action.payload;
      })
      .addCase(fetchPartners.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to fetch partners';
      });

    // Update Partner
    builder
      .addCase(updatePartner.pending, (state) => {
        state.isUpdatingPartner = true;
      })
      .addCase(updatePartner.fulfilled, (state, action: PayloadAction<Partner>) => {
        state.isUpdatingPartner = false;
        const updatedPartner = action.payload;
        const index = state.partners.findIndex((item) => item.id === updatedPartner.id);
        if (index !== -1) {
          state.partners[index] = updatedPartner;
        }
        toast.success('Update partner successfully!!');
        state.refresh = !state.refresh; // Trigger refresh after update
      })
      .addCase(updatePartner.rejected, (state, action) => {
        state.isUpdatingPartner = false;
        state.error = action.payload || 'Failed to update partner';
      });

    // Delete Partner
    builder
      .addCase(deletePartner.pending, (state) => {
        state.isDeletingPartner = true;
        state.error = null;
      })
      .addCase(deletePartner.fulfilled, (state, action: PayloadAction<{ id: string }>) => {
        state.isDeletingPartner = false;
        // Remove the deleted partner from the state
        state.partners = state.partners.filter((partner) => partner.id !== action.payload.id);
        state.refresh = !state.refresh; // Trigger refresh after delete
      })
      .addCase(deletePartner.rejected, (state, action) => {
        state.isDeletingPartner = false;
        state.error = action.payload || 'Failed to delete partner';
        toast.error(action.payload || 'Failed to delete partner');
      });
  },
});

export const {
  resetPartnerManagementState,
  setSelectedPartner,
  setAddPartnerDialogOpen,
  setUpdatePartnerDialogOpen,
  setDeleteConfirmOpen, // Export the new action
  triggerRefresh,
} = partnerManagementSlice.actions;

export default partnerManagementSlice.reducer;
