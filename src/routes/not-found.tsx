import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
      <p className="mb-6">Sorry, the page you are looking for doesn't exist.</p>
      <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Go to Home
      </Link>
    </div>
  );
} 