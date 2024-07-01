import { Icons } from "@/components/icons";

export function SiteFooter() {
  return (
    <footer>
      <div className="w-full bg-[#353535]">
        <div className="container flex max-w-6xl flex-col items-center justify-between py-6 md:flex-row">
          <p className="text-secondary">© 2024, Qiro All Rights Reserved.</p>
          <div className="flex items-center gap-5">
            <Icons.twitter />
            <Icons.telegram />
            <Icons.github />
            <Icons.discord className="mt-2" />
          </div>
        </div>
      </div>
    </footer>
  );
}
