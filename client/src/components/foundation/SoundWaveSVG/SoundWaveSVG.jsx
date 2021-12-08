import React from "react";
import {useFetch} from "../../../hooks/use_fetch"
import {getSoundPeaksPath} from "../../../utils/get_path"
import {fetchJSON} from "../../../utils/fetchers"

/**
 * @typedef {object} Props
 * @property {string} soundId
 */

/**
 * @type {React.VFC<Props>}
 */
const SoundWaveSVG = ({ soundId }) => {
  const { data } = useFetch(getSoundPeaksPath(soundId), fetchJSON);

  return (
    <svg
      className="w-full h-full"
      preserveAspectRatio="none"
      viewBox="0 0 100 1"
    >
      {data?.peaks.map((peak, idx) => {
        const ratio = peak / data.max;
        return (
          <rect
            key={idx}
            fill="#2563EB"
            height={ratio}
            width="1"
            x={idx}
            y={1 - ratio}
          />
        );
      })}
    </svg>
  );
};

export { SoundWaveSVG };
