
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
        <div id="about" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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