import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import BannerMainPage from "../components/BannerMainPage";
import Categorys from "../components/Categorys";
import CustomerBenefits from "../components/CustomerBenefits";
import LabelCategory from "../components/LabelCategory";
import ListProduct from "../components/ListProduct";
import { handleGetAllProduct } from "../redux/request";
function MainPage() {
  const dispatch = useDispatch();
  const [dataProduct, setDataProduct] = useState([]);
  useEffect(() => {
    dispatch(handleGetAllProduct()).then((data) => {
      setDataProduct(data?.payload.products);
    });
  }, [dispatch]);
  return (
    <div className="lg:pt-[100px] lg:px-[160px] sm:px-0">
      <BannerMainPage />
      <CustomerBenefits />
      <Categorys />
      <LabelCategory style="mt-8 mb-4">Featured Products</LabelCategory>
      {dataProduct && dataProduct.length > 0 && (
        <ListProduct dataProductList={dataProduct} quantity={10} />
      )}
      {/* <div className="mt-12 mb-12">
        <div className="flex bg-[#fee7d5] justify-between">
          <div className="pl-10 pt-11">
            <p className="text-xs text-white font-medium bg-blue-500 inline-block p-2">
              SAVE UP TO 200.00$
            </p>
            <h2 className="font-semibold text-2xl my-3">Macbook Pro</h2>
            <p className="font-normal max-w-[240px] mb-3">
              Apple M1 Max Chip. 32GB Unified Memory, 1TB SSD Storage
            </p>
            <Link className="text-white text-xs font-semibold bg-orange-color inline-block px-6 py-2">
              SHOP NOW
              <HiMiniArrowRight className="inline mb-1 ml-1"></HiMiniArrowRight>
            </Link>
          </div>
          <div className="relative max-w-[350px]">
            <div className="w-[65px] h-[65px] rounded-full text-black border-4 border-white bg-[#feceae] absolute top-8">
              <span className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 text-sm font-medium">
                1999$
              </span>
            </div>
            <img
              src="/images/macbookPro.png"
              alt="macbook pro"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default MainPage;
