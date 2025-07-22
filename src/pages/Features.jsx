import React from 'react';
import { motion } from 'framer-motion';

const Feature = () => {
  const features = [
    {
      name: "Route Optimization",
      description: "Always know the way forward.",
      // image: "../img/guide.png",
      iconEmoji: "🎯" // Fallback if image not available
    },
    {
      name: "AI Travel Planner",
      description: "Taking the hassle out of trip planning.",
      // image: "/../img/price.png",
      iconEmoji: "💰"
    },
    {
      name: "Local Experience",
      description: "Authentic cultural immersion",
      // image: "/../img/experience.png",
      iconEmoji: "🌎"
    },
    {
      name: "Trip Pooling",
      description: "Join another person's Journey",
        // image: "/../img/support.png",
      iconEmoji: "🔧"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-blue-800 mb-4">
            Why Choose Us
          </h2>
          <p className="text-blue-600 max-w-2xl mx-auto">
            Discover the unique features that make our travel experiences extraordinary
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="relative mb-6">
                {/* blue Circle Background */}
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-300">
                  {feature.image ? (
                    <img 
                      src={feature.image} 
                      alt={feature.name}
                      className="w-8 h-8 group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <span className="text-2xl">{feature.iconEmoji}</span>
                  )}
                </div>
                
                {/* Decorative Element */}
                <div className="absolute -z-10 w-16 h-16 bg-blue-500/10 rounded-full -top-2 -right-2 group-hover:scale-125 transition-transform duration-300" />
              </div>

              <h3 className="text-xl font-bold text-blue-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                {feature.name}
              </h3>
              
              <p className="text-blue-600/80 group-hover:text-blue-600 transition-colors duration-300">
                {feature.description}
              </p>

              {/* Bottom Decorative Line */}
              <div className="mt-4 h-1 w-12 bg-blue-200 rounded group-hover:w-full group-hover:bg-blue-300 transition-all duration-500" />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30">
            Start Planning Your Trip
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Feature;