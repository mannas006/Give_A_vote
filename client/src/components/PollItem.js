import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabase";
import { motion } from "framer-motion";
import { useNotification } from "../contexts/NotificationContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { QRCodeCanvas } from "qrcode.react";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#8dd1e1", "#a4de6c"];

const PollItem = () => {
  const { id } = useParams();
  const [poll, setPoll] = useState(null);
  const [loading, setLoading] = useState(true);
  const [voted, setVoted] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const { notify } = useNotification();

  // 🔗 Generate the poll link dynamically
  const getPollLink = () => {
    if (process.env.NODE_ENV === "development") {
      const localIP = window.location.hostname;
      return `http://${localIP}:3000/poll/${id}`;
    } else {
      return `https://your-production-domain.com/poll/${id}`; // Replace with your domain
    }
  };

  const pollLink = getPollLink();

// ✅ Fetch Poll Data
  useEffect(() => {
    const fetchPoll = async () => {
      const { data, error } = await supabase
        .from("polls")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching poll:", error);
      } else {
        setPoll(data);
      }
      setLoading(false);
    };

    fetchPoll();

    // 📡 Real-time updates for votes
    const subscription = supabase
      .channel("polls")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "polls", filter: `id=eq.${id}` },
        (payload) => {
          setPoll(payload.new);
          if (voted) {
            notify("New vote added to this poll! 🔥", "info");
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [id, voted, notify]);


  // ✅ 1. New Comments Notification
useEffect(() => {
  const subscription = supabase
    .channel("comments")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "comments" },
      (payload) => {
        notify(`New comment: "${payload.new.content}" 💬`, "info");
      }
    )
    .subscribe();

  return () => supabase.removeChannel(subscription);
}, []);

// ✅ 2. Poll Expiration Notification
useEffect(() => {
  const checkPollExpiration = () => {
    const expirationTime = new Date(poll.created_at);
    expirationTime.setDate(expirationTime.getDate() + poll.duration);

    if (new Date() > expirationTime) {
      notify("This poll has expired ⏳", "warning");
    }
  };

  if (poll) {
    checkPollExpiration();
  }
}, [poll]);


  // 🗳️ Handle Vote Submission
  const handleVote = async (optionIndex) => {
    if (voted) return;

    const updatedVotes = [...poll.votes];
    updatedVotes[optionIndex] += 1;

    const { error } = await supabase
      .from("polls")
      .update({ votes: updatedVotes })
      .eq("id", id);

    if (error) {
      console.error("Error voting:", error);
    } else {
      setVoted(true);
      notify(`You voted for "${poll.options[optionIndex]}"! 🎉`, "success");
    }
  };

  // 📋 Copy Link to Clipboard
  const handleCopyLink = () => {
    navigator.clipboard.writeText(pollLink);
    notify("Poll link copied to clipboard! 📋", "success");
  };

  // ⏰ Notify if Poll Expired
  useEffect(() => {
    const checkExpiration = () => {
      const expirationTime = new Date(poll.created_at);
      expirationTime.setDate(expirationTime.getDate() + poll.duration);

      if (new Date() > expirationTime) {
        notify("This poll has expired ⏳", "warning");
      }
    };

    if (poll) {
      checkExpiration();
    }
  }, [poll, notify]);

  if (loading) return <p className="text-center text-gray-800 dark:text-white">Loading poll...</p>;
  if (!poll) return <p className="text-center text-red-500">Poll not found.</p>;

  const totalVotes = poll.votes.reduce((a, b) => a + b, 0);

  const chartData = poll.options.map((option, index) => ({
    name: option,
    votes: poll.votes[index],
  }));

  const pollStyles = {
    backgroundColor: poll?.theme?.backgroundColor || "#ffffff",
    color: poll?.theme?.textColor || "#000000",
    fontFamily: poll?.theme?.font || "Poppins",
  };

  const optionStyles = {
    backgroundColor: poll?.theme?.optionColor || "#4CAF50",
    color: "#ffffff",
  };

  return (
    <div
      style={pollStyles}
      className="flex flex-col items-center min-h-screen p-6 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-6">{poll.question}</h2>

      {/* 🔗 Share Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={handleCopyLink}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
        >
          Copy Link
        </button>
        <button
          onClick={() => setShowQR(!showQR)}
          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
        >
          {showQR ? "Hide QR" : "Show QR"}
        </button>
      </div>

      {/* 📱 QR Code */}
      {showQR && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-6 p-4 bg-white rounded-lg shadow-md"
        >
          <QRCodeCanvas value={pollLink} size={150} />
          <p className="mt-2 text-sm text-gray-600">Scan to vote!</p>
        </motion.div>
      )}

      {!voted && (
        <div className="w-full max-w-md">
          {poll.options.map((option, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleVote(index)}
              style={optionStyles}
              className="p-4 mb-4 rounded-lg shadow cursor-pointer hover:opacity-80 text-center"
            >
              <p className="text-lg">{option}</p>
            </motion.div>
          ))}
        </div>
      )}

      {voted && (
        <div className="w-full max-w-4xl mt-8">
          <h3 className="text-xl font-semibold mb-4">Live Results</h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} layout="vertical">
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" />
              <Tooltip />
              <Bar dataKey="votes" fill={poll?.theme?.optionColor || "#8884d8"}>
                {chartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="votes"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {chartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default PollItem;
