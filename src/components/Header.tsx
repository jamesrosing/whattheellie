"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import { NewsletterSubscribe } from "@/components/NewsletterSubscribe";
import { config } from "@/config";
import { cn } from "@/lib/utils";
import { Mail } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FunctionComponent, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface MenuItem {
  name: string;
  href: string;
  openInNewTab?: boolean;
}

const menuItems: MenuItem[] = [
  { name: "Blog", href: "/" },
  { name: "Travel Map", href: "/map" },
  { name: "Spain Guide", href: "/spain" },
];

export const Navigation: FunctionComponent = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav>
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-1">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "nav-text px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
              "hover:bg-accent hover:text-accent-foreground hover:scale-105",
              pathname === item.href 
                ? "bg-accent/50 text-accent-foreground font-semibold" 
                : "text-muted-foreground"
            )}
          >
            {item.name}
          </Link>
        ))}
        <div className="ml-4 flex items-center space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Mail className="h-4 w-4" />
                Subscribe
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Stay updated</h4>
                <p className="text-sm text-muted-foreground">
                  Get notified when new travel stories are published.
                </p>
                <NewsletterSubscribe variant="inline" />
              </div>
            </PopoverContent>
          </Popover>
          <DarkModeToggle />
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden flex items-center space-x-2">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <button
              className="p-2 group"
              aria-label="Open menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between items-end">
                <motion.span
                  className="h-[1.5px] bg-foreground rounded-full transition-all duration-300 group-hover:bg-primary"
                  initial={{ width: '100%' }}
                  animate={{ width: isOpen ? '0%' : '100%' }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="h-[1.5px] bg-foreground rounded-full transition-all duration-300 group-hover:bg-primary"
                  style={{ width: '75%' }}
                  animate={{ width: isOpen ? '0%' : '75%' }}
                  transition={{ duration: 0.3, delay: 0.05 }}
                />
                <motion.span
                  className="h-[1.5px] bg-foreground rounded-full transition-all duration-300 group-hover:bg-primary"
                  style={{ width: '50%' }}
                  animate={{ width: isOpen ? '0%' : '50%' }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                />
              </div>
            </button>
          </SheetTrigger>
          <SheetContent 
            side="right" 
            className="w-[85%] sm:w-[400px] animate-slide-in-right"
          >
            <SheetHeader className="sr-only">
              <SheetTitle>Navigation Menu</SheetTitle>
            </SheetHeader>
            
            <nav className="flex flex-col space-y-2 mt-8">
              {menuItems.map((item, index) => {
                const isActive = pathname === item.href;
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "nav-text flex items-center justify-center px-4 py-3 rounded-xl",
                      "text-lg font-medium transition-all duration-300",
                      "hover:bg-accent hover:shadow-md",
                      "animate-fade-in-up",
                      isActive 
                        ? "bg-accent/50 text-accent-foreground font-bold" 
                        : "text-muted-foreground hover:text-foreground"
                    )}
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animationFillMode: "backwards"
                    }}
                  >
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Newsletter Subscribe Section */}
            <div className="mt-8 px-2">
              <div className="border rounded-xl p-4 bg-accent/10">
                <div className="flex items-center gap-2 mb-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <h3 className="font-medium text-sm">Stay Updated</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Get notified when new travel stories are published.
                </p>
                <NewsletterSubscribe variant="inline" />
              </div>
            </div>

            {/* Theme Toggle Section */}
            <div className="mt-4 px-2">
              <div className="border rounded-xl p-4 bg-accent/10 flex items-center justify-between">
                <span className="font-medium text-sm">Theme</span>
                <DarkModeToggle />
              </div>
            </div>

            {/* Mobile Menu Footer */}
            <div className="absolute bottom-8 left-0 right-0 px-6">
              <div className="flex items-center justify-between pt-6 border-t">
                <span className="text-sm text-muted-foreground">
                  © {new Date().getFullYear()} {config.blog.copyright}
                </span>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export const Header: FunctionComponent = () => {
  return (
    <header className="relative flex items-center justify-between mt-4 md:mt-16 mb-4 md:mb-12 animate-fade-in">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 -mx-5 opacity-40 bg-gradient-to-r from-transparent via-accent/30 to-transparent blur-xl pointer-events-none" />

      {/* Mobile: Hamburger on left, title centered */}
      <div className="md:hidden w-full flex items-center justify-between relative z-10">
        <div className="flex-shrink-0">
          <Navigation />
        </div>
        <Link
          href="/"
          className="group absolute left-1/2 transform -translate-x-1/2"
        >
          <motion.h1
            className="hero-text transition-all duration-300 hover:scale-105 hover:text-primary"
            style={{ letterSpacing: '0.3em' }}
            initial={{ opacity: 0, letterSpacing: '0.5em', scale: 0.95 }}
            animate={{ opacity: 1, letterSpacing: '0.3em', scale: 1 }}
            transition={{
              duration: 1.2,
              ease: [0.23, 1, 0.32, 1],
              letterSpacing: { duration: 1.5 }
            }}
          >
            {config.blog.name}
          </motion.h1>
        </Link>
      </div>

      {/* Desktop: Title on left, nav on right */}
      <Link
        href="/"
        className="group hidden md:block relative z-10"
      >
        <motion.h1
          className="hero-text transition-all duration-300 hover:scale-105 hover:text-primary"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          {config.blog.name}
        </motion.h1>
      </Link>
      <div className="hidden md:block relative z-10">
        <Navigation />
      </div>
    </header>
  );
};