import { Link } from "react-router";
import LogoWeb from "./LogoWeb";

function Footer() {
  const screenWidth = window.innerWidth;
  return (
    <footer
      className={`bg-black flex items-start justify-evenly py-10 mt-12 ${
        screenWidth <= 500 && "hidden"
      }`}
    >
      <div className="flex flex-col">
        <LogoWeb></LogoWeb>
        <div className="text-white mt-4">
          <p className="text-gray-400 text-sm">Customer Supports:</p>
          <p>(84) 25731504</p>
          <p className="text-gray-400 my-2">131/3 minh phụng p9 q6</p>
          <p>duongnhatthanh@gmail.com</p>
        </div>
      </div>
      <div>
        <h3 className="text-white mb-4">TOP CATEGORY</h3>
        <div className="flex flex-col text-gray-400 gap-y-2">
          <Link to={"/category/computer,laptop"}>Computer & Laptop</Link>
          <Link to={"/category/phone"}>SmartPhone</Link>
          <Link to={"/category/headphone"}>Headphone</Link>
          <Link to={"/category/camera"}>Camera & Photo</Link>
          <Link to={"/category/tv"}>TV & Homes</Link>
        </div>
      </div>
      <div>
        <h3 className="text-white mb-4">QUICK LINKS</h3>
        <div className="flex flex-col text-gray-400 gap-y-2">
          <Link to={"/category/all"}>Shop Product</Link>
          <Link to={"/cart"}>Shoping Cart</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
