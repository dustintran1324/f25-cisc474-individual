import './styles/tailwind.css'
import { RootLayout } from '../components/RootLayout/RootLayout';

export const metadata = {
  title: 'Learning Management System ',
  description: "CISC474 Class project",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full bg-white text-base antialiased">
      <body className="flex min-h-full flex-col">
        <RootLayout>{children}</RootLayout>
      </body>
    </html>
  )
}