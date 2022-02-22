import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function CustomLink({ to, children }) {
  const navigate = useNavigate();

  function delayAndGo(e) {
    e.preventDefault();

    setTimeout(() => navigate(to), 1000);
  }

  return (
    <Link to={to} onClick={delayAndGo}>
      {children}
    </Link>
  );
}