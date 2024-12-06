import "./App.css";
import Associations from "./components/Associations";

import Footer from "./components/footer";
import { HomeMission } from "./pages/HomeMission";

function App() {
  return (
    <div>
      <Associations />
      <HomeMission />
      <Footer />
    </div>
  );
}

export default App;
