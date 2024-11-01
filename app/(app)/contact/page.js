import React from 'react';

const Contact = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-purple-800 p-4">
      <div className="w-full max-w-2xl bg-purple-900 rounded-lg shadow-md p-6 flex flex-col space-y-4">
        <h1 className="text-3xl font-semibold text-center text-white">Contact Us</h1>
        <p className="text-white text-justify">
          We would love to hear from you! If you have any questions, feedback, or suggestions, please feel free to reach out to us.
        </p>
        <form className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-purple-800 text-white placeholder-purple-400"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-purple-800 text-white placeholder-purple-400"
          />
          <textarea
            placeholder="Your Message"
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-purple-800 text-white placeholder-purple-400"
            rows="4"
          ></textarea>
          <button
            type="submit"
            className="p-2.5 bg-green-500 text-white rounded-lg hover:bg-green-700"
          >
            Send Message
          </button>
        </form>
        <div className="text-white mt-8">
          <h2 className="text-2xl font-semibold">Contact Details</h2>
          <p>
            <strong>Email:</strong> 24f2000857@ds.study.iitm.ac.in
          </p>
          <p>
            <strong>Phone:</strong> +91 9502264416
          </p>
          <p>
            <strong>Address:</strong> Online BS degree, IIT Madras
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;