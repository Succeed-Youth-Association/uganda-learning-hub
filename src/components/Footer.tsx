// src/components/Footer.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="bg-card border-t mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Fresh Teacher's Library
            </h3>
            <p className="text-muted-foreground text-sm">
              Your comprehensive resource hub for Uganda curriculum materials.
            </p>
          </div>
          
          <div>
            <h4 className="text-md font-semibold text-foreground mb-4">Quick Links</h4>
            <div className="space-y-2">

              <Link 
                to="/about" 
                onClick={scrollToTop}
                className="block text-sm text-muted-foreground hover:text-orange-600 transition-colors"
              >
                About Us
              </Link>
              <Link 
                to="/disclaimer" 
                onClick={scrollToTop}
                className="block text-sm text-muted-foreground hover:text-orange-600 transition-colors"
              >
                Disclaimer
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="text-md font-semibold text-foreground mb-4">Legal</h4>
            <div className="space-y-2">
              <Link 
                to="/terms" 
                onClick={scrollToTop}
                className="block text-sm text-muted-foreground hover:text-orange-600 transition-colors"
              >
                Terms of Service
              </Link>
              <Link 
                to="/privacy" 
                onClick={scrollToTop}
                className="block text-sm text-muted-foreground hover:text-orange-600 transition-colors"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Fresh Teacher's Technologies <br /> 
            Made with <span className="inline-block animate-pulse-heart">❤️</span> by Fresh Teacher
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;