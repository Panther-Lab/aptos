import Image from "next/image";

type SiteLogoProps = {
  size?: "small" | "default";
};

export function SiteLogo({ size = "small" }: SiteLogoProps) {
  return (
    <Image
      width={size === "small" ? 72 : 200}
      height={size === "small" ? 52 : 200}
      src={"/logo.svg"}
      alt="qiro logo"
    ></Image>
  );
}
