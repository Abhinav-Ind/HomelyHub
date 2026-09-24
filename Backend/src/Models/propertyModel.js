import slugify from 'slugify';
import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
    propertyName: {
        type: String,
        requires: [true, "Please enter your property name"]
    },
    description: {
        type: String,
        requires: [true, "Please add description of your property"]
    },
    extraInfo: {
        type: String,
        default: "Have a nice stay at this beautiful place"
    },
    propertyType: {
        type: String,
        enum: ["House", "Flat", "Hotel", "Guest House", "PG", "Villa"],
        default: "House"
    },
    roomType: {
        type: String,
        enum: ["AnyType", "Room", "Entire Home"],
        default: "AnyType"
    },
    maximumGuest: {
        type: Number,
        required: [true, "Please enter the maximum number of guests that can occupy"]
    },
    amenities: [
        {
            name: {
                type: String,
                required: true,
                enum: [
                    "Wifi", "Kitchen", "Ac", "Washing Machine", "Tv", "Pool", "Garden", "Free Parking"
                ]
            },
            icon: {
                type: String,
                required: true
            }
        }
    ],
    images: {
        type: [
            {
                public_id: {
                    type: String
                },
                url: {
                    type: String,
                    required: true
                }
            }
        ],
        validate: {
            validator: function (arr) {
                return arr.length >= 6;
            },
            message: "Please upload at least 6 images of your property"
        }
    },
    price: {
        type: Number,
        required: [true, "Please enter the price for staying per night"],
        default: 500
    },
    address: {
        area: String,
        city: String,
        state: String,
        pincode: Number
    },
    currentBookings: [
        {
            bookingId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Booking"
            },
            fromDate: {
                type: Date
            },
            toDate: {
                type: Date
            },
            userID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        }
    ],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    slug: String,
    checkInTime: {
        type: String,
        default: "11:00"
    },
    checkOutTime: {
        type: String,
        default: "13:00"
    }
})

propertySchema.pre("save", function () {
    this.slug = slugify(this.propertyName, { lower: true });
})

propertySchema.pre("save", function () {
    this.address.city = this.address.city.toLowerCase().replaceAll(" ", "");
})

const Property = mongoose.models.Property || mongoose.model("Property", propertySchema);
export { Property };