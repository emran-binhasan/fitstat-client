import { useStripe, CardElement, useElements } from "@stripe/react-stripe-js";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const CheckOutForm = ({ bookingData }) => {
  const axiosSecure = useAxiosSecure();
  const stripe = useStripe();
  const elements = useElements();
  const { loading, setLoading } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) return;

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      bookingData.clientSecret,
      {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: bookingData.userName,
            email: bookingData.userEmail,
          },
        },
      }
    );

    if (error) {
      console.error(error.message);
      setLoading(false);
    } else if (paymentIntent.status === "succeeded") {
      Swal.fire({
        title: "Removed!",
        text: "Successfully removed the slot.",
        icon: "success",
      });
      await axiosSecure.post("/payments", {
        paymentIntentId: paymentIntent.id,
        amount: bookingData.price,
        trainerName: bookingData.trainerName,
        trainerEmail: bookingData.trainerEmail,
        packageName: bookingData.packageName,
        packagePrice: bookingData.packagePrice,
        slotName: bookingData.slotName,
        classId: bookingData.classId,
        userName: bookingData.userName,
        userEmail: bookingData.userEmail,
      });
    }

    await axiosSecure.patch(`/class/${bookingData.classId}`);

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p>
        <strong>Trainer Name:</strong> {bookingData?.trainerName}
      </p>
      <p>
        <strong>Slot Name:</strong> {bookingData?.slotName}
      </p>
      <p>
        <strong>Package Name:</strong> {bookingData?.packageName}
      </p>
      <p>
        <strong>Price:</strong> ${bookingData?.packagePrice}
      </p>

      <h3 className="text-lg font-semibold">Your Information</h3>
      <p>
        <strong>Name:</strong> {bookingData?.userName}
      </p>
      <p>
        <strong>Email:</strong> {bookingData?.userEmail}
      </p>

      <h3 className="text-xl font-semibold">Complete Payment</h3>
      <CardElement className="p-2 border rounded" />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

export default CheckOutForm;

// import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
// import { useState } from "react";

// const CheckoutForm = ({ paymentData }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setLoading(true);

//     if (!stripe || !elements) return;

//     const { error, paymentIntent } = await stripe.confirmCardPayment(paymentData.clientSecret, {
//       payment_method: {
//         card: elements.getElement(CardElement),
//         billing_details: {
//           name: paymentData.name,
//           email: paymentData.email,
//         },
//       },
//     });

//     if (error) {
//       console.error(error.message);
//       setLoading(false);
//     } else if (paymentIntent.status === "succeeded") {
//       alert("Payment Successful!");

//       // Save payment info in the backend
//       await fetch("http://localhost:5000/api/save-payment", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           paymentIntentId: paymentIntent.id,
//           amount: paymentData.price,
//           trainerName: paymentData.trainerName,
//           slotName: paymentData.slotName,
//           packageName: paymentData.packageName,
//           userName: paymentData.name,
//           userEmail: paymentData.email,
//         }),
//       });

//       // Increase booking count
//       await fetch("http://localhost:5000/api/increase-booking-count", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ slotName: paymentData.slotName }),
//       });
//     }
//     setLoading(false);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <h3 className="text-xl font-semibold">Complete Payment</h3>
//       <CardElement className="p-2 border rounded" />
//       <button type="submit" disabled={!stripe || loading} className="bg-blue-600 text-white px-4 py-2 rounded">
//         {loading ? "Processing..." : "Pay Now"}
//       </button>
//     </form>
//   );
// };

// export default CheckoutForm;

// import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
// import { useState } from "react";

// const CheckoutForm = () => {
//     const stripe = useStripe();
//     const elements = useElements();
//     const client_secret = import.meta.env.clientSecret;

//     const [errorMessage, setErrorMessage] = useState(null);

//     const handleSubmit = async (event) => {
//       event.preventDefault();

//       if (elements == null) {
//         return;
//       }

//       // Trigger form validation and wallet collection
//       const {error: submitError} = await elements.submit();
//       if (submitError) {
//         // Show error to your customer
//         setErrorMessage(submitError.message);
//         return;
//       }

//       // Create the PaymentIntent and obtain clientSecret from your server endpoint
//       // const res = await fetch('/create-intent', {
//       //   method: 'POST',
//       // });

//       const {client_secret: clientSecret} = await res.json();

//       const {error} = await stripe.confirmPayment({
//         //`Elements` instance that was used to create the Payment Element
//         elements,
//         clientSecret,
//         confirmParams: {
//           return_url: 'https://example.com/order/123/complete',
//         },
//       });

//       if (error) {
//         // This point will only be reached if there is an immediate error when
//         // confirming the payment. Show error to your customer (for example, payment
//         // details incomplete)
//         setErrorMessage(error.message);
//       } else {
//         // Your customer will be redirected to your `return_url`. For some payment
//         // methods like iDEAL, your customer will be redirected to an intermediate
//         // site first to authorize the payment, then redirected to the `return_url`.
//       }
//     };

//     return (
//       <>
//       <form onSubmit={handleSubmit}>
//         <PaymentElement />
//         <p>Hello</p>
//         <button type="submit" disabled={!stripe || !elements}>
//           Pay
//         </button>
//         {/* Show error message to your customers */}
//         {errorMessage && <div>{errorMessage}</div>}
//       </form>
//       </>
//     );
//   };

// export default CheckoutForm;
