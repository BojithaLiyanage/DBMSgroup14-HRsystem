import React from "react";
import { Router } from "./routes/router";
import Header from "./Header/Header";
import Footer from "./views/footer/footer";

function App() {
  return (
    <div>
      <Header />
      <Router />
      <Footer />
    </div>
  );
}

export default App;
