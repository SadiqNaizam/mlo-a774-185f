import React from 'react';
import { Link } from 'react-router-dom';
import { Button, type ButtonProps } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface GadgetThemedNavLinkProps {
  to: string;
  gadgetName: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  buttonVariant?: ButtonProps['variant'];
  tooltipSide?: 'top' | 'bottom' | 'left' | 'right';
}

const GadgetThemedNavLink: React.FC<GadgetThemedNavLinkProps> = ({
  to,
  gadgetName,
  children,
  icon,
  className,
  buttonVariant = 'default',
  tooltipSide = 'bottom',
}) => {
  console.log(`GadgetThemedNavLink loaded for path: ${to}, gadget: ${gadgetName}`);

  // Base classes for the button, allowing for customization via className prop
  const baseButtonClasses = `
    group
    relative
    overflow-hidden
    transform
    transition-all
    duration-200
    ease-in-out
    hover:scale-105
    active:scale-95
    hover:shadow-md
    focus-visible:outline-none
    focus-visible:ring-2
    focus-visible:ring-offset-2
    focus-visible:ring-blue-400 
    dark:focus-visible:ring-blue-500
  `;

  return (
    <Tooltip delayDuration={300}>
      <TooltipTrigger asChild>
        <Button
          asChild
          variant={buttonVariant}
          className={`${baseButtonClasses} ${className || ''}`}
        >
          <Link to={to} className="flex items-center justify-center gap-2 w-full h-full">
            {icon && <span className="flex-shrink-0">{icon}</span>}
            <span className="truncate">{children}</span>
            
            {/* Subtle glow effect on hover */}
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-sky-400 opacity-0 group-hover:opacity-15 transition-opacity duration-300 pointer-events-none mix-blend-multiply dark:bg-sky-600 dark:group-hover:opacity-20"
            />
          </Link>
        </Button>
      </TooltipTrigger>
      <TooltipContent 
        side={tooltipSide} 
        className="bg-gray-900 text-white border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600"
      >
        <p className="text-xs font-semibold">{gadgetName}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default GadgetThemedNavLink;