import fs from "fs";
import path from "path";
import { calculatePeaks, convertSound } from "../src/converters/convert_sound";

const main = async (target = path.join(__dirname, "../../public/sounds")) => {
  const filenames = fs.readdirSync(target);
  for (const filename of filenames) {
    if (!filename.endsWith(".mp3")) continue;
    if (filename.endsWith(".optimized.mp3")) continue;

    const filepath = path.join(target, filename);
    const fileBuffer = fs.readFileSync(filepath);

    console.log(`Process ${filename}`);
    const converted = await convertSound(fileBuffer);
    const peaks = await calculatePeaks(fileBuffer.buffer);
    await fs.writeFileSync(`${filepath}.optimized.mp3`, converted);
    await fs.writeFileSync(
      `${filepath}.optimized.json`,
      JSON.stringify(peaks),
      "utf8"
    );
  }
};

main().catch(console.error);
