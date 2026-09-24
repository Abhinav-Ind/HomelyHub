import { axiosInstance } from "../../utils/axios";
import { setBookingDetails, setBookings } from "./booking-slice";

export const fetchBookingDetails = (bookingId) => async (dispatch) => {
    try {
        const response = await axiosInstance.get(`/v1/rent/user/booking/${bookingId}`)
        dispatch(setBookingDetails(response.data.data));
    } catch (error) {
        console.log("Error in fetching the booking details", error)
    }
}

export const fetchUserBookings = () => async (dispatch) => {
    try {
        const response = axiosInstance.get("/v1/rent/user/booking")
        dispatch(setBookings((await response).data.data.bookings))
    } catch (error) {
        console.log("Error in fetching the booking details", error)
    }
}