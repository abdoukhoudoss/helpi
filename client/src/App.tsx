import "./App.css";
import Associations from "./components/Associations";

import Footer from "./components/footer";
import { HomeMission } from "./pages/HomeMission";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";

function App() {
  return (
    <div>
     
      <Header />
      <SearchBar />
      <Associations />
      <HomeMission />
      <Footer />
    </div>
  );
}

export default App;
