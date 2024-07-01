import React from "react";
import { DocumentTable } from "./components/documents-table";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import Link from "next/link";
import { siteRoutes } from "@/config/site";

const DocumentTablePage: React.FC = () => {
  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-semibold">Documents</h1>
          <Link href={`${siteRoutes.tokenization}/create-document`}>
            <Button className="gap-2">
              <Icons.plusSquare />
              Create New Document
            </Button>
          </Link>
        </div>
        <DocumentTable />
      </div>
    </>
  );
};

export default DocumentTablePage;
