import { useState } from "react";
import "./App.css";

function App() {
  const [num, setNum] = useState("");
  const [res, setRes] = useState("");

  const handleChange = (e) => {
    setNum(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  const handleClick = () => {
    setRes("");

    if (num === "") {
      setRes("Error: Please enter a positive integer");
      return;
    }
    let tmp = Number(num);
    if (Number.isInteger(tmp) && tmp >= 0) {
      fetch(`http://localhost:8080/labseq/${num}`)
        .then((response) => {
          if (!response.ok) {
            setRes("Error: Network response was not ok");
            throw new Error(
              "Network response was not ok " + response.statusText,
            );
          }
          return response.text();
        })
        .then((data) => {
          setRes(splitInThree(data));
        })
        .catch((error) => {
          setRes("Error: Couldn't connect to API");
          console.error(
            "There has been a problem with your fetch operation:",
            error,
          );
        });
    } else {
      setRes("Error: Please enter a positive integer");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <h1>Labseq number generator</h1>

        <input
          type="text"
          value={num}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
        <button style={{ marginLeft: "1vw" }} onClick={() => handleClick()}>
          OK
        </button>
        <h2>Result: {res}</h2>
      </div>
    </div>
  );
}

function splitInThree(number) {
  let numberStr = number.toString();

  let reversedNumberStr = numberStr.split("").reverse().join("");

  let chunks = [];
  for (let i = 0; i < reversedNumberStr.length; i += 3) {
    chunks.push(reversedNumberStr.substring(i, i + 3));
  }

  let result = chunks.join(" ").split("").reverse().join("");

  return result;
}

export default App;
