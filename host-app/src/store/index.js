import { configureStore } from "@reduxjs/toolkit";

import transactionTypes from "../transactionTypes/transactionTypeSlice"

const store = configureStore({
    reducer: {
        transactionTypes
    }
});

export default store