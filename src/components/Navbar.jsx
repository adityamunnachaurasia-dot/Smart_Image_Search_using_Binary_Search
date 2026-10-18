import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  // Handle scroll-to-section clicks
  const handleSectionClick = (e, sectionId) => {
    e.preventDefault();
    close();

    if (pathname !== '/') {
      // Navigate home first, then scroll
      navigate('/');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100); // small delay to allow the Home page to render
    } else {
      // Already on home, just scroll
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="logo" onClick={close}>Smart Image Search</Link>

        <button
          className="nav-toggle"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >☰</button>

        <nav className={open ? 'open' : ''}>
          <Link
            className={pathname === '/' ? 'active' : ''}
            to="/"
            onClick={close}
          >Home</Link>

          <a href="#explore" onClick={(e) => handleSectionClick(e, 'explore')}>
            Explore
          </a>

          <a href="#categories" onClick={(e) => handleSectionClick(e, 'categories')}>
            Categories
          </a>

          <Link
            className={pathname === '/about' ? 'active' : ''}
            to="/about"
            onClick={close}
          >How It Works</Link>

          <a
            href="#search-anchor"
            className="nav-cta"
            onClick={(e) => handleSectionClick(e, 'search-anchor')}
          >
            Start Searching
          </a>
        </nav>
      </div>
    </header>
  );
}