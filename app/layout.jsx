'use client';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        {/* Global Navigation Bar visible everywhere */}
        <header className="bg-white border-b border-gray-200 py-3 px-8 flex justify-between items-center shadow-sm">
          <div className="flex items-center gap-8">
            <a href="/" className="text-xl font-bold text-blue-600">JobPortal</a>
            <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
              <a href="/" className="hover:text-blue-600">Home</a>
              <a href="/dashboard/candidate" className="hover:text-blue-600">Dashboard</a>
              <a href="/products" className="hover:text-blue-600">Products</a>
              <a href="/companies" className="hover:text-blue-600">Companies</a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <a href="/login" className="text-sm font-medium text-blue-600 hover:underline">Login</a>
            <a href="/register" className="text-sm font-medium bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">Register</a>
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}