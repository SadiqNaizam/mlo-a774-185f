import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu as MenuIcon, Sparkles } from 'lucide-react';
import GadgetThemedNavLink from '@/components/GadgetThemedNavLink'; // Assuming this path
import AnimatedCartIcon from '@/components/AnimatedCartIcon'; // Assuming this path

const ThemedHeader: React.FC = () => {
  console.log('ThemedHeader loaded');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const commonNavLinks = (
    <>
      <GadgetThemedNavLink to="/" gadgetName="Anywhere Door" onClick={() => setIsMobileMenuOpen(false)}>
        Home
      </GadgetThemedNavLink>
      <GadgetThemedNavLink to="/menu" gadgetName="Gourmet Tablecloth" onClick={() => setIsMobileMenuOpen(false)}>
        Menu
      </GadgetThemedNavLink>
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-blue-700/40 bg-blue-500 text-white shadow-lg">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
          <Sparkles className="h-8 w-8 text-yellow-300" />
          <span className="text-2xl font-bold tracking-tight" style={{ fontFamily: "'Comic Sans MS', 'Chalkboard SE', cursive" }}>
            Doraemon Delights
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {commonNavLinks}
        </nav>

        <div className="flex items-center gap-3">
          <AnimatedCartIcon />
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:bg-blue-600 hover:text-yellow-300">
                  <MenuIcon className="h-7 w-7" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] bg-blue-500 text-white border-l-blue-700/40 p-6">
                <SheetHeader className="mb-6">
                  <SheetTitle className="text-2xl font-bold text-yellow-300 flex items-center gap-2">
                    <Sparkles className="h-7 w-7" />
                    Navigation
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-y-5">
                  {commonNavLinks}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ThemedHeader;