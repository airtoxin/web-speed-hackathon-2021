import fs from "fs";
import path from "path";
import { convertImage } from "../src/converters/convert_image";

const main = async () => {
  await Promise.all([
    compressFiles(path.join(__dirname, "../../public/images")),
    compressFiles(path.join(__dirname, "../../public/images/profiles"), {
      width: 128,
      height: 128,
    }),
  ]);
};

const compressFiles = async (target, options = {}) => {
  const filenames = fs.readdirSync(target);
  await Promise.all(
    filenames.map(async (filename) => {
      if (!filename.endsWith(".jpg")) return;
      if (filename.endsWith(".optimized.jpg")) return;

      const filepath = path.join(target, filename);

      console.log(`Process ${filename}`);
      const converted = await convertImage(fs.readFileSync(filepath), options);
      await fs.writeFileSync(`${filepath}.optimized.jpg`, converted);
    })
  );
};

main().catch(console.error);
