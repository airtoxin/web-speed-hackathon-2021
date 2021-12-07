import { ffmpeg } from "../ffmpeg";

/**
 * @param {Buffer} buffer
 * @returns {Promise<Uint8Array>}
 */
async function convertSound(buffer) {
  const exportFile = `export.mp3`;

  if (ffmpeg.isLoaded() === false) {
    await ffmpeg.load();
  }

  ffmpeg.FS("writeFile", "file", new Uint8Array(buffer));

  await ffmpeg.run(
    ...["-i", "file", "-ar", "44100", "-ab", "64k", "-vn", exportFile]
  );

  return ffmpeg.FS("readFile", exportFile);
}

export { convertSound };
