/* eslint-disable react/prop-types */
import ProductItem from "./ProductItem";

function ListProduct({ dataProductList, quantity }) {
  return (
    <div className="grid lg:grid-cols-5 lg:gap-4 sm:grid-cols-2 sm:gap-y-5 sm:gap-x-4 sm:px-5 lg:px-0">
      {dataProductList
        .map((product) => {
          return <ProductItem key={product._id} data={product}></ProductItem>;
        })
        .slice(0, quantity)}
    </div>
  );
}

export default ListProduct;
