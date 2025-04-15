'use client';
import FormPage from '@/components/common/forms/FormPage';
import CreateCategoryForm from '@/features/home/module/category/components/CreateCategoryForm';

export default function CreateCategory() {
  return <FormPage title="Create New Category" FormComponent={CreateCategoryForm} />;
}
