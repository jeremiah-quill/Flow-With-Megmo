import React, { useEffect, useState } from "react";
import { Link, useResolvedPath, useMatch } from "react-router-dom";

export default function CustomLink({ to, children }) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });
  const [delayedMatch, setDelayedMatch] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      if(match) {
        setDelayedMatch(true)
      }
      else {
        setDelayedMatch(false)
      }
    }, 500)
  }, [match])



  return (
    <Link to={to} className={delayedMatch === true ? "active-link nav-item main-nav-item" : "inactive-link nav-item main-nav-item"}>
      {children}
    </Link>
  );
}