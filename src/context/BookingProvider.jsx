import { createContext, useState } from "react";

export const BookingContext = createContext(null)
const BookingProvider = ({children}) => {
    const [selectedClass,setSelectedClass] = useState(null);
    const [selectedSlot,setSelectedSlot] = useState(null);
    const [bookingData,setBookingData] = useState(null)
    // const [selectedClass,setSelectedClass] = useState(null);
    // const [selectedClass,setSelectedClass] = useState(null);
    // const [selectedClass,setSelectedClass] = useState(null);

    const bookingInfo = {selectedClass,setSelectedClass,selectedSlot,setSelectedSlot,bookingData,setBookingData};
    return (
        <BookingContext.Provider value={bookingInfo}>
            {children}
        </BookingContext.Provider>
    );
};

export default BookingProvider;