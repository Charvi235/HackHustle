// // // // import { Card } from '@/components/ui/card';
// // // // import { Button } from '@/components/ui/button';
// // // // import { Badge } from '@/components/ui/badge';
// // // // import { 
// // // //   Brain, 
// // // //   Trophy, 
// // // //   BookOpen, 
// // // //   Users, 
// // // //   Zap,
// // // //   ArrowRight,
// // // //   Star
// // // // } from 'lucide-react';
// // // // import { Link } from 'react-router-dom';

// // // // const features = [
// // // //   {
// // // //     icon: Brain,
// // // //     title: 'AI Mock Interviews',
// // // //     description: 'Practice with AI-powered interviews that adapt to your experience level and provide detailed feedback.',
// // // //     badge: 'AI Powered',
// // // //     color: 'bg-blue-500',
// // // //   },
// // // //   {
// // // //     icon: Trophy,
// // // //     title: 'Quiz Battles',
// // // //     description: 'Compete with friends or random players in fast-paced, real-time quiz competitions.',
// // // //     badge: 'Multiplayer',
// // // //     color: 'bg-yellow-500',
// // // //   },
// // // //   {
// // // //     icon: BookOpen,
// // // //     title: 'Smart Practice',
// // // //     description: 'Curated MCQs organized by subject and difficulty, with detailed explanations.',
// // // //     badge: 'Adaptive',
// // // //     color: 'bg-green-500',
// // // //   },
// // // //   {
// // // //     icon: Users,
// // // //     title: 'Expert Support',
// // // //     description: 'Get help from verified faculty members for complex doubts and concepts.',
// // // //     badge: 'Expert Help',
// // // //     color: 'bg-purple-500',
// // // //   },
// // // //   {
// // // //     icon: Zap,
// // // //     title: 'Gamification',
// // // //     description: 'Earn points, badges, and climb leaderboards to stay motivated.',
// // // //     badge: 'Rewards',
// // // //     color: 'bg-orange-500',
// // // //   },
// // // // ];

// // // // export const FeaturesSection = () => {
// // // //   return (
// // // //     <section id="about" className="py-24 bg-gradient-card">
// // // //       <div className="container mx-auto px-4">
// // // //         <div className="text-center mb-16">
// // // //           <Badge variant="secondary" className="mb-4">
// // // //             <Star className="w-4 h-4 mr-2" />
// // // //             Core Features
// // // //           </Badge>
// // // //           <h2 className="text-3xl md:text-5xl font-bold mb-6">
// // // //             Everything You Need to{' '}
// // // //             <span className="bg-gradient-primary bg-clip-text text-transparent">
// // // //               Excel
// // // //             </span>
// // // //           </h2>
// // // //           <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
// // // //             Our comprehensive platform combines the best learning methodologies 
// // // //             with cutting-edge technology to accelerate your growth.
// // // //           </p>
// // // //         </div>

// // // //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
// // // //           {features.map((feature, index) => (
// // // //             <Card 
// // // //               key={feature.title} 
// // // //               className="p-6 bg-gradient-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow group"
// // // //             >
// // // //               <div className="flex items-center justify-between mb-4">
// // // //                 <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center shadow-md`}>
// // // //                   <feature.icon className="w-6 h-6 text-white" />
// // // //                 </div>
// // // //                 <Badge variant="outline" className="text-xs">
// // // //                   {feature.badge}
// // // //                 </Badge>
// // // //               </div>
              
// // // //               <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
// // // //               <p className="text-muted-foreground mb-4 leading-relaxed">
// // // //                 {feature.description}
// // // //               </p>
              
// // // //               <Button 
// // // //                 variant="ghost" 
// // // //                 className="w-full justify-between group-hover:bg-primary/10 transition-colors"
// // // //               >
// // // //                 Learn More
// // // //                 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
// // // //               </Button>
// // // //             </Card>
// // // //           ))}
// // // //         </div>

// // // //       </div>
// // // //     </section>
// // // //   );
// // // // };
// // // import { Brain, Trophy, Users, Zap, BookOpen } from 'lucide-react';

