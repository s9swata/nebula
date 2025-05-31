import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Code } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Code className="h-6 w-6 text-primary-600" />
            <span className="ml-2 text-lg font-semibold text-gray-900">CodeDuel</span>
            <span className="ml-2 text-gray-500 text-sm">© 2025 All rights reserved</span>
          </div>
          <div className="flex space-x-6">
            <Link to="/terms" className="text-gray-500 hover:text-gray-900">
              Terms
            </Link>
            <Link to="/privacy" className="text-gray-500 hover:text-gray-900">
              Privacy
            </Link>
            <Link to="/faq" className="text-gray-500 hover:text-gray-900">
              FAQ
            </Link>
            <a href="#" className="text-gray-500 hover:text-gray-900">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900">
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}