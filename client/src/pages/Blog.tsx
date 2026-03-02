import { motion } from "framer-motion";

export default function Blog() {
  const posts = [
    {
      title: "The Return of 90s Minimalism",
      category: "Trends",
      date: "Oct 12, 2023",
      image: "https://images.unsplash.com/photo-1485230895905-312918881dc6?w=600&q=80"
    },
    {
      title: "Building a Capsule Wardrobe",
      category: "Guides",
      date: "Oct 05, 2023",
      image: "https://images.unsplash.com/photo-1550639525-c97d455acf70?w=600&q=80"
    },
    {
      title: "Color Theory in Personal Style",
      category: "Education",
      date: "Sep 28, 2023",
      image: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=600&q=80"
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Editorial</h1>
        <p className="text-muted-foreground max-w-xl mx-auto text-lg">Insights, trends, and guides to elevate your personal style journey.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={i} 
            className="group cursor-pointer"
          >
            <div className="aspect-[4/3] rounded-3xl overflow-hidden mb-6">
              {/* fashion blog post image */}
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
              <span className="uppercase tracking-wider font-semibold text-primary">{post.category}</span>
              <span>•</span>
              <span>{post.date}</span>
            </div>
            <h3 className="text-2xl font-display font-bold group-hover:text-muted-foreground transition-colors">
              {post.title}
            </h3>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
