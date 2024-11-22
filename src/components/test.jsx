/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { hightlightsSlides } from "../constants";
import gsap from "gsap";

const VideoCarousel = () => {
  const videoRef = useRef([]);
  const videoSpamRef = useRef([]);
  const videoDivRef = useRef([]);

  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });

  const [loadedData, setLoadedData] = useState([]);

  const { isEnd, isLastVideo, isPlaying, videoId, startPlay } = video;

  useEffect(() => {
    if (loadedData.length > 3) {
      const currentVideo = videoRef.current[videoId];
      if (currentVideo) {
        isPlaying ? currentVideo.play() : currentVideo.pause();
      }
    }
  }, [videoId, isPlaying, startPlay, loadedData]);

  useEffect(() => {
    const span = videoSpamRef.current[videoId];
    let animation;

    if (span) {
      animation = gsap.to(span, {
        // Add actual GSAP animation properties here
        onUpdate: () => {},
        onComplete: () => {
          console.log("Animation Complete");
        },
      });
    }

    return () => {
      animation && animation.kill();
    };
  }, [videoId, startPlay]);

  return (
    <div className="flex items-center">
      {hightlightsSlides.map((list, i) => (
        <div key={list.id} id="slider" className="sm:pr-20 pr-10">
          <div className="video-carousel_container relative">
            <div
              className="w-full h-full flex-center rounded-3xl
            overflow-hidden bg-black"
            >
              <video
                id="video"
                playsInline
                preload="auto"
                muted
                ref={(el) => (videoRef.current[i] = el)}
                onPlay={() => {
                  setVideo((prevVideo) => ({
                    ...prevVideo,
                    isPlaying: true,
                  }));
                }}
                onLoadedData={() => {
                  setLoadedData((prev) => [...prev, i]);
                }}
              >
                <source src={list.video} type="video/mp4" />
              </video>
            </div>
            <div className="absolute top-12 left-[5%] z-10">
              {list.textLists.map((text) => (
                <p key={text} className="md:text-2xl text-xl font-medium">
                  {text}
                </p>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoCarousel;
