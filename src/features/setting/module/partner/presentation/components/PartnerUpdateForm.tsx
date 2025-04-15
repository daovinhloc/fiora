'use client';

import CustomDateTimePicker from '@/components/common/forms/date-time-picker/CustomDateTimePicker';
import InputField from '@/components/common/forms/input/InputField';
import SelectField from '@/components/common/forms/select/SelectField';
import TextareaField from '@/components/common/forms/text-area/TextareaField';
import UploadField from '@/components/common/forms/upload/UploadField';
import GlobalForm from '@/components/common/forms/GlobalForm';
import { uploadToFirebase } from '@/features/setting/module/landing/landing/firebaseUtils';
import { Partner } from '@/features/setting/module/partner/domain/entities/Partner';
import { fetchPartners } from '@/features/setting/module/partner/slices/actions/fetchPartnersAsyncThunk';
import {
  UpdatePartnerFormValues,
  updatePartnerSchema,
} from '@/features/setting/module/partner/presentation/schema/updatePartner.schema';
import { updatePartner } from '@/features/setting/module/partner/slices/actions/updatePartnerAsyncThunk';
import { useAppDispatch, useAppSelector } from '@/store';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface PartnerUpdateFormProps {
  initialData?: Partner;
}

export default function PartnerUpdateForm({ initialData }: PartnerUpdateFormProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const partners = useAppSelector((state) => state.partner.partners);
  const { data: session, status } = useSession();
  const [isDataFetched, setIsDataFetched] = useState(false);

  useEffect(() => {
    const fetchPartnersData = async () => {
      if (status === 'authenticated' && session?.user?.id && !isDataFetched) {
        try {
          await dispatch(
            fetchPartners({ userId: session.user.id, page: 1, pageSize: 100 }),
          ).unwrap();
          setIsDataFetched(true);
        } catch (error) {
          console.error('Error fetching partners:', error);
          toast.error('Failed to load partners data');
        }
      }
    };

    fetchPartnersData();
  }, [dispatch, status, session, isDataFetched]);

  // Check if current partner has children
  const hasChildren = partners.some((partner) => partner.parentId === initialData?.id);

  // Filter parent options:
  // 1. Exclude the current partner itself
  // 2. Only include partners that don't have a parent (top-level)
  // 3. If current partner has children, don't allow it to become a child of another partner
  const parentOptions = [
    { value: 'none', label: 'None' },
    ...partners
      .filter((p) => {
        // Exclude the current partner
        if (p.id === initialData?.id) return false;

        // Only include top-level partners (no parent)
        if (p.parentId !== null) return false;

        return true;
      })
      .map((partner: Partner) => ({
        value: partner.id,
        label: partner.name,
      })),
  ];

  const defaultValues: Partial<UpdatePartnerFormValues> = {
    name: initialData?.name || '',
    logo: initialData?.logo || null,
    identify: initialData?.identify || null,
    dob: initialData?.dob || null,
    taxNo: initialData?.taxNo || null,
    address: initialData?.address || null,
    email: initialData?.email || null,
    phone: initialData?.phone || null,
    description: initialData?.description || null,
    parentId: initialData?.parentId || 'none',
  };

  // If this partner has children, disable the parent selection field
  const fields = [
    <SelectField
      key="parentId"
      name="parentId"
      label="Parent"
      options={parentOptions}
      placeholder="Select a parent partner"
      defaultValue={initialData?.parentId || 'none'}
      disabled={hasChildren}
      helperText={
        hasChildren ? 'Cannot change parent because this partner has children' : undefined
      }
    />,
    <InputField key="name" name="name" label="Name" placeholder="Name" />,
    <UploadField
      key="logo"
      label="Logo"
      name="logo"
      initialImageUrl={initialData?.logo || null}
      previewShape="circle"
    />,
    <TextareaField
      key="description"
      name="description"
      label="Description"
      placeholder="Enter description"
    />,
    <CustomDateTimePicker
      key="dob"
      name="dob"
      label="Date of Birth"
      placeholder="Select date of birth"
      showYearDropdown
      showMonthDropdown
      dropdownMode="select"
      dateFormat="dd/MM/yyyy"
    />,
    <InputField
      key="identify"
      name="identify"
      label="Identification"
      placeholder="Identification Number"
    />,
    <InputField key="taxNo" name="taxNo" label="Tax Number" placeholder="Tax Number" />,
    <InputField key="phone" name="phone" label="Phone" placeholder="Phone Number" />,
    <InputField key="address" name="address" label="Address" placeholder="Address" />,
    <InputField key="email" name="email" label="Email" placeholder="Email" type="email" />,
  ];

  const onSubmit = async (data: UpdatePartnerFormValues) => {
    try {
      let finalLogoUrl = data.logo;

      if (data.logo && typeof data.logo === 'object' && 'type' in data.logo) {
        finalLogoUrl = await uploadToFirebase({
          file: data.logo as File,
          path: 'partners/logos',
          fileName: `partner_logo_${initialData?.id}_${Date.now()}`,
        });
      }

      // Always send all fields, using the original values if not changed
      const updateData = {
        id: initialData?.id,
        name: data.name !== undefined ? data.name : initialData?.name,
        logo: finalLogoUrl !== undefined ? finalLogoUrl : initialData?.logo,
        identify: data.identify !== undefined ? data.identify : initialData?.identify,
        dob: data.dob !== undefined ? data.dob : initialData?.dob,
        taxNo: data.taxNo !== undefined ? data.taxNo : initialData?.taxNo,
        address: data.address !== undefined ? data.address : initialData?.address,
        email: data.email !== undefined ? data.email : initialData?.email,
        phone: data.phone !== undefined ? data.phone : initialData?.phone,
        description: data.description !== undefined ? data.description : initialData?.description,
        parentId: data.parentId === 'none' ? null : data.parentId || initialData?.parentId,
      };

      await dispatch(updatePartner(updateData)).unwrap();
      router.push('/setting/partner');
    } catch (error) {
      toast.error('Failed to update partner');
      console.error(error);
    }
  };

  return (
    <>
      <GlobalForm
        fields={fields}
        schema={updatePartnerSchema}
        onSubmit={onSubmit}
        defaultValues={defaultValues}
      />
    </>
  );
}
