import React from 'react';

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-purple-800 p-4">
      <div className="w-full max-w-2xl bg-purple-900 rounded-lg shadow-md p-6 flex flex-col space-y-4">
        <h1 className="text-3xl font-semibold text-center text-white">About Us</h1>
        <p className="text-white text-justify">
          Welcome to our AI Cat Teaching Assistant application! Our mission is to provide an engaging and interactive learning experience with the help of our AI-powered assistant, Purr-fessor.
        </p>
        <h2 className="text-2xl font-semibold text-center text-white mt-4">Theme Catchline</h2>
        <p className="text-white text-center italic">
          &quot;Where curiosity meets education - one paw at a time!&quot;
        </p>
        <h2 className="text-2xl font-semibold text-center text-white mt-4">Key Features</h2>
        <ul className="list-disc list-inside text-white">
          <li><strong>Meow-tivational Messages:</strong> Sends encouraging messages to keep students inspired.</li>
          <li><strong>Whisker-smart Answers:</strong> Provides clear, concise explanations to academic questions.</li>
          <li><strong>Purr-sonal Study Plans:</strong> Helps create customized study schedules based on individual needs.</li>
          <li><strong>Tail-ored Resources:</strong> Recommends relevant learning materials and resources.</li>
          <li><strong>Feline Feedback:</strong> Offers constructive feedback on assignments with a playful twist.</li>
        </ul>
        <h2 className="text-2xl font-semibold text-center text-white mt-4">Chatbot Personality Traits</h2>
        <ul className="list-disc list-inside text-white">
          <li>Curious and inquisitive</li>
          <li>Patient and supportive</li>
          <li>Playful and witty</li>
          <li>Knowledgeable but approachable</li>
        </ul>
        <h2 className="text-2xl font-semibold text-center text-white mt-4">Cat-themed Elements</h2>
        <ul className="list-disc list-inside text-white">
          <li><strong>User greeting:</strong> &quot;Meow there! Ready to pounce on some knowledge?&quot;</li>
          <li><strong>Loading message:</strong> &quot;Just grooming my thoughts, give me a moment...&quot;</li>
          <li><strong>Error message:</strong> &quot;Uh-oh, I think I got distracted by a laser pointer. Let&apos;s try again!&quot;</li>
          <li><strong>Successful task completion:</strong> &quot;Purr-fect! You&apos;ve mastered this concept!&quot;</li>
        </ul>
        <p className="text-white text-justify mt-4">
          Our team is dedicated to creating innovative solutions that make learning fun and accessible for everyone. We believe in the power of technology to transform education and are committed to continuous improvement and innovation.
        </p>
        <p className="text-white text-justify">
          Thank you for visiting our application. We hope you enjoy using it as much as we enjoyed creating it!
        </p>
      </div>
    </div>
  );
};

export default About;