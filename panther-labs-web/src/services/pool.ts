import axios from "axios";

import { serviceUrls } from "@/lib/network";
import { pool, poolRes } from "@/types/pool";

const createPool = `${serviceUrls.pool}/create`;
const getPool = `${serviceUrls.pool}/get`;
const updatePool = `${serviceUrls.pool}/update`;

export const createPoolService = (data: pool) => {
  return axios.post(createPool, data);
};

export const getPoolsService = async (): Promise<poolRes[]> => {
  return axios.get(getPool).then((response) => response.data);
};

export const addTrancheService = async (data: pool) => {
  return axios.patch(updatePool, {
    ...data,
  });
};
