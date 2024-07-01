export type PoolDescriptionProps = {
  title: string;
  headline: string;
  description: string;
  links: {
    label: string;
    href: string;
  }[];
  APY: string;
  poolStats: PoolStatProps[];
};

export type PoolStatProps = {
  label: string;
  data: string;
  toolTip: string;
};
