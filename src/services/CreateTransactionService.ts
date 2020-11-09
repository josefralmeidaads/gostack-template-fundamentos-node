import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {

    if (![ 'outcome', 'income'].includes(type)){
      throw new Error ('Type is invalid!');
    }

    const { total, outcome } = this.transactionsRepository.getBalance();
    if (type === 'outcome' && total < value){
      throw new Error('Você não possui saldo suficiente!');
    }
    // TODO
    const transaction = this.transactionsRepository.create({ title, value, type});

    return transaction;
  }
}

export default CreateTransactionService;
