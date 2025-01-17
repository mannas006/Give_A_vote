import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSupabase } from "../contexts/SupabaseContext";
import dayjs from "dayjs";

const PollList = () => {
  const [polls, setPolls] = useState([]);
  const navigate = useNavigate();
  const { supabase } = useSupabase();

  useEffect(() => {
    const fetchPolls = async () => {
      const { data, error } = await supabase
        .from("polls")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching polls:", error.message);
      } else {
        setPolls(data);
      }
    };

    fetchPolls();
  }, [supabase]);

  const isPollActive = (createdAt, duration) => {
    const expirationDate = dayjs(createdAt).add(duration, "day");
    return dayjs().isBefore(expirationDate);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">All Polls</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl px-4">
        {polls.length === 0 ? (
          <p className="text-gray-800 dark:text-white text-center">No polls available</p>
        ) : (
          polls
            .filter((poll) => isPollActive(poll.created_at, poll.duration))
            .map((poll) => (
              <div
                key={poll.id}
                className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800 cursor-pointer hover:scale-105 transform transition"
                onClick={() => navigate(`/poll/${poll.id}`)}
              >
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{poll.question}</h3>

                {poll.file_url && (
                  <img
                    src={poll.file_url}
                    alt="Poll"
                    className="w-full h-40 object-cover rounded mt-2 mb-3"
                  />
                )}

                <div className="text-gray-600 dark:text-gray-300 mb-2">
                  {poll.options.map((option, index) => (
                    <p key={index} className="text-sm">
                      {index + 1}. {option}
                    </p>
                  ))}
                </div>

                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Active for {poll.duration} day(s)
                </p>
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default PollList;
