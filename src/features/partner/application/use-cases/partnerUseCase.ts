import { type Prisma, type Partner } from '@prisma/client';
import { IPartnerRepository } from '../../domain/repositories/partnerRepository.interface';
import { Messages } from '@/shared/constants/message';
import { partnerRepository } from '../../infrastructure/repositories/partnerRepository';
import { ITransactionRepository } from '@/features/transaction/domain/repositories/transactionRepository.interface';
import { transactionRepository } from '@/features/transaction/infrastructure/repositories/transactionRepository';
import { prisma } from '@/config';
import { validatePartnerData } from '../../exception/partnerExceptionHandler';
import { PartnerValidationData } from '../../exception/partnerException.type';

class PartnerUseCase {
  constructor(
    private partnerRepository: IPartnerRepository,
    private transactionRepository: ITransactionRepository,
  ) {}

  async listPartners(userId: string): Promise<Partner[]> {
    return this.partnerRepository.getPartnersByUserId(userId);
  }

  async viewPartner(id: string, userId: string): Promise<Partner> {
    const partner = await this.partnerRepository.getPartnerById(id, userId);
    if (!partner) {
      throw new Error(Messages.PARTNER_NOT_FOUND);
    }
    return partner;
  }

  async deletePartner(id: string, userId: string, newId?: string): Promise<void> {
    const partner = await this.partnerRepository.getPartnerById(id, userId);
    if (!partner) {
      throw new Error(Messages.PARTNER_NOT_FOUND);
    }

    if (newId) {
      const newPartner = await this.partnerRepository.getPartnerById(newId, userId);
      if (!newPartner) {
        throw new Error(Messages.PARTNER_NOT_FOUND);
      }

      await this.transactionRepository.updateTransactionsPartner(id, newId);
    }

    await this.partnerRepository.deletePartner(id);
  }

  async editPartner(
    id: string,
    userId: string,
    data: Prisma.PartnerUncheckedUpdateInput,
  ): Promise<Partner> {
    return prisma.$transaction(async (tx) => {
      const partner = await tx.partner.findUnique({
        where: { id, userId },
      });
      if (!partner) {
        throw new Error(Messages.PARTNER_NOT_FOUND);
      }

      const validationData: PartnerValidationData = {
        userId: userId,
        email: data.email as string | null,
        phone: data.phone as string | null,
        taxNo: data.taxNo as string | null,
        identify: data.identify as string | null,
        name: data.name as string,
        description: data.description as string | null,
        address: data.address as string | null,
        logo: data.logo as string | null,
        dob: data.dob ? new Date(data.dob as string | Date) : null,
        parentId: data.parentId as string | null,
        id: id,
      };

      const validationErrors = await validatePartnerData(validationData, tx, true);

      if (validationErrors.length > 0) {
        const errorObject: Record<string, string> = {};
        validationErrors.forEach((err) => {
          errorObject[err.field] = err.message;
        });
        throw { validationErrors: errorObject };
      }

      if (data.parentId) {
        const parentPartner = await tx.partner.findUnique({
          where: { id: data.parentId as string },
          include: { children: true },
        });
        if (!parentPartner) {
          throw new Error(Messages.PARENT_PARTNER_NOT_FOUND);
        }
        if (parentPartner.id === partner.id) {
          throw new Error(Messages.INVALID_PARENT_PARTNER_SELF);
        }
        // if (parentPartner.children && parentPartner.children.length > 0) {
        //   throw new Error(Messages.INVALID_PARENT_HIERARCHY);
        // }
      }

      const updateData = {
        email: data.email,
        identify: data.identify,
        description: data.description,
        dob: data.dob ? new Date(data.dob as string) : undefined,
        logo: data.logo,
        taxNo: data.taxNo,
        phone: data.phone,
        name: data.name,
        address: data.address,
        parentId: data.parentId,
        updatedBy: data.userId || userId,
      };

      const updatedPartner = await tx.partner.update({
        where: { id, userId },
        data: updateData,
      });
      if (!updatedPartner) {
        throw new Error(Messages.UPDATE_PARTNER_FAILED);
      }

      return updatedPartner;
    });
  }

  async createPartner(data: Prisma.PartnerUncheckedCreateInput): Promise<Partner> {
    return prisma.$transaction(async (tx) => {
      const validationData: PartnerValidationData = {
        userId: data.userId as string,
        email: data.email as string | null,
        phone: data.phone as string | null,
        taxNo: data.taxNo as string | null,
        identify: data.identify as string | null,
        name: data.name as string,
        description: data.description as string | null,
        address: data.address as string | null,
        logo: data.logo as string | null,
        dob: data.dob ? new Date(data.dob as string | Date) : null,
        parentId: data.parentId as string | null,
      };

      const validationErrors = await validatePartnerData(validationData, tx, false);

      if (validationErrors.length > 0) {
        const errorObject: Record<string, string> = {};
        validationErrors.forEach((err) => {
          errorObject[err.field] = err.message;
        });
        throw { validationErrors: errorObject };
      }

      const partner = await tx.partner.create({
        data: {
          userId: data.userId as string,
          email: data.email,
          identify: data.identify,
          description: data.description,
          dob: data.dob,
          logo: data.logo,
          taxNo: data.taxNo,
          phone: data.phone,
          name: data.name,
          address: data.address,
          createdBy: data.userId as string,
          updatedBy: data.userId as string,
          parentId: data.parentId || null,
        },
      });

      if (!partner) {
        throw new Error(Messages.CREATE_PARTNER_FAILED);
      }

      return partner;
    });
  }

  async getPartnerById(id: string, userId: string) {
    try {
      const partner = await this.partnerRepository.getPartnerById(id, userId);

      if (!partner) {
        throw new Error(Messages.PARTNER_NOT_FOUND);
      }

      const [createdBy, updatedBy] = await Promise.all([
        partner.createdBy
          ? prisma.user.findFirst({
              where: { id: partner.createdBy },
              select: { id: true, name: true, email: true, image: true },
            })
          : null,
        partner.updatedBy
          ? prisma.user.findFirst({
              where: { id: partner.updatedBy },
              select: { id: true, name: true, email: true, image: true },
            })
          : null,
      ]);

      return {
        ...partner,
        createdBy: createdBy || null,
        updatedBy: updatedBy || null,
      };
    } catch (error) {
      console.error('Error getting partner by ID:', error);
      throw error;
    }
  }
}

export const partnerUseCase = new PartnerUseCase(partnerRepository, transactionRepository);
