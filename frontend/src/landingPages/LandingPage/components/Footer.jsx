import { Link } from 'react-router-dom';
import { Code, Github, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-20 relative z-10">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          <div className="col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold">Codify-CODE</span>
                <p className="text-gray-400 text-sm mt-1">Learn to code, change the world</p>
              </div>
            </div>
            <p className="text-gray-400">
              The world's largest platform for learning to code. Interactive tutorials, 
              real-world projects, and career-ready certifications.
            </p>
          </div>
          
          {['Learn', 'Practice', 'Resources', 'Company'].map((category, idx) => (
            <div key={idx}>
              <h3 className="font-bold text-lg mb-6">{category}</h3>
              <ul className="space-y-3 text-gray-400">
                {category === 'Learn' && (
                  <>
                    <li><Link to="/tutorials" className="hover:text-white transition-colors">Tutorials</Link></li>
                    <li><Link to="/exercises" className="hover:text-white transition-colors">Exercises</Link></li>
                    <li><Link to="/certifications" className="hover:text-white transition-colors">Certifications</Link></li>
                    <li><Link to="/courses" className="hover:text-white transition-colors">Courses</Link></li>
                  </>
                )}
                {category === 'Practice' && (
                  <>
                    <li><Link to="/practice" className="hover:text-white transition-colors">Practice</Link></li>
                    <li><Link to="/projects" className="hover:text-white transition-colors">Projects</Link></li>
                    <li><Link to="/editor" className="hover:text-white transition-colors">Code Editor</Link></li>
                    <li><Link to="/spaces" className="hover:text-white transition-colors">Workspaces</Link></li>
                  </>
                )}
                {category === 'Resources' && (
                  <>
                    <li><Link to="/community" className="hover:text-white transition-colors">Community</Link></li>
                    <li><Link to="/progress" className="hover:text-white transition-colors">Progress</Link></li>
                    <li><Link to="/mobile" className="hover:text-white transition-colors">Mobile App</Link></li>
                  </>
                )}
                {category === 'Company' && (
                  <>
                    <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
                    <li><Link to="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                    <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                  </>
                )}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-6 mb-4 md:mb-0">
            <a href="https://github.com/AsifMhaldar" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors hover:scale-110">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://www.linkedin.com/in/asif-mhaldar-ab818b297/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors hover:scale-110">
              <Linkedin className="w-6 h-6" />
            </a>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-gray-400 text-sm">
              © 2024 Codify-CODE. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs mt-2">
              Made with ❤️ for developers worldwide
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
