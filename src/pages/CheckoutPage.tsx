import React, { useState }from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';

import ThemedHeader from '@/components/layout/ThemedHeader';
import ThemedFooter from '@/components/layout/ThemedFooter';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserRound, Home, Truck, CreditCard, Sparkles, ShoppingBag, PackageCheck, Bell } from 'lucide-react'; // Themed icons

// Zod schema for form validation
const checkoutSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters. Nobita needs to know who you are!" }),
  email: z.string().email({ message: "Please enter a valid email. Doraemon might send a surprise!" }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits. For quick updates!" }),
  orderType: z.enum(["delivery", "pickup"], { required_error: "Delivery or Pickup? Choose your adventure!" }),
  
  // Delivery specific fields - conditionally validated
  streetAddress: z.string().optional(),
  city: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().optional(),

  paymentMethod: z.enum(["creditCard", "gadgetPay", "timeMachineTransfer"], { required_error: "How will you pay for these amazing treats?" }),
  agreeToTerms: z.boolean().refine(val => val === true, { message: "You must agree to the terms. It's a promise!" }),
  specialInstructions: z.string().optional(),
}).refine(data => {
  if (data.orderType === 'delivery') {
    return !!data.streetAddress && data.streetAddress.length >= 5 &&
           !!data.city && data.city.length >= 2 &&
           !!data.postalCode && data.postalCode.length >= 4 &&
           !!data.country && data.country.length >= 2;
  }
  return true;
}, {
  message: "All address fields are required for delivery.",
  // This path can be tricky for multi-field validation; often individual field messages are better or a general form error.
  // For simplicity, if any delivery field is missing when 'delivery' is selected, this general message will show.
  // Or, one could set the path to one of the fields, e.g., 'streetAddress'.
  path: ["streetAddress"], 
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

const CheckoutPage: React.FC = () => {
  console.log('CheckoutPage loaded');
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      orderType: undefined, // Ensure it's undefined initially if not pre-selected
      streetAddress: '',
      city: '',
      postalCode: '',
      country: 'Dora-World', // Default country example
      paymentMethod: undefined,
      agreeToTerms: false,
      specialInstructions: '',
    },
  });

  const orderType = form.watch("orderType");

  const onSubmit = async (data: CheckoutFormValues) => {
    setIsSubmitting(true);
    console.log("Checkout form submitted:", data);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast.success("Order Placed Successfully!", {
      description: "Your Doraemon Delights are being prepared with magic!",
      icon: <PackageCheck className="h-5 w-5 text-green-500" />,
    });
    
    navigate("/order-confirmation", { state: { orderDetails: data } });
    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-sky-50">
      <ThemedHeader />
      <main className="flex-grow container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <img src="https://cdn-icons-png.flaticon.com/128/10404/10404274.png" alt="Doraemon Bell" className="w-16 h-16 mx-auto mb-3" />
            <h1 className="text-4xl font-bold text-blue-600" style={{ fontFamily: "'Comic Sans MS', 'Chalkboard SE', cursive" }}>
              Almost There, Friend!
            </h1>
            <p className="text-lg text-gray-600 mt-2">
              Just a few more details to get your yummy treats on their way!
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <Card className="shadow-lg border-blue-200 rounded-xl">
                <CardHeader className="bg-blue-100 rounded-t-xl border-b border-blue-200">
                  <CardTitle className="text-xl text-blue-700 flex items-center gap-2">
                    <UserRound className="h-6 w-6" /> Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-semibold">Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Nobita Nobi" {...field} className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-semibold">Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="e.g., nobita@doraemon.com" {...field} className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-semibold">Phone Number</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="e.g., 123-456-7890" {...field} className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card className="shadow-lg border-blue-200 rounded-xl">
                <CardHeader className="bg-blue-100 rounded-t-xl border-b border-blue-200">
                  <CardTitle className="text-xl text-blue-700 flex items-center gap-2">
                    <ShoppingBag className="h-6 w-6" /> Order Type
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <FormField
                    control={form.control}
                    name="orderType"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-gray-700 font-semibold">How would you like to receive your order?</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col sm:flex-row gap-4 sm:gap-6"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0 p-3 border border-gray-300 rounded-md hover:border-blue-400 transition-all has-[:checked]:bg-blue-50 has-[:checked]:border-blue-500">
                              <FormControl>
                                <RadioGroupItem value="delivery" />
                              </FormControl>
                              <FormLabel className="font-normal flex items-center gap-2 cursor-pointer">
                                <Truck className="h-5 w-5 text-blue-500" /> Delivery (via Bamboo Copter Express!)
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0 p-3 border border-gray-300 rounded-md hover:border-blue-400 transition-all has-[:checked]:bg-blue-50 has-[:checked]:border-blue-500">
                              <FormControl>
                                <RadioGroupItem value="pickup" />
                              </FormControl>
                              <FormLabel className="font-normal flex items-center gap-2 cursor-pointer">
                                <Home className="h-5 w-5 text-green-500" /> Pickup (at Doraemon's Kitchen Door)
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {orderType === 'delivery' && (
                    <div className="space-y-4 pt-4 border-t border-gray-200 mt-4">
                       <h3 className="text-md font-semibold text-gray-700">Your Delivery Address:</h3>
                      <FormField
                        control={form.control}
                        name="streetAddress"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700">Street Address</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., 123 Anywhere Door Lane" {...field} className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"/>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700">City</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., Future Tokyo" {...field} className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"/>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="postalCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700">Postal Code</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., DORA3MON" {...field} className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"/>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700">Country</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                                  <SelectValue placeholder="Select your country" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Dora-World">Dora-World</SelectItem>
                                <SelectItem value="Japan">Japan</SelectItem>
                                <SelectItem value="FutureLand">FutureLand</SelectItem>
                                <SelectItem value="OtherDimension">Other Dimension</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="shadow-lg border-blue-200 rounded-xl">
                <CardHeader className="bg-blue-100 rounded-t-xl border-b border-blue-200">
                  <CardTitle className="text-xl text-blue-700 flex items-center gap-2">
                    <CreditCard className="h-6 w-6" /> Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-semibold">Choose your payment gadget</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                              <SelectValue placeholder="Select a payment method" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="creditCard">Credit/Debit Card (Standard Dimension)</SelectItem>
                            <SelectItem value="gadgetPay">GadgetPay (Instant & Magical)</SelectItem>
                            <SelectItem value="timeMachineTransfer">Time Machine Transfer (For approved time travelers)</SelectItem>
                            {orderType === 'pickup' && <SelectItem value="cashOnPickup">Cash on Pickup (Dorayaki coins accepted!)</SelectItem>}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormDescription className="text-sm text-gray-500">
                    All transactions are secured with Doraemon's latest privacy gadgets!
                  </FormDescription>
                </CardContent>
              </Card>
              
              <Card className="shadow-lg border-blue-200 rounded-xl">
                <CardHeader className="bg-blue-100 rounded-t-xl border-b border-blue-200">
                  <CardTitle className="text-xl text-blue-700 flex items-center gap-2">
                    <Bell className="h-6 w-6" /> Special Requests?
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                   <FormField
                    control={form.control}
                    name="specialInstructions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-semibold">Any special instructions or notes for Doraemon?</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g., 'Extra Dorayaki sauce!', 'Draw a mini Doraemon on the box!'" 
                            {...field} 
                            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-20 resize-none" 
                          />
                        </FormControl>
                        <FormDescription>
                          We'll do our best to accommodate your wishes!
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>


              <FormField
                control={form.control}
                name="agreeToTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm bg-white">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        I agree to the <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">Terms and Conditions</a> of Doraemon Delights.
                      </FormLabel>
                      <FormDescription>
                        You promise to enjoy every bite!
                      </FormDescription>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-blue-800 font-bold text-lg py-3.5 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg transform hover:scale-105 flex items-center justify-center gap-2"
                disabled={isSubmitting}
                aria-label="Place your order"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Placing Your Magical Order...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-6 w-6 mr-2" /> Place Your Order!
                  </>
                )}
              </Button>
            </form>
          </Form>
        </div>
      </main>
      <ThemedFooter />
    </div>
  );
};

export default CheckoutPage;