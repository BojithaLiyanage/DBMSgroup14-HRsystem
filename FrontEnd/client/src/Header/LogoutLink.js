import React from "react";
import { Nav } from "react-bootstrap";

export function LogoutLink() {
  if (sessionStorage.getItem("paygrade") !== null) {
    return (
      <Nav.Link href="/logout" className="but2">
        Logout
      </Nav.Link>
    );
  }
}
