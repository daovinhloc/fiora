import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedTransaction() {
  await prisma.transaction.createMany({
    data: [
      {
        id: '0a9a6600-3c87-489d-b4bf-7672ef3489d6',
        userId: 'f6413727-4a29-485e-9db8-29b64aaeb36e',
        date: new Date('2025-03-19'),
        type: 'Income',
        amount: 5000000.0,
        fromAccountId: null,
        fromCategoryId: 'b4129d94-85d4-4a31-b75a-ac5a0e952474',
        toAccountId: 'dd0478fa-e7fd-40fd-89c1-2a03c40a10b9',
        toCategoryId: null,
        products: {},
        partnerId: 'b66a6c19-d974-4220-9544-5a2b25769412',
        remark: 'Received monthly salary',
        isDeleted: false,
        deletedAt: null,
        createdAt: new Date('2025-03-19T15:18:42.574Z'),
        updatedAt: new Date('2025-03-19T15:18:42.574Z'),
        updatedBy: null,
        createdBy: 'f6413727-4a29-485e-9db8-29b64aaeb36e',
        currency: 'VND',
      },
      {
        id: 'baca9179-a82a-40c6-9506-0e652a47f357',
        userId: 'f6413727-4a29-485e-9db8-29b64aaeb36e',
        date: new Date('2025-03-19'),
        type: 'Transfer',
        amount: 1000000.0,
        fromAccountId: 'dd0478fa-e7fd-40fd-89c1-2a03c40a10b9',
        fromCategoryId: null,
        toAccountId: 'e79cf602-2ba6-446f-97af-9f9b644ab266',
        toCategoryId: null,
        products: {},
        partnerId: 'e3f3bf7e-7a0f-418d-bdaf-d04cef5e65f6',
        remark: 'Transfer for upcoming expenses',
        isDeleted: false,
        deletedAt: null,
        createdAt: new Date('2025-03-19T15:18:42.574Z'),
        updatedAt: new Date('2025-03-19T15:18:42.574Z'),
        updatedBy: null,
        createdBy: 'f6413727-4a29-485e-9db8-29b64aaeb36e',
        currency: 'VND',
      },
      {
        id: '90338ebd-7f2c-4deb-940a-a3d9eba27413',
        userId: 'f6413727-4a29-485e-9db8-29b64aaeb36e',
        date: new Date('2025-03-19'),
        type: 'Expense',
        amount: 80000.0,
        fromAccountId: 'e79cf602-2ba6-446f-97af-9f9b644ab266',
        fromCategoryId: null,
        toAccountId: null,
        toCategoryId: '8bd947e5-e164-4549-9b78-76de790bb0f7',
        products: {},
        partnerId: 'c59c88fa-2708-47f1-8f07-edee35d3023f',
        remark: 'Filled up gasoline for the week',
        isDeleted: false,
        deletedAt: null,
        createdAt: new Date('2025-03-19T15:18:42.574Z'),
        updatedAt: new Date('2025-03-19T15:18:42.574Z'),
        updatedBy: null,
        createdBy: 'f6413727-4a29-485e-9db8-29b64aaeb36e',
        currency: 'VND',
      },
      {
        id: '120337d6-2502-4f80-b9e6-99e99b69f12e',
        userId: 'f6413727-4a29-485e-9db8-29b64aaeb36e',
        date: new Date('2025-03-07'),
        type: 'Income',
        amount: 3000000.0,
        fromAccountId: null,
        fromCategoryId: 'c7a0a271-b89e-4af5-97e1-b7ff3a173189',
        toAccountId: 'e79cf602-2ba6-446f-97af-9f9b644ab266',
        toCategoryId: null,
        products: {},
        partnerId: '4635714b-59de-4a91-9cdd-b74cbbff0480',
        remark: 'Saving',
        isDeleted: false,
        deletedAt: null,
        createdAt: new Date('2025-03-22T04:09:04.656Z'),
        updatedAt: new Date('2025-03-22T04:09:04.656Z'),
        updatedBy: 'f6413727-4a29-485e-9db8-29b64aaeb36e',
        createdBy: 'f6413727-4a29-485e-9db8-29b64aaeb36e',
        currency: 'VND',
      },
      {
        id: '2ff99306-801b-4ae1-81a8-09cfd44676d7',
        userId: 'f6413727-4a29-485e-9db8-29b64aaeb36e',
        date: new Date('2025-03-07'),
        type: 'Income',
        amount: 5000000.0,
        fromAccountId: null,
        fromCategoryId: '346103cd-9496-4085-87f9-aacc18cd4a96',
        toAccountId: 'e79cf602-2ba6-446f-97af-9f9b644ab266',
        toCategoryId: null,
        products: {},
        partnerId: '4635714b-59de-4a91-9cdd-b74cbbff0480',
        remark: 'Saving',
        isDeleted: false,
        deletedAt: null,
        createdAt: new Date('2025-03-22T03:59:21.556Z'),
        updatedAt: new Date('2025-03-22T03:59:21.556Z'),
        updatedBy: 'f6413727-4a29-485e-9db8-29b64aaeb36e',
        createdBy: 'f6413727-4a29-485e-9db8-29b64aaeb36e',
        currency: 'VND',
      },
      {
        id: '45a734cb-9d2f-420b-bdf2-9f1d6d5aea47',
        userId: 'f6413727-4a29-485e-9db8-29b64aaeb36e',
        date: new Date('2025-03-07'),
        type: 'Expense',
        amount: 2000000.0,
        fromAccountId: null,
        fromCategoryId: 'b0090ca7-a3ea-43c6-a5eb-2a0644de2a9b',
        toAccountId: 'e79cf602-2ba6-446f-97af-9f9b644ab266',
        toCategoryId: null,
        products: {},
        partnerId: '4635714b-59de-4a91-9cdd-b74cbbff0480',
        remark: 'Saving',
        isDeleted: false,
        deletedAt: null,
        createdAt: new Date('2025-03-22T04:09:19.719Z'),
        updatedAt: new Date('2025-03-22T04:09:19.719Z'),
        updatedBy: 'f6413727-4a29-485e-9db8-29b64aaeb36e',
        createdBy: 'f6413727-4a29-485e-9db8-29b64aaeb36e',
        currency: 'VND',
      },
      {
        id: '1d69476a-285d-4248-a422-410f8465537b',
        userId: 'f6413727-4a29-485e-9db8-29b64aaeb36e',
        date: new Date('2025-03-07'),
        type: 'Expense',
        amount: 5000000.0,
        fromAccountId: null,
        fromCategoryId: '937da6e8-7f40-4d58-8b48-d6135f35ce91',
        toAccountId: 'e79cf602-2ba6-446f-97af-9f9b644ab266',
        toCategoryId: null,
        products: {},
        partnerId: '4635714b-59de-4a91-9cdd-b74cbbff0480',
        remark: 'Saving',
        isDeleted: false,
        deletedAt: null,
        createdAt: new Date('2025-03-22T04:08:40.547Z'),
        updatedAt: new Date('2025-03-22T04:08:40.547Z'),
        updatedBy: 'f6413727-4a29-485e-9db8-29b64aaeb36e',
        createdBy: 'f6413727-4a29-485e-9db8-29b64aaeb36e',
        currency: 'VND',
      },
      {
        id: 'c325aaae-b1ce-4510-b7b4-79d7f4bdae97',
        userId: 'f6413727-4a29-485e-9db8-29b64aaeb36e',
        date: new Date('2025-03-07'),
        type: 'Income',
        amount: 5000000.0,
        fromAccountId: null,
        fromCategoryId: '346103cd-9496-4085-87f9-aacc18cd4a96',
        toAccountId: 'e79cf602-2ba6-446f-97af-9f9b644ab266',
        toCategoryId: null,
        products: {},
        partnerId: '4635714b-59de-4a91-9cdd-b74cbbff0480',
        remark: 'Saving',
        isDeleted: false,
        deletedAt: null,
        createdAt: new Date('2025-03-22T04:02:11.946Z'),
        updatedAt: new Date('2025-03-22T04:02:11.946Z'),
        updatedBy: 'f6413727-4a29-485e-9db8-29b64aaeb36e',
        createdBy: 'f6413727-4a29-485e-9db8-29b64aaeb36e',
        currency: 'VND',
      },
      {
        id: '5758a7b4-70b5-455e-9864-2b6cedb08c26',
        userId: 'f6413727-4a29-485e-9db8-29b64aaeb36e',
        date: new Date('2025-03-07'),
        type: 'Income',
        amount: 10000000.0,
        fromAccountId: null,
        fromCategoryId: 'fbf8ed23-55b0-48bf-b166-ae21ed188913',
        toAccountId: 'e79cf602-2ba6-446f-97af-9f9b644ab266',
        toCategoryId: null,
        products: {},
        partnerId: '4635714b-59de-4a91-9cdd-b74cbbff0480',
        remark: 'Saving',
        isDeleted: false,
        deletedAt: null,
        createdAt: new Date('2025-03-22T04:03:55.581Z'),
        updatedAt: new Date('2025-03-22T04:03:55.581Z'),
        updatedBy: 'f6413727-4a29-485e-9db8-29b64aaeb36e',
        createdBy: 'f6413727-4a29-485e-9db8-29b64aaeb36e',
        currency: 'VND',
      },
      {
        id: '41a6d6e6-2533-4d7b-b1e7-1e886328b39c',
        userId: 'f6413727-4a29-485e-9db8-29b64aaeb36e',
        date: new Date('2025-03-07'),
        type: 'Income',
        amount: 10000000.0,
        fromAccountId: null,
        fromCategoryId: 'b9f19558-399a-4b09-b7d4-c9ae42176188',
        toAccountId: 'e79cf602-2ba6-446f-97af-9f9b644ab266',
        toCategoryId: null,
        products: {},
        partnerId: '4635714b-59de-4a91-9cdd-b74cbbff0480',
        remark: 'Saving',
        isDeleted: false,
        deletedAt: null,
        createdAt: new Date('2025-03-22T04:04:30.294Z'),
        updatedAt: new Date('2025-03-22T04:04:30.294Z'),
        updatedBy: 'f6413727-4a29-485e-9db8-29b64aaeb36e',
        createdBy: 'f6413727-4a29-485e-9db8-29b64aaeb36e',
        currency: 'VND',
      },
      {
        id: '316db170-0e13-449c-aebe-3f12dc5d1f3b',
        userId: 'f6413727-4a29-485e-9db8-29b64aaeb36e',
        date: new Date('2025-03-07'),
        type: 'Income',
        amount: 100000.0,
        fromAccountId: null,
        fromCategoryId: 'fadd0b6e-52f9-4efa-8e02-7afda13d036a',
        toAccountId: 'e79cf602-2ba6-446f-97af-9f9b644ab266',
        toCategoryId: null,
        products: {},
        partnerId: '4635714b-59de-4a91-9cdd-b74cbbff0480',
        remark: 'Saving',
        isDeleted: false,
        deletedAt: null,
        createdAt: new Date('2025-03-22T04:08:17.071Z'),
        updatedAt: new Date('2025-03-22T04:08:17.071Z'),
        updatedBy: 'f6413727-4a29-485e-9db8-29b64aaeb36e',
        createdBy: 'f6413727-4a29-485e-9db8-29b64aaeb36e',
        currency: 'VND',
      },
      {
        id: 'ba396711-ed7c-4aa4-b6f7-66e4852633fe',
        userId: 'f6413727-4a29-485e-9db8-29b64aaeb36e',
        date: new Date('2025-03-19'),
        type: 'Income',
        amount: 200000.0,
        fromAccountId: null,
        fromCategoryId: 'fadd0b6e-52f9-4efa-8e02-7afda13d036a',
        toAccountId: 'dd0478fa-e7fd-40fd-89c1-2a03c40a10b9',
        toCategoryId: null,
        products: {},
        partnerId: 'efbf31f7-c493-43c9-874a-c6474ccea996',
        remark: 'Reward for completing a task',
        isDeleted: false,
        deletedAt: null,
        createdAt: new Date('2025-03-19T15:18:42.574Z'),
        updatedAt: new Date('2025-03-19T15:18:42.574Z'),
        updatedBy: null,
        createdBy: 'f6413727-4a29-485e-9db8-29b64aaeb36e',
        currency: 'VND',
      },
      {
        id: 'b62a1914-61ea-4de2-870d-a0c36f0b5b7a',
        userId: 'f6413727-4a29-485e-9db8-29b64aaeb36e',
        date: new Date('2025-03-19'),
        type: 'Income',
        amount: 150000.0,
        fromAccountId: null,
        fromCategoryId: 'b0090ca7-a3ea-43c6-a5eb-2a0644de2a9b',
        toAccountId: 'dd0478fa-e7fd-40fd-89c1-2a03c40a10b9',
        toCategoryId: null,
        products: {},
        partnerId: 'c59c88fa-2708-47f1-8f07-edee35d3023f',
        remark: 'Sold old books online',
        isDeleted: false,
        deletedAt: null,
        createdAt: new Date('2025-03-19T15:18:42.574Z'),
        updatedAt: new Date('2025-03-19T15:18:42.574Z'),
        updatedBy: null,
        createdBy: 'f6413727-4a29-485e-9db8-29b64aaeb36e',
        currency: 'VND',
      },
      {
        id: '6d61ff5d-4e74-45cb-896e-6420b25289ff',
        userId: 'f6413727-4a29-485e-9db8-29b64aaeb36e',
        date: new Date('2025-03-19'),
        type: 'Expense',
        amount: 120000.0,
        fromAccountId: 'e79cf602-2ba6-446f-97af-9f9b644ab266',
        fromCategoryId: null,
        toAccountId: null,
        toCategoryId: null,
        products: {},
        partnerId: '6ba968d2-8484-4926-bd98-4598e6f965d1',
        remark: 'Paid monthly internet bill',
        isDeleted: false,
        deletedAt: null,
        createdAt: new Date('2025-03-19T15:18:42.574Z'),
        updatedAt: new Date('2025-03-19T15:18:42.574Z'),
        updatedBy: null,
        createdBy: 'f6413727-4a29-485e-9db8-29b64aaeb36e',
        currency: 'VND',
      },
      {
        id: '925e14ea-73e2-4c89-830e-8e2c3f037af7',
        userId: 'f6413727-4a29-485e-9db8-29b64aaeb36e',
        date: new Date('2025-03-07'),
        type: 'Income',
        amount: 5000000.0,
        fromAccountId: null,
        fromCategoryId: 'b9f19558-399a-4b09-b7d4-c9ae42176188',
        toAccountId: 'e79cf602-2ba6-446f-97af-9f9b644ab266',
        toCategoryId: null,
        products: {},
        partnerId: '4635714b-59de-4a91-9cdd-b74cbbff0480',
        remark: 'Saving',
        isDeleted: false,
        deletedAt: null,
        createdAt: new Date('2025-03-22T03:58:04.540Z'),
        updatedAt: new Date('2025-03-22T03:58:04.540Z'),
        updatedBy: 'f6413727-4a29-485e-9db8-29b64aaeb36e',
        createdBy: 'f6413727-4a29-485e-9db8-29b64aaeb36e',
        currency: 'VND',
      },
      {
        id: '05fd9592-5cab-4c71-9cd4-1f86d30db368',
        userId: 'f6413727-4a29-485e-9db8-29b64aaeb36e',
        date: new Date('2025-03-19'),
        type: 'Transfer',
        amount: 500000.0,
        fromAccountId: null,
        fromCategoryId: null,
        toAccountId: 'e79cf602-2ba6-446f-97af-9f9b644ab266',
        toCategoryId: null,
        products: {},
        partnerId: '81dbc54a-e42b-4f73-8c59-4e024e399dd2',
        remark: 'Transfer to increase payment account balance',
        isDeleted: false,
        deletedAt: null,
        createdAt: new Date('2025-03-19T15:18:42.574Z'),
        updatedAt: new Date('2025-03-19T15:18:42.574Z'),
        updatedBy: null,
        createdBy: 'f6413727-4a29-485e-9db8-29b64aaeb36e',
        currency: 'VND',
      },
      {
        id: '9b677ecf-e509-44a5-ae74-3663a35e4ce6',
        userId: 'f6413727-4a29-485e-9db8-29b64aaeb36e',
        date: new Date('2025-03-19'),
        type: 'Transfer',
        amount: 2000000.0,
        fromAccountId: 'e79cf602-2ba6-446f-97af-9f9b644ab266',
        fromCategoryId: null,
        toAccountId: 'dd0478fa-e7fd-40fd-89c1-2a03c40a10b9',
        toCategoryId: null,
        products: {},
        partnerId: null,
        remark: 'Transferring funds to savings account',
        isDeleted: false,
        deletedAt: null,
        createdAt: new Date('2025-03-19T15:18:42.574Z'),
        updatedAt: new Date('2025-03-19T15:18:42.574Z'),
        updatedBy: null,
        createdBy: 'f6413727-4a29-485e-9db8-29b64aaeb36e',
        currency: 'VND',
      },
      {
        id: '352dfcdc-d67c-489b-8c2c-74c6c6756368',
        userId: 'f6413727-4a29-485e-9db8-29b64aaeb36e',
        date: new Date('2023-10-01'),
        type: 'Expense',
        amount: 300000.0,
        fromAccountId: 'e79cf602-2ba6-446f-97af-9f9b644ab266',
        fromCategoryId: null,
        toAccountId: null,
        toCategoryId: null,
        products: {},
        partnerId: 'a0d77fe7-311d-479a-aa30-133d019c5fae',
        remark: 'Expense for Drink',
        isDeleted: false,
        deletedAt: null,
        createdAt: new Date('2025-03-22T04:08:23.966Z'),
        updatedAt: new Date('2025-03-22T04:08:23.966Z'),
        updatedBy: null,
        createdBy: 'f6413727-4a29-485e-9db8-29b64aaeb36e',
        currency: 'VND',
      },
      {
        id: '19395b86-ba83-4fd6-810a-b7f9534277bd',
        userId: 'f6413727-4a29-485e-9db8-29b64aaeb36e',
        date: new Date('2023-10-01'),
        type: 'Expense',
        amount: 5000000.0,
        fromAccountId: 'e79cf602-2ba6-446f-97af-9f9b644ab266',
        fromCategoryId: null,
        toAccountId: null,
        toCategoryId: 'c6b200ea-0baa-477e-8892-8c9e8bbd16e5',
        products: {},
        partnerId: '86576dc9-409c-4614-bd0a-9764d5822794',
        remark: 'Expense for Stay and Rest',
        isDeleted: false,
        deletedAt: null,
        createdAt: new Date('2025-03-22T04:08:02.226Z'),
        updatedAt: new Date('2025-04-01T13:46:30.866Z'),
        updatedBy: null,
        createdBy: 'f6413727-4a29-485e-9db8-29b64aaeb36e',
        currency: 'VND',
      },
      {
        id: 'f57fa4b6-b73b-46de-a776-50c75366aeb7',
        userId: 'f6413727-4a29-485e-9db8-29b64aaeb36e',
        date: new Date('2025-03-19'),
        type: 'Expense',
        amount: 150000.0,
        fromAccountId: 'e79cf602-2ba6-446f-97af-9f9b644ab266',
        fromCategoryId: null,
        toAccountId: null,
        toCategoryId: null,
        products: {},
        partnerId: 'efbf31f7-c493-43c9-874a-c6474ccea996',
        remark: 'Bought a headset for online meetings',
        isDeleted: false,
        deletedAt: null,
        createdAt: new Date('2025-03-19T15:18:42.574Z'),
        updatedAt: new Date('2025-03-19T15:18:42.574Z'),
        updatedBy: null,
        createdBy: 'f6413727-4a29-485e-9db8-29b64aaeb36e',
        currency: 'VND',
      },
      {
        id: '8cc79db1-ced3-4312-b36e-1f4f14464ce0',
        userId: 'f6413727-4a29-485e-9db8-29b64aaeb36e',
        date: new Date('2023-10-01'),
        type: 'Expense',
        amount: 1000000.0,
        fromAccountId: 'e79cf602-2ba6-446f-97af-9f9b644ab266',
        fromCategoryId: null,
        toAccountId: null,
        toCategoryId: null,
        products: {},
        partnerId: '4ee01e37-d213-4d58-9a6c-89a007f44b95',
        remark: 'Expense for Public Transport',
        isDeleted: false,
        deletedAt: null,
        createdAt: new Date('2025-03-22T04:07:42.051Z'),
        updatedAt: new Date('2025-03-22T04:07:42.051Z'),
        updatedBy: null,
        createdBy: 'f6413727-4a29-485e-9db8-29b64aaeb36e',
        currency: 'VND',
      },
      {
        id: '0261799a-8bfc-4883-ae40-56e454fb9450',
        userId: 'f6413727-4a29-485e-9db8-29b64aaeb36e',
        date: new Date('2025-03-07'),
        type: 'Income',
        amount: 1000000.0,
        fromAccountId: null,
        fromCategoryId: 'b9f19558-399a-4b09-b7d4-c9ae42176188',
        toAccountId: 'e79cf602-2ba6-446f-97af-9f9b644ab266',
        toCategoryId: null,
        products: {},
        partnerId: '4635714b-59de-4a91-9cdd-b74cbbff0480',
        remark: 'Saving',
        isDeleted: false,
        deletedAt: null,
        createdAt: new Date('2025-03-22T04:06:06.190Z'),
        updatedAt: new Date('2025-04-01T15:29:18.687Z'),
        updatedBy: 'f6413727-4a29-485e-9db8-29b64aaeb36e',
        createdBy: 'f6413727-4a29-485e-9db8-29b64aaeb36e',
        currency: 'VND',
      },
      {
        id: '89ea6c8b-d999-4910-879b-6d0dedcf6646',
        userId: 'f6413727-4a29-485e-9db8-29b64aaeb36e',
        date: new Date('2025-03-07'),
        type: 'Income',
        amount: 5000000.0,
        fromAccountId: null,
        fromCategoryId: '9dd332c0-5bac-409f-add1-8ec50b457225',
        toAccountId: 'e79cf602-2ba6-446f-97af-9f9b644ab266',
        toCategoryId: null,
        products: {},
        partnerId: 'ef44e2fa-bc1a-4fdd-ab29-650404d8bd11',
        remark: 'Salary',
        isDeleted: false,
        deletedAt: null,
        createdAt: new Date('2025-03-20T14:38:43.400Z'),
        updatedAt: new Date('2025-04-01T15:43:40.775Z'),
        updatedBy: 'f6413727-4a29-485e-9db8-29b64aaeb36e',
        createdBy: 'f6413727-4a29-485e-9db8-29b64aaeb36e',
        currency: 'VND',
      },
      {
        id: '7b959c8b-2a12-40bf-b628-a289c28a0ba5',
        userId: 'f6413727-4a29-485e-9db8-29b64aaeb36e',
        date: new Date('2025-03-07'),
        type: 'Income',
        amount: 5000000.0,
        fromAccountId: null,
        fromCategoryId: '9dd332c0-5bac-409f-add1-8ec50b457225',
        toAccountId: 'e79cf602-2ba6-446f-97af-9f9b644ab266',
        toCategoryId: null,
        products: {},
        partnerId: 'ef44e2fa-bc1a-4fdd-ab29-650404d8bd11',
        remark: 'Salary',
        isDeleted: false,
        deletedAt: null,
        createdAt: new Date('2025-03-20T14:39:18.325Z'),
        updatedAt: new Date('2025-04-01T15:43:40.775Z'),
        updatedBy: 'f6413727-4a29-485e-9db8-29b64aaeb36e',
        createdBy: 'f6413727-4a29-485e-9db8-29b64aaeb36e',
        currency: 'VND',
      },
      {
        id: 'dab31a92-18cd-4e5e-9424-9ae660012a1a',
        userId: 'f6413727-4a29-485e-9db8-29b64aaeb36e',
        date: new Date('2025-03-07'),
        type: 'Expense',
        amount: 1000000.0,
        fromAccountId: 'e79cf602-2ba6-446f-97af-9f9b644ab266',
        fromCategoryId: null,
        toAccountId: null,
        toCategoryId: null,
        products: {},
        partnerId: 'ef44e2fa-bc1a-4fdd-ab29-650404d8bd11',
        remark: 'Dinner',
        isDeleted: false,
        deletedAt: null,
        createdAt: new Date('2025-03-20T14:40:04.754Z'),
        updatedAt: new Date('2025-04-01T15:43:40.775Z'),
        updatedBy: 'f6413727-4a29-485e-9db8-29b64aaeb36e',
        createdBy: 'f6413727-4a29-485e-9db8-29b64aaeb36e',
        currency: 'VND',
      },
      {
        id: '9019c9fc-3a8c-48d1-b755-c98eba75faa7',
        userId: 'f6413727-4a29-485e-9db8-29b64aaeb36e',
        date: new Date('2025-03-07'),
        type: 'Expense',
        amount: 1000000.0,
        fromAccountId: 'e79cf602-2ba6-446f-97af-9f9b644ab266',
        fromCategoryId: null,
        toAccountId: null,
        toCategoryId: null,
        products: {},
        partnerId: 'ef44e2fa-bc1a-4fdd-ab29-650404d8bd11',
        remark: 'Dinner',
        isDeleted: false,
        deletedAt: null,
        createdAt: new Date('2025-03-20T14:40:26.826Z'),
        updatedAt: new Date('2025-04-01T15:43:40.775Z'),
        updatedBy: 'f6413727-4a29-485e-9db8-29b64aaeb36e',
        createdBy: 'f6413727-4a29-485e-9db8-29b64aaeb36e',
        currency: 'VND',
      },
      {
        id: '1be1e8cc-659b-4eb8-a847-19527f01215f',
        userId: 'f6413727-4a29-485e-9db8-29b64aaeb36e',
        date: new Date('2023-10-01'),
        type: 'Expense',
        amount: 2000000.0,
        fromAccountId: 'e79cf602-2ba6-446f-97af-9f9b644ab266',
        fromCategoryId: null,
        toAccountId: null,
        toCategoryId: null,
        products: {},
        partnerId: 'ef44e2fa-bc1a-4fdd-ab29-650404d8bd11',
        remark: 'Expense for Restaurant',
        isDeleted: false,
        deletedAt: null,
        createdAt: new Date('2025-03-22T04:08:12.197Z'),
        updatedAt: new Date('2025-04-01T15:43:40.775Z'),
        updatedBy: null,
        createdBy: 'f6413727-4a29-485e-9db8-29b64aaeb36e',
        currency: 'VND',
      },
      {
        id: '8efc18f4-21fa-40bf-aa3b-f58c6cc9889d',
        userId: 'f6413727-4a29-485e-9db8-29b64aaeb36e',
        date: new Date('2025-03-19'),
        type: 'Expense',
        amount: 350000.0,
        fromAccountId: 'e79cf602-2ba6-446f-97af-9f9b644ab266',
        fromCategoryId: null,
        toAccountId: null,
        toCategoryId: 'c6b200ea-0baa-477e-8892-8c9e8bbd16e5',
        products: {},
        partnerId: 'ef44e2fa-bc1a-4fdd-ab29-650404d8bd11',
        remark: 'Dinner with friends at Pho 24',
        isDeleted: false,
        deletedAt: null,
        createdAt: new Date('2025-03-19T15:18:42.574Z'),
        updatedAt: new Date('2025-04-01T15:43:40.775Z'),
        updatedBy: null,
        createdBy: 'f6413727-4a29-485e-9db8-29b64aaeb36e',
        currency: 'VND',
      },
    ],
  });
}
