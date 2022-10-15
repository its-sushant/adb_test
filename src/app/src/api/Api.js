import axios from "axios";

const getAll = () => {
  const All = axios.get("http://localhost:8000/todos/");
  return All;
};

const create = (data) => {
  axios.post("http://localhost:8000/todos/", data);
};

export default {
  getAll,
  create,
};
