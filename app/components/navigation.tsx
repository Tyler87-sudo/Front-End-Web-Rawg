'use client'; // Ensure the component is rendered on the client side

import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Hook to get the current pathname
import { useState } from 'react';


export default function Header() {

  const pathname = usePathname(); // Get the current pathname

  // Define the navigation links
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/cv', label: 'CV' },
    { href: '/projects', label: 'Projecten & Modules' },
    { href: '/about', label: 'Over Mij'}
  ];

  // Inline styles for active link
  const activeLinkStyle = {
    transition: "0.5s ease",
    color: 'black', // Active link color
    fontWeight: '800',
  };

  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen); // Toggle between true (open) and false (closed)
    console.log(isOpen);
    console.log("Test function")
  };


  // Default link style
  const linkStyle = {
    transition: "0.5s ease",
    color: 'black', // Default link color
    fontWeight: "500", 
    textDecoration: 'none',
  };

  return (
    <div
      style={{
        zIndex: "1",
        backgroundColor: 'lightyellow',
        fontFamily: 'Montserrat',
        fontWeight: '500',
        borderBottomRightRadius: '25px',
        borderBottomLeftRadius: '25px',
      }}
      className="glass navbar bg-base-100"
    >

      {/* Desktop version */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                style={pathname === href ? activeLinkStyle : linkStyle}
              >
                {label}
              </Link>
            </li>
          ))}

    
        </ul>
      </div>
      
    </div>
  );
}