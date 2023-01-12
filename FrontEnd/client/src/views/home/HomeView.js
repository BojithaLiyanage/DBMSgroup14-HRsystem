import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function HomeView() {
  return (
    <div className="homeView">

      <div>
      <h1 className="text-center mt-3 mb-0">HR Management System</h1>
        <Link to="/login"><button className="btn btn-outline-primary my" >Login</button></Link>
      </div>
    </div>
  );
}
