import React from "react";
import { motion } from "framer-motion";

const Details = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen py-10 px-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-8"
      >
        Why Use Pollify? 🗳️
      </motion.h1>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        {/* 📷 Image Section */}
        {/* 📷 Enhanced Image Section */}
            <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-[400px] h-[400px] bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg shadow-2xl flex items-center justify-center overflow-hidden relative"
            >
            {/* Blurred Glow Behind Image */}
            <div className="absolute w-[420px] h-[420px] bg-blue-500 blur-3xl opacity-20 rounded-full"></div>

            {/* 📷 Image with Removed Background */}
            <motion.img
                src="https://media.istockphoto.com/id/1434527463/vector/ballot-box-for-presidential-election-in-usa.jpg?s=612x612&w=0&k=20&c=lEfadCzL62pGl-tMDWuI5bZog4VLQh1RcHMHKVG6jb8=" // Transparent background version
                alt="Polling Illustration"
                initial={{ scale: 0.95, opacity: 0.8 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="w-80 h-80 object-contain filter brightness-75 hover:brightness-100 transition duration-500"
            />
            </motion.div>


        {/* 📝 Text Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            Engage, Vote, and Influence!
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Pollify is the most dynamic and engaging polling app designed for real-time interaction.
            Whether you're gathering opinions or making group decisions, Pollify empowers users with:
          </p>

          <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
            <motion.li whileHover={{ scale: 1.05 }}>⚡ Real-time Voting with Live Results</motion.li>
            <motion.li whileHover={{ scale: 1.05 }}>🎨 Customizable Themes for Polls</motion.li>
            <motion.li whileHover={{ scale: 1.05 }}>📊 Interactive Animated Charts</motion.li>
            <motion.li whileHover={{ scale: 1.05 }}>🔒 Anonymous & Secure Voting</motion.li>
            <motion.li whileHover={{ scale: 1.05 }}>🌐 Multi-language Support</motion.li>
            <motion.li whileHover={{ scale: 1.05 }}>🏆 Trending Polls Leaderboard</motion.li>
          </ul>
        
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700"
          >
            Get Started Now 🚀
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Details;
