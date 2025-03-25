import "./globals.css";
import Header from "@/components/Header";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="container mx-auto px-4 lg:px-20">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
