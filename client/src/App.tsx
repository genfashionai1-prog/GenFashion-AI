import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { AuthProvider } from "@/hooks/use-auth";
import { Navbar } from "@/components/layout/Navbar";

// Pages
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import StyleTest from "./pages/StyleTest";
import MyStyle from "./pages/MyStyle";
import Blog from "./pages/Blog";
import About from "./pages/About";
import Contact from "./pages/Contact";

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home}/>
          <Route path="/sign-in" component={SignIn}/>
          <Route path="/sign-up" component={SignUp}/>
          <Route path="/style-test" component={StyleTest}/>
          <Route path="/my-style" component={MyStyle}/>
          <Route path="/blog" component={Blog}/>
          <Route path="/about" component={About}/>
          <Route path="/contact" component={Contact}/>
          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Router />
          <Toaster />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
