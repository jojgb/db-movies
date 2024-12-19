const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-black text-white py-4 border-t border-gray-700">
      <div className="flex flex-col md:flex-row justify-between items-center px-4">
        <div className="text-sm mb-2 md:mb-0">
          &copy; {new Date().getFullYear()} Moovie Time. All rights reserved.
        </div>
        <ul className="flex space-x-4 text-sm">
          <li>
            <a href="/privacy-policy" className="hover:text-gray-400">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="/terms-of-service" className="hover:text-gray-400">
              Terms of Service
            </a>
          </li>
          <li>
            <a href="/about" className="hover:text-gray-400">
              About Us
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
