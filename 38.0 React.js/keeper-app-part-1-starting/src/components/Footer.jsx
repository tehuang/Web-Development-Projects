import React from "react";

const currentYear = new Date().getFullYear();
function Footer() {
  return (
    <footer>
      <p>CopyRight @ {currentYear}</p>
    </footer>
  );
}

export default Footer;
