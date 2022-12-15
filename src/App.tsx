import { Routes, Route } from "react-router-dom";
import { About, Home } from "./pages";
import { Header, Noti } from "./components";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Noti />
    </>
  );
}

export default App;
