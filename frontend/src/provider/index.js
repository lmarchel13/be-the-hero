import axios from "axios";
import config from "../config";

const { baseURL } = config;

export default axios.create({ baseURL });
