"use client";

import { useEffect, useState } from "react";
import { ThemeToggle } from "./theme-toggle";

const navItems = [
  { label: "About", href: "#about", id: "about" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export function Navbar() {
  const [active, setActive] = useState("about");

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
        rootMargin: "-40% 0px -50% 0px", // triggers near center
      },
    );

    navItems.forEach((item) => {
      const section = document.getElementById(item.id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <span className="font-semibold text-lg">
          Harmil<span className="text-primary">.</span>
        </span>

        <div className="flex items-center gap-4">
          <nav className="hidden md:flex gap-6 text-sm">
            {navItems.map((item) => {
              const isActive = active === item.id;

              return (
                <a
                  key={item.id}
                  href={item.href}
                  className={`relative pb-1 transition-colors
                    ${
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }
                  `}
                >
                  {item.label}
                  <span
                    className={`
                      absolute left-0 -bottom-0.5 h-[2px] w-full rounded-full
                      bg-primary transition-all duration-300
                      ${
                        isActive
                          ? "scale-x-100 opacity-100"
                          : "scale-x-0 opacity-0"
                      }
                      origin-left
                    `}
                  />
                </a>
              );
            })}
          </nav>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