// // // const features = [
// // //   {
// // //     title: "AI Mock Interviews",
// // //     description: "Practice with AI-powered interviews that adapt to your experience level and provide detailed feedback.",
// // //     icon: Brain,
// // //     badge: "AI Powered",
// // //     color: "from-blue-600 to-blue-900"
// // //   },
// // //   {
// // //     title: "Quiz Battles",
// // //     description: "Compete with friends or random players in fast-paced, real-time quiz competitions.",
// // //     icon: Trophy,
// // //     badge: "Multiplayer",
// // //     color: "from-yellow-600 to-yellow-900"
// // //   },
// // //   {
// // //     title: "Smart Practice",
// // //     description: "Curated MCQs organized by subject and difficulty, with detailed explanations.",
// // //     icon: BookOpen,
// // //     badge: "Adaptive",
// // //     color: "from-green-600 to-green-900"
// // //   },
// // //   {
// // //     title: "Expert Support",
// // //     description: "Get help from verified faculty members for complex doubts and concepts.",
// // //     icon: Users,
// // //     badge: "Expert Help",
// // //     color: "from-purple-600 to-purple-900"
// // //   },
// // //   {
// // //     title: "Gamification",
// // //     description: "Earn points, badges, and climb leaderboards to stay motivated.",
// // //     icon: Zap,
// // //     badge: "Rewards",
// // //     color: "from-orange-600 to-orange-900"
// // //   }
// // // ];

// // // export const FeaturesSection = () => {
// // //   return (
// // //     <div className="py-20 bg-[#0f0f1a]"> {/* Background color adjust kar sakte ho */}
// // //       <div className="container mx-auto px-4">
        
// // //         {/* Heading Section */}
// // //         <div className="text-center mb-16">
// // //           <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
// // //             Everything you need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Excel</span>
// // //           </h2>
// // //           <p className="text-gray-400 max-w-2xl mx-auto">
// // //             Comprehensive tools designed to help you master technical concepts and crack interviews.
// // //           </p>
// // //         </div>

// // //         {/* FLIP CARDS GRID */}
// // //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
// // //           {features.map((feature, index) => (
// // //             // 1. Perspective Container
// // //             <div key={index} className="group h-72 w-full [perspective:1000px]">
              
// // //               {/* 2. Rotating Inner Container */}
// // //               <div className="relative h-full w-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] shadow-xl rounded-2xl">
                
// // //                 {/* === FRONT SIDE === */}
// // //                 <div className="absolute inset-0 h-full w-full rounded-2xl bg-[#1a1a2e] border border-gray-800 p-8 flex flex-col justify-between [backface-visibility:hidden]">
                  
// // //                   {/* Icon & Badge */}
// // //                   <div className="flex justify-between items-start">
// // //                     <div className={`p-4 rounded-xl bg-gradient-to-br ${feature.color} bg-opacity-20`}>
// // //                       <feature.icon className="w-8 h-8 text-white" />
// // //                     </div>
// // //                     {feature.badge && (
// // //                       <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-800 text-gray-300 border border-gray-700">
// // //                         {feature.badge}
// // //                       </span>
// // //                     )}
// // //                   </div>

// // //                   {/* Title & Hint */}
// // //                   <div>
// // //                     <h3 className="text-2xl font-bold text-white mb-2">{feature.title}</h3>
// // //                     <p className="text-sm text-gray-500 flex items-center gap-1 group-hover:text-purple-400 transition-colors">
// // //                       Hover for details 
// // //                       <span className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
// // //                     </p>
// // //                   </div>
// // //                 </div>

// // //                 {/* === BACK SIDE === */}
// // //                 <div className={`absolute inset-0 h-full w-full rounded-2xl bg-gradient-to-br ${feature.color} p-8 flex flex-col items-center justify-center text-center [transform:rotateY(180deg)] [backface-visibility:hidden]`}>
                  
// // //                   <feature.icon className="w-16 h-16 text-white mb-6 opacity-20 absolute top-4 right-4" />
                  
