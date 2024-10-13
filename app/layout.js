import { NextAuthProvider } from "./sessionProvider";
import "./globals.css";

export const metadata = {
  title: "Purr-fessor: AI Cat Teaching Assistant",
  description:
    "Purr-fessor is an AI-powered teaching assistant chatbot designed to make learning both fun and engaging. With its adorable feline personality, Purr-fessor brings a playful and charming twist to education, offering academic support, study tips, and constant encouragement all with a dash of cat-inspired charisma! 🐱📚",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <NextAuthProvider>
        <body className="bg-purple-500 text-white">{children}</body>
      </NextAuthProvider>
    </html>
  );
}
