"use client";

import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <span className="font-semibold text-lg">
          Harmil<span className="text-primary">.</span>
        </span>

        <div className="flex items-center gap-4">
          <nav className="hidden md:flex gap-6 text-sm text-muted-foreground">
            <a href="#about" className="hover:text-foreground">
              About
            </a>
            <a href="#skills" className="hover:text-foreground">
              Skills
            </a>
            <a
              href="#projects"
              className="hover:text-foreground transition-colors"
            >
              Projects
            </a>
            <a href="#contact" className="hover:text-foreground">
              Contact
            </a>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