// // //                   <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
// // //                   <p className="text-gray-100 font-medium leading-relaxed">
// // //                     {feature.description}
// // //                   </p>
// // //                 </div>

// // //               </div>
// // //             </div>
// // //           ))}
// // //         </div>

// // //       </div>
// // //     </div>
// // //   );
// // // };
// // import { Brain, Trophy, Users, Zap, BookOpen } from 'lucide-react';

// // const features = [
// //   {
// //     title: "AI Mock Interviews",
// //     description: "Practice with AI-powered interviews that adapt to your experience level and provide detailed feedback.",
// //     // Yahan aap mujhe bataoge ki piche kya likhna hai 👇
// //     backDetail: "Here you can write details about AI Interviews...",
// //     icon: Brain,
// //     badge: "AI Powered",
// //     color: "from-blue-600 to-blue-900"
// //   },
// //   {
// //     title: "Quiz Battles",
// //     description: "Compete with friends or random players in fast-paced, real-time quiz competitions.",
// //     backDetail: "Here you can write details about Quiz Battles...",
// //     icon: Trophy,
// //     badge: "Multiplayer",
// //     color: "from-yellow-600 to-yellow-900"
// //   },
// //   {
// //     title: "Smart Practice",
// //     description: "Curated MCQs organized by subject and difficulty, with detailed explanations.",
// //     backDetail: "Here you can write details about Practice...",
// //     icon: BookOpen,
// //     badge: "Adaptive",
// //     color: "from-green-600 to-green-900"
// //   },
// //   {
// //     title: "Expert Support",
// //     description: "Get help from verified faculty members for complex doubts and concepts.",
// //     backDetail: "Here you can write details about Experts...",
// //     icon: Users,
// //     badge: "Expert Help",
// //     color: "from-purple-600 to-purple-900"
// //   },
// //   {
// //     title: "Gamification",
// //     description: "Earn points, badges, and climb leaderboards to stay motivated.",
// //     backDetail: "Here you can write details about Rewards...",
// //     icon: Zap,

// //     badge: "Rewards",
// //     color: "from-orange-600 to-orange-900"
// //   }
// //   {
// //     title: 'Gamification',
// //     description: 'Earn points and ace others.',
// //     badge: 'Rewards',
// //     color: 'bg-orange-500',
// //   },

// // ];

// // export const FeaturesSection = () => {
// //   return (
// //     <div className="py-20 bg-[#0f0f1a]">
// //       <div className="container mx-auto px-4">
        
// //         {/* Heading */}
// //         <div className="text-center mb-16">
// //           <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
// //             Everything you need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Excel</span>
// //           </h2>
// //           <p className="text-gray-400 max-w-2xl mx-auto">
// //             Comprehensive tools designed to help you master technical concepts and crack interviews.
// //           </p>
// //         </div>

// //         {/* FLIP CARDS GRID */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
// //           {features.map((feature, index) => (
// //             <div key={index} className="group h-80 w-full [perspective:1000px]"> {/* Height thodi badha di hai */}
              
// //               <div className="relative h-full w-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] shadow-xl rounded-2xl">
                
// //                 {/* === FRONT SIDE (Sab kuch yahan hai) === */}
// //                 <div className="absolute inset-0 h-full w-full rounded-2xl bg-[#1a1a2e] border border-gray-800 p-8 flex flex-col justify-between [backface-visibility:hidden]">
                  
// //                   {/* Icon & Badge */}
// //                   <div className="flex justify-between items-start mb-4">
// //                     <div className={`p-3 rounded-xl bg-gradient-to-br ${feature.color} bg-opacity-20`}>
// //                       <feature.icon className="w-8 h-8 text-white" />
// //                     </div>
// //                     {feature.badge && (
// //                       <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-800 text-gray-300 border border-gray-700">
// //                         {feature.badge}
// //                       </span>
// //                     )}
// //                   </div>

// //                   {/* Title & Description (AB FRONT PAR HAI) */}
// //                   <div>
// //                     <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
// //                     <p className="text-gray-400 text-sm leading-relaxed">
// //                       {feature.description}
// //                     </p>
// //                   </div>
                  
