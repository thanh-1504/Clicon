/* eslint-disable react/prop-types */
import { IoMdStar } from "react-icons/io";
import { Link } from "react-router";

function ProductItem({ data, loadingProduct }) {
  return (
    <Link
      to={`/product/${data?.category}/${data?._id}`}
      className="border border-slate-300 lg:w-full max-h-[360px] px-2 py-4 hover:shadow-lg transition-all hover:cursor-pointer 2xl:py-10"
    >
      <div className="lg:w-[120px] lg:h-[120px] mx-auto">
        {loadingProduct ? (
          <img
            src=""
            loading="lazy"
            className="w-full h-full object-contain bg-gray-200 animate-pulse"
          />
        ) : (
          <img
            src={data?.listImage[0]}
            alt="image product"
            loading="lazy"
            className="w-full h-full object-contain"
          />
        )}
      </div>
      <div className="mt-3">
        {loadingProduct ? (
          <p className="line-clamp-2 text-sm min-h-2 min-w-20 bg-gray-200 animate-pulse rounded-sm"></p>
        ) : (
          <p className="line-clamp-2 text-sm min-h-9">{data?.name}</p>
        )}

        <div className="text-sm mt-1">
          {loadingProduct ? (
            <p className="bg-gray-200 animate-pulse min-h-3 inline-block min-w-10"></p>
          ) : (
            <span className="text-blue-500 font-medium">
              ${data?.sellingPrice}
            </span>
          )}
          {loadingProduct ? (
            <p className="bg-gray-200 animate-pulse min-h-3 inline-block min-w-10 ml-2"></p>
          ) : (
            <span className="ml-2 text-gray-400 font-medium line-through">
              ${data?.price}
            </span>
          )}
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
