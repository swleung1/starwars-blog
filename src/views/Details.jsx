import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { imgUrl } from "../utils/img";

const specFields = {
  people: [
    ["Name", "name"],
    ["Birth Year", "birth_year"],
    ["Gender", "gender"],
    ["Height", "height"],
    ["Skin Color", "skin_color"],
    ["Eye Color", "eye_color"]
  ],
  planets: [
    ["Name", "name"],
    ["Climate", "climate"],
    ["Population", "population"],
    ["Orbital Period", "orbital_period"],
    ["Rotation Period", "rotation_period"],
    ["Diameter", "diameter"]
  ],
  vehicles: [
    ["Name", "name"],
    ["Model", "model"],
    ["Class", "vehicle_class"],
    ["Manufacturer", "manufacturer"],
    ["Length", "length"],
    ["Crew", "crew"],
    ["Passengers", "passengers"]
  ]
};

export default function Details() {
  const { type, id } = useParams();
  const { actions } = useContext(Context);
  const [result, setResult] = useState(null);

  useEffect(() => {
    let alive = true;
    actions.getDetails(type, id).then(r => alive && setResult(r));
    return () => { alive = false; };
  }, [type, id]);

  const props = result?.properties;
  const description = result?.description;

  return (
    <div className="container my-5">
      {!props ? (
        <div className="text-center text-muted py-5">Loading details…</div>
      ) : (
        <>
          <div className="row g-4 mb-4">
            <div className="col-md-6">
              <img
                src={imgUrl(type, id)}
                onError={(e) => (e.currentTarget.src = "https://placehold.co/800x500?text=Image")}
                alt={props.name}
                className="img-fluid rounded"
              />
            </div>
            <div className="col-md-6">
              <h1 className="display-5 fw-bold">{props.name?.toUpperCase()}</h1>
              <p className="lead">{description || "No description provided by SWAPI."}</p>
              <Link to="/" className="btn btn-outline-secondary mt-2">← Back</Link>
            </div>
          </div>

          <hr className="my-4" />

          <div className="row text-center">
            {specFields[type].map(([label, key]) => (
              <div key={key} className="col-6 col-md-4 col-lg-2 py-3">
                <div className="text-uppercase small text-danger fw-bold">{label}</div>
                <div className="fw-semibold">{props[key]}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
