"use client";

import Link from "next/link";
import { Menu, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "./ThemeToggle";
import { authClient } from "@/lib/auth-client";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Ideas", href: "/ideas" },
  { name: "Add Idea", href: "/add-idea", private: true },
  { name: "My Ideas", href: "/my-ideas", private: true },
  { name: "My Interactions", href: "/my-interactions", private: true },
];

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  console.log(user);
  const handleLogout = async () => {
    await authClient.signOut();
  };

  const filteredLinks = navLinks.filter((link) => !link.private || user);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Lightbulb className="h-6 w-6 text-yellow-500" />
          <span className="text-xl font-bold tracking-tight">IdeaVault</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {filteredLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-primary"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Actions (Theme & Profile) */}
        <div className="flex items-center space-x-4">
          <ThemeToggle />

          {isPending ? (
            <div className="flex items-center gap-2">
              <div className="w-20 h-4 rounded bg-gray-300 animate-pulse" />
              <div className="w-8 h-8 rounded-full bg-gray-300 animate-pulse" />
            </div>
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-9 w-9 rounded-full"
                >
                  <Avatar className="h-9 w-9">
                    <AvatarImage
                      referrerPolicy="no-referrer"
                      src={user?.image}
                      alt={user?.name}
                    />
                    <AvatarFallback>
                      {user?.name ? user.name.charAt(0) : "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile Management</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-destructive"
                  onSelect={handleLogout}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex items-center space-x-2">
              <Button variant="ghost" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Register</Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full sm:w-80">
                <SheetHeader>
                  <SheetTitle className="flex items-center space-x-2">
                    <Lightbulb className="h-6 w-6 text-yellow-500" />
                    <span className="text-xl font-bold tracking-tight">
                      IdeaVault
                    </span>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col space-y-3 px-4">
                  {filteredLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-base font-semibold"
                    >
                      {link.name}
                    </Link>
                  ))}

                  {!user && <hr className="my-2 border-t" />}

                  {!user && (
                    <>
                      <Link href="/login" className="text-base font-semibold">
                        Login
                      </Link>
                      <Link
                        href="/register"
                        className="text-base font-semibold"
                      >
                        Register
                      </Link>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
