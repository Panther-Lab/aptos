import { NFT } from "@/types/nft";
import { JSONFilePreset } from "lowdb/node";

type NFTWithLock = NFT & {
  id: number;
  locked?: boolean;
  minted?: boolean;
};

type Data = {
  NFTs: NFTWithLock[];
};
const defaultData: Data = {
  NFTs: [],
};

export async function getNFTsDB() {
  const db = await JSONFilePreset("nft.json", defaultData);
  return db;
}

export async function createNFT(data: NFTWithLock) {
  const db = await getNFTsDB();
  db.data.NFTs.push(data);
  db.write();
}

export async function updateStatus(nftId: number) {
  const db = await getNFTsDB();
  const nft = db.data.NFTs.find((nft) => nft.id === nftId);
  if (nft) {
    console.log(nft)
    nft.minted = true;
    await db.write();
    console.log(nft.minted)
  } else {
    console.log(`NFT with id ${nftId} not found.`);
  }
}
