import "./globals.css";

export const metadata = {
  title: "Gemini AI ChatBot",
  description: "Google GEN AI Exchange Hackathon IITM BS Team G",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-purple-500 text-white">{children}</body>
    </html>
  );
}
