"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Pen, Menu } from "lucide-react";
import { cn } from "../lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function LandingPageNavbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const routes = [
    {
      href: "#features",
      label: "Features",
    },
    {
      href: "#pricing",
      label: "Pricing",
    },
    {
      href: "#testimonials",
      label: "Testimonials",
    },
  ];

  return (
    <header className=" bg-black fixed top-0 left-0 right-0 flex w-full  bg-background/80 backdrop-blur-md z-50 border-b px-8 py-2 justify-center items-center">
      <div className="container">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <Pen className="h-6 w-6 text-primary" />
            <Link href="/" className="font-bold text-xl">
              Frinz
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "hover:text-primary transition-colors",
                  pathname === route.href && "text-primary"
                )}
              >
                {route.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/auth/sign-in">
              <Button variant="default" size="sm">
                Sign in
              </Button>
            </Link>
            <Link href="/auth/sign-up">
              <Button size="sm">Start Writing</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <nav className="flex flex-col gap-4">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className="hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {route.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 pt-4 border-t">
                <Link href="/auth/sign-in" className="w-full">
                  <Button variant="default" size="sm" className="w-full">
                    Sign in
                  </Button>
                </Link>
                <Link href="/auth/sign-up" className="w-full">
                  <Button size="sm" className="w-full">
                    Start Writing
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
