"use client";

import { useEffect, useState } from "react";
import { ThemeToggle } from "./theme-toggle";

const navItems = [
  { label: "Home", href: "#home", id: "home" },
  { label: "About", href: "#about", id: "about" },
  { label: "services", href: "#services", id: "services" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export function Navbar() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-40% 0px -50% 0px",
      },
    );

    navItems.forEach((item) => {
      const section = document.getElementById(item.id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/10 shadow-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <span className="font-semibold text-lg tracking-tight select-none">
          Harmil<span className="text-primary font-bold">.</span>
        </span>

        <div className="flex items-center gap-4">
          <nav className="hidden md:flex gap-2 text-sm bg-sunken/40 p-1 rounded-xl border border-border/10 shadow-inset-sm">
            {navItems.map((item) => {
              const isActive = active === item.id;

              return (
                <a
                  key={item.id}
                  href={item.href}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all duration-250 select-none
                    ${
                      isActive
                        ? "text-primary shadow-inset-sm bg-secondary/80 border border-border/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-background/40"
                    }
                  `}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="shadow-sm border border-border/20 rounded-lg bg-background hover:shadow-md active:shadow-inset-sm transition-all duration-200">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
