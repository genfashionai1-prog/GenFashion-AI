import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useCreateResult } from "@/hooks/use-results";
import { Loader2, ArrowRight } from "lucide-react";

const QUESTIONS = [
  {
    id: 1,
    question: "What is your go-to weekend outfit?",
    options: [
      "A tailored blazer and crisp jeans",
      "Oversized hoodie and vintage sneakers",
      "Flowy dress with layered jewelry",
      "Sleek monochrome basics"
    ]
  },
  {
    id: 2,
    question: "Which color palette speaks to you?",
    options: [
      "Neutrals (Black, White, Beige)",
      "Earthy tones (Rust, Olive, Mustard)",
      "Bold & High Contrast (Red, Royal Blue)",
      "Pastels (Soft Pink, Mint, Lilac)"
    ]
  },
  {
    id: 3,
    question: "Pick an essential accessory:",
    options: [
      "A structured leather tote",
      "Chunky silver chains",
      "A wide-brim hat",
      "Minimalist gold watch"
    ]
  }
];

const PROFILES = [
  {
    styleType: "Minimalist Elegance",
    colors: ["#ffffff", "#000000", "#d1d1d1", "#e8e0d5"],
    recommendations: ["Invest in a quality trench coat", "Stick to structured silhouettes", "Prioritize fabric quality over logos"]
  },
  {
    styleType: "Urban Streetwear",
    colors: ["#1a1a1a", "#ff3366", "#ffffff", "#4a4a4a"],
    recommendations: ["Layer oversized pieces", "Mix high-end with vintage", "Let statement sneakers be the focal point"]
  },
  {
    styleType: "Boho Chic",
    colors: ["#8b5a2b", "#556b2f", "#cd853f", "#f4a460"],
    recommendations: ["Incorporate natural textures like linen and suede", "Layer delicate jewelry", "Embrace flowing, relaxed fits"]
  }
];

export default function StyleTest() {
  const { user, loading } = useAuth();
  const [, setLocation] = useLocation();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const createResult = useCreateResult(user?.uid);

  // If loading auth state, show spinner
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Redirect to sign in if not logged in
  if (!user && !loading) {
    setLocation("/sign-in");
    return null;
  }

  const handleSelect = (option: string) => {
    const newAnswers = [...answers];
    newAnswers[currentStep] = option;
    setAnswers(newAnswers);
  };

  const handleNext = async () => {
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(c => c + 1);
    } else {
      // Finish test
      const randomProfile = PROFILES[Math.floor(Math.random() * PROFILES.length)];
      
      try {
        await createResult.mutateAsync({
          styleType: randomProfile.styleType,
          colors: randomProfile.colors,
          recommendations: randomProfile.recommendations,
        });
        setLocation("/my-style");
      } catch (err) {
        console.error("Failed to save result", err);
      }
    }
  };

  const progress = ((currentStep + 1) / QUESTIONS.length) * 100;
  const currentQ = QUESTIONS[currentStep];

  return (
    <div className="min-h-screen bg-background pt-24 pb-12 px-4 sm:px-6 flex flex-col">
      <div className="max-w-2xl mx-auto w-full flex-1 flex flex-col">
        
        {/* Progress Bar */}
        <div className="w-full h-2 bg-secondary rounded-full mb-12 overflow-hidden">
          <motion.div 
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        <div className="flex-1 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <span className="text-sm font-bold tracking-widest text-muted-foreground uppercase mb-4 block">
                Question {currentStep + 1} of {QUESTIONS.length}
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-10 leading-tight">
                {currentQ.question}
              </h2>

              <div className="space-y-4">
                {currentQ.options.map((opt, i) => {
                  const isSelected = answers[currentStep] === opt;
                  return (
                    <button
                      key={i}
                      onClick={() => handleSelect(opt)}
                      className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-200 text-lg ${
                        isSelected 
                          ? "border-primary bg-primary text-primary-foreground shadow-lg scale-[1.02]" 
                          : "border-border hover:border-primary/50 hover:bg-secondary/50 bg-card"
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-12 flex justify-between items-center border-t border-border pt-6">
          <Button 
            variant="ghost" 
            disabled={currentStep === 0 || createResult.isPending}
            onClick={() => setCurrentStep(c => c - 1)}
          >
            Back
          </Button>
          
          <Button 
            size="lg" 
            className="rounded-full px-8 h-12"
            disabled={!answers[currentStep] || createResult.isPending}
            onClick={handleNext}
          >
            {createResult.isPending ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : currentStep === QUESTIONS.length - 1 ? (
              "Reveal My Style"
            ) : (
              <>Next <ArrowRight className="w-4 h-4 ml-2" /></>
            )}
          </Button>
        </div>

      </div>
    </div>
  );
}
