import { propertyDetailsAction } from "./propertyDetails-slice.js";
import { axiosInstance } from "../../utils/axios.js"

export const getPropertyDetails = (id) => async (dispatch) => {
    try {
        dispatch(propertyDetailsAction.getListRequest());
        const response = await axiosInstance(`/v1/rent/listing/${id}`)
        console.log(response);
        if (!response) {
            throw new Error("Could not fetch any property Details");
        }
        const { data } = response.data;
        dispatch(propertyDetailsAction.getPropertyDetails(data))
    } catch (error) {
        dispatch(propertyDetailsAction.getErrors(error.response.data.error))
    }
}