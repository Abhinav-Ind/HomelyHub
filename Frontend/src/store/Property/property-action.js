import { propertyAction } from "./property-slice.js";
import { axiosInstance } from "../../utils/axios.js";

export const getAllProperties = () => async (dispatch, getState) => {
    try {
        console.log("API call started");
        dispatch(propertyAction.getRequest())
        const { SearchParams } = getState().properties
        console.log(SearchParams)
        const response = await axiosInstance.get(`/v1/rent/listing`, {
            params: { ...SearchParams }
        })
        if (!response) {
            throw new Error("Could not fetch any properties")
        }
        const { data } = response;
        console.log(data);
        dispatch(propertyAction.getProperties(data))
    } catch (error) {
        dispatch(propertyAction.getErrors(error.message))
    }
}