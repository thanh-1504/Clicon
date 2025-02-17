export const handleCalculateMoneyShoppingCart = (data) => {
  const money = (data?.payload?.cart || data)?.reduce((total, order) => {
    return total + order.quantity * order.product.sellingPrice;
  }, 0);
  return money;
};
