import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    transactions: []
}

const transactionSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        addTransaction: (state, action) => {
            action.payload
        }
    }
})

export const { addTransaction } = transactionSlice.actions

export default transactionSlice.reducer