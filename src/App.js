import React, { useEffect, useState } from "react";
import PokemonCards from "./js/PokemonCards";

function App() {
  const [selectPokemons, setselectPokemons] = useState([]);
  const [selectLoad, setselectLoad] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=20"
  );

  const showPokemon = async () => {
    const feth = await fetch(selectLoad);
    const further = await feth.json();

    setselectLoad(further.next);

    function createPokemon(result) {
      result.forEach(async (elem) => {
        const feth = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${elem.name}`
        );
        const loadMore = await feth.json();
        setselectPokemons((pokemonList) => [...pokemonList, loadMore]);
        await selectPokemons.sort((a, b) => a.id * b.id);
      });
    }
    createPokemon(further.results);
  };

  useEffect(() => {
    showPokemon();
  }, []);

  function sortID() {
    const copy = Object.assign([], selectPokemons);
    copy.sort((a, b) => a.id - b.id);
    setselectPokemons(copy);
  }

  function sortName() {
    const copy = Object.assign([], selectPokemons);
    copy.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    setselectPokemons(copy);
  }

  function hideContent(num) {
    const copy = Object.assign([], selectPokemons);
    copy.splice(num, copy.length);
    setselectPokemons(copy);
  }

  const [searchName, setsearchName] = useState("");

  function showSearchName() {
    const fillteredName = selectPokemons.filter((names) => {
      return names.name.toLowerCase().includes(searchName.toLowerCase());
    });
    setselectPokemons(fillteredName);
    if (searchName === "") {
      showPokemon();
    }
  }

  function showAside() {
    const aside = document.getElementById("aside");
    const hide = document.querySelector(".hide-aside");
    hide.style.display = "none";
    aside.style.left = 0;
    aside.firstElementChild.addEventListener("click", () => {
      hide.style.display = "";
      aside.style.left = "-250px";
    });
  }

  return (
    <>
      <div className="panel">
        <div className="input">
          <input
            type="text"
            placeholder="Name"
            onChange={(event) => setsearchName(event.target.value)}
            onKeyUp={() => showSearchName()}
          />
        </div>
        <button onClick={() => showPokemon()}>Загрузить</button>
        <button onClick={() => sortID()}>Сортировать по id</button>
        <button onClick={() => sortName()}>Сортировать по имени</button>
        <div className="btn-block">
          <button className="btn" onClick={() => hideContent(10)}>
            10
          </button>
          <button className="btn" onClick={() => hideContent(20)}>
            20
          </button>
          <button className="btn" onClick={() => hideContent(50)}>
            50
          </button>
        </div>
      </div>
      <div className="hide-aside" onClick={() => showAside()}>
        &#10148;
      </div>
      <aside id="aside">
        <a>&#10006;</a>
        <input
          type="text"
          placeholder="Name"
          onChange={(event) => setsearchName(event.target.value)}
          onKeyUp={() => showSearchName()}
        />
        <button onClick={() => showPokemon()}>Загрузить</button>
        <button onClick={() => sortID()}>Сортировать по id</button>
        <button onClick={() => sortName()}>Сортировать по имени</button>
        <button className="btn" onClick={() => hideContent(10)}>
          10
        </button>
        <button className="btn" onClick={() => hideContent(20)}>
          20
        </button>
        <button className="btn" onClick={() => hideContent(50)}>
          50
        </button>
      </aside>
      <div className="wrapper">
        <div>
          {selectPokemons.map((pokemonStats, index) => (
            <PokemonCards
              key={index}
              id={pokemonStats.id}
              image={pokemonStats.sprites.other.dream_world.front_default}
              name={pokemonStats.name}
              type={pokemonStats.types[0].type.name}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
