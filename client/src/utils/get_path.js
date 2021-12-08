/**
 * @param {string} imageId
 * @returns {string}
 */
function getImagePath(imageId) {
  return `/images_optimized/${imageId}.jpg`;
}

/**
 * @param {string} movieId
 * @returns {string}
 */
function getMoviePath(movieId) {
  return `/movies_optimized/${movieId}.gif`;
}

/**
 * @param {string} soundId
 * @returns {string}
 */
function getSoundPath(soundId) {
  return `/sounds_optimized/${soundId}.mp3`;
}

/**
 * @param {string} soundId
 * @returns {string}
 */
function getSoundPeaksPath(soundId) {
  return `/sounds_optimized/${soundId}.mp3.json`;
}

/**
 * @param {string} profileImageId
 * @returns {string}
 */
function getProfileImagePath(profileImageId) {
  return `/images/profiles_optimized/${profileImageId}.jpg`;
}

export {
  getImagePath,
  getMoviePath,
  getSoundPath,
  getSoundPeaksPath,
  getProfileImagePath,
};
