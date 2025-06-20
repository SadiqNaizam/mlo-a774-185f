import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ThemedHeader from '@/components/layout/ThemedHeader';
import ThemedFooter from '@/components/layout/ThemedFooter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Plus, Minus, ShoppingBag, Smile } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  // A slug might be useful for linking back to the product page if one existed
  // slug: string; 
}

const initialCartItems: CartItem[] = [
  { id: 'dorayaki-1', name: 'Dorayaki Delight', price: 3.50, quantity: 2, imageUrl: 'https://placehold.co/100x100/E0F2FE/0284C7?text=Dorayaki' },
  { id: 'memory-bread-2', name: 'Memory Bread Toasties', price: 4.20, quantity: 1, imageUrl: 'https://placehold.co/100x100/E0F2FE/0284C7?text=Memory+Bread' },
  { id: 'anywhere-door-donuts-3', name: 'Anywhere Door Donuts', price: 2.80, quantity: 3, imageUrl: 'https://placehold.co/100x100/E0F2FE/0284C7?text=Donuts' },
];

const CartPage: React.FC = () => {
  console.log('CartPage loaded');
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const navigate = useNavigate();

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity: Math.max(1, newQuantity) } : item
      )
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const calculateSubtotal = (price: number, quantity: number): number => {
    return price * quantity;
  };

  const calculateTotal = (): number => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const totalAmount = calculateTotal();

  // Effect to update AnimatedCartIcon count if it were managed globally
  // For now, this is conceptual as AnimatedCartIcon is in ThemedHeader
  useEffect(() => {
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    // In a real app: updateGlobalCartCount(totalItems);
    console.log(`Total items in cart: ${totalItems}`);
  }, [cartItems]);


  return (
    <div className="min-h-screen flex flex-col bg-sky-50 font-sans">
      <ThemedHeader />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-blue-700 mb-8 text-center" style={{ fontFamily: "'Comic Sans MS', 'Chalkboard SE', cursive" }}>
          Your Doraemon Goodie Bag! <ShoppingBag className="inline-block h-8 w-8 sm:h-10 sm:w-10 ml-2" />
        </h1>

        {cartItems.length === 0 ? (
          <Card className="text-center py-12 sm:py-16 bg-white shadow-xl border-blue-200 rounded-xl">
            <CardContent className="flex flex-col items-center justify-center">
              <Smile className="w-16 h-16 text-yellow-400 mb-6" />
              <h2 className="text-2xl font-semibold text-blue-600 mb-3">Your bag is empty!</h2>
              <p className="text-gray-600 mb-8">
                Looks like you haven't added any Doraemon treats yet.
              </p>
              <Button 
                size="lg" 
                className="bg-yellow-400 hover:bg-yellow-500 text-blue-800 font-bold text-lg"
                onClick={() => navigate('/menu')} // Navigate to menu page
              >
                Explore Menu &amp; Add Goodies
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Cart Items Table */}
            <div className="lg:col-span-8">
              <Card className="shadow-lg border-blue-200 rounded-xl overflow-hidden">
                <CardHeader className="bg-blue-100 border-b border-blue-200">
                  <CardTitle className="text-xl text-blue-700">Items in your Bag ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-blue-50">
                        <TableHead className="text-blue-700 font-semibold w-[45%] sm:w-[50%] pl-4 sm:pl-6">Product</TableHead>
                        <TableHead className="text-blue-700 font-semibold text-center">Price</TableHead>
                        <TableHead className="text-blue-700 font-semibold text-center w-[100px] sm:w-[150px]">Quantity</TableHead>
                        <TableHead className="text-blue-700 font-semibold text-right">Subtotal</TableHead>
                        <TableHead className="text-blue-700 font-semibold text-center pr-4 sm:pr-6">Remove</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cartItems.map(item => (
                        <TableRow key={item.id} className="border-b border-blue-100 hover:bg-sky-50 transition-colors">
                          <TableCell className="font-medium py-4 pl-4 sm:pl-6">
                            <div className="flex items-center gap-3 sm:gap-4">
                              <img 
                                src={item.imageUrl} 
                                alt={item.name} 
                                className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md border border-blue-200"
                              />
                              <span className="text-sm sm:text-base text-gray-800">{item.name}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-center text-gray-700 text-sm sm:text-base">${item.price.toFixed(2)}</TableCell>
                          <TableCell className="text-center">
                            <div className="flex items-center justify-center gap-1 sm:gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-7 w-7 sm:h-8 sm:w-8 border-blue-300 text-blue-600 hover:bg-blue-100"
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                aria-label="Decrease quantity"
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <Input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value, 10) || 1)}
                                className="w-10 sm:w-12 h-7 sm:h-8 text-center border-blue-300 focus:ring-blue-500"
                                min="1"
                                aria-label={`${item.name} quantity`}
                              />
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-7 w-7 sm:h-8 sm:w-8 border-blue-300 text-blue-600 hover:bg-blue-100"
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                aria-label="Increase quantity"
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell className="text-right text-gray-800 font-medium text-sm sm:text-base">
                            ${calculateSubtotal(item.price, item.quantity).toFixed(2)}
                          </TableCell>
                          <TableCell className="text-center pr-4 sm:pr-6">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-500 hover:text-red-700 hover:bg-red-100"
                              onClick={() => handleRemoveItem(item.id)}
                              aria-label={`Remove ${item.name} from cart`}
                            >
                              <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-4">
              <Card className="shadow-lg border-blue-200 rounded-xl sticky top-24"> {/* Sticky for desktop */}
                <CardHeader className="bg-blue-100 border-b border-blue-200">
                  <CardTitle className="text-xl text-blue-700">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                    <span>${totalAmount.toFixed(2)}</span>
                  </div>
                  {/* Placeholder for shipping/discounts */}
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping (Anywhere Door Express!)</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <hr className="my-2 border-blue-200" />
                  <div className="flex justify-between text-xl font-bold text-blue-800">
                    <span>Total</span>
                    <span>${totalAmount.toFixed(2)}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-3 p-6 border-t border-blue-200">
                  <Button
                    size="lg"
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-blue-800 font-bold text-lg py-3"
                    onClick={() => navigate('/checkout')} // Navigate to checkout page
                  >
                    Proceed to Checkout
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full border-blue-500 text-blue-600 hover:bg-blue-50 hover:text-blue-700 py-3"
                    onClick={() => navigate('/menu')} // Navigate to menu page
                  >
                    Continue Shopping
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </main>
      <ThemedFooter />
    </div>
  );
};

export default CartPage;