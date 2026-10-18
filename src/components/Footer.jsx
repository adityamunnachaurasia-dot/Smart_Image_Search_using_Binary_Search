import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Link to="/" className="logo">IMAGE//SEARCH</Link>
          <p>
            An image discovery project powered by binary search. Explore a curated collection
            of images with an intelligent, self-hosted search experience.
          </p>
        </div>

        <div className="footer-col">
          <h4>Navigate</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><a href="/#explore">Explore</a></li>
            <li><a href="/#categories">Categories</a></li>
            <li><Link to="/about">How It Works</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Project</h4>
          <ul>
            <li><Link to="/about">Algorithm</Link></li>
            <li><a href="/#search-anchor">Search</a></li>
            <li><a href="/#explore">Gallery</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} IMAGE//SEARCH<span className="dot">·</span>All rights reserved</span>
        <span>Built with React · Express · MySQL</span>
      </div>
    </footer>
  );
}