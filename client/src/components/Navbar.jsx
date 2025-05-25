// import { useState } from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { logoutUser } from '../features/auth/authSlice';
// import { Menu, X, User } from 'lucide-react';
// import clsx from 'clsx';

// function Navbar() {
//   const { user } = useSelector(state => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [profileOpen, setProfileOpen] = useState(false);

//   const handleLogout = () => {
//     dispatch(logoutUser());
//     navigate('/login');
//   };

//   const navItems = [
//     { to: '/', label: 'Dashboard' },
//     ...(user?.role === 'admin' ? [{ to: '/users', label: 'Users' }] : []),
//   ];

//   return (
//     <>
//       <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg fixed w-full z-20">
//         <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             {/* Logo */}
//             <NavLink to="/" className="text-2xl font-bold tracking-wider">
//               SmartTask
//             </NavLink>

//             {/* Desktop Links */}
//             <div className="hidden md:flex items-center space-x-6">
//               {navItems.map((item) => (
//                 <NavLink
//                   key={item.to}
//                   to={item.to}
//                   className={({ isActive }) =>
//                     clsx(
//                       'px-3 py-2 rounded-md text-sm font-medium transition',
//                       isActive
//                         ? 'bg-white bg-opacity-20'
//                         : 'hover:bg-white hover:bg-opacity-10'
//                     )
//                   }
//                 >
//                   {item.label}
//                 </NavLink>
//               ))}

//               {user ? (
//                 <div className="relative">
//                   <button
//                     onClick={() => setProfileOpen((o) => !o)}
//                     className="flex items-center space-x-2 hover:bg-white hover:bg-opacity-10 p-2 rounded-full transition"
//                   >
//                     <User className="w-6 h-6" />
//                     <span className="text-sm">{user.name.split(' ')[0]}</span>
//                   </button>

//                   {profileOpen && (
//                     <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden">
//                       <NavLink
//                         to="/profile"
//                         onClick={() => setProfileOpen(false)}
//                         className="block px-4 py-2 hover:bg-gray-100"
//                       >
//                         My Profile
//                       </NavLink>
//                       <button
//                         onClick={handleLogout}
//                         className="w-full text-left px-4 py-2 hover:bg-gray-100"
//                       >
//                         Logout
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <>
//                   <NavLink
//                     to="/login"
//                     className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white hover:bg-opacity-10 transition"
//                   >
//                     Login
//                   </NavLink>
//                   <NavLink
//                     to="/register"
//                     className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white hover:bg-opacity-10 transition"
//                   >
//                     Register
//                   </NavLink>
//                 </>
//               )}
//             </div>

//             {/* Mobile Hamburger */}
//             <button
//               onClick={() => setMenuOpen((o) => !o)}
//               className="md:hidden p-2 rounded-md hover:bg-white hover:bg-opacity-20 transition"
//             >
//               {menuOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* Mobile Menu */}
//       {menuOpen && (
//         <div className="md:hidden fixed inset-y-0 left-0 w-64 bg-white shadow-lg p-6 space-y-6 z-10">
//           {navItems.map((item) => (
//             <NavLink
//               key={item.to}
//               to={item.to}
//               onClick={() => setMenuOpen(false)}
//               className="block text-lg font-medium text-gray-800 hover:text-blue-600 transition"
//             >
//               {item.label}
//             </NavLink>
//           ))}

//           {user ? (
//             <>
//               <NavLink
//                 to="/profile"
//                 onClick={() => setMenuOpen(false)}
//                 className="block text-lg font-medium text-gray-800 hover:text-blue-600 transition"
//               >
//                 Profile
//               </NavLink>
//               <button
//                 onClick={() => {
//                   handleLogout();
//                   setMenuOpen(false);
//                 }}
//                 className="w-full text-left text-lg font-medium text-red-600 hover:text-red-800 transition"
//               >
//                 Logout
//               </button>
//             </>
//           ) : (
//             <>
//               <NavLink
//                 to="/login"
//                 onClick={() => setMenuOpen(false)}
//                 className="block text-lg font-medium text-gray-800 hover:text-blue-600 transition"
//               >
//                 Login
//               </NavLink>
//               <NavLink
//                 to="/register"
//                 onClick={() => setMenuOpen(false)}
//                 className="block text-lg font-medium text-gray-800 hover:text-blue-600 transition"
//               >
//                 Register
//               </NavLink>
//             </>
//           )}
//         </div>
//       )}
//     </>
//   );
// }

// export default Navbar;



import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../features/auth/authSlice';
import { Menu, X, User } from 'lucide-react';
import clsx from 'clsx';

function Navbar() {
  const { user, token } = useSelector(state => state.auth); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  const navItems = [
    { to: '/', label: 'Dashboard' },
    ...(user?.role === 'admin' ? [{ to: '/users', label: 'Users' }] : []),
  ];

  return (
    <>
      <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg fixed w-full z-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <NavLink to="/" className="text-2xl font-bold tracking-wider">
              SmartTask
            </NavLink>

            <div className="hidden md:flex items-center space-x-6">
              {token && navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    clsx(
                      'px-3 py-2 rounded-md text-sm font-medium transition',
                      isActive
                        ? 'bg-white bg-opacity-20'
                        : 'hover:bg-white hover:bg-opacity-10'
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}

              {token ? (
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen((o) => !o)}
                    className="flex items-center space-x-2 hover:bg-white hover:bg-opacity-10 p-2 rounded-full transition"
                  >
                    <User className="w-6 h-6" />
                    <span className="text-sm">{user?.name?.split(' ')[0]}</span>
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden">
                      <NavLink
                        to="/profile"
                        onClick={() => setProfileOpen(false)}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        My Profile
                      </NavLink>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white hover:bg-opacity-10 transition"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white hover:bg-opacity-10 transition"
                  >
                    Register
                  </NavLink>
                </>
              )}
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="md:hidden p-2 rounded-md hover:bg-white hover:bg-opacity-20 transition"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden fixed inset-y-0 left-0 w-64 bg-white shadow-lg p-6 space-y-6 z-10">
          {token && navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setMenuOpen(false)}
              className="block text-lg font-medium text-gray-800 hover:text-blue-600 transition"
            >
              {item.label}
            </NavLink>
          ))}

          {token ? (
            <>
              <NavLink
                to="/profile"
                onClick={() => setMenuOpen(false)}
                className="block text-lg font-medium text-gray-800 hover:text-blue-600 transition"
              >
                Profile
              </NavLink>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="w-full text-left text-lg font-medium text-red-600 hover:text-red-800 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="block text-lg font-medium text-gray-800 hover:text-blue-600 transition"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="block text-lg font-medium text-gray-800 hover:text-blue-600 transition"
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default Navbar;





