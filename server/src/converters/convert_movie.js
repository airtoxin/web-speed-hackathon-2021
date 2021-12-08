import { ffmpeg } from "../ffmpeg";

const FRAME_RATE = 5;

/**
 * 先頭 5 秒のみ、正方形にくり抜かれた無音動画を作成します
 * @param {Buffer} buffer
 * @returns {Promise<Uint8Array>}
 */
async function convertMovie(buffer) {
  const exportFile = `export.webm`;

  if (ffmpeg.isLoaded() === false) {
    await ffmpeg.load();
  }

  ffmpeg.FS("writeFile", "file", new Uint8Array(buffer));

  await ffmpeg.run(
    ...[
      "-i",
      "file",
      "-c:v",
      "libvpx-vp9",
      "-cpu-used",
      "5",
      "-crf",
      "51",
      "-t",
      "5",
      "-vf",
      "crop='min(iw,ih)':'min(iw,ih)',scale=600:600",
      "-an",
      exportFile,
    ]
  );

  return ffmpeg.FS("readFile", exportFile);
}

export { convertMovie };