// //                   {/* Footer Hint */}
// //                   <div className="mt-4 pt-4 border-t border-gray-800">
// //                     <p className="text-xs text-gray-500 flex items-center gap-1 group-hover:text-purple-400 transition-colors">
// //                       View More Details 
// //                       <span className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
// //                     </p>
// //                   </div>
// //                 </div>

// //                 {/* === BACK SIDE (Jahan naya content aayega) === */}
// //                 <div className={`absolute inset-0 h-full w-full rounded-2xl bg-gradient-to-br ${feature.color} p-8 flex flex-col items-center justify-center text-center [transform:rotateY(180deg)] [backface-visibility:hidden]`}>
                  
// //                   <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                  
// //                   {/* Ye wo naya text hai jo aap mujhe bataoge */}
// //                   <p className="text-white font-medium text-lg">
// //                     {feature.backDetail}
// //                   </p>

// //                 </div>

// //               </div>
// //             </div>
// //           ))}
// //         </div>

// //       </div>
// //     </div>
// //   );
// // };
// import { Card } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { 
//   Brain, 
//   Trophy, 
//   BookOpen, 
//   Users, 
//   Zap,
//   ArrowRight,
//   Star
// } from 'lucide-react';
// import { Link } from 'react-router-dom';

// const features = [
//   {
//     icon: Brain,
//     title: 'AI Mock Interviews',
//     description: 'Practice with AI-powered interviews that adapt to your experience level and provide detailed feedback.',
//     badge: 'AI Powered',
//     color: 'bg-blue-500',
//   },
//   {
//     icon: Trophy,
//     title: 'Quiz Battles',
//     description: 'Compete with friends or random players in fast-paced, real-time quiz competitions.',
//     badge: 'Multiplayer',
//     color: 'bg-yellow-500',
//   },
//   {
//     icon: BookOpen,
//     title: 'Smart Practice',
//     description: 'Curated MCQs organized by subject and difficulty, with detailed explanations.',
//     badge: 'Adaptive',
//     color: 'bg-green-500',
//   },
//   {
//     icon: Users,
//     title: 'Expert Support',
//     description: 'Get help from verified faculty members for complex doubts and concepts.',
//     badge: 'Expert Help',
//     color: 'bg-purple-500',
//   },
//   {
//     icon: Zap,
//     title: 'Gamification',
//     description: 'Earn points, badges, and climb leaderboards to stay motivated.',
//     badge: 'Rewards',
//     color: 'bg-orange-500',
//   },
// ];

// export const FeaturesSection = () => {
//   return (
//     <section id="about" className="py-24 bg-gradient-card">
//       <div className="container mx-auto px-4">
//         <div className="text-center mb-16">
//           <Badge variant="secondary" className="mb-4">
//             <Star className="w-4 h-4 mr-2" />
//             Core Features
//           </Badge>
//           <h2 className="text-3xl md:text-5xl font-bold mb-6">
//             Everything You Need to{' '}
//             <span className="bg-gradient-primary bg-clip-text text-transparent">
//               Excel
//             </span>
//           </h2>
//           <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//             Our comprehensive platform combines the best learning methodologies 
//             with cutting-edge technology to accelerate your growth.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {features.map((feature, index) => (
//             <Card 
//               key={feature.title} 
//               className="p-6 bg-gradient-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow group"
//             >
//               <div className="flex items-center justify-between mb-4">
//                 <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center shadow-md`}>
//                   <feature.icon className="w-6 h-6 text-white" />
//                 </div>
//                 <Badge variant="outline" className="text-xs">
//                   {feature.badge}
//                 </Badge>
//               </div>
              
//               <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
//               <p className="text-muted-foreground mb-4 leading-relaxed">
//                 {feature.description}
//               </p>
              
//               <Button 
//                 variant="ghost" 
//                 className="w-full justify-between group-hover:bg-primary/10 transition-colors"
//               >
//                 Learn More
//                 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//               </Button>
//             </Card>
//           ))}
//         </div>

