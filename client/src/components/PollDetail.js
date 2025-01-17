import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSupabase } from "../contexts/SupabaseContext";
import { useAuth } from "../contexts/AuthContext";

const PollDetail = () => {
  const { id } = useParams();
  const [poll, setPoll] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const { supabase } = useSupabase();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPoll = async () => {
      const { data, error } = await supabase
        .from("polls")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching poll:", error.message);
      } else {
        setPoll(data);
      }
    };

    fetchPoll();
  }, [id, supabase]);

  const handleVote = async () => {
    if (!selectedOption) return;

    // Update the vote count in the database
    const updatedVotes = [...poll.votes];
    updatedVotes[selectedOption] += 1;

    const { error } = await supabase
      .from("polls")
      .update({ votes: updatedVotes })
      .eq("id", id);

    if (error) {
      console.error("Error updating vote:", error.message);
    } else {
      alert("Vote recorded!");
      setPoll((prevPoll) => ({ ...prevPoll, votes: updatedVotes }));
    }
  };

  if (!poll) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">{poll.question}</h2>

      {poll.file_url && (
        <img src={poll.file_url} alt="Poll" className="w-full h-64 object-cover rounded mb-4" />
      )}

      <div className="w-full max-w-md">
        {poll.options.map((option, index) => (
          <div key={index} className="mb-4">
            <input
              type="radio"
              id={`option${index}`}
              name="pollOption"
              value={index}
              onChange={() => setSelectedOption(index)}
              className="mr-2"
            />
            <label htmlFor={`option${index}`} className="text-gray-800 dark:text-white">
              {option}
            </label>
          </div>
        ))}

        <button
          onClick={handleVote}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
        >
          Vote
        </button>
      </div>

      <button
        onClick={() => navigate("/")}
        className="mt-4 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
      >
        Back to Polls
      </button>
    </div>
  );
};

export default PollDetail;
