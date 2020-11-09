import Transaction from '../models/Transaction';

interface CreateTransactionsDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface CreateBalanceDTO{
  income: number;
  outcome: number;
  total: number;
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
    // TODO
  }

  public getBalance(): Balance {
    const { income, outcome } = this.transactions.reduce(
      (accumalator: Balance, transaction: Transaction) => {
      switch (transaction.type){
        case 'income':
        {
          accumalator.income += transaction.value;
          break;
        }
        case 'outcome':
        {
          accumalator.outcome += transaction.value;
        }

        default:
          break;
      }

      return accumalator;
      }, 
      {
        income: 0,
        outcome: 0,
        total: 0
      }
    );

    const total = income - outcome;

    return { income , outcome , total };
  }

  public create({ title, value, type }:CreateTransactionsDTO): Transaction {
    const transaction = new Transaction({ title , value, type });
    
    this.transactions.push(transaction);

    return transaction;
    
  }
}

export default TransactionsRepository;
