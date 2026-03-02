import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <h1 className="text-5xl font-display font-bold text-center mb-12">About GenFashionAI</h1>
        
        {/* fashion brand studio aesthetics */}
        <div className="rounded-[2rem] overflow-hidden aspect-[21/9] mb-12">
          <img 
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1200&q=80" 
            alt="Fashion studio" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="prose prose-lg prose-neutral max-w-none">
          <p className="text-xl leading-relaxed text-muted-foreground font-medium">
            We believe that style is a deeply personal language. GenFashionAI was built to help you decode that language using the power of intelligent analysis.
          </p>
          <p>
            The modern fashion landscape is overwhelming. With micro-trends emerging daily, it's easy to lose sight of what actually works for you. Our mission is to cut through the noise and provide a clear, personalized roadmap to your ultimate wardrobe.
          </p>
          <p>
            By combining aesthetic principles, color theory, and advanced data processing, we create unique Style Identities that serve as your north star for future fashion choices.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
