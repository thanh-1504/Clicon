import { Link } from "react-router";

/* eslint-disable react/prop-types */
function RelatedProductItem({ data }) {
  if (!data) return;
  return (
    <Link
      to={`/product/${data.category}/${data._id}`}
      className="flex items-center justify-center gap-x-2 border border-slate-300 rounded-sm p-2 hover:cursor-pointer min-h-[74px] sm:flex-col sm:min-h-[240px] lg:min-h-0 sm:gap-y-3 lg:gap-y-0 lg:flex-row"
    >
      <div className="lg:w-[65px] sm:w-full">
        <img
          loading="lazy"
          src={
            data.listImage && data.listImage.length > 0 && data?.listImage[0]
          }
          alt="image related product"
          // className="min-w-[65px] max-h-[50px] object-contain w-full"
          className="w-full h-full object-contain"
        />
      </div>
      <div>
        <p className="text-xs line-clamp-2 lg:max-w-[140px] sm:w-full">
          {data.name}
        </p>
        <span className="text-sm text-blue-500 font-medium">
          ${data.sellingPrice}
        </span>
      </div>
    </Link>
  );
}

export default RelatedProductItem;
