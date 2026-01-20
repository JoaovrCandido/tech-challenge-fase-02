import { createSlice } from "@reduxjs/toolkit";

interface TransactionTypesState {
  types: string[];
}

const initialState: TransactionTypesState = {
  types: ["deposito", "transferencia"], // Adicione mais tipos aqui se precisar
};

const transactionTypeSlice = createSlice({
  name: "transactionTypes",
  initialState,
  reducers: {
    // Se precisar adicionar tipos dinamicamente no futuro, crie as actions aqui
  },
});

export default transactionTypeSlice.reducer;