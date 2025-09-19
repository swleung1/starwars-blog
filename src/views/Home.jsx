import { useContext } from "react";
import { Context } from "../store/appContext";
import ItemCard from "../components/ItemCard";

const Row = ({ title, type, items }) => (
  <section className="container my-5">
    <h2 className="mb-3" style={{ color: "#dc3545", fontWeight: 700 }}>{title}</h2>
    <div className="d-flex flex-row flex-nowrap overflow-auto gap-4 pb-3">
      {items.map((it) => (
        <ItemCard key={`${type}-${it.uid}`} type={type} item={it} />
      ))}
    </div>
  </section>
);

export default function Home() {
  const { store } = useContext(Context);
  return (
    <>
      <Row title="Characters" type="people" items={store.people} />
      <Row title="Planets"    type="planets" items={store.planets} />
      <Row title="Vehicles"   type="vehicles" items={store.vehicles} />
    </>
  );
}
