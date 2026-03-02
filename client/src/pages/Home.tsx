import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Camera, Palette } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                <span>AI-Powered Fashion Discovery</span>
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold leading-[1.1] mb-6 tracking-tight text-foreground">
                Discover Your True <span className="italic text-muted-foreground">Style Identity.</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground mb-10 leading-relaxed max-w-lg">
                Join GenFashionAI to uncover your unique aesthetic. Take our intelligent style test and receive personalized color palettes and fashion recommendations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/style-test">
                  <Button size="lg" className="rounded-full h-14 px-8 text-lg fashion-shadow hover:-translate-y-1 transition-transform duration-300">
                    Take the Style Test <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button variant="outline" size="lg" className="rounded-full h-14 px-8 text-lg border-2 hover:bg-secondary transition-colors duration-300">
                    Create Account
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="relative lg:ml-auto"
            >
              {/* landing page hero fashion model editorial shot */}
              <div className="relative rounded-[2.5rem] overflow-hidden fashion-shadow aspect-[4/5] max-w-[500px] mx-auto">
                <img 
                  src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80" 
                  alt="High fashion editorial" 
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              
              {/* Floating Element */}
              <div className="absolute -bottom-6 -left-6 bg-background p-6 rounded-2xl fashion-shadow border border-border/50 max-w-[200px] hidden md:block">
                <div className="flex gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full bg-[#E5D5C5]" />
                  <div className="w-6 h-6 rounded-full bg-[#2C363F]" />
                  <div className="w-6 h-6 rounded-full bg-[#8C6D53]" />
                </div>
                <p className="font-display font-bold text-sm">Minimalist Elegance</p>
                <p className="text-xs text-muted-foreground mt-1">Your matched palette</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-card border-y border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground">Three simple steps to elevate your wardrobe and define your personal brand.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Camera className="w-8 h-8" />}
              title="1. Take the Test"
              description="Answer a few visual questions about your lifestyle, preferences, and aesthetics."
            />
            <FeatureCard 
              icon={<Sparkles className="w-8 h-8" />}
              title="2. AI Analysis"
              description="Our intelligent engine processes your answers to determine your core style archetype."
            />
            <FeatureCard 
              icon={<Palette className="w-8 h-8" />}
              title="3. Get Your Profile"
              description="Receive personalized color palettes and actionable wardrobe recommendations."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-background p-8 rounded-3xl border border-border/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
      <div className="w-14 h-14 rounded-2xl bg-secondary text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold font-display mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}
