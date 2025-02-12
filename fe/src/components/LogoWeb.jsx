import { Link } from "react-router";

function LogoWeb() {
  return (
    <Link to={"/"} className="flex items-center gap-x-2">
      <div className="w-8 h-8 rounded-full bg-white relative">
        <div className="w-4 h-4 rounded-full bg-main-color absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"></div>
      </div>
      <h1 className="uppercase text-white font-semibold text-xl">CLICON</h1>
    </Link>
  );
}

export default LogoWeb;
