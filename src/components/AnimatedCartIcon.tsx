import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
// import { ShoppingBag } from 'lucide-react'; // Icon can be added inside the pocket if desired

interface AnimatedCartIconProps {
  itemCount: number;
}

const AnimatedCartIcon: React.FC<AnimatedCartIconProps> = ({ itemCount }) => {
  console.log('AnimatedCartIcon loaded with itemCount:', itemCount);

  return (
    <Link
      to="/cart"
      id="animated-cart-icon-target" // For potential external animation targeting
      aria-label={`View cart with ${itemCount} items`}
      className="relative group inline-block p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-full"
    >
      <motion.div
        key={itemCount} // Re-trigger animation when itemCount changes
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.15, 1] }} // Subtle pulse animation
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="relative" // Container for the pocket and badge
      >
        {/* Doraemon's 4D Pocket visual */}
        <div
          className="w-16 h-8 bg-white border-[3px] border-blue-600 rounded-b-full shadow-md group-hover:shadow-lg transition-shadow duration-300 flex items-center justify-center"
          aria-hidden="true" // Decorative element
        >
          {/* Optional: An icon like ShoppingBag could be placed here if desired */}
          {/* <ShoppingBag className="w-5 h-5 text-blue-700" /> */}
        </div>

        {/* Item Count Badge */}
        <AnimatePresence>
          {itemCount > 0 && (
            <motion.div
              initial={{ scale: 0, opacity: 0, y: 5 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0, opacity: 0, y: 5 }}
              transition={{ type: 'spring', stiffness: 500, damping: 25 }}
              // Position the badge relative to the motion.div container
              className="absolute -top-2.5 -right-2.5"
            >
              <Badge
                variant="destructive" // Red badge for count
                className="flex items-center justify-center w-6 h-6 p-0 rounded-full text-xs font-semibold"
              >
                {itemCount > 99 ? '99+' : itemCount}
              </Badge>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Link>
  );
};

export default AnimatedCartIcon;