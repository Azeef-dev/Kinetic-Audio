import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Shop from './Shop';
import { Headphones, ShoppingBag } from 'lucide-react';

export default function App() {
  return (
    <Router>
      {/* Glassmorphism Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-10 py-5 bg-black/30 backdrop-blur-md border-b border-white/10">
        <Link to="/" className="flex items-center gap-2 text-2xl font-extrabold tracking-wider">
          <Headphones className="text-blue-500 w-8 h-8" />
          AURA<span className="text-blue-500">.</span>
        </Link>

        <div className="flex gap-8 items-center font-medium text-sm">
          <Link to="/" className="hover:text-blue-400 transition-colors">3D Experience</Link>
          <Link to="/shop" className="hover:text-blue-400 transition-colors">Shop & Gallery</Link>
          <Link to="/shop" className="bg-blue-600 p-2 rounded-full hover:bg-blue-500 transition-colors">
            <ShoppingBag className="w-5 h-5" />
          </Link>
        </div>
      </nav>

      {/* Pages Routing */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
      </Routes>
    </Router>
  );
}