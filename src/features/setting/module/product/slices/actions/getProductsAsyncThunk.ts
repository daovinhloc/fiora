import { createAsyncThunk } from '@reduxjs/toolkit';
import { productDIContainer } from '../../di/productDIContainer';
import { TYPES } from '../../di/productDIContainer.type';
import { ProductsGetResponse } from '../../domain/entities';
import { IGetProductUseCase } from '../../domain/usecases';

export const getProductsAsyncThunk = createAsyncThunk<
  ProductsGetResponse,
  { page: number; pageSize: number },
  { rejectValue: string }
>('product/getProduct', async ({ page, pageSize }, { rejectWithValue }) => {
  try {
    const getProductUseCase = productDIContainer.get<IGetProductUseCase>(TYPES.IGetProductUseCase);

    const response = await getProductUseCase.execute(page, pageSize);
    return response;
  } catch (error: any) {
    return rejectWithValue(error || 'Failed to get product');
  }
});
