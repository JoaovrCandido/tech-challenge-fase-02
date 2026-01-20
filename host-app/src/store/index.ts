import { configureStore } from "@reduxjs/toolkit";

// 1. Importa o arquivo de Tipos (Dropdown)
import transactionTypesReducer from "@/transactionTypes/transactionTypeSlice"

// 2. Importa o arquivo de Transações (Lista/Saldo)
import transactionsReducer from "@/transactionTypes/transactionSlice"; 

const store = configureStore({
  reducer: {
    // O nome 'transactionTypes' deve bater com o que usamos no useSelector
    transactionTypes: transactionTypesReducer, 
    
    // O nome 'transactions' deve bater com o que usamos no useSelector
    transactions: transactionsReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;