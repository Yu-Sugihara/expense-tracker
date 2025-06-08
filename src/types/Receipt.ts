import { ExpenseItem } from './ExpenseItem';
import { ReceiptStatus } from './ReceiptStatus';

export interface Receipt {
  id: string;
  store: string;
  date: string;       // YYYY-MM-DD
  time: string;       // HH:mm
  subtotal: number;
  tax: number;
  total: number;
  createdAt: string;  // ISO形式文字列
  status: ReceiptStatus;
  items: ExpenseItem[];

  // nullable（undefined許容）な項目
  imageUrl?: string;
  paymentMethod?: string;
}
