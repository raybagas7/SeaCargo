export interface ITopUp {
  owner: string;
  toWallet: string;
  amount: number;
  id: string;
  date: number;
}

export interface IWallet {
  balance: number;
  userId: string;
  id: string;
}
