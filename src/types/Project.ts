// src/types/Project.ts
import { DebtItem } from "./DebtItem";

export interface Project {
  id: string;
  name: string;
  amountToPay: number;
  amountToReceive: number;
  imageUrl: string;
  participantAvatars: string[];
  isSettled?: boolean;
  debtBreakdown?: DebtItem[];
}
