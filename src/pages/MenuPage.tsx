import React, { useState } from 'react';
import ThemedHeader from '@/components/layout/ThemedHeader';
import ThemedFooter from '@/components/layout/ThemedFooter';
import ThemedFoodItemCard from '@/components/ThemedFoodItemCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  // DialogTrigger, // We will trigger dialog programmatically via a button click
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Eye } from 'lucide-react';
import { toast } from "sonner";

// Interface for FoodItem (matches ThemedFoodItemCardProps and includes category)
interface FoodItem {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  doraemonMotifImageUrl?: string;
  category: string;
}

// Sample data for food items
const allFoodItems: FoodItem[] = [
  // Main Courses
  {
    id: 'mc1',
    name: "Nobita's Favorite Ramen",
    price: 12.99,
    description: "A hearty and comforting bowl of ramen, just like Nobita's mom makes it. Guaranteed to make you feel better after a tough day with Gian!",
    imageUrl: 'https://placehold.co/400x225/A7F3D0/10B981?text=Nobita_s+Ramen',
    doraemonMotifImageUrl: 'https://static.vecteezy.com/system/resources/previews/010/036/095/original/bell-icon-transparent-background-free-png.png', // A bell, like Doraemon's
    category: 'Main Courses',
  },
  {
    id: 'mc2',
    name: 'Gian Stew Surprise',
    price: 15.50,
    description: "A surprisingly delicious and very filling stew. WARNING: May induce spontaneous singing. Consume at your own risk!",
    imageUrl: 'https://placehold.co/400x225/FBCFE8/EC4899?text=Gian+Stew',
    doraemonMotifImageUrl: 'https://cdn-icons-png.flaticon.com/512/189/189115.png', // Microphone icon
    category: 'Main Courses',
  },
  {
    id: 'mc3',
    name: "Shizuka's Sweet Potato Bake",
    price: 10.00,
    description: "A healthy and delightful baked sweet potato dish, as sweet and kind as Shizuka herself. Perfect for a light meal.",
    imageUrl: 'https://placehold.co/400x225/DDD6FE/8B5CF6?text=Shizuka+Bake',
    doraemonMotifImageUrl: 'https://cdn-icons-png.flaticon.com/512/2809/2809913.png', // Violin icon
    category: 'Main Courses',
  },
  // Side Dishes
  {
    id: 'sd1',
    name: 'Small Light Fries',
    price: 3.50,
    description: "Crispy fries made with potatoes exposed to the Small Light. They're perfectly bite-sized and extra crunchy!",
    imageUrl: 'https://placehold.co/400x225/F3F4F6/D1D5DB?text=Small+Fries',
    category: 'Side Dishes'
  },
  {
    id: 'sd2',
    name: "Take-copter Veggie Sticks",
    price: 4.00,
    description: "Fresh vegetable sticks served with a creamy dip. So light and healthy, they'll make you want to fly!",
    imageUrl: 'https://placehold.co/400x225/ECFCCB/84CC16?text=Veggie+Sticks',
    doraemonMotifImageUrl: 'https://cdn-icons-png.flaticon.com/512/7068/7068063.png', // Bamboo copter sketch
    category: 'Side Dishes'
  },
  // Desserts
  {
    id: 'ds1',
    name: 'Dorayaki Tower',
    price: 8.75,
    description: "Doraemon's ultimate dream! A towering stack of fluffy dorayaki pancakes filled with sweet red bean paste. Share if you dare!",
    imageUrl: 'https://placehold.co/400x225/FDE68A/F59E0B?text=Dorayaki+Tower',
    doraemonMotifImageUrl: 'https://cdn-icons-png.flaticon.com/512/5660/5660085.png', // Dorayaki icon
    category: 'Desserts',
  },
  {
    id: 'ds2',
    name: 'Memory Bread Pudding',
    price: 6.50,
    description: "A warm, comforting bread pudding made with slices of 'Memory Bread'. You'll never forget how delicious this is!",
    imageUrl: 'https://placehold.co/400x225/BFDBFE/3B82F6?text=Memory+Pudding',
    doraemonMotifImageUrl: 'https://cdn-icons-png.flaticon.com/512/2600/2600205.png', // Toast icon
    category: 'Desserts',
  },
  // Drinks
  {
    id: 'dr1',
    name: 'Bamboo Copter Cooler',
    price: 4.99,
    description: "A refreshing blue lemonade that will make you feel like you're soaring through the sky. Non-alcoholic, but highly uplifting!",
    imageUrl: 'https://placehold.co/400x225/93C5FD/2563EB?text=Bamboo+Cooler',
    doraemonMotifImageUrl: 'https://cdn-icons-png.flaticon.com/512/3081/3081970.png', // Juice/drink icon
    category: 'Drinks',
  },
  {
    id: 'dr2',
    name: "Time Machine Tea",
    price: 5.25,
    description: "A soothing herbal tea blend that tastes timeless. Each sip is a journey through flavor. What era will you visit?",
    imageUrl: 'https://placehold.co/400x225/A5F3FC/0891B2?text=Time+Tea',
    doraemonMotifImageUrl: 'https://cdn-icons-png.flaticon.com/512/1047/1047270.png', // Clock icon
    category: 'Drinks',
  },
];

