import {Elements} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { BookingContext } from '../../context/BookingProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import CheckoutForm from './CheckOutForm';

const Payment = () => {

  const {bookingData} = useContext(BookingContext)
  const {trainerName,trainerEmail,packageName,packagePrice,slotName,userName,userEmail,classId} = bookingData || {};
  console.log(packagePrice)
  console.log(trainerName,trainerEmail,packageName,packagePrice,slotName,userEmail,userName,classId)
  const axiosSecure = useAxiosSecure();
  const stripePromise = loadStripe(import.meta.env.VITE_paymentGatewayPK)

  const {data:clientSecret} = useQuery({
    queryKey:[''],
    queryFn:async() => {
      const res =await axiosSecure.post('/create-payment-intent', {price:packagePrice})
      return res.data.client_secret
    }
  })

  console.log(clientSecret)
  return (
    <div className="p-6 bg-gray-50 rounded-md max-w-3xl mx-auto">
    <h2 className="text-2xl font-semibold text-center mb-4">Payment Page</h2>
    {clientSecret && (
      <Elements stripe={stripePromise} options={{clientSecret}}>
        <CheckoutForm bookingData={{...bookingData,clientSecret}}/>
      </Elements>
    )}
  </div>
  );
};

export default Payment;