import fs from "fs";
import path from "path";
import sharp from "sharp";

const main = async (target = path.join(__dirname, "../public/images")) => {
  const filenames = fs.readdirSync(target);
  for (const filename of filenames) {
    if (filename.endsWith(".optimized.jpg")) continue;

    const filepath = path.join(target, filename);
    if (fs.statSync(filepath).isDirectory()) {
      await main(filepath);
    } else {
      await sharp(fs.readFileSync(filepath))
        .jpeg({ mozjpeg: true })
        .toFile(`${filepath}.optimized.jpg`);
    }
  }
};

main().catch(console.error);
