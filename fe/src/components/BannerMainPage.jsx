const listImageBanner = ["/images/bannerImage.jpg", "/images/bannerImage3.jpg"];
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
function BannerMainPage() {
  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: false,
    lazyLoad: true,
    fade: true,
  };
  return (
    <Slider {...settings}>
      {listImageBanner.map((image) => {
        return (
          <div key={image} className="w-full h-[300px]">
            <img
              src={image}
              alt="image banner"
              className="w-full h-full object-cover"
            />
          </div>
        );
      })}
    </Slider>
  );
}
export default BannerMainPage;
