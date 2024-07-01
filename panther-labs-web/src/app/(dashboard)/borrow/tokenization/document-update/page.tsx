import { DocumentUpdateTable } from "./document-update";
import { Button } from "@/components/ui/button";

function DocumentUpdatePage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-semibold">NFTs</h1>
        <Button className="gap-2">Mint NFT</Button>
      </div>
      <DocumentUpdateTable />
    </div>
  );
}

export default DocumentUpdatePage;
