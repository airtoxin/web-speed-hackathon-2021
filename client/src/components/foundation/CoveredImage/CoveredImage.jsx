import classNames from "classnames";
import React from "react";

/**
 * @typedef {object} Props
 * @property {string} alt
 * @property {string} src
 */

/**
 * アスペクト比を維持したまま、要素のコンテンツボックス全体を埋めるように画像を拡大縮小します
 * @type {React.VFC<Props>}
 */
const CoveredImage = ({ alt, src }) => {
  const [containerSize, setContainerSize] = React.useState({
    height: 0,
    width: 0,
  });
  /** @type {React.RefCallback<HTMLDivElement>} */
  const callbackRef = React.useCallback((el) => {
    setContainerSize({
      height: el?.clientHeight ?? 0,
      width: el?.clientWidth ?? 0,
    });
  }, []);
  const [imageSize, setImageSize] = React.useState({
    height: 0,
    width: 0,
  });
  const handleImgOnLoad = React.useCallback(
    (event) =>
      setImageSize({
        height: event.target.offsetHeight,
        width: event.target.offsetWidth,
      }),
    []
  );

  const containerRatio = containerSize.height / containerSize.width;
  const imageRatio = imageSize.height / imageSize.width;

  return (
    <div ref={callbackRef} className="relative w-full h-full overflow-hidden">
      <img
        onLoad={handleImgOnLoad}
        alt={alt}
        className={classNames(
          "absolute left-1/2 top-1/2 max-w-none transform -translate-x-1/2 -translate-y-1/2",
          {
            "w-auto h-full": containerRatio > imageRatio,
            "w-full h-auto": containerRatio <= imageRatio,
          }
        )}
        src={src}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
};

export { CoveredImage };
