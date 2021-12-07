import fs from "fs";
import path from "path";
import { convertImage } from "../server/src/converters/convert_image";

const main = async (target = path.join(__dirname, "../public/images")) => {
  const filenames = fs.readdirSync(target);
  for (const filename of filenames) {
    if (filename.endsWith(".optimized.jpg")) continue;

    const filepath = path.join(target, filename);
    if (fs.statSync(filepath).isDirectory()) {
      await main(filepath);
    } else {
      const converted = await convertImage(fs.readFileSync(filepath), {});
      await fs.writeFileSync(`${filepath}.optimized.jpg`, converted);
    }
  }
};

main().catch(console.error);
