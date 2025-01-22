import { createContext, useState } from "react";

export const BookingContext = createContext(null)
const BookingProvider = ({children}) => {
    const [selectedClass,setSelectedClass] = useState(null);
    // const [selectedClass,setSelectedClass] = useState(null);
    // const [selectedClass,setSelectedClass] = useState(null);
    // const [selectedClass,setSelectedClass] = useState(null);
    // const [selectedClass,setSelectedClass] = useState(null);

    const bookingInfo = {selectedClass,setSelectedClass};
    return (
        <BookingContext.Provider value={bookingInfo}>
            {children}
        </BookingContext.Provider>
    );
};

export default BookingProvider;