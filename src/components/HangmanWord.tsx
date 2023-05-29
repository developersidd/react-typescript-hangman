import styles from "./HangmanWord.module.css";
type HangmanWordProps = {
  wordToGuess: string,
  guessedLetters: string[],
  reveal: boolean
}
const HangmanWord = ({ guessedLetters, reveal = false, wordToGuess }: HangmanWordProps) => {
  return (
    <div style={
      {
        display: "flex",
        alignItems: "center",
        textTransform: "uppercase",
        fontFamily: "monospace",
        fontWeight: "bold",
        gap: "2rem",
        fontSize: "6rem"
      }
      
    }
    className={styles.container}
    >

      {wordToGuess.split("").map((letter, ind) => {
        return (
          <span key={ind} style={{ borderBottom: ".4rem solid #000000" }}>
            <span style={{ visibility: guessedLetters.includes(letter) || reveal ? "visible" : "hidden", color: !guessedLetters.includes(letter) && reveal ? "red" : "black" }}>
              {letter}
            </span>
          </span>
        )
      })}

    </div>
  )
}

export default HangmanWord