import { ffmpeg } from "../ffmpeg";

/**
 * 先頭 5 秒のみ、正方形にくり抜かれた無音動画を作成します
 * @param {Buffer} buffer
 * @returns {Promise<Uint8Array>}
 */
async function convertMovie(buffer) {
  const cropOptions = [
    "'min(iw,ih)':'min(iw,ih)'",
    `scale=108:108`,
  ]
    .filter(Boolean)
    .join(",");

  const exportFile = `export.gif`;

  if (ffmpeg.isLoaded() === false) {
    await ffmpeg.load();
  }

  ffmpeg.FS("writeFile", "file", new Uint8Array(buffer));

  await ffmpeg.run(
    ...[
      "-i",
      "file",
      "-t",
      "5",
      "-r",
      "1",
      "-vf",
      `crop=${cropOptions}`,
      "-an",
      exportFile,
    ]
  );

  return ffmpeg.FS("readFile", exportFile);
}

export { convertMovie };
