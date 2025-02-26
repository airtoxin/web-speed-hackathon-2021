import { promises as fs } from "fs";
import path from "path";

import Router from "express-promise-router";
import httpErrors from "http-errors";
import { v4 as uuidv4 } from "uuid";

import { convertMovie } from "../../converters/convert_movie";
import { UPLOAD_PATH } from "../../paths";

// 変換した動画の拡張子
const EXTENSION = "gif";

const router = Router();

router.post("/movies", async (req, res) => {
  if (req.session.userId === undefined) {
    throw new httpErrors.Unauthorized();
  }
  if (Buffer.isBuffer(req.body) === false) {
    throw new httpErrors.BadRequest();
  }

  const movieId = uuidv4();

  const converted = await convertMovie(req.body);

  const filePath = path.resolve(
    UPLOAD_PATH,
    `./movies_optimized/${movieId}.gif.optimized.gif`
  );
  await fs.writeFile(filePath, converted);

  return res.status(200).type("application/json").send({ id: movieId });
});

export { router as movieRouter };
