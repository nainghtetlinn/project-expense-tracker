import { Routes, Route } from "react-router-dom";
import { About, Home } from "./pages";
import { Header, Noti } from "./components";

function App() {
  return (
    <>
      <Noti />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
