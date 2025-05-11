import { Outlet } from "react-router-dom";

interface AuthLayoutProps {
  showLoginButton?: boolean;
}

export default function AuthLayout({ 
}: AuthLayoutProps) {
  return (
    <>
      <div className="md:hidden">
        <img
          src="/images/apartment-bg.jpg"
          width={1280}
          height={843}
          alt="TinggalSewa mobile"
          className="object-cover h-screen w-full"
        />
      </div>
      <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-indigo-950">
            <img 
              src="/images/apartment-bg.jpg" 
              alt="Apartment interior" 
              className="h-full w-full object-cover opacity-30 mix-blend-overlay"
            />
          </div>
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            TinggalSewa
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Berhenti membayar sewa untuk tempat yang bukan milikmu. 
                Dengan TinggalSewa, temukan hunian nyaman dengan lokasi strategis, 
                fasilitas lengkap, dan harga terjangkau sesuai kebutuhanmu.&rdquo;
              </p>
              <footer className="text-sm">TinggalSewa Tim</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <Outlet />
            <p className="px-8 text-center text-sm text-muted-foreground">
              &copy; 2025 TinggalSewa. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
} 