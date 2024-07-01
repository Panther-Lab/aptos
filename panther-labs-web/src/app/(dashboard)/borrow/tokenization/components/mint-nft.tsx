"use client";

import { Button } from "@/components/ui/button";

import { useWallet, InputTransactionData } from '@aptos-labs/wallet-adapter-react';
import { MoveFunctionId, Aptos, MoveFunctionGenericTypeParam } from "@aptos-labs/ts-sdk";
import { toast } from "@/components/ui/use-toast";
import { NFT } from "@/types/nft";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { updateStatusService } from "@/services/nft";
import { getAptosClient } from "@/utils/aptosClient";
import {TAGS} from "@/config/tags"

type MintNFTProps = {
  data: NFT;
};

export function MintNFT(props: MintNFTProps) {
  const { wallets, connected, disconnect, isLoading, account, network, signAndSubmitTransaction } = useWallet();

  const [transactionInProgress, setTransactionInProgress] =useState<boolean>(false);
  const document_name=props.data.documentName;
  const description=props.data.description;
  const portfolio_term=props.data.Portfolio_Term;
  const principal_amount=parseInt(props.data.principal,10);
  const no_of_loans=parseInt(props.data.No_of_Loan,10);
  const total_principal_amount=parseInt(props.data.Total_Principal_Amount,10);
  const average_interest_rate=parseInt(props.data.Average_Interest_Rate,10);
  const portfolio_status=props.data.Portfolio_Status;
  const write_down=parseInt(props.data.Writedown);
  const write_off=parseInt(props.data.Writeoff);
  const maturity_date=props.data.Maturity_Date;
  const functionArguments=[document_name,description,portfolio_term,principal_amount,no_of_loans,total_principal_amount,average_interest_rate,portfolio_status,write_down,write_off,maturity_date];
  const functionName=`${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}::qiro::create_token`;
  //const [isLoading, setIsLoading] = useState<boolean>(false);
  const { mutate,isPending } = useMutation({
    mutationFn: updateStatusService,
    mutationKey: [TAGS.NFT]
  });
  async function handleMint() {
    if (!account) return;
  setTransactionInProgress(true);
  const transaction:InputTransactionData = {
  data:{
      function: functionName as MoveFunctionId,
      functionArguments: functionArguments,
    }
  };
  try {
    if(props?.data?.id) {
      mutate(props.data.id);
    const response = await signAndSubmitTransaction(transaction);
    const client = getAptosClient();
    await client.waitForTransaction(response.hash);
    console.log('Transaction successful!');
    }
   } catch (error) {
      console.log('Error executing function:', error);
    } finally {
      setTransactionInProgress(false);
    }
  }
  return (
    <Button onClick={() => handleMint()}>
      {isPending ? "Minting..." : "Mint"}
    </Button>
  );
}
