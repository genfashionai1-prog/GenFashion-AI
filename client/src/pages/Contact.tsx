import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Get in Touch</h1>
          <p className="text-muted-foreground text-lg">Have a question or want to collaborate? We'd love to hear from you.</p>
        </div>

        <div className="bg-card p-8 md:p-10 rounded-[2rem] shadow-xl shadow-black/5 border border-border/50">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">First Name</label>
                <Input placeholder="Jane" className="rounded-xl h-12 bg-background" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Last Name</label>
                <Input placeholder="Doe" className="rounded-xl h-12 bg-background" />
              </div>
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <Input type="email" placeholder="jane@example.com" className="rounded-xl h-12 bg-background" />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <Textarea placeholder="How can we help?" className="rounded-xl min-h-[150px] bg-background resize-none" />
            </div>
            <Button size="lg" className="w-full h-14 rounded-xl text-lg mt-4">
              Send Message
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
