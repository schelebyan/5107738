import { Route, Routes } from "react-router-dom";

import PageView from "./Layouts/PageLayout";
import { ErrorPage } from "./Pages/Error";
import Home from "./Pages/Home";

function App() {
  return (
    <PageView>
      <Routes>
        <Route path="*" element={<ErrorPage />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </PageView>
  );
}

export default App;
