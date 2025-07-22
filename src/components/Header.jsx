// // import { FaSearch } from 'react-icons/fa';
// // import { Link, useNavigate } from 'react-router-dom';
// // import { useSelector } from 'react-redux';
// // import { useEffect, useState } from 'react';


// // export default function Header() {
// //   const { currentUser } = useSelector((state) => state.user);
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const navigate = useNavigate();
// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     const urlParams = new URLSearchParams(window.location.search);
// //     urlParams.set('searchTerm', searchTerm);
// //     const searchQuery = urlParams.toString();
// //     navigate(`/search?${searchQuery}`);
// //   };

// //   useEffect(() => {
// //     const urlParams = new URLSearchParams(location.search);
// //     const searchTermFromUrl = urlParams.get('searchTerm');
// //     if (searchTermFromUrl) {
// //       setSearchTerm(searchTermFromUrl);
// //     }
// //   }, [location.search]);
// //   return (
// //     <>
// //     <nav >
// //     <div className="bg-white px-8 py-1 shadow-lg ring-1 ring-gray-200">
// //       <div className="flex items-center justify-between">
// //         <a className="flex items-center" href="/">
// //           <img src="https://i.ibb.co/jGMgp7r/seamless-ui.png" className="w-16" alt="Header Logo" />
// //           <span className="block text-lg font-semibold"><Link to={"/"}>Hideout</Link></span>
// //         </a>
// //         <div>
// //           <div className="hidden md:flex">
// //             {/* <h2 className="m-4 cursor-pointer font-normal text-gray-600 hover:text-gray-900"><Link to={"/"}>Home</Link></h2> */}
// //             <h2 className="m-4 cursor-pointer font-normal text-gray-600 hover:text-gray-900"><Link to={"/"}>Home</Link></h2>
// //             <h2 className="m-4 cursor-pointer font-normal text-gray-600 hover:text-gray-900"><Link to={"/places"}>Popular Places</Link></h2>
// //             <h2 className="m-4 cursor-pointer font-normal text-gray-600 hover:text-gray-900"><Link to={"/share"}>Share</Link></h2>
// //             <h2 className="m-4 cursor-pointer font-normal text-gray-600 hover:text-gray-900"><Link to={"/shared"}>Shared Places</Link></h2>
// //             <h2 className="m-4 cursor-pointer font-normal text-gray-600 hover:text-gray-900"><Link to={"/about"}>About</Link></h2>
// //             <h2 className="m-4 cursor-pointer font-normal text-gray-600 hover:text-gray-900"><Link to={"/pool"}>Pool</Link></h2>
// //             <Link to='/profile'>
// //              {currentUser ? (
// //               <img
// //                 className='rounded-full h-6 w-7 object-cover mt-4'
// //                 src={currentUser.avatar}
// //                 alt='profile'
// //               />
// //             ) : (
// //               <li className=' m-4 cursor-pointer font-normal text-gray-600 hover:text-gray-900'>Get started</li>
// //             )}
// //           </Link>
// //             {/* <button className="mt-2 h-11 rounded-full bg-primary px-7 font-semibold text-black"><Link to={"/"}>Get Started</Link></button> */}
// //             {/* <img src="https://i.ibb.co/2FbV2vm/Ellipse.png" alt="profile picture" className="mr-3 h-10 w-10 rounded-full" /> */}
// //           </div>
// //           {/* <button className="rounded-md border border-blue-600 p-3 text-blue-600 transition-all hover:border-blue-600 hover:bg-blue-600 hover:text-white disabled:bg-gray-600 md:hidden">
// //             <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
// //           </button> */}
// //         </div>
// //       </div>
// //     </div>
// //   </nav>
// //   </>
// //   );
// // }
// import { FaSearch } from 'react-icons/fa';
// import { Link, useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { useEffect, useState } from 'react';
// import { motion } from 'framer-motion'; // Import framer-motion

// export default function Header() {
//   const { currentUser } = useSelector((state) => state.user);
//   const [searchTerm, setSearchTerm] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const urlParams = new URLSearchParams(window.location.search);
//     urlParams.set('searchTerm', searchTerm);
//     const searchQuery = urlParams.toString();
//     navigate(`/search?${searchQuery}`);
//   };

//   useEffect(() => {
//     const urlParams = new URLSearchParams(location.search);
//     const searchTermFromUrl = urlParams.get('searchTerm');
//     if (searchTermFromUrl) {
//       setSearchTerm(searchTermFromUrl);
//     }
//   }, [location.search]);

