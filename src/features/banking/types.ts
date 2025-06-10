export interface Account {
  id: string;
  accountNumber: string;
  type: 'SAVINGS' | 'INVESTMENT' | 'DEPOSIT';
  balance: number;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Transaction {
  id: string;
  accountId: string;
  type: 'CREDIT' | 'DEBIT';
  amount: number;
  description: string;
  date: Date;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
}

export interface Investment {
  id: string;
  accountId: string;
  type: string;
  amount: number;
  returnRate: number;
  startDate: Date;
  endDate: Date;
  status: 'ACTIVE' | 'MATURED' | 'CANCELLED';
}

export interface Deposit {
  id: string;
  accountId: string;
  amount: number;
  term: number; // in months
  interestRate: number;
  startDate: Date;
  maturityDate: Date;
  status: 'ACTIVE' | 'MATURED' | 'CANCELLED';
} 