import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="site-header">
      <div className="container">
        <Link className="brand" to="/" aria-label="Tetrionyx home">
          Tetrionyx
        </Link>
      </div>
    </header>
  );
}

export default Header;

