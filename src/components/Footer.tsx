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