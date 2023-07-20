import { createApi } from "unsplash-js";
import { Canvas, loadImage } from "canvas-constructor/cairo";
import fs from "fs";
import "dotenv/config";
import fetchText from "./text.js";
import twitter from "./twitter.js";
// import T from "./twitter.js";
import path from "path";

const config = path.resolve("some.jpeg");
// console.log(config)

const api = createApi({
  accessKey: process.env.IMAGE_API,
});

const getPhoto = async () => {
  const result = await api.photos.getRandom({
    count: 1,
    orientation: "landscape",
    collectionIds: [430077],
  });
  const myimg = await loadImage(result.response[0].urls.regular);
  // console.log(result.response[0])
  const text = await fetchText();

  return new Canvas(1920, 1080)
    .printImage(myimg, 0, 0, 1920, 1080)
    .setColor("#FFFFFF")
    .setTextFont("60px Poppins")
    .setTextAlign("center")
    .setShadowBlur(5)
    .printText(text, 1920 / 2, 1080 / 2)
    .toBuffer("image/jpg")

};

// fs.writeFile(config, await getPhoto(), "base64", function (err) {});

// const base64data = fs.readFileSync(config, { encoding: "base64" });
const data = await getPhoto();

// const base64data = new Buffer.from(data, "base64").toString("base64");
const media = await twitter.v1.uploadMedia(data, { mimeType: 'jpeg'});
const mediaId = media.media_id_string;
console.log(mediaId)

const m = await twitter.v2.tweet("Hello, this is a tweet with an image!", {
  media_ids: mediaId,
});
console.log(m);

console.log("done");
