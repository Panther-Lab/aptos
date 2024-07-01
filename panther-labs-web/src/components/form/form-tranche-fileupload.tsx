import { Icons } from "@/components/icons";

export function TrancheFileUpload() {
  return (
    <div className="max-w-3xl space-y-6">
      <p>
        For custom tranche structures, you can use our upload functionality.
      </p>
      <div className="flex flex-col gap-y-4 rounded-md border bg-secondary p-6">
        <div className="flex items-center gap-4 ">
          <Icons.file />
          <label htmlFor="file">
            Drop your file here or{" "}
            <span className="cursor-pointer underline">Select a file</span>
            <input id="file" type="file" className="opacity-0" />
          </label>
        </div>
        <p className="text-sm text-muted-foreground">
          Filetypes supported: .csv
        </p>
      </div>
    </div>
  );
}
