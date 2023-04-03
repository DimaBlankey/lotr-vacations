import "./Home.css";
import img from "../../../Assets/background.jpg"

function Home(): JSX.Element {
    return (
        <div className="Home">
            <img src={img}  />
        </div>
    );
}

export default Home;
