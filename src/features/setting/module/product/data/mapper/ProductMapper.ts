import { ProductFormValues } from '../../presentation/schema/addProduct.schema';

import { format } from 'date-fns';
import {
  Product,
  ProductDeleteRequest,
  ProductDeleteResponse,
  ProductGetSingleResponse,
  ProductGetTransactionRequest,
  ProductGetTransactionResponse,
  ProductsGetResponse,
  ProductTransferDeleteRequest,
  ProductTransferDeleteResponse,
  ProductUpdateRequest,
  ProductUpdateResponse,
  Transaction,
} from '../../domain/entities';
import {
  ProductCreateRequestDTO,
  ProductDeleteRequestDTO,
  ProductGetSingleRequestDTO,
  ProductGetTransactionRequestDTO,
  ProductTransferDeleteRequestDTO,
  ProductUpdateRequestDTO,
} from '../dto/request';
import {
  ProductDeleteResponseDTO,
  ProductGetSingleResponseDTO,
  ProductGetTransactionResponseDTO,
  ProductsGetResponseDTO,
  ProductTransferDeleteResponseDTO,
  ProductUpdateResponseDTO,
} from '../dto/response';

export class ProductMapper {
  static toGetSingleProductAPIRequest(id: string): ProductGetSingleRequestDTO {
    return {
      productId: id,
    };
  }

  static toGetSingleProductResponse(
    response: ProductGetSingleResponseDTO,
  ): ProductGetSingleResponse {
    const item = response.data;
    return {
      id: item.id,
      price: Number(item.price),
      name: item.name,
      type: item.type,
      description: item.description ?? '',
      // items: ProductMapper.parseServerItemToList(item.items),
      items: item.items ?? [],
      taxRate: Number(item.taxRate),
      catId: item.catId ?? '',
      icon: item.icon,
      currency: item.currency,
      createdAt: String(item.createdAt),
      updatedAt: String(item.updatedAt),
      transactions: item.transactions,
      createdBy: item.createdBy,
      updatedBy: item.updatedBy,
    };
  }

  static toDeleteProductAPIRequest(request: ProductDeleteRequest): ProductDeleteRequestDTO {
    return {
      id: request.id,
    };
  }

  static toDeleteProductResponse(response: ProductDeleteResponseDTO): ProductDeleteResponse {
    return {
      id: response.data.id,
    };
  }

  static toGetProductTransactionAPIRequest(
    request: ProductGetTransactionRequest,
  ): ProductGetTransactionRequestDTO {
    return {
      userId: request.userId,
      page: request.page,
      pageSize: request.pageSize,
    };
  }

  static toGetProductTransactionResponse(
    response: ProductGetTransactionResponseDTO,
  ): ProductGetTransactionResponse {
    return {
      data: response.data.data.map((item) => ({
        category: {
          id: item.category.id,
          name: item.category.name,
          icon: item.category.icon,
          description: item.category.description ?? '', // Xử lý null
          createdAt: item.category.created_at,
          updatedAt: item.category.updated_at,
          taxRate: item.category.tax_rate ?? 0, // Xử lý null
        },
        products: item.products.map((productItem) => ({
          product: {
            id: productItem.product.id,
            price: Number(productItem.product.price),
            name: productItem.product.name,
            type: productItem.product.type,
            description: productItem.product.description ?? '',
            // items: ProductMapper.parseServerItemToList(productItem.product.items),
            items: productItem.product.items ?? [],
            taxRate: productItem.product.taxRate ? Number(productItem.product.taxRate) : 0,
            catId: productItem.product.catId ?? '',
            icon: productItem.product.icon,
            createdAt: productItem.product.created_at,
            updatedAt: productItem.product.updated_at,
          },
          transactions: productItem.transactions,
        })),
      })),
      page: response.data.page,
      pageSize: response.data.pageSize,
      totalPage: response.data.totalPage,
    };
  }

  static toCreateProductAPIRequest(request: ProductFormValues): ProductCreateRequestDTO {
    return {
      icon: request.icon,
      name: request.name,
      description: request.description,
      tax_rate: request.taxRate,
      price: request.price,
      type: request.type,
      category_id: request.catId,
      items: request.items,
      currency: request.currency,
    };
  }

  static toUpdateProductAPIRequest(request: ProductUpdateRequest): ProductUpdateRequestDTO {
    return {
      id: request.id ?? '',
      icon: request.icon,
      name: request.name,
      description: request.description,
      tax_rate: request.taxRate,
      price: request.price,
      type: request.type,
      category_id: request.catId,
      items: request.items,
      currency: request.currency,
    };
  }

  static toUpdateProductResponse(response: ProductUpdateResponseDTO): ProductUpdateResponse {
    return {
      id: response.data.id,
      name: response.data.name,
      description: response.data.description ?? '',
      icon: response.data.icon,
      price: Number(response.data.price),
      taxRate: Number(response.data.taxRate),
      items: response.data.items ?? [],
      transactions: response.data.transactions,
      catId: response.data.catId ?? '',
      type: response.data.type,
      currency: response.data.currency,
      createdAt: new Date(response.data.createdAt).toISOString(),
      updatedAt: new Date(response.data.updatedAt).toISOString(),
      createdBy: response.data.createdBy,
      updatedBy: response.data.updatedBy,
    };
  }

  static toGetProductResponse(response: ProductsGetResponseDTO): ProductsGetResponse {
    const { data, page, pageSize, totalPage } = response.data;

    const dataResponse = {
      page,
      pageSize,
      totalPage,
      data: data.map((item) => {
        // const items: ProductItem[] = Array.isArray(item.items)
        //   ? ProductMapper.parseServerItemToList(item.items as JsonArray)
        //   : [];
        const transactions: Transaction[] =
          item.transactions?.map(
            (transaction) =>
              new Transaction(
                transaction.productId,
                transaction.transactionId,
                transaction.createdAt,
                transaction.updatedAt,
                transaction.createdBy,
                transaction.updatedBy,
              ),
          ) ?? [];

        return new Product(
          item.id,
          item.name,
          item.description ?? '',
          item.icon,
          Number(item.price),
          Number(item.taxRate),
          item.items,
          item.catId ?? '',
          item.type,
          item.createdAt ? format(new Date(item.createdAt), 'dd/MM/yyyy HH:mm:ss') : '',
          item.updatedAt ? format(new Date(item.updatedAt), 'dd/MM/yyyy HH:mm:ss') : '',
          transactions,
          item.currency,
          item.createdBy,
          item.updatedBy,
        );
      }),
    } as ProductsGetResponse;

    return dataResponse;
  }
  static toProductTransferDeleteAPIRequest(
    request: ProductTransferDeleteRequest,
  ): ProductTransferDeleteRequestDTO {
    return {
      sourceId: request.productIdToDelete,
      targetId: request.productIdToTransfer,
    };
  }

  static toProductTransferDeleteResponse(
    response: ProductTransferDeleteResponseDTO,
  ): ProductTransferDeleteResponse {
    return {
      id: response.data.id,
    };
  }
}
