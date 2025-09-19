import React, { useMemo, useState } from "react";

export const Context = React.createContext(null);

const getState = ({ getStore, setStore }) => ({
  store: {
    people: [],
    vehicles: [],
    planets: [],
    favorites: JSON.parse(localStorage.getItem("favorites") || "[]"),
    details: {} 
  },
  actions: {
    loadPeople: async () => {
      const res = await fetch("https://www.swapi.tech/api/people?page=1&limit=50");
      const data = await res.json();
      setStore({ people: data.results || [] });
    },
    loadVehicles: async () => {
      const res = await fetch("https://www.swapi.tech/api/vehicles?page=1&limit=50");
      const data = await res.json();
      setStore({ vehicles: data.results || [] });
    },
    loadPlanets: async () => {
      const res = await fetch("https://www.swapi.tech/api/planets?page=1&limit=50");
      const data = await res.json();
      setStore({ planets: data.results || [] });
    },
    getDetails: async (type, id) => {
      const key = `${type}-${id}`;
      const { details } = getStore();
      if (details[key]) return details[key];

      const res = await fetch(`https://www.swapi.tech/api/${type}/${id}`);
      const data = await res.json();
      const result = data.result; // {uid, properties, description}
      setStore({ details: { ...details, [key]: result } });
      return result;
    },
    toggleFavorite: (fav) => {
      const { favorites } = getStore();
      const exists = favorites.some(f => f.type === fav.type && f.uid === fav.uid);
      const updated = exists
        ? favorites.filter(f => !(f.type === fav.type && f.uid === fav.uid))
        : [...favorites, fav];
      setStore({ favorites: updated });
      localStorage.setItem("favorites", JSON.stringify(updated));
    },
    removeFavorite: (type, uid) => {
      const { favorites } = getStore();
      const updated = favorites.filter(f => !(f.type === type && f.uid === uid));
      setStore({ favorites: updated });
      localStorage.setItem("favorites", JSON.stringify(updated));
    }
  }
});

export const AppContextProvider = ({ children }) => {
  const [state, setState] = useState(() =>
    getState({
      getStore: () => state.store,
      setStore: (updated) => setState(s => ({ store: { ...s.store, ...updated }, actions: s.actions }))
    })
  );

  const value = useMemo(() => state, [state]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
};
