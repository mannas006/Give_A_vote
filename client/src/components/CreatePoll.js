import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSupabase } from "../contexts/SupabaseContext";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../contexts/AuthContext";

const CreatePoll = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [file, setFile] = useState(null);
  const [duration, setDuration] = useState(1); // Poll duration in days
  const [uploading, setUploading] = useState(false);

  // New Theme States
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#000000");
  const [optionColor, setOptionColor] = useState("#4CAF50");
  const [font, setFont] = useState("Poppins");

  const navigate = useNavigate();
  const { supabase } = useSupabase();
  const { currentUser } = useAuth();

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const addOptionField = () => {
    setOptions([...options, ""]);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (options.some((opt) => opt.trim() === "")) {
      alert("Please fill in all options.");
      return;
    }

    setUploading(true);

    let fileURL = "";

    try {
      // Upload image if provided
      if (file) {
        const filePath = `polls/${uuidv4()}-${file.name}`;
        const { data, error } = await supabase.storage
          .from("polls")
          .upload(filePath, file);

        if (error) throw error;

        const { data: publicUrlData } = supabase.storage
          .from("polls")
          .getPublicUrl(filePath);

        fileURL = publicUrlData.publicUrl;
      }

      // Prepare theme object
      const theme = {
        backgroundColor,
        textColor,
        optionColor,
        font,
      };

      // Insert Poll Data with Theme
      const { error: insertError } = await supabase.from("polls").insert([
        {
          question,
          options,
          file_url: fileURL,
          user_id: currentUser.id,
          created_at: new Date(),
          votes: Array(options.length).fill(0),
          duration, // Poll duration
          theme,    // Custom theme
        },
      ]);

      if (insertError) throw insertError;

      alert("Poll created successfully! 🎉");
      navigate("/polls");
    } catch (error) {
      console.error("Error creating poll:", error.message);
      alert("Error creating poll. Please try again.");
    }

    setUploading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="p-8 bg-white rounded shadow-md dark:bg-gray-800 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
          Create a New Poll
        </h2>

        <input
          type="text"
          placeholder="Poll Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
          className="w-full p-2 mb-4 border rounded dark:bg-gray-700 dark:text-white"
        />

        {options.map((option, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Option ${index + 1}`}
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            required
            className="w-full p-2 mb-2 border rounded dark:bg-gray-700 dark:text-white"
          />
        ))}

        <button
          type="button"
          onClick={addOptionField}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded mb-4"
        >
          Add Option
        </button>

        <input
          type="file"
          onChange={handleFileChange}
          className="w-full mb-4 text-gray-800 dark:text-white"
        />

        <input
          type="number"
          placeholder="Poll Duration (in days)"
          value={duration}
          min="1"
          onChange={(e) => setDuration(parseInt(e.target.value))}
          required
          className="w-full p-2 mb-4 border rounded dark:bg-gray-700 dark:text-white"
        />

        {/* 🎨 Theme Customization */}
        <h3 className="font-semibold mb-2 text-gray-800 dark:text-white">
          Customize Poll Theme
        </h3>

        <label className="text-sm text-gray-700 dark:text-gray-300">
          Background Color:
        </label>
        <input
          type="color"
          value={backgroundColor}
          onChange={(e) => setBackgroundColor(e.target.value)}
          className="w-full mb-4"
        />

        <label className="text-sm text-gray-700 dark:text-gray-300">
          Text Color:
        </label>
        <input
          type="color"
          value={textColor}
          onChange={(e) => setTextColor(e.target.value)}
          className="w-full mb-4"
        />

        <label className="text-sm text-gray-700 dark:text-gray-300">
          Option Button Color:
        </label>
        <input
          type="color"
          value={optionColor}
          onChange={(e) => setOptionColor(e.target.value)}
          className="w-full mb-4"
        />

        <label className="text-sm text-gray-700 dark:text-gray-300">
          Font Style:
        </label>
        <select
          value={font}
          onChange={(e) => setFont(e.target.value)}
          className="w-full p-2 mb-4 border rounded dark:bg-gray-700 dark:text-white"
        >
          <option value="Poppins">Poppins</option>
          <option value="Roboto">Roboto</option>
          <option value="Open Sans">Open Sans</option>
          <option value="Lobster">Lobster</option>
        </select>

        <button
          type="submit"
          disabled={uploading}
          className={`w-full ${uploading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"} text-white py-2 rounded`}
        >
          {uploading ? "Creating..." : "Create Poll"}
        </button>
      </form>
    </div>
  );
};

export default CreatePoll;
