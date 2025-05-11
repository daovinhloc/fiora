'use client';

import { FormConfig } from '@/components/common/forms';
import { GlobalDialog } from '@/components/common/molecules';
import { Icons } from '@/components/Icon';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useAppDispatch, useAppSelector } from '@/store';
import { isEmpty } from 'lodash';
import { Check, Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { memo, useCallback, useState } from 'react';
import { useFormContext, UseFormSetValue } from 'react-hook-form';
import { toast } from 'sonner';
import { CategoryProductCreateRequest, CategoryProductUpdateRequest } from '../../domain/entities';
import { setIsOpenDialogAddCategory, setProductCategoryFormState } from '../../slices';
import {
  createCategoryProductAsyncThunk,
  deleteCategoryProductAsyncThunk,
  getProductTransactionAsyncThunk,
  updateCategoryProductAsyncThunk,
} from '../../slices/actions';
import useProductCategoryFormConfig from '../config/ProductCategoryFormConfig';
import {
  CategoryProductFormValues,
  defaultCategoryProductValue,
  ProductFormValues,
} from '../schema';

type productCategoryFormType = {
  setValue?: UseFormSetValue<ProductFormValues>;
};

const ProductCategoryForm = ({ setValue }: productCategoryFormType) => {
  const dispatch = useAppDispatch();
  const fields = useProductCategoryFormConfig();
  const { data: userData } = useSession();
  const ProductCategoryFormState = useAppSelector(
    (state) => state.productManagement.ProductCategoryFormState,
  );
  const productCategories = useAppSelector(
    (state) => state.productManagement.productTransaction.data,
  );
  const isUpdatingCategoryProduct = useAppSelector(
    (state) => state.productManagement.isUpdatingProductCategory,
  );
  const isCreatingCategoryProduct = useAppSelector(
    (state) => state.productManagement.isCreatingProductCategory,
  );

  // Method of product category product
  const methods = useFormContext<CategoryProductFormValues>();
  const { handleSubmit, formState, getValues, reset } = methods;

  const isButtonDisabled = !formState.isValid || formState.isSubmitting || formState.isValidating;

  const [isOpenDialogDelete, setIsOpenDialogDelete] = useState(false);

  // Handle Delete Category
  const handlePressDeleteCategory = useCallback(() => {
    const categoryId = getValues('id') ?? '';
    const categoryItem = productCategories.find((item) => item.category.id === categoryId);
    if (isEmpty(categoryItem?.products)) {
      dispatch(deleteCategoryProductAsyncThunk({ productCategoryId: getValues('id') ?? '' }))
        .unwrap()
        .then(() => {
          dispatch(setIsOpenDialogAddCategory(false));
          dispatch(setProductCategoryFormState('add'));
        });
    } else {
      toast.error('Cannot delete category', {
        description: 'This category contains products. Please remove them first.',
      });
      setIsOpenDialogDelete(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productCategories]);

  const onSubmit = useCallback(
    async (data: CategoryProductFormValues) => {
      try {
        if (ProductCategoryFormState === 'add') {
          const requestParams: CategoryProductCreateRequest = {
            userId: userData?.user.id || '',
            icon: data.icon,
            name: data.name,
            description: data.description ?? null,
            taxRate: data.tax_rate,
            createdAt: new Date().toString(),
            updatedAt: new Date().toString(),
          };

          dispatch(createCategoryProductAsyncThunk(requestParams))
            .unwrap()
            .then((response) => {
              // set value vào category product sau khi tạo xong
              if (typeof setValue === 'function') {
                setValue('catId', response.id);
              }
              dispatch(setIsOpenDialogAddCategory(false));
              reset(defaultCategoryProductValue);
            });
        } else if (ProductCategoryFormState === 'edit') {
          const requestParams: CategoryProductUpdateRequest = {
            id: data.id ?? '',
            userId: userData?.user.id ?? '',
            icon: data.icon,
            name: data.name,
            description: data.description ?? null,
            taxRate: data.tax_rate,
            createdAt: new Date().toString(),
            updatedAt: new Date().toString(),
          };

          dispatch(updateCategoryProductAsyncThunk(requestParams))
            .unwrap()
            .then(() => {
              dispatch(setIsOpenDialogAddCategory(false));
              reset(defaultCategoryProductValue);
              dispatch(
                getProductTransactionAsyncThunk({
                  page: 1,
                  pageSize: 100,
                  userId: userData?.user.id ?? '',
                }),
              );
            });
        }
      } catch (error) {
        console.error('Error :', error);
        toast.error('Failed');
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ProductCategoryFormState, userData?.user.id],
  );

  const footerButtonGroup = useCallback(
    () => (
      <TooltipProvider>
        <div className="flex justify-between gap-4 mt-6">
          {/* Cancel Button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                disabled={ProductCategoryFormState === 'add'}
                onClick={() => setIsOpenDialogDelete(true)}
                variant="outline"
                type="button"
                className="flex items-center justify-center gap-2 px-10 py-2 border rounded-lg transition hover:bg-gray-100"
              >
                <Icons.trash className=" text-red-600" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete</p>
            </TooltipContent>
          </Tooltip>

          {/* Submit Button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="submit"
                disabled={isButtonDisabled}
                className="flex items-center justify-center gap-2 px-10 py-2 rounded-lg transition bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400"
              >
                {formState.isSubmitting ||
                isUpdatingCategoryProduct ||
                isCreatingCategoryProduct ? (
                  <Loader2 className="animate-spin h-5 w-5" />
                ) : (
                  <Check className="h-5 w-5" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{formState.isSubmitting ? 'Submitting...' : 'Submit'}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    ),
    [
      ProductCategoryFormState,
      isButtonDisabled,
      formState.isSubmitting,
      isUpdatingCategoryProduct,
      isCreatingCategoryProduct,
    ],
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormConfig
        methods={methods}
        fields={fields}
        onBack={() => dispatch(setIsOpenDialogAddCategory(false))}
        renderSubmitButton={footerButtonGroup}
      />
      <GlobalDialog
        open={isOpenDialogDelete}
        onOpenChange={setIsOpenDialogDelete}
        title={`Confirm Delete ${methods.getValues('name')}`}
        description="Are you sure to delete this category? This action cannot be undone."
        onConfirm={handlePressDeleteCategory}
        onCancel={() => setIsOpenDialogDelete(false)}
        variant="danger"
      />
    </form>
  );
};

export default memo(ProductCategoryForm);
