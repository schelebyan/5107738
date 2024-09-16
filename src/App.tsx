import { Route, Routes } from "react-router-dom";

import PageView from "./Layouts/PageLayout";
import { ErrorPage } from "./Pages/Error";
import Home from "./Pages/Home";
import Timer from "./Pages/Timer";

function App() {
  return (
    <PageView>
      <Routes>
        <Route path="*" element={<ErrorPage />} />
        <Route path="/" element={<Home />} />
        <Route path="timer" element={<Timer />} />
      </Routes>
    </PageView>
  );
}

export default App;
