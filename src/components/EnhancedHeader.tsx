"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import { config } from "@/config";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FunctionComponent, useState } from "react";

interface MenuItem {
  name: string;
  href: string;
  openInNewTab?: boolean;
}

const menuItems: MenuItem[] = [
  { name: "Blog", href: "/" },
  { name: "About", href: "/about" },
  { name: "Travel Map", href: "/map" },
  { name: "Spain Guide", href: "/spain" },
];

export const EnhancedNavigation: FunctionComponent = () => {
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
              "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
              "hover:bg-accent hover:text-accent-foreground hover:scale-105",
              pathname === item.href 
                ? "bg-accent/50 text-accent-foreground font-semibold" 
                : "text-muted-foreground"
            )}
          >
            {item.name}
          </Link>
        ))}
        <div className="ml-4">
          <DarkModeToggle />
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden flex items-center space-x-2">
        <DarkModeToggle />
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <button 
              className="p-2 rounded-lg hover:bg-accent transition-colors duration-200"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6 animate-fade-in" />
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
                      "flex items-center justify-center px-4 py-3 rounded-xl",
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

            {/* Mobile Menu Footer */}
            <div className="absolute bottom-8 left-0 right-0 px-6">
              <div className="flex items-center justify-between pt-6 border-t">
                <span className="text-sm text-muted-foreground">
                  © {new Date().getFullYear()} {config.blog.copyright}
                </span>
                <DarkModeToggle />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export const EnhancedHeader: FunctionComponent = () => {
  return (
    <header className="flex items-center justify-between mt-8 md:mt-16 mb-12 animate-fade-in">
      <Link 
        href="/"
        className="group"
      >
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight transition-all duration-300 hover:scale-105 hover:text-primary">
          {config.blog.name}
        </h1>
      </Link>
      <EnhancedNavigation />
    </header>
  );
};