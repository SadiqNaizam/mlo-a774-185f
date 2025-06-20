import React from 'react';
import { Link } from 'react-router-dom';
import ThemedHeader from '@/components/layout/ThemedHeader';
import ThemedFooter from '@/components/layout/ThemedFooter';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ShoppingBag } from 'lucide-react'; // Using ShoppingBag as a generic "order" icon

const OrderConfirmationPage: React.FC = () => {
  console.log('OrderConfirmationPage loaded');

  // Placeholder order data - in a real app, this would come from state or props
  const orderDetails = {
    orderNumber: 'DORA-RMN-12345XYZ',
    items: [
      { name: "Doraemon's Favorite Dorayaki", quantity: 2, price: 3.50 },
      { name: 'Memory Bread Toastie', quantity: 1, price: 4.20 },
      { name: 'Anywhere Door Donut', quantity: 3, price: 2.80 },
    ],
    totalCost: 19.60,
    estimatedDelivery: '30-45 minutes',
    customerName: 'Nobita', // Placeholder name
  };

  return (
    <div className="flex flex-col min-h-screen bg-sky-50 font-sans"> {/* Playful font could be set globally or here */}
      <ThemedHeader />
      <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12">
        <Card className="w-full max-w-lg bg-white shadow-2xl rounded-2xl border-4 border-blue-400 overflow-hidden transform transition-all hover:scale-[1.01] duration-300">
          <CardHeader className="text-center bg-gradient-to-br from-blue-400 to-sky-500 p-6 rounded-t-xl relative">
            <img 
              src="https://upload.wikimedia.org/wikipedia/en/c/c8/Doraemon_character.png" 
              alt="Happy Doraemon" 
              className="w-28 h-28 mx-auto mb-4 rounded-full border-4 border-white shadow-lg object-cover"
            />
            <div className="flex items-center justify-center text-white">
              <CheckCircle2 className="w-10 h-10 mr-3" />
              <CardTitle className="text-3xl sm:text-4xl font-bold" style={{ fontFamily: "'Comic Sans MS', 'Chalkboard SE', cursive" }}>
                Order Placed!
              </CardTitle>
            </div>
            <CardDescription className="text-lg text-sky-100 mt-2">
              Hooray, {orderDetails.customerName}! Your delicious treats are on their way!
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6 space-y-5 text-gray-700">
            <div className="text-center">
              <p className="text-sm text-gray-500">Your Order Number is:</p>
              <p className="text-2xl font-bold text-red-600 tracking-wider py-1 px-3 bg-yellow-100 inline-block rounded-md border border-yellow-300 mt-1">
                {orderDetails.orderNumber}
              </p>
            </div>
            
            <div className="border-t border-b border-gray-200 py-4 space-y-3">
              <h3 className="text-xl font-semibold text-blue-700 flex items-center">
                <ShoppingBag className="w-5 h-5 mr-2 text-blue-600" />
                Order Summary
              </h3>
              <ul className="space-y-1 text-sm">
                {orderDetails.items.map((item, index) => (
                  <li key={index} className="flex justify-between">
                    <span>{item.name} (x{item.quantity})</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <p className="text-right font-bold text-xl mt-2 text-blue-800">
                Total: ${orderDetails.totalCost.toFixed(2)}
              </p>
            </div>

            <div className="text-center bg-sky-100 p-4 rounded-lg border border-sky-200">
              <p className="text-md font-medium text-blue-700">
                Estimated Arrival: <span className="font-bold text-sky-600">{orderDetails.estimatedDelivery}</span>
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Get ready for a magical meal, prepared with Doraemon's secret ingredients!
              </p>
            </div>
          </CardContent>

          <CardFooter className="p-6 bg-blue-50 rounded-b-xl border-t-2 border-blue-200">
            <Button asChild size="lg" className="w-full bg-yellow-400 hover:bg-yellow-500 text-blue-800 font-bold py-3 text-lg transition-transform duration-150 ease-in-out hover:scale-105 active:scale-95 focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2">
              <Link to="/menu">Back to Menu & More Fun!</Link>
            </Button>
          </CardFooter>
        </Card>
      </main>
      <ThemedFooter />
    </div>
  );
};

export default OrderConfirmationPage;