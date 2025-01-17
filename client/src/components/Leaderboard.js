import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { motion } from "framer-motion";

const Leaderboard = () => {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All");
  const [timeframe, setTimeframe] = useState("All Time");

  useEffect(() => {
    fetchTrendingPolls();
  }, [category, timeframe]);

  const fetchTrendingPolls = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("polls")
      .select("*")
      .order("votes", { ascending: false });

    if (error) {
      console.error("Error fetching polls:", error);
    } else {
      let filteredPolls = data;

      // Category Filter
      if (category !== "All") {
        filteredPolls = filteredPolls.filter(poll => poll.category === category);
      }

      // Time Filter (Example Logic)
      const now = new Date();
      if (timeframe === "Today") {
        filteredPolls = filteredPolls.filter(poll => {
          const pollDate = new Date(poll.created_at);
          return pollDate.toDateString() === now.toDateString();
        });
      }

      setPolls(filteredPolls);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">🏆 Trending Polls</h1>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 rounded-lg shadow bg-white dark:bg-gray-800 dark:text-white"
        >
          <option>All</option>
          <option>Technology</option>
          <option>Sports</option>
          <option>Entertainment</option>
        </select>

        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          className="px-4 py-2 rounded-lg shadow bg-white dark:bg-gray-800 dark:text-white"
        >
          <option>All Time</option>
          <option>Today</option>
          <option>This Week</option>
        </select>
      </div>

      {loading ? (
        <p className="text-gray-800 dark:text-white">Loading...</p>
      ) : polls.length === 0 ? (
        <p className="text-gray-800 dark:text-white">No trending polls available.</p>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {polls.map((poll, index) => (
            <motion.div
              key={poll.id}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md"
            >
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                {index + 1}. {poll.question}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Votes: {poll.votes.reduce((a, b) => a + b, 0)}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Category: {poll.category}</p>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Leaderboard;
