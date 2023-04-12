import "./PageNotFound.css";
import video2 from "../../../Assets/videos/video2.mp4";

function PageNotFound(): JSX.Element {
  return (
    <div className="PageNotFound">
      <>
        <video autoPlay muted loop id="myVideo">
          <source src={video2} type="video/mp4" />
        </video>
        <div className="content">
          <h1>Page Not Found...404</h1>
        </div>
      </>
    </div>
  );
}

export default PageNotFound;
