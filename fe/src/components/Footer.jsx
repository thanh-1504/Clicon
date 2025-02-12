import LogoWeb from "./LogoWeb";

function Footer() {
  return (
    <footer className="bg-black flex items-start justify-evenly py-10">
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
          <span>Computer & Laptop</span>
          <span>Computer & Laptop</span>
          <span>Computer & Laptop</span>
          <span>Computer & Laptop</span>
          <span>Computer & Laptop</span>
        </div>
      </div>
      <div>
        <h3 className="text-white mb-4">TOP CATEGORY</h3>
        <div className="flex flex-col text-gray-400 gap-y-2">
          <span>Computer & Laptop</span>
          <span>Computer & Laptop</span>
          <span>Computer & Laptop</span>
          <span>Computer & Laptop</span>
          <span>Computer & Laptop</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
