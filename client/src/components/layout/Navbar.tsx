import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Menu, X, User as UserIcon, LogOut, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const [location] = useLocation();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Style Test", href: "/style-test" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  if (user) {
    navLinks.splice(2, 0, { name: "My Style", href: "/my-style" });
  }

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-effect">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Sparkles className="w-6 h-6 text-primary group-hover:text-accent-foreground transition-colors" />
            <span className="font-display font-bold text-2xl tracking-tight">GenFashionAI</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location === link.href ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 px-2 hover:bg-secondary/50 rounded-full">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                      {user.displayName?.charAt(0) || <UserIcon className="w-4 h-4" />}
                    </div>
                    <span className="font-medium">{user.displayName || "Profile"}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <Link href="/my-style">
                    <DropdownMenuItem className="cursor-pointer">My Style</DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/sign-in">
                <Button className="rounded-full px-6 transition-transform hover:-translate-y-0.5">
                  Sign In
                </Button>
              </Link>
            )}
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-b border-border absolute top-20 left-0 right-0 shadow-lg">
          <div className="px-4 py-6 space-y-4 flex flex-col">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-lg font-medium p-2 block rounded-lg ${
                  location === link.href ? "bg-secondary text-primary" : "text-muted-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="pt-4 border-t border-border flex flex-col gap-2">
              {user ? (
                <>
                  <div className="flex items-center gap-3 p-2">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                      {user.displayName?.charAt(0) || <UserIcon className="w-5 h-5" />}
                    </div>
                    <span className="font-medium text-lg">{user.displayName || "Profile"}</span>
                  </div>
                  <Button variant="outline" className="w-full justify-start mt-2 text-destructive" onClick={() => { handleLogout(); setMobileMenuOpen(false); }}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <Link href="/sign-in" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full py-6 text-lg rounded-xl">Sign In</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
