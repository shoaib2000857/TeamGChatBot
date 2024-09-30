import React from "react";
import Link from "next/link";
import Image from "next/image";

const teamMembers = [
  {
    name: "Ashutosh Gaurav",
    tittle: "Devloper",
    linkedin: "https://www.linkedin.com/in/ashutosh-li",
    github: "https://www.github.com/as-ga",
    image: "https://github.com/as-ga.png",
  },
  {
    name: "SHOAIB SALEHMOHAMED",
    tittle: "Devloper",
    linkedin: "https://www.linkedin.com/in/shoaib-sadiq-salehmohamed-a77812318",
    github: "https://github.com/shoaib2000857",
    image: "https://github.com/shoaib2000857.png",
  },
  {
    name: "Marmik Gajbhiye",
    tittle: "Devloper",
    linkedin: "https://www.linkedin.com/in/marmik-gajbhiye-0b811a312",
    github: "https://github.com/Marmikgaj",
    image: "https://github.com/Marmikgaj.png",
  },
  {
    name: "Tejas Vijaya",
    tittle: "Devloper",
    linkedin: "https://www.linkedin.com/in/tejas-vijaya74",
    github: "https://github.com/TejasVijaya74",
    image: "https://github.com/TejasVijaya74.png",
  },
];

export default function page() {
  return (
    <div className="w-full min-h-screen">
      <h1 className="text-3xl font-bold text-center mt-8">Our Team Membears</h1>
      <div className="flex flex-wrap justify-center items-center">
        {teamMembers.map((member) => (
          <div
            key={member.name}
            className="w-full max-w-sm m-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <div className="flex flex-col items-center py-5">
              <Image
                className="w-24 h-24 mb-3 rounded-full shadow-lg"
                src={member.image ? member.image : "/demo.png"}
                width={500}
                height={500}
                alt={member.name}
              />
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                {member.name}
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {member.tittle}
              </span>
              <div className="flex mt-4 md:mt-6">
                {member.github && (
                  <Link
                    target="blank"
                    href={member.github}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    GitHub
                  </Link>
                )}
                {member.linkedin && (
                  <Link
                    target="_blank"
                    href={`${member.linkedin}?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app`}
                    className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    LinkedIn
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
