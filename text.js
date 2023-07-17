import "dotenv/config";
import axios from "axios";

const fetchText = async () => {
  const response = await axios.get(
    "https://api.api-ninjas.com/v1/dadjokes?limit=1",
    {
      headers: {
        "X-Api-Key": process.env.QUOTES_API,
      },
    }
  );

  const Text = response.data[0].joke;
  let count = 0;
  let newText = "";
  for (let c of Text) {
    if (count >= 60 && c === " ") {
      newText += "\n";
      count = 0;
    }
    newText += c;
    count++;
  }

  console.log(newText);
  
  return newText;
};

export default fetchText;
