import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import PageTitle from "../../components/PageTitle";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const TrainerBooking = () => {
    const day = JSON.parse(localStorage.getItem("selectedDay")) || "N/A";
    const time = JSON.parse(localStorage.getItem("selectedTime")) || "N/A";

    const axiosPublic = useAxiosPublic();
    const { id } = useParams();

    const { data: trainerData, isLoading, error } = useQuery({
        queryKey: ["trainerBooking", id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/booking/${id}`);
            return res.data;
        },
        enabled: !!id,
    });
    const navigate = useNavigate()

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading trainer data!</p>;
    if (!trainerData) return <p>No trainer found.</p>;

    const { name, skills } = trainerData;

    const membershipPlans = [
        {
            name: "Basic",
            benefits: [
                "Unlimited gym access",
                "Use of standard equipment",
                "Locker & shower access",
                "1 complimentary fitness assessment",
            ],
            price: "$10/month",
            border: "border-blue-400",
            icon: "💪",
        },
        {
            name: "Standard",
            benefits: [
                "All Basic benefits",
                "Access to group fitness classes",
                "Yoga & Zumba sessions",
                "Priority locker reservations",
                "1 personal trainer session per month",
            ],
            price: "$50/month",
            border: "border-green-400",
            icon: "🏋️",
        },
        {
            name: "Premium",
            benefits: [
                "All Standard benefits",
                "Unlimited personal training sessions",
                "Custom nutrition & diet plans",
                "Spa, sauna, and massage access",
                "Exclusive VIP gym lounge access",
            ],
            price: "$100/month",
            border: "border-purple-400",
            icon: "🌟",
        },
    ];
    

    return (
        <div className="container mx-auto py-8 px-4">
            <PageTitle title="Trainer Booking" subTitle="Secure Your Training Session" />

            {/* Trainer Info */}
            <motion.div
                className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md border-l-4 border-gray-300 dark:border-gray-700 hover:border-blue-400 transition-all"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{name}</h2>
                <p className="text-gray-700 dark:text-gray-300 mt-2">Classes: {skills?.join(", ")}</p>
                <p className="text-gray-700 dark:text-gray-300">Selected Slot: {day} at {time}</p>
            </motion.div>

            {/* Membership Plans */}
            <div className="mt-10">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white text-center mb-6">
                    Choose a Membership Plan
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {membershipPlans.map((plan, index) => (
                        <motion.div
                            key={index}
                            className={`p-6 rounded-lg shadow-md border-2 ${plan.border} hover:shadow-xl transition-all bg-white dark:bg-gray-900`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className="flex items-center justify-between">
                                <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    {plan.icon} {plan.name} Membership
                                </h4>
                                <p className="text-lg font-bold text-gray-900 dark:text-white">{plan.price}</p>
                            </div>
                            <ul className="text-gray-700 dark:text-gray-300 mt-4 space-y-2">
                                {plan.benefits.map((benefit, i) => (
                                    <li key={i} className="flex items-center space-x-2">
                                        <span className="text-blue-500">✔</span>
                                        <span>{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                            <motion.button
                                className="mt-6 w-full bg-gray-100 hover:bg-blue-500 hover:text-white text-blue-600 px-5 py-2 rounded-md transition-all"
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                    localStorage.setItem("price", JSON.stringify(plan.price));
                                    localStorage.setItem("plan", JSON.stringify(plan.name));
                                    localStorage.setItem("trainer", JSON.stringify(name));

                                navigate('/booking/checkout')
                                }}
                            >
                                Join Now
                            </motion.button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TrainerBooking;
