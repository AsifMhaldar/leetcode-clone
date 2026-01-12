import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Code, Star, Users, Zap, ArrowRight, Github, Twitter, Linkedin, Shield, Cpu, Clock } from 'lucide-react';

const LandingPage = () => {

  const { isAuthenticated } = useSelector((state) => state.auth);

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="bg-white/5 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Code className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Codify-CODE
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-300 hover:text-white transition-colors duration-300 font-medium"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-lg rounded-full px-4 py-2 border border-white/20 mb-8">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-gray-300">Trusted by 10,000+ developers worldwide</span>
          </div>
          
          <h1 className="text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Master Coding
            </span>
            <br />
            <span className="text-white">Through Practice</span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Level up your coding skills with our curated collection of programming challenges, 
            real-time code execution, and AI-powered assistance.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link
              to="/signup"
              className="group bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center space-x-2"
            >
              <span>Start Coding Now</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            
            <Link
              to="/login"
              className="border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300"
            >
              I have an account
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Why Choose Codify-CODE?</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Everything you need to become a better developer, all in one place
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Code,
              title: "Real Code Editor",
              description: "Write, run, and test your code in a fully-featured online IDE with syntax highlighting and auto-completion.",
              color: "from-blue-500 to-cyan-500"
            },
            {
              icon: Cpu,
              title: "AI-Powered Assistance",
              description: "Get instant help and explanations from our AI assistant when you're stuck on a problem.",
              color: "from-purple-500 to-pink-500"
            },
            {
              icon: Clock,
              title: "Track Your Progress",
              description: "Monitor your coding journey with detailed analytics and personalized learning paths.",
              color: "from-green-500 to-emerald-500"
            },
            {
              icon: Users,
              title: "Community Solutions",
              description: "Learn from multiple approaches and compare your solutions with others after solving problems.",
              color: "from-orange-500 to-red-500"
            },
            {
              icon: Zap,
              title: "Instant Feedback",
              description: "Get immediate test results and performance metrics for every submission you make.",
              color: "from-yellow-500 to-orange-500"
            },
            {
              icon: Shield,
              title: "Secure Environment",
              description: "Code with confidence in our secure, isolated execution environment.",
              color: "from-indigo-500 to-purple-500"
            }
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 group"
            >
              <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "500+", label: "Coding Problems" },
              { number: "10K+", label: "Active Users" },
              { number: "50K+", label: "Submissions" },
              { number: "15+", label: "Programming Languages" }
            ].map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="text-3xl font-bold text-white">{stat.number}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your Coding Journey?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Join thousands of developers who are already improving their skills with Codify-CODE
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <span>Create Free Account</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/5 backdrop-blur-lg border-t border-white/10 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Code className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">Codify-CODE</span>
            </div>
            
            <div className="flex items-center space-x-6 text-gray-400">
              <a href="https://github.com/AsifMhaldar" target='_block' className="hover:text-white transition-colors duration-300">
                <Github className="w-5 h-5" />
              </a>
              {/* <a href="#" className="hover:text-white transition-colors duration-300">
                <Twitter className="w-5 h-5" />
              </a> */}
              <a href="https://www.linkedin.com/in/asif-mhaldar-ab818b297/" className="hover:text-white transition-colors duration-300">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 Codify-CODE. Built with ❤️ for developers worldwide.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;