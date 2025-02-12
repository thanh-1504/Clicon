import { CiCreditCard1, CiHeadphones } from "react-icons/ci";
import { PiPackageLight } from "react-icons/pi";
import { TfiCup } from "react-icons/tfi";
function CustomerBenefits() {
  return (
    <div className="flex items-start border border-slate-300 mt-2 sm:hidden lg:flex">
      <div className="flex items-center gap-x-2 justify-center w-1/4 py-5 border-r ">
        <PiPackageLight className="w-7 h-7" />
        <div>
          <p className="text-xs font-medium uppercase">FASTED DELIVERY</p>
          <p className="text-xs text-gray-400">Deleviry in 24/H</p>
        </div>
      </div>
      <div className="flex items-center gap-x-2 justify-center w-1/4 py-5 border-r">
        <TfiCup className="w-6 h-6" />
        <div>
          <p className="text-xs font-medium uppercase">24 Hours Return</p>
          <p className="text-xs text-gray-400">100% money-back guarantee</p>
        </div>
      </div>
      <div className="flex items-center gap-x-2 justify-center w-1/4 py-5 border-r">
        <CiCreditCard1 className="w-7 h-7" />
        <div>
          <p className="text-xs font-medium uppercase">Secure Payment</p>
          <p className="text-xs text-gray-400">Your money is safe</p>
        </div>
      </div>
      <div className="flex items-center gap-x-2 justify-center w-1/4 py-5 border-r">
        <CiHeadphones className="w-7 h-7" />
        <div>
          <p className="text-xs font-medium uppercase">Support 24/7</p>
          <p className="text-xs text-gray-400">Live contact/message</p>
        </div>
      </div>
    </div>
  );
}

export default CustomerBenefits;
