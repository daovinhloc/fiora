'use client';

import {
  ArrayField,
  GlobalIconSelect,
  InputCurrency,
  InputField,
  SelectField,
  TextareaField,
} from '@/components/common/forms';
import IconSelectUpload from '@/components/common/forms/select/IconSelectUpload';
import { useAppDispatch, useAppSelector } from '@/store';
import { Currency, ProductType } from '@prisma/client';
import { useFormContext } from 'react-hook-form';
import {
  setIsOpenDialogAddCategory,
  setProductCategoryFormState,
  setProductCategoryToEdit,
} from '../../slices';

const useProductFormConfig = () => {
  const {
    formState: { isSubmitting },
    watch,
  } = useFormContext();

  const { data } = useAppSelector((state) => state.productManagement.categories);
  const dispatch = useAppDispatch();

  const handleOpenDialog = () => {
    dispatch(setIsOpenDialogAddCategory(true));
    dispatch(setProductCategoryFormState('add'));
    dispatch(setProductCategoryToEdit(null));
  };

  const fields = [
    <IconSelectUpload key="icon" name="icon" required disabled={isSubmitting} />,
    <SelectField
      options={data.map((item) => ({ label: item.name, value: item.id, icon: item.icon }))}
      key="catId"
      name="catId"
      label="Category"
      disabled={isSubmitting}
      onCustomAction={handleOpenDialog}
      customActionLabel="Add New"
      required
    />,
    <InputField key="name" name="name" placeholder="Product Name" label="Name" required />,
    <SelectField
      options={Object.entries(ProductType).map(([key, value]) => ({
        label: key,
        value,
      }))}
      key="type"
      name="type"
      label="Type"
      required
      disabled={isSubmitting}
    />,
    <SelectField
      options={Object.entries(Currency).map(([key, value]) => ({ label: key, value }))}
      key="currency"
      name="currency"
      label="Currency"
      placeholder="Select Currency"
      required
      disabled={isSubmitting}
    />,
    <InputCurrency
      key="price"
      name="price"
      label="Price"
      currency={watch('currency') ?? 'vnd'}
      required
      disabled={isSubmitting}
    />,
    <TextareaField
      key="description"
      name="description"
      label="Description"
      placeholder="Product Description"
      disabled={isSubmitting}
    />,
    <InputField
      key="taxRate"
      name="taxRate"
      placeholder="0.00%"
      label="Tax Rate"
      required
      disabled={isSubmitting}
      options={{
        percent: true,
        maxPercent: 100,
      }}
    />,
    <ArrayField
      label="Product Items"
      key="items"
      name="items"
      emptyItem={{ name: '', description: '', icon: '' }}
      fields={[
        <GlobalIconSelect
          name="icon"
          key="icon"
          label="Item Icon"
          required
          disabled={isSubmitting}
        />,
        <InputField
          name="name"
          placeholder="Name"
          key="name"
          label="Product Item Name"
          required
          disabled={isSubmitting}
        />,
        <TextareaField
          name="description"
          placeholder="Product Item Description"
          key="description"
          label="Description"
          disabled={isSubmitting}
        />,
      ]}
    />,
  ];

  return fields;
};

export default useProductFormConfig;
