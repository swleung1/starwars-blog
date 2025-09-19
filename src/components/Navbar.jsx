import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../store/appContext";

export default function Navbar() {
  const { store, actions } = useContext(Context);
  const count = store.favorites.length;

  return (
    <nav className="navbar navbar-light bg-white sticky-top shadow-sm">
      <div className="container">
        <Link to="/" className="navbar-brand fw-bold">
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Star_Wars_Logo.svg"
               alt="Star Wars" height="28" />
        </Link>

        <div className="btn-group">
          <button className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown">
            Favorites <span className="badge bg-light text-dark ms-1">{count}</span>
          </button>
          <ul className="dropdown-menu dropdown-menu-end">
            {count === 0 && <li className="dropdown-item text-muted">Empty</li>}
            {store.favorites.map((f) => (
              <li key={`${f.type}-${f.uid}`} className="dropdown-item d-flex align-items-center">
                <span className="me-auto">{f.name}</span>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => actions.removeFavorite(f.type, f.uid)}
                  title="Remove"
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
