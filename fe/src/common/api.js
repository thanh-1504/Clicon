 const domain = "https://clicon-5ti2.onrender.com/api/v1";
// const domain = "http://localhost:3000/api/v1";
export const api = {
  signUp: {
    url: `${domain}/user/signup`,
    method: "post",
  },
  signIn: {
    url: `${domain}/user/signin`,
    method: "post",
  },
  signOut: {
    url: `${domain}/user/signout`,
    method: "get",
  },
  updateUser: {
    url: `${domain}/user/update-user`,
    method: "post",
  },
  editUser: {
    url: `${domain}/user/edit-user`,
    method: "post",
  },
  createUser: {
    url: `${domain}/user/create-user`,
    method: "post",
  },
  deleteUser: {
    url: `${domain}/user/delete-user`,
    method: "post",
  },
  getUser: {
    url: `${domain}/user/get-user`,
    method: "get",
  },
  getUsers: {
    url: `${domain}/user/all-users`,
    method: "get",
  },
  addProduct: {
    url: `${domain}/product/add-product`,
    method: "post",
  },
  getProducts: {
    url: `${domain}/product`,
    method: "get",
  },
  getProductByTypeCategory: {
    url: `${domain}/product/category`,
    method: "get",
  },
  getFilterProduct: {
    url: `${domain}/product/filter`,
    method: "get",
  },
  getDetailProduct: {
    url: `${domain}/product`,
    method: "get",
  },
  deleteProduct: {
    url: `${domain}/product/delete-product`,
    method: "post",
  },
  editProduct: {
    url: `${domain}/product/edit-product`,
    method: "post",
  },
  addToCard: {
    url: `${domain}/cart/add-cart`,
    method: "post",
  },
  getAllProductInCart: {
    url: `${domain}/cart`,
    method: "get",
  },
  updateProductInCart: {
    url: `${domain}/cart/update-cart`,
    method: "post",
  },
  deleteProductInCart: {
    url: `${domain}/cart/delete-cart`,
    method: "post",
  },
  deleteAllProductInCart: {
    url: `${domain}/cart/delete-cart`,
    method: "post",
  },
  checkOut: {
    url: `${domain}/payment`,
    method: "post",
  },
};
