import React from "react";
import ReactDOM from "react-dom";

const img1 =
  "https://res.cloudinary.com/justsalad/image/upload/w_466/f_auto/q_auto/v1678134784/menuitems/OJS_IMG_MAR22_Crispy_Chicken_Poblano.png";

const img2 =
  "https://img.jamieoliver.com/jamieoliver/recipe-database/106733007.jpg?tr=w-800,h-800";

const img3 = "https://i.ytimg.com/vi/_zqmjkXrYbM/maxresdefault.jpg";

const img4 = "https://picsum.photos/200";
ReactDOM.render(
  <div>
    <h1 className="heading">My Favorite Foods</h1>
    <div>
      <img className="food-img" src={img1} alt="Just salad" />
      <img className="food-img" src={img2} alt="Avocado toast" />
      <img className="food-img" src={img3} alt="Korean BBQ" />
      <img className="food-img" src={img4 + "?grayscale"} alt="random" />
    </div>
  </div>,
  document.getElementById("root")
);