//       </div>
//     </section>
//   );
// };
import { Brain, Trophy, Users, Zap, BookOpen } from 'lucide-react';

const features = [
  {
    title: "AI Mock Interviews",
    description: "Practice with AI-powered interviews that adapt to your experience level and provide detailed feedback.",
    // 👇 Aapka Custom Text
    backDetail: "Simulate real-world Technical & Behavioral rounds. Get instant, actionable feedback on your code logic, body language, and communication confidence to fast-track your hiring success.",
    icon: Brain,
    badge: "AI Powered",
    color: "from-blue-600 to-blue-900"
  },
  {
    title: "Quiz Battles",
    description: "Compete with friends or random players in fast-paced, real-time quiz competitions.",
    backDetail: "Compete in fast-paced quiz battles. Climb the HackHustle leaderboard and prove your speed and accuracy against the sharpest minds in real time.",
    icon: Trophy,
    badge: "Multiplayer",
    color: "from-yellow-600 to-yellow-900"
  },
  {
    title: "Smart Practice",
    description: "Curated MCQs organized by subject and difficulty, with detailed explanations.",
    backDetail: "Access a vast library of topic-wise MCQs. Our adaptive system identifies your weak areas and suggests targeted questions to strengthen your concepts.",
    icon: BookOpen,
    badge: "Adaptive",
    color: "from-green-600 to-green-900"
  },
  {
    title: "Expert Support",
    description: "Get help from verified faculty members for complex doubts and concepts.",
    backDetail: "Stuck on a problem? Connect 1-on-1 with industry experts and professors to clear doubts and get guidance instantly.",
    icon: Users,
    badge: "Expert Help",
    color: "from-purple-600 to-purple-900"
  },
  {
    title: "Gamification",
    description: "Earn points, badges, and climb leaderboards to stay motivated.",
    backDetail: "Turn preparation into a game! Earn rewards for every correct answer, unlock achievement badges, and showcase your streak on your profile.",
    icon: Zap,
    badge: "Rewards",
    color: "from-orange-600 to-orange-900"
  }
];

export const FeaturesSection = () => {
  return (
    <div className="py-20 bg-[#0f0f1a]">
      <div className="container mx-auto px-4">
        
        {/* Heading Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Everything you need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Excel</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Comprehensive tools designed to help you master technical concepts and crack interviews.
          </p>
        </div>

        {/* FLIP CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            // 1. Perspective Container
            <div key={index} className="group h-80 w-full [perspective:1000px]">
              
              {/* 2. Rotating Inner Container */}
              <div className="relative h-full w-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] shadow-xl rounded-2xl">
                
                {/* === FRONT SIDE (Default View) === */}
                <div className="absolute inset-0 h-full w-full rounded-2xl bg-[#1a1a2e] border border-gray-800 p-8 flex flex-col justify-between [backface-visibility:hidden]">
                  
                  {/* Icon & Badge */}
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${feature.color} bg-opacity-20`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    {feature.badge && (
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-800 text-gray-300 border border-gray-700">
                        {feature.badge}
                      </span>
                    )}
                  </div>

                  {/* Title & Short Description */}
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                  
                  {/* Hover Hint */}
                  <div className="mt-4 pt-4 border-t border-gray-800">
                    <p className="text-xs text-gray-500 flex items-center gap-1 group-hover:text-purple-400 transition-colors">
                      View More Details 
                      <span className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
                    </p>
                  </div>
                </div>

                {/* === BACK SIDE (Flipped View) === */}
                <div className={`absolute inset-0 h-full w-full rounded-2xl bg-gradient-to-br ${feature.color} p-8 flex flex-col items-center justify-center text-center [transform:rotateY(180deg)] [backface-visibility:hidden]`}>
                  
                  {/* Background Icon Watermark */}
                  <feature.icon className="w-24 h-24 text-white absolute opacity-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  
                  <h3 className="text-xl font-bold text-white mb-4 relative z-10">{feature.title}</h3>
                  
                  <p className="text-white font-medium text-base leading-relaxed relative z-10">
                    {feature.backDetail}
                  </p>

                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};