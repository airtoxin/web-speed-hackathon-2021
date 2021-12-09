import fs from "fs";
import path from "path";
import { convertImage } from "../src/converters/convert_image";

const main = async () => {
  await Promise.all([
    compressFiles(path.join(__dirname, "../../public/images"), {
      width: 600,
      height: 600,
    }),
    compressFiles(path.join(__dirname, "../../public/images/profiles"), {
      width: 128,
      height: 128,
    }),
  ]);
};

const compressFiles = async (target, options = {}) => {
  const filenames = fs.readdirSync(target);
  const outDir = `${target}_optimized`;

  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir);
  }

  await Promise.all(
    filenames.map(async (filename) => {
      if (!filename.endsWith(".jpg")) return;

      const filepath = path.join(target, filename);

      console.log(`Process ${filename}`);
      const converted = await convertImage(fs.readFileSync(filepath), options);
      await fs.writeFileSync(path.join(outDir, filename), converted);
    })
  );
};

main().catch(console.error);
