/* eslint-disable no-unused-vars */
// import React from "react";
// import { MapPin, Users, Utensils, Calendar } from "lucide-react";

// const LandingPage = () => {
//   const trips = [
//     {
//       id: "ff989e43-ce8f-403f-869b-3017630a23a4",
//       imgSrc:
//         "https://images.pexels.com/photos/2389171/pexels-photo-2389171.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//       title: "Trip to Tokyo",
//       description:
//         "Join me on an exciting 10-day journey through Tokyo, where we'll visit iconic landmarks, indulge in delicious cuisine, and immerse ourselves in the vibrant culture of Japan's capital city.",
//       userImg: "/landing/images/public-plans/user1.jpg",
//       userName: "Ivanner Mora",
//     },
//     {
//       id: "ffb140e8-f654-4ea9-8b03-2632ccd7184b",
//       imgSrc:
//         "https://images.pexels.com/photos/3873672/pexels-photo-3873672.jpeg?auto=compress&cs=tinysrgb&w=600",
//       title: "Trip to Dubai",
//       description:
//         "Embark on a thrilling 6-day journey through Dubai, United Arab Emirates. Explore vibrant souks, iconic landmarks, world-class shopping, and enchanting attractions.",
//       userImg: "/landing/images/public-plans/user3.jpg",
//       userName: "john mathew",
//     },
//   ];
//   return (
//     <div className="min-h-screen bg-white">
//       {/* Hero Section */}
//       <main className="flex min-h-[calc(100svh-4rem)] flex-col items-center bg-blue-50/40">
//         <div className="scroll-m-5 w-full">
//           <section className="lg:px-20 px-5 py-2 bg-background w-full h-full flex lg:flex-row flex-col lg:justify-between justify-center items-center gap-5 min-h-[calc(100svh-4rem)]">
//             <article className="flex flex-col h-full justify-center items-center lg:flex-1">
//               <h1 className="font-bold lg:text-7xl md:text-5xl text-4xl font-sans text-left w-full">
//                 Uncover the <br />
//                 <span className="text-purple-600">AI</span> Travel{" "}
//                 <span className="text-purple-600">Plan</span>
//               </h1>
//               <div className="mt-5 lg:mt-10 rounded-md w-full text-left lg:text-lg md:text-md text-base">
//                 <div className="flex justify-start items-center">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="24"
//                     height="24"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     className="lucide lucide-lightbulb mr-1 text-yellow-600"
//                   >
//                     <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path>
//                     <path d="M9 18h6"></path>
//                     <path d="M10 22h4"></path>
//                   </svg>
//                   <span className="text-center">
//                     Imagine telling your travel planner,
//                   </span>
//                 </div>
//                 <div className="p-2">
//                   <p className="text-purple-600 font-bold tracking-wide lg:text-md md:text-base text-sm">
//                     'Weekend escape to a vibrant city,{" "}
//                     <br className="lg:hidden" />
//                     with mid-range budget in summer.'
//                   </p>
//                   <p className="mt-5 mb-5 lg:text-md md:text-base text-sm text-muted-foreground font-medium tracking-wide md:max-w-xl text-left">
//                     Our AI not only understands but crafts a personalized
//                     adventure. Discover local secrets, savor culinary delights,
//                     and explore iconic landmarks with an itinerary designed just
//                     for you.
//                   </p>
//                 </div>
//               </div>
//               <div className="w-full ml-2 flex justify-start">
//                 <button
//                   className="inline-flex items-center justify-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-purple-600 text-white hover:bg-purple-800 text-sm font-semibold rounded-3xl"
//                   aria-label="generate plan"
//                 >
//                   Go to Dashboard
//                 </button>
//               </div>
//             </article>
//             <figure className="h-full lg:flex-1 flex-1 overflow-hidden">
//             <svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300" fill="none">

//   <path d="M50 140 C120 90, 280 90, 350 140 L310 160 C280 150, 120 150, 90 160 Z" fill="#6a0dad" />
  
//   <path d="M180 140 L250 70 C260 75, 270 75, 280 70 L260 140 Z" fill="#8e44ad" />
//   <path d="M180 140 L250 210 C260 205, 270 205, 280 210 L260 140 Z" fill="#8e44ad" />
 
//   <path d="M350 140 L360 120 C370 125, 370 135, 360 140 Z" fill="#9b59b6" />
  
