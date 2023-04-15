import "./PageNotFound.css";

import video1 from "../../../Assets/videos/video1.mp4";
import video2 from "../../../Assets/videos/video2.mp4";
import video3 from "../../../Assets/videos/video3.mp4";
import video4 from "../../../Assets/videos/video4.mp4";
import video5 from "../../../Assets/videos/video5.mp4";

function PageNotFound(): JSX.Element {
  const randomVideo = randomVideoFunction();

  function randomVideoFunction() {
    const videos = [video1, video2, video3, video4, video5];
    const randomIndex = Math.floor(Math.random() * videos.length);
    const randomVideo = videos[randomIndex];
    return randomVideo;
  }

  return (
    <div className="PageNotFound">
      <>
        <video autoPlay muted loop id="myVideo">
          <source src={randomVideo} type="video/mp4" />
        </video>
        <div className="content">
          <h1>Page Not Found...404</h1>
        </div>
      </>
    </div>
  );
}

export default PageNotFound;
