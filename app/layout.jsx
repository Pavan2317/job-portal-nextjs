import './globals.css';

export const metadata = {
  title: 'Job Portal',
  description: 'Find your dream job or hire top talent',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}
