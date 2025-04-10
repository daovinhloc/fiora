import { CategoryType } from '@prisma/client';

export interface RawCategory {
  id: string;
  userId?: string;
  type: CategoryType;
  icon: string;
  tax_rate: number;
  balance: number;
  name: string;
  description?: string;
  parentId?: string | null;

  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
}

export interface Category {
  id: string;
  userId?: string;
  type: CategoryType;
  icon: string;
  tax_rate: number;
  balance: number;
  name: string;
  description?: string;
  parentId?: string | null;

  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;

  subCategories: Category[];
}

export interface CategoryState {
  categories: {
    isLoading: boolean;
    data: Category[] | undefined;
    error: string | null;
    message?: string;
  };
  selectedCategory: Category | null;
  dialogOpen: boolean;
  updateDialogOpen: boolean;
  deleteConfirmOpen: boolean;
}

export const initialCategoryState: CategoryState = {
  categories: {
    isLoading: false,
    data: undefined,
    error: null,
  },
  selectedCategory: null,
  dialogOpen: false,
  updateDialogOpen: false,
  deleteConfirmOpen: false,
};
