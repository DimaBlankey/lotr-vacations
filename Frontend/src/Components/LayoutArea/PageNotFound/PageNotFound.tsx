import "./PageNotFound.css";
import video from "../../../Assets/videos/video.mp4";

function PageNotFound(): JSX.Element {
  return (
    <div className="PageNotFound">
      <>
        <video autoPlay muted loop id="myVideo">
          <source src={video} type="video/mp4" />
        </video>
        <div className="content">
          <h1>404</h1>
        </div>
      </>
    </div>
  );
}

export default PageNotFound;
