import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-orange-500 mb-2">
            Flight<span className="text-white">Finder</span>
          </h2>
          <p className="text-sm text-gray-400">
            Book smart. Fly easy. Explore the world with us.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-gray-200">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <a href="/" className="hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="/login" className="hover:text-white">
                Login
              </a>
            </li>
            <li>
              <a href="/register" className="hover:text-white">
                Register
              </a>
            </li>
            <li>
              <a href="#search" className="hover:text-white">
                Search Flights
              </a>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-gray-200">Support</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <a href="#" className="hover:text-white">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-gray-200">
            Connect with us
          </h3>
          <div className="flex space-x-4 text-xl mt-2">
            <a
              href="https://github.com/veera5423"
              target="_blank"
              rel="noreferrer"
              className="hover:text-orange-500"
            >
              <i className="fab fa-github"></i>
            </a>
            <a
              href="https://linkedin.com/in/veeranjaneyulu-v"
              target="_blank"
              rel="noreferrer"
              className="hover:text-orange-500"
            >
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center text-sm text-gray-500 mt-10 border-t pt-6 border-gray-700">
        © {new Date().getFullYear()} FlightFinder.All Rights are Reserved
      </div>
    </footer>
  );
};

export default Footer;
