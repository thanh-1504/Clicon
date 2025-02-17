import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "../common/api";
export const handleSignUp = createAsyncThunk("user/signup", async (data) => {
  try {
    const response = axios({
      url: api.signUp.url,
      method: api.signUp.method,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    });
    const dataResponse = (await response).data;
    if (data?.signInWithGoogle) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          displayName: dataResponse.data?.name,
          email: dataResponse.data?.email,
          userPicture: dataResponse.data?.userPicture,
          role: dataResponse.data?.role,
          signInWithGoogle: dataResponse.data?.signInWithGoogle,
        })
      );
    }
    return dataResponse;
  } catch (err) {
    console.log(err);
    return err;
  }
});

export const handleSignIn = createAsyncThunk("user/signin", async (data) => {
  try {
    const response = await axios({
      url: api.signIn.url,
      method: api.signIn.method,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
      withCredentials: true,
    });
    const dataResponse = await response.data;
    localStorage.setItem(
      "user",
      JSON.stringify({
        displayName: dataResponse.data.name,
        email: dataResponse.data.email,
        userPicture: dataResponse.data.userPicture,
        role: dataResponse.data.role,
        signInWithGoogle: dataResponse.data?.signInWithGoogle,
      })
    );
    return dataResponse;
  } catch (err) {
    console.log(err);
    return err;
  }
});

export const handleSignOut = createAsyncThunk("user/signout", async () => {
  try {
    const response = await axios({
      url: api.signOut.url,
      method: api.signOut.method,
      withCredentials: true,
    });
    const dataResponse = await response.data;
    return dataResponse;
  } catch (err) {
    console.log(err);
    return err;
  }
});

export const handleUpdateUser = createAsyncThunk(
  "user/updateUser",
  async (data) => {
    try {
      const userBeforeUpdate = JSON.parse(localStorage.getItem("user")) || {};
      const response = await axios({
        url: api.updateUser.url,
        method: api.updateUser.method,
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(data),
      });
      const dataResponse = await response.data;
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...userBeforeUpdate,
          displayName: dataResponse.data.name,
          userPicture: dataResponse.data.userPicture,
        })
      );
      return dataResponse;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
);

