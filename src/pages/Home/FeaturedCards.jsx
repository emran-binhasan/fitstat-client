import React from 'react';
import { FaDumbbell, FaRunning, FaHeartbeat, FaChartLine } from 'react-icons/fa';

const FeaturedCards = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-12 text-gray-800">Key Features of FitStat</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Card 1 - Workout Tracking */}
          <div className="bg-white border-2 border-blue-500 shadow-lg rounded-xl p-6 text-center transition-transform transform hover:scale-105">
            <div className="mb-4 flex justify-center items-center text-blue-500">
              <FaDumbbell className="text-3xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Workout Tracking</h3>
            <p className="text-gray-600">Log and track your daily workouts to stay motivated and see progress over time.</p>
          </div>

          {/* Card 2 - Running and Cardio Tracking */}
          <div className="bg-white border-2 border-green-500 shadow-lg rounded-xl p-6 text-center transition-transform transform hover:scale-105">
            <div className="mb-4 flex justify-center items-center text-green-500">
              <FaRunning className="text-3xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Cardio & Running</h3>
            <p className="text-gray-600">Track your running distance, time, and calories burned for an effective cardio workout.</p>
          </div>

          {/* Card 3 - Heart Rate Monitoring */}
          <div className="bg-white border-2 border-red-500 shadow-lg rounded-xl p-6 text-center transition-transform transform hover:scale-105">
            <div className="mb-4 flex justify-center items-center text-red-500">
              <FaHeartbeat className="text-3xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Heart Rate Monitoring</h3>
            <p className="text-gray-600">Monitor your heart rate during workouts to ensure you're in the optimal zone for fat burning.</p>
          </div>

          {/* Card 4 - Progress Analytics */}
          <div className="bg-white border-2 border-yellow-500 shadow-lg rounded-xl p-6 text-center transition-transform transform hover:scale-105">
            <div className="mb-4 flex justify-center items-center text-yellow-500">
              <FaChartLine className="text-3xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Progress Analytics</h3>
            <p className="text-gray-600">Analyze your progress with detailed graphs and stats to stay on track and improve performance.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCards;
