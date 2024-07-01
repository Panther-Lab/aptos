import { Icons } from "@/components/icons";

export function Search() {
  return (
    <div className="flex h-10 items-center gap-2 rounded-sm border bg-[#F2F2F2] p-3">
      <Icons.search className="h-max w-max shrink-0" />
      <input
        className="w-max bg-transparent text-sm font-semibold placeholder:text-muted-foreground focus-within:outline-none"
        placeholder="Search"
      />
    </div>
  );
}
