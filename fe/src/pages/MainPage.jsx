import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import BannerMainPage from "../components/BannerMainPage";
import Categorys from "../components/Categorys";
import CustomerBenefits from "../components/CustomerBenefits";
import LabelCategory from "../components/LabelCategory";
import ListProduct from "../components/ListProduct";
import ProductItem from "../components/ProductItem";
import { handleGetAllProduct } from "../redux/request";
function MainPage() {
  window.scrollTo(0, 0);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [dataProduct, setDataProduct] = useState([]);
  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      const data = await dispatch(handleGetAllProduct());
      setDataProduct(data?.payload.products);
      setLoading(false);
    }
    fetchProduct();
  }, [dispatch]);
  return (
    <div className="lg:pt-[100px] lg:px-[160px] sm:px-0">
      <BannerMainPage />
      <CustomerBenefits />
      <Categorys />
      {loading ? (
        <div className="my-8 grid lg:grid-cols-5 lg:gap-4 sm:grid-cols-2 sm:gap-y-5 sm:gap-x-4 sm:px-5 lg:px-0">
          {Array.from({ length: 10 }).map((item) => {
            return (
              <ProductItem key={item} loadingProduct={loading}></ProductItem>
            );
          })}
        </div>
      ) : (
        <div className="my-8">
          <LabelCategory style="mb-4">Featured Products</LabelCategory>
          {Array.isArray(dataProduct) && dataProduct.length > 0 && (
            <ListProduct
              dataProductList={dataProduct}
              quantity={10}
              loading={loading}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default MainPage;
