import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Loader } from '@react-three/drei';
import { Headphones, ShoppingBag, Menu, X } from 'lucide-react';
import Home from './Home';
import Shop from './Shop';
import ProductView from './ProductView';
import Technology from './Technology';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function NavItem({ to, onClick, children }) {
  const { pathname } = useLocation();
  const active = pathname === to;
  return (
    <Link to={to} onClick={onClick} className={`transition-colors ${active ? 'text-blue-400' : 'hover:text-blue-400'}`}>
      {children}
    </Link>
  );
}

export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <Router>
      <ScrollToTop />

      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-10 py-5 bg-black/30 backdrop-blur-md border-b border-white/10">
        <Link to="/" className="flex items-center gap-2 text-2xl font-extrabold tracking-wider" onClick={() => setOpen(false)}>
          <Headphones className="text-blue-500 w-8 h-8" />
          AURA<span className="text-blue-500">.</span>
        </Link>

        <div className="hidden md:flex gap-8 items-center font-medium text-sm">
          <NavItem to="/">3D Experience</NavItem>
          <NavItem to="/technology">Technology</NavItem>
          <NavItem to="/shop">Shop</NavItem>
          <Link to="/shop" className="bg-blue-600 p-2 rounded-full hover:bg-blue-500 transition-colors">
            <ShoppingBag className="w-5 h-5" />
          </Link>
        </div>

        <button type="button" className="md:hidden" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {open && (
          <div className="absolute top-full left-0 w-full bg-black/90 backdrop-blur-md border-b border-white/10 flex flex-col items-center gap-6 py-8 md:hidden">
            <NavItem to="/" onClick={() => setOpen(false)}>3D Experience</NavItem>
            <NavItem to="/technology" onClick={() => setOpen(false)}>Technology</NavItem>
            <NavItem to="/shop" onClick={() => setOpen(false)}>Shop</NavItem>
          </div>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:colorKey" element={<ProductView />} />
        <Route path="/product" element={<ProductView />} />
        <Route path="/technology" element={<Technology />} />
      </Routes>

      <Loader
        containerStyles={{ background: '#0a0a0a' }}
        innerStyles={{ background: '#1e293b', width: '160px' }}
        barStyles={{ background: '#3b82f6' }}
        dataStyles={{ color: '#fff', fontSize: '12px', marginTop: '0.5rem' }}
      />
    </Router>
  );
}