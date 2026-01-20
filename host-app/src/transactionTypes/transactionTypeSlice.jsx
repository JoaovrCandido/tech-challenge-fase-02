import { createSlice } from "@reduxjs/toolkit";
import { types } from "util";

const initialState = {
    types:[
        'Depósito',
        'Transferência'
    ]
}

const transactionTypes = createSlice({
    name: 'transactionTypes', 
    initialState
})

export default transactionTypes.reducer