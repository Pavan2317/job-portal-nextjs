import './globals.css';

export const metadata = {
  title: 'Job Portal - Find Your Dream Job',
  description: 'Explore thousands of job opportunities',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}