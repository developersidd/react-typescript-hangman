import { useCallback, useEffect, useState } from 'react';
import HangmanDrawing from './components/HangmanDrawing';
import HangmanWord from './components/HangmanWord';
import Keyboard from './components/Keyboard';
import words from './wordList.json';
function App() {

  const getWord = () => {
    return words[Math.floor(Math.random() * words.length)];
  }

  const [wordToGuess, setWordToGuess] = useState(getWord);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  // correct and incorrect letters
  const incorrectGuesses = guessedLetters.filter(letter => !wordToGuess.includes(letter));
  const correctGuesses = guessedLetters.filter(letter => wordToGuess.includes(letter))

  // win or lose statement
  const isWinner = wordToGuess.split("").every(letter => guessedLetters.includes(letter));
  const isLoser = incorrectGuesses.length >= 6;


  // add user guess letters
  const addGuessedLetter = useCallback((letter: string) => {
    if (guessedLetters.includes(letter)) return;
    setGuessedLetters(currentLetters => [...currentLetters, letter]);
  }, [guessedLetters]);


  // if user loss then press Enter key to generate a new word to play the game again
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      e.preventDefault();
      const key = e.key;
      if (key !== "Enter") return;
      setGuessedLetters([]);
      setWordToGuess(getWord());
    };

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    }
  }, []);


  // get user keypressed letter and update the guessed letters array
  /* 
    // the reason why we have set guessedLetters state as a dependency? 
     jodi amra empty dependency rakhtam tahole useEffect First tie run hoito then addGuessedLetters function er moddhe default state initialized hoye gese jaita empty [] arki. but jokhon user kono keypress kore tokhon state update hoy then re-render hoy then addGuessedLetter fc ta akta new reference create kore jaita arki useEffect state update hower pore abr call na hoyay oi new reference wala addGuessedLetter function ta ke pay nah jer fole ager default empty [] dhara initialized state pai jaita akta problem create kore: taholo incorrect letter guessedLetters state ea thaker porwo abr add kore empty [] dhara ber ber check koray.  
  */
  useEffect(() => {
    if (isWinner || isLoser) return;
    const handler = (e: KeyboardEvent) => {
      e.preventDefault();

      const key = e.key;
      if (!key.match(/^[a-z]$/)) return;
      addGuessedLetter(key)
    };

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    }
  }, [guessedLetters, isLoser, isWinner]);

  return (
    <div style={{
      maxWidth: "800px",
      display: "flex",
      flexDirection: "column",
      gap: "4rem",
      margin: "0 auto",
      alignItems: "center",
    }}>
      <div style={{ fontSize: "2rem", textAlign: "center" }}>
        {isWinner && "Winner! - Refresh to try again 😊"}
        {isLoser && "Nice Try! - Refresh to try again 😃"}
      </div>
      <HangmanDrawing numberOfGuesses={incorrectGuesses.length} />
      <HangmanWord wordToGuess={wordToGuess} reveal={isLoser} guessedLetters={guessedLetters} />
      <div style={{ alignSelf: "stretch", marginBottom: "3rem" }}>

        <Keyboard
          disabled={isWinner || isLoser}
          activeLetters={correctGuesses}
          inactiveLetters={incorrectGuesses}
          addGuessedLetter={addGuessedLetter}
        />
      </div>
    </div>
  )
}

export default App