const categories = ['Main Courses', 'Side Dishes', 'Desserts', 'Drinks'];

const MenuPage = () => {
  console.log('MenuPage loaded');
  const [selectedItem, setSelectedItem] = useState<FoodItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleViewDetails = (item: FoodItem) => {
    setSelectedItem(item);
    setIsDialogOpen(true);
  };

  const handleAddToCartFromDialog = (item: FoodItem | null) => {
    if (!item) return;
    // In a real app, this would call a context function or Redux action to update the cart.
    console.log(`Adding item ${item.id} (${item.name}) to cart from dialog.`);
    toast.success(`${item.name} added to cart!`, {
      description: `Price: $${item.price.toFixed(2)}`,
    });
    setIsDialogOpen(false); // Close dialog after adding item
  };

  return (
    <div className="flex flex-col min-h-screen bg-sky-50" style={{ fontFamily: "'Arial', sans-serif" }}>
      <ThemedHeader />
      <ScrollArea className="flex-1">
        <main className="container mx-auto px-4 py-10 sm:px-6 lg:px-8">
          <section className="mb-12 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-blue-600" style={{ fontFamily: "'Comic Sans MS', 'Chalkboard SE', cursive" }}>
              Our Magical Menu
            </h1>
            <p className="mt-3 text-lg text-gray-700 max-w-2xl mx-auto">
              Discover delicious treats inspired by Doraemon's amazing gadgets and adventures with Nobita and friends!
            </p>
          </section>

          <Tabs defaultValue="Main Courses" className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 gap-2 mb-8 bg-blue-100 p-1.5 rounded-lg shadow-sm">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="py-2.5 text-sm font-medium text-blue-700 data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:shadow-md rounded-md transition-all duration-150 ease-in-out focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => (
              <TabsContent key={category} value={category} className="focus-visible:ring-0 focus-visible:outline-none">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
                  {allFoodItems
                    .filter((item) => item.category === category)
                    .map((item) => (
                      <div key={item.id} className="flex flex-col h-full"> {/* Wrapper for card and details button */}
                        <ThemedFoodItemCard
                          id={item.id}
                          name={item.name}
                          price={item.price}
                          description={item.description}
                          imageUrl={item.imageUrl}
                          doraemonMotifImageUrl={item.doraemonMotifImageUrl}
                        />
                        <Button
                          variant="outline"
                          className="mt-3 w-full border-blue-400 text-blue-600 hover:bg-blue-100 hover:text-blue-700 hover:border-blue-500 transition-colors duration-150 py-2.5"
                          onClick={() => handleViewDetails(item)}
                          aria-label={`View details for ${item.name}`}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </Button>
                      </div>
                    ))}
                    {allFoodItems.filter((item) => item.category === category).length === 0 && (
                        <p className="col-span-full text-center text-gray-500 py-10">
                            No items in this category yet. Doraemon is still inventing them!
                        </p>
                    )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </main>
      </ScrollArea>

      {selectedItem && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[550px] bg-white rounded-xl shadow-2xl border-blue-300 border-2">
            <DialogHeader className="pt-6 px-6 text-center">
              <DialogTitle className="text-2xl md:text-3xl font-bold text-blue-700" style={{ fontFamily: "'Comic Sans MS', 'Chalkboard SE', cursive" }}>
                {selectedItem.name}
              </DialogTitle>
              {selectedItem.doraemonMotifImageUrl && (
                <img 
                  src={selectedItem.doraemonMotifImageUrl} 
                  alt="Doraemon Motif" 
                  className="w-12 h-12 mx-auto my-2 opacity-80" 
                />
              )}
            </DialogHeader>
            <div className="px-6 py-4 space-y-4">
              <div className="w-full aspect-[16/10] rounded-lg overflow-hidden shadow-md border border-gray-200">
                 <img
                    src={selectedItem.imageUrl}
                    alt={selectedItem.name}
                    className="object-cover w-full h-full"
                  />
              </div>
              <DialogDescription className="text-base text-gray-700 leading-relaxed text-left pt-2">
                {selectedItem.description}
              </DialogDescription>
              <p className="text-3xl font-bold text-red-600 text-center pt-2">
                ${selectedItem.price.toFixed(2)}
              </p>
            </div>
            <DialogFooter className="px-6 pb-6 pt-4 bg-sky-50/70 rounded-b-lg sm:flex sm:justify-between gap-3">
              <Button 
                variant="outline" 
                onClick={() => setIsDialogOpen(false)}
                className="w-full sm:w-auto border-gray-400 text-gray-700 hover:bg-gray-100"
              >
                Close
              </Button>
              <Button 
                onClick={() => handleAddToCartFromDialog(selectedItem)}
                className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-500 text-blue-800 font-bold text-base py-3"
              >
                <ShoppingCart className="mr-2.5 h-5 w-5" />
                Add to Cart
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      <ThemedFooter />
    </div>
  );
};

export default MenuPage;