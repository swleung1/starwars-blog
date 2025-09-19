export const imgUrl = (type, id) => {
  const dir = type === "people" ? "characters" : type; 
  return `https://starwars-visualguide.com/assets/img/${dir}/${id}.jpg`;
};
