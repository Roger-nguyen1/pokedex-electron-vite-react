import styles from "../styles/Home.module.css";
import Pokemon from "./Pokemon";
import Loader from "./Loader";
import { useState, useEffect } from "react";

function Home() {
  interface Pokemon {
    id: number;
    name: string;
    sprites: {
      front_default: string;
    };
    types: {
      slot: number;
      type: {
        name: string;
      };
    }[];
  }
  const [listPokemons, setListPokemons] = useState<Pokemon[]>([]);
  const [premierPokemon, setPremierPokemon] = useState<number>(1);
  const [compteurId, setCompteurId] = useState<number>(15);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //Fonction pour fetch les pokemons
  const getPokemons = async () => {
    setIsLoading(true);
    try {
      let pokemonArray: Pokemon[] = [];
      for (let i = premierPokemon; i <= compteurId; i++) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        if (!response.ok) {
          throw new Error(
            `Error fetching pokemon ${i}: ${response.statusText}`
          );
        }
        const data = await response.json();
        pokemonArray.push(data);
      }

      setListPokemons(listPokemons.concat(pokemonArray));
      setPremierPokemon(premierPokemon + 15);
      setCompteurId(compteurId + 15);
    } catch (error) {
      console.error(error);
      // Handle the error here, e.g. show an error message to the user
    } finally {
      setIsLoading(false);
    }
  };

  //Fonction pour reset la liste des Pokemons
  const resetPokemons = () => {
    setListPokemons([]);
    setPremierPokemon(1);
    setCompteurId(15);
  };

  useEffect(() => {
    if (premierPokemon === 1) {
      getPokemons();
    }
  }, [premierPokemon]);

  const toutLesPokemons = listPokemons.map((data, i) => {
    let nameMaj = data.name.charAt(0).toUpperCase() + data.name.slice(1);
    return (
      <Pokemon
        key={i}
        type={data.types[0].type.name}
        name={nameMaj}
        png={data.sprites.front_default}
      />
    );
  });

  return (
    <div>
      <main className={styles.main}>
        <h1 className={styles.titre}>Pokedex with Electron + React</h1>
        <div className={styles.pokemonContainer}>
          {/* Insérer ici les pokemon */}
          {toutLesPokemons}
        </div>
        {isLoading && <Loader />}
        <button className={styles.next} onClick={() => getPokemons()}>
          Next
        </button>

        <button className={styles.next} onClick={() => resetPokemons()}>
          Reset
        </button>
      </main>
    </div>
  );
}

export default Home;
