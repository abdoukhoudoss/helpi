import "./App.css";

import Footer from "./components/footer";
import { HomeMission } from "./pages/HomeMission";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";

function App() {
  return (
    <div>
      <Header />
      <SearchBar />
      <HomeMission />
      <Footer />
    </div>
  );
}

export default App;
