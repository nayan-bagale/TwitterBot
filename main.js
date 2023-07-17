import { createApi } from "unsplash-js";
import { Canvas, loadImage } from "canvas-constructor/cairo";
import axios from "axios";
import fs from "fs";
import "dotenv/config";

const api = createApi({
  accessKey: process.env.IMAGE_API,
});

const getPhoto = async () => {
  const result = await api.photos.getRandom({
    count: 1,
    orientation: "landscape",
    color: 'black'
  });
  const myimg = await loadImage(result.response[0].urls.regular);
  //   console.log(result.response[0])

  const response = await axios.get(process.env.QUOTES_API, {
    headers: {
      "X-Api-Key": "+nj5ldZjhkp3R7g+6u83pw==iZomN6Qpw4xanX4h",
    },
  });
  // console.log(response.data[0].joke);

  const text = response.data[0].joke;
  return new Canvas(1920, 1080)
    .printImage(myimg, 0, 0, 1920, 1080)
    .setColor("#FFFFFF")
    .setTextFont("60px Poppins")
    .setTextAlign("center")
    .setShadowBlur(5)
    .printText(text, 1920 / 2, 1080 / 2)
    .pngAsync();
};


fs.writeFile("./Img/some.png", await getPhoto(), "binary", function (err) {});
// getPhoto();
console.log("done");
