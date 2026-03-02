import { useAuth } from "@/hooks/use-auth";
import { useResults } from "@/hooks/use-results";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Loader2, Plus, Sparkles, Calendar } from "lucide-react";
import { motion } from "framer-motion";

export default function MyStyle() {
  const { user, loading } = useAuth();
  const [, setLocation] = useLocation();
  const { data: results, isLoading: resultsLoading } = useResults(user?.uid);

  if (loading || resultsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    setLocation("/sign-in");
    return null;
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-3">Your Style Profile</h1>
          <p className="text-muted-foreground text-lg">Welcome back, {user.displayName || "Stylist"}. Here are your saved aesthetic identities.</p>
        </div>
        <Link href="/style-test">
          <Button className="rounded-full h-12 px-6 fashion-shadow">
            <Plus className="w-5 h-5 mr-2" /> Retake Test
          </Button>
        </Link>
      </div>

      {!results || results.length === 0 ? (
        <div className="text-center py-32 bg-secondary/30 rounded-[2rem] border border-dashed border-border">
          <Sparkles className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="text-2xl font-display font-bold mb-2">No profiles yet</h3>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">You haven't discovered your style identity yet. Take the test to get personalized recommendations.</p>
          <Link href="/style-test">
            <Button size="lg" className="rounded-full">Start the Test</Button>
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {results.map((result, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={result.id} 
              className="bg-card rounded-[2rem] p-8 shadow-lg shadow-black/5 border border-border/50 hover:shadow-xl hover:border-border transition-all duration-300"
            >
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-4 uppercase tracking-wider">
                <Calendar className="w-4 h-4" />
                {new Date(result.createdAt!).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
              </div>
              
              <h2 className="text-2xl font-display font-bold mb-6">{result.styleType}</h2>
              
              <div className="mb-8">
                <p className="text-sm font-semibold mb-3">Your Palette</p>
                <div className="flex gap-3">
                  {result.colors.map((color, idx) => (
                    <div 
                      key={idx} 
                      className="w-10 h-10 rounded-full shadow-inner border border-black/10"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold mb-3">Key Recommendations</p>
                <ul className="space-y-3">
                  {result.recommendations.map((rec, idx) => (
                    <li key={idx} className="flex gap-3 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                      <span className="leading-relaxed">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
