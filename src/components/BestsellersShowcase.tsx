import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ThemedFoodItemCard from '@/components/ThemedFoodItemCard'; // Assuming this component exists

// Define the props for ThemedFoodItemCard based on its expected usage
// This should ideally be imported from ThemedFoodItemCard.tsx if available
interface ThemedFoodItemCardProps {
  id: string;
  slug: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  // Add any other props ThemedFoodItemCard might expect, e.g., badges, dietary_info
}

const bestsellerItems: ThemedFoodItemCardProps[] = [
  {
    id: '1',
    slug: 'dorayaki-delight',
    name: 'Dorayaki Delight',
    price: 3.50,
    description: "Doraemon's absolute favorite! Sweet red bean paste sandwiched between fluffy pancakes.",
    imageUrl: 'https://placehold.co/400x300/E0F2FE/0284C7?text=Dorayaki', // Placeholder image
  },
  {
    id: '2',
    slug: 'memory-bread-toasties',
    name: 'Memory Bread Toasties',
    price: 4.20,
    description: 'Delicious toast that helps you remember... how tasty it is!',
    imageUrl: 'https://placehold.co/400x300/E0F2FE/0284C7?text=Memory+Bread',
  },
  {
    id: '3',
    slug: 'anywhere-door-donuts',
    name: 'Anywhere Door Donuts',
    price: 2.80,
    description: 'Sweet glazed donuts that will transport your taste buds to happiness.',
    imageUrl: 'https://placehold.co/400x300/E0F2FE/0284C7?text=Anywhere+Door+Donut',
  },
  {
    id: '4',
    slug: 'bamboo-copter-bites',
    name: 'Bamboo Copter Bites',
    price: 5.00,
    description: 'Light and airy puff pastries that will make you feel like flying.',
    imageUrl: 'https://placehold.co/400x300/E0F2FE/0284C7?text=Bamboo+Copter+Bites',
  },
  {
    id: '5',
    slug: 'time-furoshiki-tarts',
    name: 'Time Furoshiki Tarts',
    price: 3.75,
    description: 'Fruity tarts that are timelessly delicious, a perfect treat any day!',
    imageUrl: 'https://placehold.co/400x300/E0F2FE/0284C7?text=Time+Furoshiki+Tart',
  },
  {
    id: '6',
    slug: 'nobitas-favorite-ramen',
    name: "Nobita's Favorite Ramen",
    price: 6.50,
    description: 'A comforting bowl of ramen, just the way Nobita likes it after a long day.',
    imageUrl: 'https://placehold.co/400x300/E0F2FE/0284C7?text=Nobita_s+Ramen',
  },
];

const BestsellersShowcase: React.FC = () => {
  console.log('BestsellersShowcase loaded');

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-sky-100"> {/* Doraemon-themed light blue background */}
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-sky-700 mb-8 sm:mb-12">
          Doraemon's Favorites!
        </h2>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-xs sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl mx-auto"
        >
          <CarouselContent className="-ml-4">
            {bestsellerItems.map((item) => (
              <CarouselItem key={item.id} className="pl-4 basis-full sm:basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 group">
                <div className="p-1 h-full flex"> {/* Added h-full and flex for consistent card height if needed */}
                  <ThemedFoodItemCard
                    id={item.id}
                    slug={item.slug}
                    name={item.name}
                    price={item.price}
                    description={item.description}
                    imageUrl={item.imageUrl}
                    // The ThemedFoodItemCard is assumed to handle its own internal structure and animations
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-[-20px] sm:left-[-50px] top-1/2 -translate-y-1/2 z-10 h-10 w-10 sm:h-12 sm:w-12 bg-white/80 hover:bg-white border-sky-500 text-sky-500 hover:text-sky-600 rounded-full shadow-md hidden md:flex" />
          <CarouselNext className="absolute right-[-20px] sm:right-[-50px] top-1/2 -translate-y-1/2 z-10 h-10 w-10 sm:h-12 sm:w-12 bg-white/80 hover:bg-white border-sky-500 text-sky-500 hover:text-sky-600 rounded-full shadow-md hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
};

export default BestsellersShowcase;