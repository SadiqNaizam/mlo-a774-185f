import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const ThemedFooter: React.FC = () => {
  console.log('ThemedFooter loaded');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-sky-100 border-t border-sky-300 text-blue-800 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <Sparkles className="h-7 w-7 text-blue-500" />
            <span className="text-xl font-semibold" style={{ fontFamily: "'Comic Sans MS', 'Chalkboard SE', cursive" }}>
              Doraemon Delights
            </span>
          </div>

          <nav className="flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-3 text-sm font-medium">
            <Link to="/about-doraemon-world" className="hover:text-yellow-500 transition-colors">
              About Our Doraemon World
            </Link>
            <Link to="/contact-us" className="hover:text-yellow-500 transition-colors">
              Contact Us
            </Link>
            <Link to="/terms-and-conditions" className="hover:text-yellow-500 transition-colors">
              Terms & Conditions
            </Link>
          </nav>

          <div className="text-center md:text-right text-sm">
            <p>&copy; {currentYear} Doraemon Delights.</p>
            <p>All rights reserved. Designed with fun!</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ThemedFooter;