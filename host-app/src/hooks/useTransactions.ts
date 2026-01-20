import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { transactionsMock } from "@/mocks/transactions";
import { RootState } from "@/store/"; // Ajuste o caminho da sua store
import { setTransactions } from '@/transactionTypes/transactionSlice';

const STORAGE_KEY = "transactions:v1";

export function useTransactions() {
  const dispatch = useDispatch();
  // Agora lemos os dados direto do Redux
  const transactions = useSelector((state: RootState) => state.transactions.items);

  // 1. Carregar (Load): Executa apenas 1 vez ao iniciar
  useEffect(() => {
    // Verifica se estamos no navegador (Next.js precisa disso)
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);

      if (stored) {
        // Se tem no storage, manda para o Redux
        dispatch(setTransactions(JSON.parse(stored)));
      } else {
        // Se não tem, manda o Mock para o Redux e salva no storage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(transactionsMock));
        dispatch(setTransactions(transactionsMock));
      }
    }
  }, [dispatch]);

  // 2. Salvar (Save): Executa sempre que o Redux muda
  useEffect(() => {
    // Só salva se tiver algo (ou se quiser permitir array vazio, remova o if)
    if (transactions.length > 0) { 
        localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    }
  }, [transactions]);

  // Retornamos apenas transactions. 
  // Não retornamos setTransactions porque quem altera agora é o dispatch na Home.
  return { transactions };
}