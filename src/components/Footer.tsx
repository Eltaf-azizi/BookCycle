import React from 'react';
import { BookOpen, Heart, MessageCircle, Phone, Mail, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#2D3142] text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-[#C14953]" />
              <span className="ml-2 text-xl font-semibold text-white">
                BookCycle <span className="text-[#C14953]">Pakistan</span>
              </span>
            </div>
            <p className="mt-4 text-gray-300 text-sm">
              A sustainable, community-driven platform for book lovers in Pakistan. Give books a new life and discover your next great read.
            </p>
            <div className="mt-6 flex items-center">
              <Heart className="h-5 w-5 text-[#C14953]" />
              <span className="ml-1 text-gray-300 text-sm">Made with love in Pakistan</span>
            </div>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Explore</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm">Home</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm">Browse Books</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm">How It Works</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm">Featured Books</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm">Cities</a>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Resources</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm">Help Center</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm">Safety Guidelines</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm">Community Rules</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm">Terms of Service</a>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Contact Us</h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-[#C14953] mr-2" />
                <a href="mailto:info@bookcycle.pk" className="text-gray-300 hover:text-white text-sm">info@bookcycle.pk</a>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-[#C14953] mr-2" />
                <a href="tel:+923001234567" className="text-gray-300 hover:text-white text-sm">+92 300 123 4567</a>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-[#C14953] mr-2 mt-1" />
                <span className="text-gray-300 text-sm">Lahore, Karachi, Islamabad, and all major cities across Pakistan</span>
              </li>
            </ul>
            <div className="mt-6">
              <button className="bg-[#C14953] hover:bg-[#a73f48] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                Send Message
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col items-center">
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-gray-400 hover:text-white">
              <span className="sr-only">Facebook</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.
                797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <span className="sr-only">Instagram</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465.665.25 1.286.6 1.88 1.194.585.585.93 1.206 1.194
                 1.87.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.99 4.99 0 01-1.194
                  1.91 5.08 5.08 0 01-1.89 1.194c-.636.247-1.363.416-2.427.465-1.06.048-1.37.06-4.123.06a69.79 69.79 0 01-.73 0c-2.563 0-2.896-.012-3.96-
                  .06-1.064-.049-1.791-.218-2.427-.465a5.08 5.08 0 01-1.89-1.194 5.08 5.08 0 01-1.194-1.89c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.
                  06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.99 4.99 0 011.194-1.89A5.08 5.08 0 015.477 3.14c.636-.247 1.363-.416 2.427-
                  .465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-
                  .566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466
                  .399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-
                  .344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-
                  .207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135
                   5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
            </a>
            </div>
          <p className="mt-6 text-sm text-gray-400">
            &copy; {new Date().getFullYear()} BookCycle Pakistan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;