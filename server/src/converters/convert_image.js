import sharp from "sharp";

/**
 * @param {Buffer} buffer
 * @param {object} options
 * @param {number} [options.height]
 * @param {number} [options.width]
 * @returns {Promise<Uint8Array>}
 */
async function convertImage(buffer, options) {
  return sharp(buffer)
    .resize({
      fit: "outside",
      height: options.height,
      width: options.width,
    })
    .webp()
    .toBuffer();
}

export { convertImage };