//   return (
//     <>
//       <nav>
//         <div className="flex items-center justify-between px-8 py-4">
//           <a className="flex items-center justify-between" href="/">
//             <img src="https://i.ibb.co/jGMgp7r/ seamless-ui.png" className="w-16" alt="Header Logo" />
//             <span className="ml-2 text-2xl font-bold text-gray-700"><Link to={"/"}>Hideout</Link></span>
//           </a>

//           <div className="hidden md:flex space-x-8 text-lg font-medium text-gray-700">
//             <Link to="/" className="hover:text-primary">Home</Link>

//             {/* "What We Offer" Dropdown */}
//             <div className="relative group">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 className="flex items-center space-x-2 hover:text-primary transition duration-300"
//               >
//                 <span>What We Offer</span>
//                 <svg
//                   className="w-4 h-4 transform transition-transform"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
//                 </svg>
//               </motion.button>

//               {/* Dropdown menu */}
//               <motion.div
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -20 }}
//                 transition={{ duration: 0.3 }}
//                 className="absolute left-0 mt-2 w-48 py-2 bg-white shadow-lg rounded-lg text-gray-800 opacity-0 group-hover:opacity-100"
//               >
//                 <Link to="/dashboard" className="block px-4 py-2 hover:bg-gray-100 transition">Service 1</Link>
//                 {/* <Link to="/services/service2" className="block px-4 py-2 hover:bg-gray-100 transition">Service 2</Link>
//                 <Link to="/landing" className="block px-4 py-2 hover:bg-gray-100 transition">Service 3</Link> */}
//               </motion.div>
//             </div>
//             <Link to="/landing" className="hover:text-primary">TripPlanner</Link>
//             <Link to="/share" className="hover:text-primary">Share</Link>
//           </div>

//           <div className="flex items-center space-x-4">
//             {/* Profile or Sign In */}
//             <Link to="/profile">
//               {currentUser ? (
//                 <img
//                   className="rounded-full h-10 w-10 object-cover"
//                   src={currentUser.avatar}
//                   alt="Profile"
//                 />
//               ) : (
//                 <button className="px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition duration-300">Sign In</button>
//               )}
//             </Link>

//             {/* Search Form (Optional) */}
//             <form onSubmit={handleSubmit} className="relative">
//               <input
//                 type="text"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 placeholder="Search"
//                 className="px-4 py-2 border rounded-lg text-gray-700 focus:outline-none transition duration-300"
//               />
//               <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
//                 <FaSearch />
//               </button>
//             </form>
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// }
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Search, Menu, X, ChevronDown } from 'lucide-react';

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const menuItems = [
    { name: 'About', path: '/' },
    { name: 'Popular Places', path: '/places' },
    { name: 'Shared Places', path: '/shared' },
    { name: 'Share', path: '/share' },
    { name: 'Trip Planner', path: '/landing' },
    {name:'Pool',path:'/pool'},
    { name: 'ExpenseTracker', path: '/expensetracker' },    // { name: 'About', path: '/about' }
  ];

  

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.img
              whileHover={{ scale: 1.05 }}
              src="https://firebasestorage.googleapis.com/v0/b/hideout-500bd.appspot.com/o/HideOut%20(3).png?alt=media&token=afd7980b-cb02-4d5e-b4d6-a7edb4ae0e66"
              className="w-11 h-10"
              alt="Hideout Logo"
            />
            <motion.span 
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              Hideout
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <motion.div
                key={item.path}
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <Link
                  to={item.path}
                  className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200"
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}

            {/* Dropdown
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 font-medium"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span>Dashboard</span>
                <ChevronDown className="w-4 h-4" />
              </motion.button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
                  >
                    {dropdownItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div> */}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            {/* <form onSubmit={handleSubmit} className="hidden md:flex items-center">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search places..."
                  className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500 transition-colors duration-200"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </form> */}

            {/* Profile/Sign In */}
            <Link to="/profile">
              {currentUser ? (
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-blue-500"
                  src={currentUser.avatar}
                  alt="Profile"
                />
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition-colors duration-200"
                >
                  Sign In
                </motion.button>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-600" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="px-4 py-2 space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="block px-3 py-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {/* Mobile Search */}
              <form onSubmit={handleSubmit} className="pt-2">
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search places..."
                    className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Header;