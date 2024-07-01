import { serviceUrls } from "@/lib/network";
import { NFT } from "@/types/nft";
import axios, { AxiosResponse } from "axios";

const createNFT = `${serviceUrls.nft}/create`;
const getNFTs = `${serviceUrls.nft}/get`;
const updateStatus = `${serviceUrls.nft}/update`;

export const createNFTservice = (data: NFT) => {
  return axios.post(createNFT, data);
};

export const getNFTService = async (): Promise<NFT[]> => {
  return axios.get(getNFTs).then((response) => response.data);
};

export const updateStatusService = async (id: number) => {
  return axios.patch(updateStatus, {
    id,
  });
};
