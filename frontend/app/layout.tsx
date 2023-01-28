import "../styles/globals.css";
import Header from "./Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <title>Typing Game</title>
      </head>

      <body className="bg-slate-800">
        <Header />
        {children}
      </body>
    </html>
  );
}
