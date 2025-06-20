import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ShoppingCart } from 'lucide-react';
import { toast } from "sonner";

interface ThemedFoodItemCardProps {
  id: string | number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  doraemonMotifImageUrl?: string; // Optional URL for a small Doraemon motif image
}

const ThemedFoodItemCard: React.FC<ThemedFoodItemCardProps> = ({
  id,
  name,
  price,
  description,
  imageUrl,
  doraemonMotifImageUrl,
}) => {
  console.log(`ThemedFoodItemCard loaded for item: ${name}, ID: ${id}`);

  const handleAddToCart = () => {
    // In a real application, this would likely call a prop to update a global cart state.
    // For this component, we'll simulate the action and show a toast.
    console.log(`Adding item ${id} (${name}) to cart.`);
    toast.success(`${name} added to cart!`, {
      description: `Price: $${price.toFixed(2)}`,
      // Example action, can be customized or removed
      // action: {
      //   label: "View Cart",
      //   onClick: () => console.log("Navigate to cart (placeholder)"),
      // },
    });
  };

  return (
    <Card className="w-full overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1.5 group relative bg-white border-2 border-blue-300 rounded-xl shadow-lg hover:shadow-blue-400/50 flex flex-col">
      {doraemonMotifImageUrl && (
        <img
          src={doraemonMotifImageUrl}
          alt="Doraemon Motif"
          className="absolute top-2.5 right-2.5 w-12 h-12 z-10 opacity-70 group-hover:opacity-100 transition-all duration-300 transform group-hover:rotate-[15deg] group-hover:scale-110"
        />
      )}
      <CardHeader className="p-0 relative">
        <AspectRatio ratio={16 / 9}>
          <img
            src={imageUrl || 'https://via.placeholder.com/400x225.png?text=Delicious+Food'}
            alt={name}
            className="object-cover w-full h-full rounded-t-lg group-hover:scale-105 transition-transform duration-300 ease-in-out"
          />
        </AspectRatio>
        {/* Example of a subtle thematic element directly in JSX if no image URL is provided */}
        {/* {!doraemonMotifImageUrl && (
          <div className="absolute top-2 right-2 p-1.5 bg-yellow-400 rounded-full z-10 shadow-md">
            <Bell className="w-5 h-5 text-red-600" />
          </div>
        )} */}
      </CardHeader>

      <CardContent className="p-4 space-y-3 flex-grow">
        <CardTitle className="text-xl lg:text-2xl font-bold text-blue-700 group-hover:text-sky-600 transition-colors duration-300 line-clamp-2">
          {name}
        </CardTitle>
        <p className="text-sm text-gray-700 line-clamp-3 h-[4.5rem] leading-relaxed"> {/* Adjusted height for 3 lines of text-sm with leading-relaxed */}
          {description}
        </p>
        <p className="text-2xl font-semibold text-red-600 pt-1">
          ${price.toFixed(2)}
        </p>
      </CardContent>

      <CardFooter className="p-4 border-t border-blue-200 bg-blue-50/50 rounded-b-lg">
        <Button
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-blue-800 font-bold text-base py-3 transition-all duration-300 ease-in-out group-hover:shadow-md group-hover:tracking-wide"
          onClick={handleAddToCart}
          aria-label={`Add ${name} to cart`}
        >
          <ShoppingCart className="mr-2.5 h-5 w-5" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ThemedFoodItemCard;