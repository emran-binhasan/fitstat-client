import { Helmet } from "react-helmet-async";
import DashboardTitle from "../../../../components/DashboardTitle";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { Bar } from "react-chartjs-2";
import Loading from "../../../Others/Loading";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const Balance = () => {
  const axiosSecure = useAxiosSecure();

  const convertMongoIdToDate = (mongoId) => {
    const timestamp = parseInt(mongoId?.toString().substring(0, 8), 16) * 1000;
    return new Date(timestamp).toLocaleString();
  };

  // Fetch Data
  const { data, error, isLoading } = useQuery({
    queryKey: ["financial-data"],
    queryFn: async () => {
      const res = await axiosSecure.get("/state");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;
  if (error) return <div className="text-red-500">Error fetching data</div>;

  // Extract Data
  const { totalPayment, totalUsers, transactions = [], subscribers, paidMembers } = data;

  // Last 6 Transactions (Handles empty transactions case)
  const lastTransactions = transactions?.slice(-6) || [];

  // Chart Data
  const chartData = {
    labels: ["Total Newsletter Subscribers", "Total Paid Members"],
    datasets: [
      {
        label: "Subscribers vs Paid Members",
        data: [subscribers, paidMembers],
        backgroundColor: ["#4CAF50", "#2196F3"],
        borderColor: ["#4CAF50", "#2196F3"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>FitStat | Balance</title>
      </Helmet>

      <DashboardTitle title="Balance" />

      <div className="w-full max-w-4xl mx-auto p-5 space-y-6">
        {/* Total Balance */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700">Total Balance</h3>
          <p className="text-2xl font-bold text-green-600">${totalPayment}</p>
        </div>

        {/* Total Users */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700">Total Users</h3>
          <p className="text-xl font-bold text-purple-600">{totalUsers}</p>
        </div>

        {/* Transactions Table */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700">Last 6 Transactions</h3>
          <div className="overflow-x-auto bg-white border border-gray-200 shadow-lg rounded-lg">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700">Transaction ID</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700">Amount</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700">Date</th>
                </tr>
              </thead>
              <tbody>
                {lastTransactions.length > 0 ? (
                  lastTransactions.map((transaction) => (
                    <tr key={transaction._id} className="border-t border-gray-200 hover:bg-gray-50">
                      <td className="py-2 px-4 text-sm text-gray-700">{transaction.paymentIntentId}</td>
                      <td className="py-2 px-4 text-sm text-gray-700">${transaction.packagePrice}</td>
                      <td className="py-2 px-4 text-sm text-gray-700">{convertMongoIdToDate(transaction._id)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="py-3 px-4 text-center text-gray-500">
                      No transactions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Chart */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700">Newsletter Subscribers vs Paid Members</h3>
          <div className="relative w-full max-w-lg h-auto">
            <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Balance;
