import { prisma } from '@/config';
import { Prisma, Product } from '@prisma/client';
import { IProductRepository } from '../../repositories/productRepository.interface';

class ProductRepository implements IProductRepository {
  async createProduct(data: Prisma.ProductUncheckedCreateInput): Promise<Product> {
    return prisma.product.create({ data });
  }

  async findProductById(
    where: Prisma.ProductWhereInput,
    options?: Prisma.ProductFindFirstArgs,
  ): Promise<Product | null> {
    return prisma.product.findFirst({ where, ...options });
  }

  async findManyProducts(
    where: Prisma.ProductWhereInput,
    options?: Prisma.ProductFindManyArgs,
  ): Promise<Product[]> {
    return prisma.product.findMany({ where, ...options });
  }

  async updateProduct(
    where: Prisma.ProductWhereUniqueInput,
    data: Prisma.ProductUpdateInput,
  ): Promise<Product> {
    return prisma.product.update({ where, data });
  }

  async deleteProduct(where: Prisma.ProductWhereUniqueInput): Promise<Product> {
    return prisma.product.delete({ where });
  }

  async aggregate(options: Prisma.ProductAggregateArgs): Promise<any> {
    return prisma.product.aggregate(options);
  }

  async count(options: Prisma.ProductCountArgs): Promise<number> {
    return prisma.product.count(options);
  }

  async groupBy(options: Prisma.ProductGroupByArgs): Promise<any> {
    return prisma.product.groupBy({ ...options, orderBy: options.orderBy || {} });
  }
}

// Export a single instance
export const productRepository = new ProductRepository();
