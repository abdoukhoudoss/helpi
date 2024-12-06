import "./App.css";
import Associations from "./components/Associations";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Footer from "./components/footer";
import { HomeMission } from "./pages/HomeMission";

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
