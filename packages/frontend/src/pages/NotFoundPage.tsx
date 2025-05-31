import { Link } from 'react-router-dom';
import { Code, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md w-full text-center">
        <Code className="h-16 w-16 text-primary-600 mx-auto" />
        <h1 className="mt-6 text-4xl font-bold text-gray-900">404</h1>
        <p className="mt-2 text-lg text-gray-600">Page not found</p>
        <p className="mt-4 text-gray-500">The page you are looking for doesn't exist or has been moved.</p>
        <div className="mt-6">
          <Link to="/" className="btn btn-primary inline-flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
}