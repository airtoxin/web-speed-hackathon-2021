import fs from "fs";
import path from "path";
import { calculatePeaks, convertSound } from "../src/converters/convert_sound";

const main = async (target = path.join(__dirname, "../../public/sounds")) => {
  const filenames = fs.readdirSync(target);
  const outDir = `${target}_optimized`;

  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir);
  }

  for (const filename of filenames) {
    if (!filename.endsWith(".mp3")) continue;

    const filepath = path.join(target, filename);
    const fileBuffer = fs.readFileSync(filepath);

    console.log(`Process ${filename}`);
    const converted = await convertSound(fileBuffer);
    const peaks = await calculatePeaks(fileBuffer.buffer);
    await fs.writeFileSync(path.join(outDir, filename), converted);
    await fs.writeFileSync(
      `${path.join(outDir, filename)}.json`,
      JSON.stringify(peaks),
      "utf8"
    );
  }
};

main().catch(console.error);
