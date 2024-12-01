import { Button } from "@/components/ui/button";
import { Pen, Github, Twitter } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t mt-8">
      <div className="container mx-auto py-12 px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Pen className="h-6 w-6 text-primary" />
            <span className="font-bold">Frinz</span>
          </div>
          <div className="flex gap-6">
            <Button variant="ghost" size="icon" asChild>
              <a href="#" aria-label="GitHub">
                <Github className="h-6 w-6" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="#" aria-label="Twitter">
                <Twitter className="h-6 w-6" />
              </a>
            </Button>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="text-muted-foreground">
            &copy; 2024 Frinz. All rights reserved.
          </div>
          <div className="flex gap-6">
            <Button variant="link" asChild>
              <Link href="#">Privacy</Link>
            </Button>
            <Button variant="link" asChild>
              <Link href="#">Terms</Link>
            </Button>
            <Button variant="link" asChild>
              <Link href="#">Contact</Link>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
