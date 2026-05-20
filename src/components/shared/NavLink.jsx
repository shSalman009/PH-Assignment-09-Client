"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ href, className, children }) => {
  const pathname = usePathname();

  const isActive = href === pathname;

  return (
    <Link
      href={href}
      className={`${isActive ? "text-primary" : ""} ${className}`}
    >
      {children}
    </Link>
  );
};

export default NavLink;
