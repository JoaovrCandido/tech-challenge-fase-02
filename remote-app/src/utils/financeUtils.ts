// financeUtils.ts

import { Transaction } from "@/types";

// Sua função existente
export function calculateBalance(transactions: Transaction[]): number {
  return transactions.reduce((total, transaction) => {
    if (transaction.type === "deposito") return total + transaction.value;
    if (transaction.type === "transferencia") return total - transaction.value;
    return total;
  }, 0);
}

// Nova função: Total de Entradas
export function calculateTotalDeposits(transactions: Transaction[]): number {
  return transactions.reduce((total, transaction) => {
    if (transaction.type === "deposito") {
      return total + transaction.value;
    }
    return total;
  }, 0);
}

// Nova função: Total de Saídas
export function calculateTotalTransfers(transactions: Transaction[]): number {
  return transactions.reduce((total, transaction) => {
    if (transaction.type === "transferencia") {
      return total + transaction.value;
    }
    return total;
  }, 0);
}