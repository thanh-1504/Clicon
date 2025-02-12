/* eslint-disable react/prop-types */
import { IoMdStar } from "react-icons/io";
import { Link } from "react-router";

function ProductItem({ data }) {
  return (
    <Link
      to={`/product/${data.category}/${data._id}`}
      className="border border-slate-300 lg:w-full max-h-[360px] px-2 py-4 hover:shadow-lg transition-all hover:cursor-pointer"
    >
      <div className="lg:w-[120px] lg:h-[120px] mx-auto">
        <img
          src={data?.listImage[0]}
          alt="image product"
          loading="lazy"
          className="w-full h-full object-contain"
        />
      </div>
      <div className="mt-3">
        <p className="line-clamp-2 text-sm min-h-9">{data?.name}</p>
        <div className="text-sm mt-1">
          <span className="text-blue-500 font-medium">
            ${data?.sellingPrice}
          </span>
          <span className="ml-2 text-gray-400 font-medium line-through">
            1500$
          </span>
        </div>
        <div className="flex items-center gap-x-1 mt-1">
          <IoMdStar className="text-yellow-400" />
          <span className="text-sm">50</span>
        </div>
      </div>
    </Link>
  );
}

export default ProductItem;
