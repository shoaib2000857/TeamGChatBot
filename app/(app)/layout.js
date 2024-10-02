import Header from "@/components/header";

export default function RootLayout({ children }) {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow">{children}</div>
    </main>
  );
}