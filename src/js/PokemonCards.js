const PokemonCards = ({ id, image, name, type, weight }) => {
  const backgroundStyle = type + " pokemon-cards";
  return (
    <div className={backgroundStyle} name={name} >
      <div className="pokem-id">
        <p className="id-text">#{id}</p>
      </div>
      <img src={image} alt={name} />
      <div className="pokemon-name">
        <h3>{name}</h3>
        <p>Type: {type}</p>
      </div>
    </div>
  );
};

export default PokemonCards;
