/* FadingVideo — a looping background video whose loop seam is hidden by a
   requestAnimationFrame-driven crossfade. No CSS transitions are used: the
   opacity is written frame by frame so a new fade can pick up wherever the
   previous one was interrupted.

   Under reduced motion the clip is never played: it holds on its first
   frame, so the page keeps its imagery without indefinite background
   movement the reader cannot stop. The element is decorative and is
   hidden from assistive tech either way. */
(function () {
  const { useEffect, useRef } = React;
  const useReducedMotion = window.useReducedMotion;

  const FADE_MS = 500;
  const FADE_OUT_LEAD = 0.55; // seconds before `ended` to start fading out

  function FadingVideo({ src, className, style, ...rest }) {
    const videoRef = useRef(null);
    const rafRef = useRef(null);
    const fadingOutRef = useRef(false);
    const reduced = useReducedMotion();

    useEffect(() => {
      const video = videoRef.current;
      if (!video) return;

      if (reduced) {
        /* Hold frame one. Nothing to crossfade, so no listeners either. */
        const showFirstFrame = () => { video.style.opacity = "1"; };
        video.pause();
        video.addEventListener("loadeddata", showFirstFrame);
        if (video.readyState >= 2) showFirstFrame();
        return () => video.removeEventListener("loadeddata", showFirstFrame);
      }

      const fadeTo = (target, duration) => {
        cancelAnimationFrame(rafRef.current);

        const from = parseFloat(video.style.opacity) || 0;
        const delta = target - from;
        const start = performance.now();

        const step = (now) => {
          const t = Math.min((now - start) / duration, 1);
          video.style.opacity = String(from + delta * t);
          if (t < 1) rafRef.current = requestAnimationFrame(step);
        };

        rafRef.current = requestAnimationFrame(step);
      };

      const play = () => {
        const attempt = video.play();
        if (attempt && typeof attempt.catch === "function") attempt.catch(() => {});
      };

      const handleLoadedData = () => {
        video.style.opacity = "0";
        play();
        fadeTo(1, FADE_MS);
      };

      const handleTimeUpdate = () => {
        const remaining = video.duration - video.currentTime;
        if (!fadingOutRef.current && remaining <= FADE_OUT_LEAD && remaining > 0) {
          fadingOutRef.current = true;
          fadeTo(0, FADE_MS);
        }
      };

      const handleEnded = () => {
        video.style.opacity = "0";
        setTimeout(() => {
          video.currentTime = 0;
          play();
          fadingOutRef.current = false;
          fadeTo(1, FADE_MS);
        }, 100);
      };

      video.addEventListener("loadeddata", handleLoadedData);
      video.addEventListener("timeupdate", handleTimeUpdate);
      video.addEventListener("ended", handleEnded);

      // The video may already be buffered by the time we attach listeners.
      if (video.readyState >= 2) handleLoadedData();

      return () => {
        cancelAnimationFrame(rafRef.current);
        video.removeEventListener("loadeddata", handleLoadedData);
        video.removeEventListener("timeupdate", handleTimeUpdate);
        video.removeEventListener("ended", handleEnded);
      };
    }, [src, reduced]);

    return (
      <video
        ref={videoRef}
        src={src}
        className={className}
        style={{ opacity: 0, ...style }}
        autoPlay={!reduced}
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
        {...rest}
      />
    );
  }

  window.FadingVideo = FadingVideo;
})();