//   <circle cx="100" cy="140" r="5" fill="#f8f8ff" />
//   <circle cx="140" cy="140" r="5" fill="#f8f8ff" />
//   <circle cx="180" cy="140" r="5" fill="#f8f8ff" />
//   <circle cx="220" cy="140" r="5" fill="#f8f8ff" />

//   <text x="50%" y="250" textAnchor="middle" fontSize="24" fontFamily="Arial, sans-serif" fill="#6a0dad">
//     Travel Time
//   </text>
// </svg>



//             </figure>
//           </section>
//         </div>
//       </main>

//       {/* Features Section */}
//       <section className="py-24 bg-white">
//         <div className="container mx-auto px-4">
//           <h2 className="text-4xl font-bold text-center mb-4">
//             Your <span className="text-purple-400">AI-Powered</span> Trip
//           </h2>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
//             <div className="p-6 rounded-xl border border-gray-100 shadow-sm">
//               <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
//                 <MapPin className="text-green-700" />
//               </div>
//               <h3 className="text-xl font-bold mb-3">Optimal Route Planning</h3>
//               <p className="text-gray-600">
//                 Our AI algorithms analyze your preferences to craft the most
//                 efficient route, saving you time and effort.
//               </p>
//             </div>

//             <div className="p-6 rounded-xl border border-gray-100 shadow-sm">
//               <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
//                 <Calendar className="text-purple-700" />
//               </div>
//               <h3 className="text-xl font-bold mb-3">
//                 Personalize Your Adventure
//               </h3>
//               <p className="text-gray-600">
//                 Shape your journey by freely adding, editing, or deleting
//                 activities from your itinerary.
//               </p>
//             </div>

//             <div className="p-6 rounded-xl border border-gray-100 shadow-sm">
//               <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
//                 <Utensils className="text-blue-700" />
//               </div>
//               <h3 className="text-xl font-bold mb-3">
//                 Local Cuisine Recommendations
//               </h3>
//               <p className="text-gray-600">
//                 Discover local cuisines and hidden gems recommended by our AI,
//                 tailored to your taste buds.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>
//       <section className="bg-gray-50 py-20">
//         <div className="mx-auto mt-3 w-full max-w-screen-2xl md:mt-14">
//           <h2 className="px-6 text-center text-3xl font-bold md:text-4xl lg:px-12 xl:text-5xl">
//             Journey Inspirations from Travelers
//           </h2>
//           <p className="mx-auto mt-10 max-w-3xl px-6 text-center text-base lg:px-12 lg:text-lg">
//             Dive into unique{" "}
//             <a className="text-accent-red-2 underline" href="/public-trips">
//               trip itineraries
//             </a>{" "}
//             crafted by our global travelers. Find your next adventure and share
//             your own journey with fellow explorers.
//           </p>
//           <div className="mx-auto mt-12 flex max-w-6xl flex-col gap-5 px-6 md:flex-row lg:gap-12 lg:px-12">
//             {trips.map((trip) => (
//               <div
//                 key={trip.id}
//                 className="flex flex-auto flex-col gap-5 lg:gap-12"
//               >
//                 <div className="group relative items-end overflow-hidden rounded-xl md:rounded-3xl flex h-[15rem] max-w-[50rem] md:h-[16rem]">
//                   <a
//                     className="h-full w-full"
//                     href={`https://www.tripplanner.ai/public-trips/${trip.id}`}
//                   >
//                     <div className="absolute right-0 top-0 z-[20] h-full w-full bg-gradient-to-t from-black/70 via-transparent via-40% to-black/40"></div>
//                     <div className="absolute right-0 top-0 z-[20] h-full w-full bg-transparent transition-colors duration-700 group-hover:bg-black/50"></div>
//                     <img
//                       alt={trip.title}
//                       loading="lazy"
//                       className="object-cover transition-all duration-700 group-hover:scale-110 absolute h-full w-full"
//                       src={trip.imgSrc}
//                     />
//                     <div className="relative z-[22] flex h-full flex-col justify-between p-4 md:p-7 lg:p-8">
//                       <div className="flex items-center gap-2">
//                         <img
//                           alt={trip.userName}
//                           loading="lazy"
//                           className="h-5 w-5 rounded-full ring ring-white/70 md:h-6 md:w-6"
//                           src={trip.userImg}
//                         />
//                         <span className="text-sm font-medium text-white md:text-base">
//                           {trip.userName}
//                         </span>
//                       </div>
//                       <div>
//                         <h2 className="text-2xl font-bold text-white md:text-3xl">
//                           {trip.title}
//                         </h2>
//                         <p className="mt-2 line-clamp-2 text-sm text-white md:mt-5 md:text-base">
//                           {trip.description}
//                         </p>
//                       </div>
//                     </div>
//                   </a>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//       {/* Final CTA Section */}
//       <section className="bg-gray-50 py-20">
//         <div className="container mx-auto px-4 text-center">
//           <h2 className="text-4xl font-bold mb-6">
//             Customized Itineraries for Every Travel Dream
//           </h2>
//           <p className="text-gray-600 max-w-3xl mx-auto mb-12">
//             Trip Planner AI is your ultimate companion for any travel scenario.
//             Whether it's a solo adventure, a family vacation, or a group
//             expedition, our app tailors every aspect of your journey.
//           </p>
//           {/* <button className="bg-black text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-800 transition-colors">
//             Start Planning Your Trip
//           </button> */}
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
//             <div className="p-6  border-gray-100 ">
//               {/* <div className="bg-green-100 w-12 h-12 flex items-center justify-center mb-4">
//                 <MapPin className="text-green-700" />
//               </div> */}
//               <h2 className="text-center text-xl font-medium">
//                 <span className="font-semibold text-purple-600">
//                   AI powered{" "}
//                 </span>
//                 Optimal Route Planning
//               </h2>
//               <p className="text-gray-600">
//                 Our AI algorithms analyze your preferences to craft the most
//                 efficient route, saving you time and effort.
//               </p>
//             </div>

