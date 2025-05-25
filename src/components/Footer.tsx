
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Fresh Teacher's Library
            </h3>
            <p className="text-muted-foreground text-sm">
              Your comprehensive resource hub for Uganda curriculum materials from Nursery to Senior Six.
            </p>
          </div>
          
          <div>
            <h4 className="text-md font-semibold text-foreground mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link to="/" className="block text-sm text-muted-foreground hover:text-orange-600 transition-colors">
                Home
              </Link>
              <Link to="/about" className="block text-sm text-muted-foreground hover:text-orange-600 transition-colors">
                About Us
              </Link>
              <Link to="/disclaimer" className="block text-sm text-muted-foreground hover:text-orange-600 transition-colors">
                Disclaimer
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="text-md font-semibold text-foreground mb-4">Legal</h4>
            <div className="space-y-2">
              <Link to="/terms" className="block text-sm text-muted-foreground hover:text-orange-600 transition-colors">
                Terms of Service
              </Link>
              <Link to="/privacy" className="block text-sm text-muted-foreground hover:text-orange-600 transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Fresh Teacher's Library. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
