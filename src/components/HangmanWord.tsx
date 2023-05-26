const word = "test";
const guessedLetters = ["t", "e", "s", "g"];
const HangmanWord = () => {
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
    }>

      {word.split("").map((letter, ind) => {
        return (
          <span key={ind} style={{ borderBottom: ".4rem solid #000000" }}>
            <span style={{ visibility: guessedLetters.includes(letter) ? "visible" : "hidden" }}>
              {letter}
            </span>
          </span>
        )
      })}

    </div >
  )
}

export default HangmanWord