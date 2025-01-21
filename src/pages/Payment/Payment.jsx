
import {loadStripe} from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckOutForm';


const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

const options = {
  mode: 'payment',
  amount: 1099,
  currency: 'usd',
  // Fully customizable with appearance API.
  appearance: {
    /*...*/
  },
};






const Payment = () => {
    return (
        <div>
        <Elements stripe={stripePromise} options={options}>
            <CheckoutForm/>
        </Elements>
        </div>
    );
};

export default Payment;