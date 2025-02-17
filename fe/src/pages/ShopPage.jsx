import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoIosArrowDown } from "react-icons/io";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import ProductItem from "../components/ProductItem";
import {
  handleGetFilterProduct2,
  handleGetProductByCategory,
} from "../redux/request";
import {
  handleSetActivePriceRange,
  handleSetDataCategoryProduct,
  handleSetDataFilterProduct,
  handleSetMaxPrice,
} from "../redux/slices/shopPageSlice";

function ShopPage() {
  window.scrollTo(0, 0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [resultFound, setResultFound] = useState(0);
  const [sortBy, setSortBy] = useState("");
  const [querySearch, setQuerySearch] = useState("");
  const { categoryProduct } = useParams();
  const {
    maxPriceText,
    dataCategoryProduct,
    dataFilterProduct,
    activePriceRange,
  } = useSelector((state) => state.shopPage);
  const { register, handleSubmit } = useForm();
  // Handle pagination
  const handlePageClick = (e) => {
    navigate(
      `${
        querySearch
          ? `${querySearch}&page=${e.selected ? e.selected + 1 : "1"}${
              sortBy ? `&sortPrice=${sortBy}` : ""
            }`
          : `?category=${categoryProduct}&page=${e.selected + 1}${
              sortBy ? `&sortPrice=${sortBy}` : ""
            }`
      }`
    );
    const query = window.location.search;
    dispatch(handleGetFilterProduct2(query)).then((data) => {
      dispatch(handleSetDataFilterProduct(data?.payload.products));
    });
  };
  // Handle filter product
  const handleFilterProduct = (data) => {
    if (!activePriceRange) data.priceRange = null;
    navigate(
      `/category/${data.category}?${
        data.category ? `category=${data.category}` : ""
      }${data.priceRange ? `&priceRange=${data.priceRange}` : ""}${
        data.price ? `&price=${data.price}` : ""
      }`
    );
    const query = window.location.search;
    dispatch(handleGetFilterProduct2(query)).then((data) => {
      setResultFound(data?.payload.result);
      setPageCount(Math.ceil(data?.payload.result / 20));
      dispatch(handleSetDataFilterProduct(data?.payload.products));
    });
    setQuerySearch(query);
  };

  const handleFilterProductByInputSearch = (e) => {
    if (e.key === "Enter") {
      navigate(`?category=all&filter=${e.target.value}`);
      const query = window.location.search;
      dispatch(handleGetFilterProduct2(query)).then((data) => {
        dispatch(handleSetDataFilterProduct(data?.payload.products));
        setResultFound(data?.payload.result);
        setPageCount(Math.ceil(data?.payload.result / 20));
      });
      setQuerySearch(query);
      e.target.value = "";
    }
  };

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      const data = await dispatch(handleGetProductByCategory(categoryProduct));
      dispatch(handleSetDataCategoryProduct(data?.payload?.products));
      setResultFound(data?.payload.result);
      setPageCount(data?.payload.result / 20);
      setLoading(false);
    }
    fetchProduct();
    return () => {
      dispatch(handleSetDataFilterProduct([]));
      dispatch(handleSetDataCategoryProduct([]));
    };
  }, [dispatch, categoryProduct]);

  return (
    <div className="pt-[120px] flex items-start lg:justify-center px-2">
      <aside className="w-1/5 sm:hidden lg:block">
        <h2 className="uppercase font-medium text-sm mb-2">CATEGORY</h2>
        <form onSubmit={handleSubmit(handleFilterProduct)}>
          <div>
            <div>
              <input
                type="radio"
                name="category"
                id="all"
                value="all"
                {...register("category")}
                className="input__radio hidden"
                defaultChecked={categoryProduct === "all"}
              />
              <label htmlFor="all" className="custom__inputRadio text-sm">
                All Product
              </label>
            </div>
            <div>
              <input
                type="radio"
                name="category"
                id="computer,laptop"
                value="computer,laptop"
                {...register("category")}
                className="input__radio hidden"
                defaultChecked={categoryProduct === "computer,laptop"}
              />
              <label
                htmlFor="computer,laptop"
                className="custom__inputRadio text-sm"
              >
                Computer & Laptop
              </label>
            </div>
            <div>
              <input
                id="phone"
                type="radio"
                value="phone"
                name="category"
                {...register("category")}
                className="input__radio hidden"
                defaultChecked={categoryProduct === "phone"}
              />
              <label htmlFor="phone" className="custom__inputRadio text-sm">
                SmartPhone
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="headphone"
                name="category"
                value="headphone"
                {...register("category")}
                className="input__radio hidden"
                defaultChecked={categoryProduct === "headphone"}
              />
              <label htmlFor="headphone" className="custom__inputRadio text-sm">
                Headphone
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="accessories"
                name="accessories"
                value="accessories"
                {...register("category")}
                className="input__radio hidden"
                defaultChecked={categoryProduct === "accessories"}
              />
              <label
                htmlFor="accessories"
                className="custom__inputRadio text-sm"
              >
                Accessories
              </label>
            </div>
            <div>
              <input
                type="radio"
                name="category"
                id="camera&photo"
                value="camera&photo"
                {...register("category")}
                className="input__radio hidden"
                defaultChecked={categoryProduct === "camera"}
              />
              <label
                htmlFor="camera&photo"
                className="custom__inputRadio text-sm"
              >
                Camera & Photo
              </label>
            </div>
            <div>
              <input
                type="radio"
                name="category"
                id="appliances"
                value="tv"
                {...register("category")}
                className="input__radio hidden"
                defaultChecked={categoryProduct === "tv"}
              />
              <label
                htmlFor="appliances"
                className="custom__inputRadio text-sm"
              >
                TV & Homes Appliances
              </label>
            </div>
          </div>
          <hr className="my-4 w-11/12" />
          <div className="w-11/12">
            <h2 className="uppercase font-medium text-sm">PRICE RANGE</h2>
            <input
              min={0}
              step={1}
              max={10000}
              type="range"
              defaultValue={1000}
              {...register("priceRange")}
              className="h-1 w-full mb-4"
              onInput={(e) => {
                dispatch(handleSetActivePriceRange(true));
                dispatch(handleSetMaxPrice(e.target.value));
              }}
            />
            <div className="flex items-start gap-x-2 mb-2">
              <p className="w-2/4 border border-slate-200 p-1 text-sm text-slate-500 text-center">
                0
              </p>
              <p className="w-2/4 border border-slate-200 p-1 text-sm text-slate-500 text-center">
                {maxPriceText === 0 ? "Max price" : maxPriceText}
              </p>
            </div>
            <div>
              <div>
                <input
                  type="radio"
                  name="price"
                  id="all price"
                  value={"all price"}
                  {...register("price")}
                  className="input__radio hidden"
                />
                <label
                  htmlFor="all price"
                  className="custom__inputRadio text-sm"
                >
                  All price
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  name="price"
                  id="under20"
                  value={"20"}
                  {...register("price")}
                  className="input__radio hidden"
                />
                <label htmlFor="under20" className="custom__inputRadio text-sm">
                  Under 20$
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  name="price"
                  id="25to100"
                  value={"25-100"}
                  {...register("price")}
                  className="input__radio hidden"
                />
                <label htmlFor="25to100" className="custom__inputRadio text-sm">
                  25$ to 100$
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  name="price"
                  id="100to300"
                  value={"100-300"}
                  {...register("price")}
                  className="input__radio hidden"
                />
                <label
                  htmlFor="100to300"
                  className="custom__inputRadio text-sm"
                >
                  100$ to 300$
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  name="price"
                  id="300to10000"
                  value={"300-10000"}
                  {...register("price")}
                  className="input__radio hidden"
                />
                <label
                  htmlFor="300to10000"
                  className="custom__inputRadio text-sm"
                >
                  300$ to 10000$
                </label>
              </div>
            </div>
          </div>
          <hr className="my-4 w-11/12" />
          <button className="text-white font-medium bg-orange-color flex justify-center mx-auto items-center px-10 py-2 text-sm hover:bg-orange-500 transition-all">
            APPLY
          </button>
        </form>
      </aside>
      <div className="w-3/4 sm:w-full">
        <div className="mb-5  items-center justify-between sm:hidden lg:flex">
          <div className="flex-1 flex items-center gap-x-5">
            <div className="w-2/4 relative">
              <input
                type="search"
                className="w-full outline-none pl-2 py-2 text-sm rounded-sm border border-slate-300"
                placeholder="Search for anything..."
                onKeyDown={handleFilterProductByInputSearch}
              />
            </div>
            <span className="text-sm">
              {resultFound}{" "}
              <span className="text-slate-500">Results found</span>
            </span>
          </div>
          <div className="styled-select relative select-none">
            <span className="mr-4 text-sm">Sort by:</span>
            <select
              name=""
              id=""
              className="outline-none border border-slate-300 pl-2 py-2 min-w-[160px] text-sm cursor-pointer"
              onChange={(e) => {
                setSortBy(e.target.value);
                navigate(
                  `${
                    querySearch
                      ? `${querySearch}&sortPrice=${
                          e.target.value ? e.target.value : ""
                        }`
                      : `?category=${categoryProduct}&sortPrice=${e.target.value}`
                  }`
                );
                const query = window.location.search;
                dispatch(handleGetFilterProduct2(query)).then((data) => {
                  console.log(data);
                  dispatch(handleSetDataFilterProduct(data?.payload.products));
                });
              }}
            >
              <option value="all">Price: All price</option>
              <option value="asc">Price: Lowest First</option>
              <option value="desc">Price: Highest First</option>
            </select>
            <IoIosArrowDown className="absolute right-0 top-2/4 -translate-y-2/4 mr-2" />
          </div>
        </div>
        <div className="grid lg:grid-cols-5 lg:gap-4 sm:grid-cols-2 sm:gap-y-5 sm:gap-x-4 sm:px-5 lg:px-0">
          {loading
            ? Array.from({ length: 20 }).map((_, index) => (
                <ProductItem key={index} data={null} loadingProduct={loading} />
              ))
            : dataFilterProduct.length > 0
            ? dataFilterProduct
                .slice(0, 20)
                .map((product) => (
                  <ProductItem key={product._id} data={product} />
                ))
            : dataCategoryProduct
                .slice(0, 20)
                .map((product) => (
                  <ProductItem key={product._id} data={product} />
                ))}
        </div>
        {loading ? (
          <div className="w-60 h-10 bg-gray-200 animate-pulse mt-10 mb-20 mx-auto rounded-sm"></div>
        ) : (
          <div className="mt-14">
            <ReactPaginate
              breakLabel="..."
              nextLabel=">"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pageCount || 1}
              previousLabel="<"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ShopPage;
