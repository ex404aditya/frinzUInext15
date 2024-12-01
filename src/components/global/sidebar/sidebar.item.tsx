import Link from "next/link";
import { cn } from "@/lib/utils";

interface SidebarItemProps {
  title: string;
  href: string;
  icon?: React.ReactNode;
  selected?: boolean;
  isNote?: boolean;
}

export const SidebarItem = ({
  title,
  href,
  icon,
  selected = false,
  isNote = false,
}: SidebarItemProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "flex flex-row items-center gap-3 p-2 rounded-lg transition-all duration-200",
        "hover:bg-neutral-100/10 hover:text-foreground",
        selected && "bg-neutral-100/10 text-foreground",
        isNote && "pl-6"
      )}
    >
      {icon && (
        <div className={cn(
          "flex items-center justify-center w-5 h-5",
          "text-muted-foreground transition-colors duration-200",
          "group-hover:text-foreground",
          selected && "text-foreground"
        )}>
          {icon}
        </div>
      )}
      <span className={cn(
        "text-sm font-medium truncate",
        "text-muted-foreground",
        selected && "text-foreground"
      )}>
        {title}
      </span>
    </Link>
  );
};