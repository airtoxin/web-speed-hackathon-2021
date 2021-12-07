import fs from "fs";
import path from "path";
import { convertSound } from "../server/src/converters/convert_sound";

const main = async (target = path.join(__dirname, "../public/sounds")) => {
  const filenames = fs.readdirSync(target);
  for (const filename of filenames) {
    if (filename.endsWith(".optimized.mp3")) continue;

    const filepath = path.join(target, filename);
    if (fs.statSync(filepath).isDirectory()) {
      await main(filepath);
    } else {
      const converted = await convertSound(fs.readFileSync(filepath));
      await fs.writeFileSync(`${filepath}.optimized.mp3`, converted);
    }
  }
};

main().catch(console.error);
