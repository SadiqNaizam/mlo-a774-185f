import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Custom Components
import ThemedHeader from '@/components/layout/ThemedHeader';
import BestsellersShowcase from '@/components/BestsellersShowcase';
import ThemedFooter from '@/components/layout/ThemedFooter';

// Shadcn/ui Components
import { Button } from '@/components/ui/button';

// Icons
import { ShoppingCart, Gift, Sparkles } from 'lucide-react';

const Homepage: React.FC = () => {
  console.log('Homepage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-sky-50"> {/* Light blue overall background for Doraemon theme */}
      <ThemedHeader />

      <main className="flex-grow">
        {/* Hero Section */}
        <section 
          className="relative text-white py-20 md:py-32 text-center overflow-hidden"
          style={{ 
            backgroundImage: "url('https://img.freepik.com/free-vector/gradient-japanese-template-with-doraemon_52683-150270.jpg?w=1380')", // A Doraemon-themed background
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-blue-500 opacity-50"></div> {/* Color overlay for text readability */}
          
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Sparkles className="mx-auto h-16 w-16 text-yellow-300 mb-4 animate-pulse" />
              <h1 
                className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg"
                style={{ fontFamily: "'Comic Sans MS', 'Chalkboard SE', cursive" }}
              >
                Welcome to Doraemon Delights!
              </h1>
              <p className="text-lg md:text-2xl mb-10 max-w-2xl mx-auto drop-shadow-sm">
                Explore a world of delicious food inspired by Doraemon and his amazing gadgets!
              </p>
              <Link to="/menu"> {/* Path from App.tsx */}
                <Button 
                  size="lg" 
                  className="bg-yellow-400 hover:bg-yellow-500 text-blue-800 font-bold py-4 px-10 text-lg rounded-full shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-yellow-300"
                >
                  <ShoppingCart className="mr-2.5 h-6 w-6" /> Explore Our Menu
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Floating Doraemon characters for thematic immersion */}
          <motion.img 
            src="https://www.vhv.rs/dpng/d/427-4270024_doraemon-png-transparent-png.png" 
            alt="Doraemon floating" 
            className="absolute bottom-5 left-5 md:bottom-10 md:left-20 w-20 h-20 md:w-32 md:h-32 opacity-90 z-0"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: [0, -15, 0], opacity: 0.9 }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
          <motion.img 
            src="https://www.pngkit.com/png/full/23-230980_dorami-png.png" // Dorami image
            alt="Dorami floating" 
            className="absolute top-10 right-5 md:top-20 md:right-20 w-16 h-16 md:w-24 md:h-24 opacity-80 z-0"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: [0, 15, 0], opacity: 0.8 }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </section>

        <BestsellersShowcase />

        {/* Another Call to Action Section */}
        <section className="py-16 text-center bg-white">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <h2 
                className="text-3xl sm:text-4xl font-bold text-sky-700 mb-4"
                style={{ fontFamily: "'Comic Sans MS', 'Chalkboard SE', cursive" }}
              >
                Ready for a Magical Treat?
              </h2>
              <p className="text-gray-700 mb-8 max-w-xl mx-auto text-lg">
                Our kitchen is buzzing with Doraemon's favorite recipes and wonderful flavors. Click below to start your culinary adventure!
              </p>
              <Link to="/menu"> {/* Path from App.tsx */}
                 <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-2 border-yellow-500 text-yellow-600 hover:bg-yellow-500 hover:text-blue-800 font-bold py-3 px-8 text-lg rounded-full shadow-md transform transition-transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-yellow-300"
                  >
                    <Gift className="mr-2.5 h-6 w-6" /> View Full Menu & Order
                </Button>
            </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <ThemedFooter />
    </div>
  );
};

export default Homepage;