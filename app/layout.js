import './globals.css'

export const metadata = {
  title: 'Job Portal',
  description: 'Find your dream job now',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 antialiased">{children}</body>
    </html>
  )
}
