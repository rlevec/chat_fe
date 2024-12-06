import React, { useState, useEffect } from "react";
import BoxLoader from "../box_loader";

export default function LazyLoadImage({
  width,
  height,
  src,
  alt,
  crossOrigin,
  cache,
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  let imageSource

  if(cache) {

    //force cache-busting by appending a timestamp query param
    //for profile picture upload and messages when profile picture changes
     imageSource = `http://localhost:3060${src}?t=${new Date().getTime()}`;
  } else imageSource = `http://localhost:3060${src}`



  useEffect(() => {
    const corsImage = new Image();
    corsImage.crossOrigin = crossOrigin;
    corsImage.src = imageSource;

    corsImage.onload = () => {
      setIsLoaded(true);
    };

    corsImage.onerror = () => {
      setIsLoaded(false);
    };

    // Cleanup effect
    return () => {
      corsImage.onload = null;
      corsImage.onerror = null;
      corsImage.src = ""; // Stop the image loading if source changes
    };
  }, [imageSource]); // Re-run when imageSource changes

  if (isLoaded) {
    return (
      <img
        src={imageSource}
        crossOrigin={crossOrigin}
        alt={alt}
        width={width}
        height={height}
      />
    );
  } else {
    return <BoxLoader width={width} height={height} />;
  }
}
