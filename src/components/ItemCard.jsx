import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { imgUrl } from "../utils/img";

export default function ItemCard({ type, item }) {
  const { store, actions } = useContext(Context);
  const [props, setProps] = useState(null);
  const id = item.uid;

  useEffect(() => {
    let alive = true;
    actions.getDetails(type, id).then(r => alive && setProps(r?.properties || null));
    return () => { alive = false; };
  }, [type, id]);

  const isFav = store.favorites.some(f => f.type === type && f.uid === id);

  const threeLines = () => {
    if (!props) return (
      <>
        <span className="text-muted">Loading…</span><br/>
        <span className="text-muted">Loading…</span><br/>
        <span className="text-muted">Loading…</span>
      </>
    );
    if (type === "people") {
      return (
        <>
          <div>Gender: {props.gender}</div>
          <div>Hair Color: {props.hair_color}</div>
          <div>Eye-Color: {props.eye_color}</div>
        </>
      );
    }
    if (type === "planets") {
      return (
        <>
          <div>Population: {props.population}</div>
          <div>Terrain: {props.terrain}</div>
          <div>Climate: {props.climate}</div>
        </>
      );
    }
    // vehicles
    return (
      <>
        <div>Model: {props.model}</div>
        <div>Manufacturer: {props.manufacturer}</div>
        <div>Passengers: {props.passengers}</div>
      </>
    );
  };

  return (
    <div className="card shadow-sm" style={{ minWidth: 320 }}>
      <img
        src={imgUrl(type, id)}
        onError={(e) => (e.currentTarget.src = "https://placehold.co/400x200?text=400+x+200")}
        alt={item.name}
        style={{ height: 200, objectFit: "cover" }}
        className="card-img-top"
      />
      <div className="card-body">
        <h5 className="card-title">{item.name}</h5>
        <div className="small text-secondary mb-3" style={{ lineHeight: 1.6 }}>
          {threeLines()}
        </div>

        <div className="d-flex gap-2">
          <Link to={`/details/${type}/${id}`} className="btn btn-outline-primary">
            Learn more!
          </Link>
          <button
            className={`btn ${isFav ? "btn-warning" : "btn-outline-warning"}`}
            onClick={() => actions.toggleFavorite({ type, uid: id, name: item.name })}
            title={isFav ? "Remove from favorites" : "Add to favorites"}
          >
            <i className={isFav ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
          </button>
        </div>
      </div>
    </div>
  );
}
