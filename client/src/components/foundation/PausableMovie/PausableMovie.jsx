import classNames from "classnames";
import { Animator, Decoder } from "gifler";
import { GifReader } from "omggif";
import React from "react";

import { useFetch } from "../../../hooks/use_fetch";
import { fetchBinary } from "../../../utils/fetchers";
import { AspectRatioBox } from "../AspectRatioBox";
import { FontAwesomeIcon } from "../FontAwesomeIcon";

/**
 * @typedef {object} Props
 * @property {string} src
 */

/**
 * クリックすると再生・一時停止を切り替えます。
 * @type {React.VFC<Props>}
 */
const PausableMovie = ({ src }) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const handleClick = React.useCallback(() => setIsPlaying((p) => !p), []);
  const videoRef = React.useRef(null);
  React.useEffect(() => {
    if (isPlaying) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  }, [isPlaying]);

  return (
    <AspectRatioBox aspectHeight={1} aspectWidth={1}>
      <button
        className="group relative block w-full h-full"
        onClick={handleClick}
        type="button"
      >
        <video className="w-full" loop ref={videoRef}>
          <source src={src} type="video/webm" />
        </video>
        <div
          className={classNames(
            "absolute left-1/2 top-1/2 flex items-center justify-center w-16 h-16 text-white text-3xl bg-black bg-opacity-50 rounded-full transform -translate-x-1/2 -translate-y-1/2",
            {
              "opacity-0 group-hover:opacity-100": isPlaying,
            }
          )}
        >
          <FontAwesomeIcon
            iconType={isPlaying ? "pause" : "play"}
            styleType="solid"
          />
        </div>
      </button>
    </AspectRatioBox>
  );
};

export { PausableMovie };
