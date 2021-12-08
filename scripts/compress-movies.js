import fs from "fs";
import path from "path";
import { convertMovie } from "../server/src/converters/convert_movie";

const main = async (target = path.join(__dirname, "../public/movies")) => {
  const filenames = fs.readdirSync(target);
  for (const filename of filenames) {
    if (!filename.endsWith(".gif")) continue;
    if (filename.endsWith(".optimized.gif")) continue;

    const filepath = path.join(target, filename);

    console.log(`Process ${filename}`);
    const converted = await convertMovie(fs.readFileSync(filepath));
    await fs.writeFileSync(`${filepath}.optimized.gif`, converted);
  }
};

main().catch(console.error);
