'use client';

import GlobalIconSelect from '@/components/common/atoms/GlobalIconSelect';
import InputField from '@/components/common/atoms/InputField';
import TextareaField from '@/components/common/atoms/TextareaField';
import GlobalForm from '@/components/common/organisms/GlobalForm';
import ParentCategorySelectUpdate from '@/features/home/module/category/components/ParentCategorySelectUpdate';
import TypeSelect from '@/features/home/module/category/components/TypeSelect';
import { createCategory } from '@/features/home/module/category/slices/actions';
import { Category } from '@/features/home/module/category/slices/types';
import {
  defaultNewCategoryValues,
  NewCategoryDefaultValues,
  validateNewCategorySchema,
} from '@/features/home/module/category/slices/utils/formSchema';
import { Response } from '@/shared/types/Common.types';
import { useAppDispatch, useAppSelector } from '@/store';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface CreateCategoryFormProps {
  initialData?: NewCategoryDefaultValues;
}

export default function CreateCategoryForm({ initialData }: CreateCategoryFormProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { categories } = useAppSelector((state) => state.category);

  const parentOptions =
    categories.data?.map((category: Category) => ({
      value: category.id,
      label: category.name,
      type: category.type,
    })) || [];

  const fields = [
    <GlobalIconSelect key="icon" name="icon" label="Icon" htmlFor="icon" required />,
    <InputField key="name" name="name" placeholder="Input name" label="Name" required />,
    <ParentCategorySelectUpdate
      key="parentId"
      name="parentId"
      label="Parent"
      placeholder="Select Master Category"
      options={parentOptions}
    />,
    <TypeSelect key="type" name="type" label="Type" required />,
    <TextareaField
      key="description"
      name="description"
      label="Description"
      placeholder="Input description"
    />,
  ];

  const onSubmit = async (data: any) => {
    try {
      const payload: NewCategoryDefaultValues = {
        ...defaultNewCategoryValues,
        ...data,
      };
      await dispatch(createCategory(payload))
        .unwrap()
        .then((value: Response<Category>) => {
          if (value.status == 201) {
            router.push('/category');
            toast.success('You have create new Finance Category successfully!');
          }
        });
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  return (
    <GlobalForm
      fields={fields}
      onSubmit={onSubmit}
      defaultValues={initialData || defaultNewCategoryValues}
      schema={validateNewCategorySchema}
    />
  );
}
