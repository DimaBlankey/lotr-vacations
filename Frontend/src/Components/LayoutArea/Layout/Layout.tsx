import Home from "../../HomeArea/Home/Home";
import VacationsList from "../../VacationsArea/VacationsList/VacationsList";
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import Routing from "../Routing/Routing";
import "./Layout.css";

function Layout(): JSX.Element {
  return (
    <div className="Layout">
      {/* <Menu /> */}
      <header>
        <Header />
      </header>
      <Routing />

      {/* <VacationsList></VacationsList> */}
    </div>
  );
}

export default Layout;
