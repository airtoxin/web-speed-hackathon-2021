import { promises as fs } from "fs";
import path from "path";

import Router from "express-promise-router";
import httpErrors from "http-errors";
import { v4 as uuidv4 } from "uuid";

import { convertSound } from "../../converters/convert_sound";
import { UPLOAD_PATH } from "../../paths";
import { extractMetadataFromSound } from "../../utils/extract_metadata_from_sound";

const router = Router();

router.post("/sounds", async (req, res) => {
  if (req.session.userId === undefined) {
    throw new httpErrors.Unauthorized();
  }
  if (Buffer.isBuffer(req.body) === false) {
    throw new httpErrors.BadRequest();
  }

  const soundId = uuidv4();

  const { artist, title } = await extractMetadataFromSound(req.body);

  const converted = await convertSound(req.body);

  const filePath = path.resolve(
    UPLOAD_PATH,
    `./sounds/${soundId}.mp3.optimized.mp3`
  );
  await fs.writeFile(filePath, converted);

  return res
    .status(200)
    .type("application/json")
    .send({ artist, id: soundId, title });
});

export { router as soundRouter };
