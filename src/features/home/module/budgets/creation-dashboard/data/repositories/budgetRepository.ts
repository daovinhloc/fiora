import { decorate, injectable } from 'inversify';
import {
  BudgetCreateRequest,
  BudgetCreateResponse,
  BudgetGetRequest,
  BudgetGetResponse,
} from '../../domain/entities/Budget';
import { IBudgetAPI } from '../api/budgetApi';
import BudgetMapper from '../mappers/BudgetMapper';

export interface IBudgetRepository {
  createBudget(request: BudgetCreateRequest): Promise<BudgetCreateResponse>;
  getBudget(request: BudgetGetRequest): Promise<BudgetGetResponse>;
}

export class CategoryRepository implements IBudgetRepository {
  private budgetAPI: IBudgetAPI;

  constructor(budgetAPI: IBudgetAPI) {
    this.budgetAPI = budgetAPI;
  }

  async createBudget(request: BudgetCreateRequest): Promise<BudgetCreateResponse> {
    const requestAPI = BudgetMapper.toCreateBudgetRequestDTO(request);
    const response = await this.budgetAPI.createBudget(requestAPI);
    return BudgetMapper.toCreateBudgetResponse(response);
  }

  async getBudget(request: BudgetGetRequest): Promise<BudgetGetResponse> {
    const requestAPI = BudgetMapper.toGetBudgetRequestDTO(request);
    const response = await this.budgetAPI.getBudget(requestAPI);
    return BudgetMapper.toGetBudgetResponse(response);
  }
}

// Apply decorators programmatically
decorate(injectable(), CategoryRepository);

// Create a factory function
export const createBudgetRepository = (budgetAPI: IBudgetAPI): IBudgetRepository => {
  return new CategoryRepository(budgetAPI);
};
