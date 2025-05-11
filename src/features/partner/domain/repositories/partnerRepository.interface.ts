import { PartnerExtras } from '@/shared/types/partner.types';
import { Partner, Prisma } from '@prisma/client';

export interface IPartnerRepository {
  getPartnersByUserId(userId: string): Promise<PartnerExtras[]>;
  getPartnerById(id: string, userId: string): Promise<Partner | null>;
  createPartner(data: Prisma.PartnerUncheckedCreateInput): Promise<Partner>;
  updatePartner(
    id: string,
    userId: string,
    data: Prisma.PartnerUncheckedUpdateInput,
  ): Promise<Partner>;
  // deletePartner(id: string, userId: string): Promise<Partner>;
  findByName(name: string, userId: string): Promise<Partner | null>;
  deletePartner(id: string): Promise<void>;
}
