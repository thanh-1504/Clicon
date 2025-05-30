import { Link } from "react-router";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
function Categorys() {
  const screenWidth = window.innerWidth;
  const settings = {
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplay: screenWidth <= 500 && true,
    arrows: false,
  };
  return (
    <div className="mt-10">
      <h2 className="text-center text-xl font-medium mb-5">
        Shop with Categorys
      </h2>
      <div className="items-start justify-evenly gap-x-4 sm:hidden lg:flex 2xl:grid 2xl:grid-cols-6">
        <Link
          to={"/category/computer,laptop"}
          className="border border-slate-300 px-2 cursor-pointer min-h-[160px] 2xl:min-h-[220px] flex items-center flex-col justify-center"
        >
          <img
            src="/images/imageCategoryLaptop.png"
            alt="image-product"
            className="w-[100px] h-[120px] mx-auto object-contain"
          />
          <p className="text-sm font-medium">Computer & Laptop</p>
        </Link>
        <Link
          to={"/category/phone"}
          className="border border-slate-300 px-2 cursor-pointer min-h-[160px] min-w-[143px] 2xl:min-h-[220px] flex items-center flex-col justify-center"
        >
          <img
            src="/images/imageCategorySmartPhone.png"
            alt="image-product"
            className="w-[100px] h-[120px] mx-auto object-contain"
          />
          <p className="text-sm font-medium text-center">SmartPhone</p>
        </Link>
        <Link
          to={"/category/headphone"}
          className="border border-slate-300 px-2 cursor-pointer min-h-[160px] min-w-[143px] 2xl:min-h-[220px] flex items-center flex-col justify-center"
        >
          <img
            src="/images/imageCategoryHeadPhone.png"
            alt="image-product"
            className="w-[100px] h-[120px] mx-auto object-contain"
          />
          <p className="text-sm font-medium text-center">Headphones</p>
        </Link>
        <Link
          to={"/category/accessories"}
          className="border border-slate-300 px-2 cursor-pointer min-h-[160px] min-w-[143px] 2xl:min-h-[220px] flex items-center flex-col justify-center"
        >
          <img
            src="/images/imageCategoryKeyBoard.png"
            alt="image-product"
            className="w-[100px] h-[120px] mx-auto object-contain"
          />
          <p className="text-sm font-medium text-center">Accessories</p>
        </Link>
        <Link
          to={"/category/camera"}
          className="border border-slate-300 px-2 cursor-pointer min-h-[160px] min-w-[143px] 2xl:min-h-[220px] flex items-center flex-col justify-center"
        >
          <img
            src="/images/imageCategoryCamera.png"
            alt="image-product"
            className="w-[100px] h-[120px] mx-auto object-contain"
          />
          <p className="text-sm font-medium text-center">Camera & Photo</p>
        </Link>
        <Link
          to={"/category/tv"}
          className="border border-slate-300 px-2 cursor-pointer min-h-[160px] min-w-[143px] 2xl:min-h-[220px] flex items-center flex-col justify-center"
        >
          <img
            src="/images/imageCategoryTV.png"
            alt="image-product"
            className="w-[100px] h-[120px] mx-auto object-contain"
          />
          <p className="text-sm font-medium text-center">TV & Homes</p>
        </Link>
      </div>
      <div className="lg:hidden px-2">
        {
          <Slider {...settings} className="custom__slider-mainPage">
            <Link
              to={"/category/computer,laptop"}
              className="border !flex !flex-col !items-center !justify-center  border-slate-300  cursor-pointer min-h-[200px]"
            >
              <img
                src="/images/imageCategoryLaptop.png"
                alt="image-product"
                className="w-[100px] h-[120px] mx-auto object-contain"
              />
              <p className="text-sm font-medium">Computer & Laptop</p>
            </Link>
            <Link
              to={"/category/phone"}
              className="border !flex !flex-col !items-center !justify-center  border-slate-300  cursor-pointer min-h-[200px]"
            >
              <img
                src="/images/imageCategorySmartPhone.png"
                alt="image-product"
                className="w-[100px] h-[120px] mx-auto object-contain"
              />
              <p className="text-sm font-medium text-center">SmartPhone</p>
            </Link>
            <Link
              to={"/category/headphone"}
              className="border !flex !flex-col !items-center !justify-center  border-slate-300  cursor-pointer min-h-[200px]"
            >
              <img
                src="/images/imageCategoryHeadPhone.png"
                alt="image-product"
                className="w-[100px] h-[120px] mx-auto object-contain"
              />
              <p className="text-sm font-medium text-center">Headphones</p>
            </Link>
            <Link
              to={"/category/accessories"}
              className="border !flex !flex-col !items-center !justify-center  border-slate-300  cursor-pointer min-h-[200px]"
            >
              <img
                src="/images/imageCategoryKeyBoard.png"
                alt="image-product"
                className="w-[100px] h-[120px] mx-auto object-contain"
              />
              <p className="text-sm font-medium text-center">Accessories</p>
            </Link>
            <Link
              to={"/category/camera"}
              className="border !flex !flex-col !items-center !justify-center  border-slate-300  cursor-pointer min-h-[200px]"
            >
              <img
                src="/images/imageCategoryCamera.png"
                alt="image-product"
                className="w-[100px] h-[120px] mx-auto object-contain"
              />
              <p className="text-sm font-medium text-center">Camera & Photo</p>
            </Link>
            <Link
              to={"/category/tv"}
              className="border !flex !flex-col !items-center !justify-center  border-slate-300  cursor-pointer min-h-[200px]"
            >
              <img
                src="/images/imageCategoryTV.png"
                alt="image-product"
                className="w-[100px] h-[120px] mx-auto object-contain"
              />
              <p className="text-sm font-medium text-center">TV & Homes</p>
            </Link>
          </Slider>
        }
      </div>
    </div>
  );
}

export default Categorys;
