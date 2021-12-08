/**
 * @param {string} imageId
 * @returns {string}
 */
function getImagePath(imageId) {
  return `/images/${imageId}.jpg.optimized.jpg`;
}

/**
 * @param {string} movieId
 * @returns {string}
 */
function getMoviePath(movieId) {
  return `/movies/${movieId}.gif.optimized.gif`;
}

/**
 * @param {string} soundId
 * @returns {string}
 */
function getSoundPath(soundId) {
  return `/sounds/${soundId}.mp3.optimized.mp3`;
}

/**
 * @param {string} soundId
 * @returns {string}
 */
function getSoundPeaksPath(soundId) {
  return `/sounds/${soundId}.mp3.optimized.mp3.json`;
}

/**
 * @param {string} profileImageId
 * @returns {string}
 */
function getProfileImagePath(profileImageId) {
  return `/images/profiles/${profileImageId}.jpg.optimized.jpg`;
}

export { getImagePath, getMoviePath, getSoundPath, getSoundPeaksPath, getProfileImagePath };