export const handleEditUser = createAsyncThunk(
  "user/updateUser",
  async (data) => {
    try {
      const response = await axios({
        url: `${api.editUser.url}/${data.userId}`,
        method: api.editUser.method,
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(data),
      });
      const dataResponse = await response.data;
      return dataResponse;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
);

export const handleCreateNewUser = createAsyncThunk(
  "user/createUser",
  async (data) => {
    try {
      const response = await axios({
        url: api.createUser.url,
        method: api.createUser.method,
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(data),
      });
      const dataResponse = await response.data;
      return dataResponse;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
);

export const handleGetUser = createAsyncThunk("user/getUser", async () => {
  try {
    const response = await axios({
      url: api.getUser.url,
      method: api.getUser.method,
      withCredentials: true,
    });
    const dataResponse = await response.data;
    return dataResponse;
  } catch (err) {
    console.log(err);
    return err;
  }
});

export const handleGetAllUsers = createAsyncThunk("user/allUsers", async () => {
  try {
    const response = await axios({
      url: api.getUsers.url,
      method: api.getUsers.method,
      withCredentials: true,
    });
    const dataResponse = await response.data;
    return dataResponse;
  } catch (err) {
    console.log(err);
    return err;
  }
});

export const handleDeleteUser = createAsyncThunk(
  "user/delete",
  async (userId) => {
    try {
      const response = await axios({
        url: `${api.deleteUser.url}/${userId}`,
        method: api.deleteUser.method,
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({ userId }),
      });
      const dataResponse = await response.data;
      return dataResponse;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
);

export const handleCreateProduct = createAsyncThunk(
  "product/createProduct",
  async (data) => {
    try {
      const response = await axios({
        url: api.addProduct.url,
        method: api.addProduct.method,
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(data),
      });
      const dataResponse = await response.data;
      return dataResponse;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
);

export const handleGetAllProduct = createAsyncThunk(
  "product/getProducts",
  async () => {
    try {
      const response = await axios({
        method: api.getProducts.method,
        url: api.getProducts.url,
        withCredentials: true,
      });
      const dataResponse = await response.data;
      return dataResponse;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
);

export const handleGetDetailProduct = createAsyncThunk(
  "product/getDetailProduct",
  async (id) => {
    try {
      const response = await axios({
        method: api.getDetailProduct.method,
        url: `${api.getDetailProduct.url}/${id}`,
      });
      const dataResponse = await response.data;
      return dataResponse;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
);

export const handleGetProductByCategory = createAsyncThunk(
  "product/getProductByCategory",
  async (typeProduct) => {
    try {
      const response = await axios({
        url: `${api.getProductByTypeCategory.url}/${typeProduct}`,
        method: api.getProductByTypeCategory.method,
        withCredentials: true,
      });
      const dataResponse = await response.data;
      return dataResponse;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
);

export const handleGetFilterProduct2 = createAsyncThunk(
  "product/filter",
  async (query) => {
    try {
      const response = await axios({
        url: `${api.getFilterProduct.url}${query}`,
        method: api.getFilterProduct.method,
        withCredentials: true,
      });
      const dataResponse = await response.data;
      return dataResponse;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
);

export const handleDeleteCurrentProduct = createAsyncThunk(
  "product/delete",
  async (idProduct) => {
    try {
      const response = await axios({
        url: `${api.deleteProduct.url}/${idProduct}`,
        method: api.deleteProduct.method,
        withCredentials: true,
      });
      return response;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
);

export const handleEditProduct = createAsyncThunk(
  "product/edit",
  async ({ productIdEdit, data }) => {
    try {
      const response = await axios({
        url: `${api.editProduct.url}/${productIdEdit}`,
        method: api.editProduct.method,
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(data),
      });
      return response;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
);

export const handleAddProductToCart = createAsyncThunk(
  "cart/add",
  async (data) => {
    try {
      const response = await axios({
        url: api.addToCard.url,
        method: api.addToCard.method,
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(data),
      });
      const dataResponse = await response.data;
      return dataResponse;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
);

export const handleGetAllProductInCart = createAsyncThunk(
  "cart/getAllProductInCart",
  async () => {
    try {
      const response = await axios({
        url: api.getAllProductInCart.url,
        method: api.getAllProductInCart.method,
        withCredentials: true,
      });
      const dataResponse = await response.data;
      return dataResponse;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
);

export const handleUpdateProductIncart = createAsyncThunk(
  "order/updateOrder",
  async ({ id, quantity }) => {
    try {
      const response = await axios({
        url: `${api.updateProductInCart.url}/${id}`,
        method: api.updateProductInCart.method,
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({ quantity }),
      });
      const dataResponse = await response.data;
      return dataResponse;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
);

export const handleDeleteProductInCart = createAsyncThunk(
  "order/deleteOrder",
  async (id) => {
    try {
      const response = await axios({
        url: `${api.deleteProductInCart.url}/${id}`,
        method: api.deleteProductInCart.method,
        withCredentials: true,
      });
      const dataResponse = await response.data;
      return dataResponse;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
);

export const handleDeleteAllProductInCart = createAsyncThunk(
  "cart/deleteAllProductInCart",
  async () => {
    try {
      const response = await axios({
        url: api.deleteAllProductInCart.url,
        method: api.deleteAllProductInCart.method,
        withCredentials: true,
      });
      const dataResponse = await response.data;
      return dataResponse;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
);

export const handleCheckout = createAsyncThunk(
  "order/checkout",
  async (data) => {
    console.log(data);
    try {
      const response = await axios({
        url: api.checkOut.url,
        method: api.checkOut.method,
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(data),
      });
      const dataResponse = await response.data;
      return dataResponse;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
);

export const handleCreateOrder = createAsyncThunk(
  "order/create",
  async (data) => {
    try {
      const response = await axios({
        url: api.createOrder.url,
        method: api.createOrder.method,
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(data),
      });
      const dataResponse = await response.data;
      return dataResponse;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
);
