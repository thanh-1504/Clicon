import { HiMiniArrowRight } from "react-icons/hi2";

// eslint-disable-next-line react/prop-types
function LabelCategory({ children, style = "" }) {
  return (
    <div className={`flex justify-between items-start sm:px-5 lg:px-0 ${style}`}>
      <h3 className="text-base font-medium">{children}</h3>
      <div className="flex items-center gap-x-1 cursor-pointer">
        <span className="text-sm text-orange-400 font-medium">
          Show All Product
        </span>
        <HiMiniArrowRight className="text-orange-400 mt-[2px]" />
      </div>
    </div>
  );
}

export default LabelCategory;
