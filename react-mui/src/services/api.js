import axios from "axios";

const BASE_URL = "https://catalog-management-system-dev-ak3ogf6zea-uc.a.run.app/cms/products";

export const fetchProducts = async (page = 1) => {
  const res = await axios.get(`${BASE_URL}?page=${page}`);
  return res.data;
};

export const fetchProductById = async (id) => {
  const res = await axios.get(`${BASE_URL}/${id}`);
  return res.data;
};
