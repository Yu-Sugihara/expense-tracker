export interface ExpenseItem {
  id: string;
  name: string;
  amount: number;
  category: string;

  // nullable な補助情報
  unitPrice?: number;
  quantity?: number;
  taxIncluded?: boolean;
  discount?: number;
  discountReason?: string;
  splitRatio?: Record<string, number>;
  memo?: string;
}
