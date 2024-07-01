import { type Icon } from "@/components/icons";

export type Chain = {
  label: string;
  value: string;
  chainId: string;
  Icon: (props: Icon) => JSX.Element;
};

export type EVM_ADDRESS = `0x${string}`;
