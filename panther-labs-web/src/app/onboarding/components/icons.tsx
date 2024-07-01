import {
    BadgeCent,
    BarChart,
    BetweenVerticalEnd,
    BookCheck,
    Building2,
    CheckIcon,
    ChevronsUpDown,
    LayoutDashboard,
    type LucideProps,
    MoveRight,
    Pencil,
    PieChart,
    Plus,
    User2,
    ShieldHalf,
    FileStack,
    Info,
  } from "lucide-react";
  
  export const Icons = {
    policy: ShieldHalf,
    applications: FileStack,
    info: Info,
    profile: User2,
    company: Building2,
    finacial: BadgeCent,
    visualization: BarChart,
    ration: PieChart,
    verticalend: BetweenVerticalEnd,
    check: CheckIcon,
    sort: ChevronsUpDown,
    dashboard: LayoutDashboard,
    documents: BookCheck,
    rightArrow: MoveRight,
    edit: Pencil,
    plus: Plus,
    redx: (props: LucideProps) => (
      <svg {...props} viewBox="0 0 455.111 455.111">
        <circle
          style={{ fill: "#E24C4B" }}
          cx="227.556"
          cy="227.556"
          r="227.556"
        />
        <path
          style={{ fill: "#D1403F" }}
          d="M455.111,227.556c0,125.156-102.4,227.556-227.556,227.556c-72.533,0-136.533-32.711-177.778-85.333
      c38.4,31.289,88.178,49.778,142.222,49.778c125.156,0,227.556-102.4,227.556-227.556c0-54.044-18.489-103.822-49.778-142.222
      C422.4,91.022,455.111,155.022,455.111,227.556z"
        />
        <path
          style={{ fill: "#FFFFFF" }}
          d="M331.378,331.378c-8.533,8.533-22.756,8.533-31.289,0l-72.533-72.533l-72.533,72.533
      c-8.533,8.533-22.756,8.533-31.289,0c-8.533-8.533-8.533-22.756,0-31.289l72.533-72.533l-72.533-72.533
      c-8.533-8.533-8.533-22.756,0-31.289c8.533-8.533,22.756-8.533,31.289,0l72.533,72.533l72.533-72.533
      c8.533-8.533,22.756-8.533,31.289,0c8.533,8.533,8.533,22.756,0,31.289l-72.533,72.533l72.533,72.533
      C339.911,308.622,339.911,322.844,331.378,331.378z"
        />
      </svg>
    ),
    google: (props: LucideProps) => (
      <svg role="img" viewBox="0 0 24 24" {...props}>
        <path
          fill="currentColor"
          d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
        />
      </svg>
    ),
  };