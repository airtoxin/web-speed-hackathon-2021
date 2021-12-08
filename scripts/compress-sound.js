import fs from "fs";
import path from "path";
import {
  calculatePeaks,
  convertSound,
} from "../server/src/converters/convert_sound";

const main = async (target = path.join(__dirname, "../public/sounds")) => {
  const filenames = fs.readdirSync(target);
  for (const filename of filenames) {
    if (filename.endsWith(".optimized.mp3")) continue;

    const filepath = path.join(target, filename);
    if (fs.statSync(filepath).isDirectory()) {
      await main(filepath);
    } else {
      const fileBuffer = fs.readFileSync(filepath);
      const converted = await convertSound(fs.readFileSync(filepath));
      const peaks = await calculatePeaks(fileBuffer.buffer);
      await fs.writeFileSync(`${filepath}.optimized.mp3`, converted);
      await fs.writeFileSync(
        `${filepath}.optimized.mp3.json`,
        JSON.stringify(peaks),
        "utf8"
      );
    }
  }
};

main().catch(console.error);
