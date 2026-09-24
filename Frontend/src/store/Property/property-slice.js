import { createSlice } from "@reduxjs/toolkit";
// import { object } from "prop-types";

const propertySlice = createSlice({
    name: "property",
    initialState: {
        properties: [],
        totalProperties: 0,
        SearchParams: {},
        error: null,
        loading: false
    },
    reducers: {
        getRequest(state) {
            state.loading = true;
        },
        getProperties(state, action) {
            state.properties = action.payload.data;
            state.totalProperties = action.payload.all_properties;
            state.loading = false;
        },
        updateSearchParams: (state, action) => {
            state.SearchParams = Object.keys(action.payload).length === 0 ? {} : {
                ...state.SearchParams,
                ...action.payload
            }
        },
        getErrors(state, action) {
            state.error = action.payload;
            state.loading = false;
        }
    }
})

export const propertyAction = propertySlice.actions

export default propertySlice;