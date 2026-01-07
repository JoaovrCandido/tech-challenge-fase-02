"use client";

import { useEffect, useState } from "react";
import { transactionsMock } from "@/mocks/transactions";
import { Transaction } from "@/types";

const STORAGE_KEY = "transactions:v1";

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // carregar
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored) {
      setTransactions(JSON.parse(stored));
    } else {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(transactionsMock)
      );
      setTransactions(transactionsMock);
    }
  }, []);

  // 🔥 salvar SEMPRE que mudar
  useEffect(() => {
    if (transactions.length > 0) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(transactions)
      );
    }
  }, [transactions]);

  return { transactions, setTransactions };
}
