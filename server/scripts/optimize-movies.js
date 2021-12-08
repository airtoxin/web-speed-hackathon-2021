import fs from "fs";
import path from "path";
import { convertMovie } from "../src/converters/convert_movie";

const main = async (target = path.join(__dirname, "../../public/movies")) => {
  const filenames = fs.readdirSync(target);
  const outDir = `${target}_optimized`;

  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir);
  }

  for (const filename of filenames) {
    if (!filename.endsWith(".gif")) continue;

    const filepath = path.join(target, filename);

    console.log(`Process ${filename}`);
    const converted = await convertMovie(fs.readFileSync(filepath));
    await fs.writeFileSync(path.join(outDir, filename), converted);
  }
};

main().catch(console.error);