//             <div className="p-6  border-gray-100">
//               {/* <div className="bg-purple-100 w-12 h-12 flex items-center justify-center mb-4">
//                 <Calendar className="text-purple-700" />
//               </div> */}
//               <h2 className="text-center text-xl font-medium">
//                 <span className="font-semibold text-purple-600">
//                   AI powered{" "}
//                 </span>
//                 Optimal Route Planning
//               </h2>
//               <p className="text-gray-600">
//                 Shape your journey by freely adding, editing, or deleting
//                 activities from your itinerary.
//               </p>
//             </div>

//             <div className="p-6  border-gray-100">
//               {/* <div className="bg-blue-100 w-12 h-12 flex items-center justify-center mb-4">
//                 <Utensils className="text-blue-700" />
//               </div> */}
//               <h2 className="text-center text-xl font-medium">
//                 {" "}
//                 Collaborative
//                 <span className="font-semibold text-purple-600">
//                   {" "}
//                   Group Planning{" "}
//                 </span>
//                 Made Easy
//               </h2>
//               <p className="text-gray-600">
//                 Discover local cuisines and hidden gems recommended by our AI,
//                 tailored to your taste buds.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default LandingPage;

import React from "react";
import { MapPin, Users, Utensils, Calendar, Compass, Globe, Star } from "lucide-react";
import { Link } from 'react-router-dom';
const LandingPage = () => {
  const trips = [
    {
      id: "ff989e43-ce8f-403f-869b-3017630a23a4",
      imgSrc: "https://firebasestorage.googleapis.com/v0/b/hideout-500bd.appspot.com/o/18532.jpg?alt=media&token=7516fc63-6d54-4e40-b2e3-672923fe9d50",
      title: "Magical Tokyo Adventure",
      description: "A 10-day journey through Japan's most vibrant city. Experience traditional culture mixed with futuristic technology.",
      userImg: "https://firebasestorage.googleapis.com/v0/b/hideout-500bd.appspot.com/o/Marianne-Veilleux.png?alt=media&token=a43d00e3-0c93-4c15-995d-4ccf83edbfff",
      userName: "Ivanner Mora",
      rating: "4.9",
      duration: "10 days"
    },
    {
      id: "ffb140e8-f654-4ea9-8b03-2632ccd7184b",
      imgSrc: "https://images.unsplash.com/photo-1523816572-a1a23d1a67b8?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Dubai Luxe Experience",
      description: "Discover the perfect blend of tradition and luxury in this 6-day Dubai adventure.",
      userImg: "https://firebasestorage.googleapis.com/v0/b/hideout-500bd.appspot.com/o/OIP%20(2).jfif?alt=media&token=52bb68a5-3190-403f-8bb8-92ef588e91eb",
      userName: "John Mathew",
      rating: "4.8",
      duration: "6 days"
    }
  ];

  const features = [
    {
      icon: <Compass className="w-6 h-6" />,
      title: "Smart Route Planning",
      description: "AI-powered algorithms craft the perfect route based on your preferences and travel style."
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Personalized Experiences",
      description: "Get unique recommendations tailored to your interests, budget, and travel pace."
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Local Insights",
      description: "Discover hidden gems and authentic experiences recommended by our AI and local experts."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <main className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100/30 to-blue-300/10 z-0" />
        <div className="container mx-auto px-4 pt-20 pb-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 relative z-10">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-600 text-sm font-medium animate-bounce">
                <Star className="w-4 h-4 mr-2" />
                AI-Powered Travel Planning
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight">
                Your Dream Trip,
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 block mt-2">
                  Perfectly Planned
                </span>
              </h1>
              <p className="text-lg text-gray-600 max-w-xl">
                Experience travel planning reimagined with AI. Tell us your dreams, and watch as we craft 
                the perfect itinerary tailored just for you.
              </p>
              <div className="flex gap-4">
                <Link to="/trip_details">
                <button className="px-8 py-4 bg-blue-600 text-white rounded-full font-semibold 
                  hover:bg-blue-700 transform hover:scale-105 transition-all shadow-lg 
                  hover:shadow-blue-500/25">
                  Start Planning
                </button>
                </Link>
                <Link to="https://youtu.be/ICjZSLjLYMc">
                <button className="px-8 py-4 bg-white text-blue-600 rounded-full font-semibold 
                  border-2 border-blue-600 hover:bg-blue-50 transform hover:scale-105 transition-all">
                  Watch Demo
                </button>
                </Link>
              </div>
            </div>
            <div className="relative z-10">
              <div className="relative w-full h-[500px] bg-gradient-to-br from-blue-600 to-blue-400 
                rounded-3xl overflow-hidden transform hover:scale-105 transition-all duration-500 
                shadow-xl hover:shadow-2xl">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm">
                  <div className="p-8">
                    <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-lg 
                      hover:shadow-xl transition-all duration-300 cursor-pointer">
                      <div className="flex items-center gap-4 mb-4">
                        <Globe className="w-8 h-8 text-blue-600" />
                        <h3 className="text-xl font-semibold">Your Next Adventure</h3>
                      </div>
                      <p className="text-gray-600">
                        "I want a 7-day cultural experience in Kyoto during cherry blossom season..."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Travel Smarter with
              <span className="text-blue-600"> AI</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our advanced AI understands your travel style and preferences to create 
              the perfect itinerary for your next adventure.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} 
                className="p-8 rounded-2xl bg-white border border-blue-100 shadow-lg 
                hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 
                hover:border-blue-200">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center 
                  text-blue-600 mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Trips Section */}
      <section className="py-24 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Featured Adventures</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get inspired by expertly crafted itineraries from fellow travelers
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {trips.map((trip) => (
              <div key={trip.id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl shadow-lg 
                  transform transition-all duration-500 hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
                  <img
                    src={trip.imgSrc}
                    alt={trip.title}
                    className="w-full h-[400px] object-cover transform group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={trip.userImg}
                        alt={trip.userName}
                        className="w-10 h-10 rounded-full ring-2 ring-white/70"
                      />
                      <div>
                        <p className="text-white font-medium">{trip.userName}</p>
                        <div className="flex items-center text-yellow-400">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="ml-1 text-white">{trip.rating}</span>
                        </div>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{trip.title}</h3>
                    <p className="text-white/90 line-clamp-2 mb-4">{trip.description}</p>
                    <div className="flex items-center gap-4 text-white/80">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {trip.duration}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="max-w-2xl mx-auto mb-12 text-blue-100">
            Join thousands of travelers who have discovered the perfect way to plan their 
            next adventure. Let our AI craft your ideal itinerary today.
          </p>
          <button className="px-8 py-4 bg-white text-blue-600 rounded-full font-semibold 
            hover:bg-blue-50 transform hover:scale-105 transition-all shadow-lg">
            Create Your Perfect Trip
          </button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;