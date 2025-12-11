"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { resumeData } from "@/data/resume";
import { motion, useScroll } from "framer-motion";
import {
  ChevronDown,
  Code2,
  Cpu,
  Database,
  ExternalLink,
  Github,
  Layout,
  Linkedin,
  Mail,
  Menu,
  Server,
  Terminal,
  X
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

function SkillCard({ title, icon, skills }: { title: string, icon: React.ReactNode, skills: string[] }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="h-full"
    >
      <Card className="h-full bg-secondary/20 border-white/5 hover:border-primary/20 transition-all duration-300">
        <CardHeader className="flex flex-row items-center gap-4 pb-2">
          <div className="p-2 rounded-lg bg-background/50 border border-white/5">
            {icon}
          </div>
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, i) => (
              <Badge key={i} variant="outline" className="border-white/10 bg-white/5 hover:bg-primary/10 hover:text-primary hover:border-primary/20 transition-colors">
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function Home() {
  const { scrollYProgress } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300); // Show after scrolling 300px
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-primary-foreground">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? "h-16 bg-background/80 backdrop-blur-md border-b border-white/5" : "h-24 bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 h-full flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400"
            data-testid="text-logo"
          >
            AJAY DARISI
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {["About", "Skills", "Experience", "Projects", "Contact"].map((item, i) => (
              <motion.button
                key={item}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-sm font-medium text-muted-foreground hover:text-primary cursor-pointer transition-colors"
                data-testid={`nav-link-${item.toLowerCase()}`}
              >
                {item}
              </motion.button>
            ))}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Button 
                variant="outline" 
                className="border-primary/20 cursor-pointer text-primary" 
                onClick={() => window.open(`https://${resumeData.personalInfo.github}`, '_blank')}
                data-testid="btn-github-nav"
              >
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="btn-mobile-menu"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="md:hidden bg-background border-b border-white/5 px-6 py-4"
          >
            <div className="flex flex-col gap-4">
              {["About", "Skills", "Experience", "Projects", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-left text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2"
                  data-testid={`mobile-nav-link-${item.toLowerCase()}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/hero-bg.png" 
            alt="Abstract Tech Background" 
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,hsl(var(--background))_100%)]" />
        </div>

        <div className="container relative z-10 px-6">
          <motion.div 
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="max-w-4xl mx-auto text-center"
          >
            {/* <motion.div variants={fadeInUp}>
              <Badge variant="outline" className="mb-6 px-4 py-1 border-primary/50 text-primary bg-primary/5 rounded-full backdrop-blur-sm">
                Available for hire
              </Badge>
            </motion.div> */}
            
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 tracking-tight leading-none"
            >
              Building the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-blue-500">
                Future of Web
              </span>
            </motion.h1>

            <motion.p 
              variants={fadeInUp}
              className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              I&apos;m <span className="text-foreground font-semibold">{resumeData.personalInfo.name}</span>, a Software Developer crafting scalable applications with React, Next.js, and Modern Backend Technologies.
            </motion.p>

            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button 
                size="lg" 
                className="rounded-full px-8 text-lg h-12 bg-primary cursor-pointer text-primary-foreground font-semibold shadow-[0_0_20px_-5px_hsl(var(--primary))]" 
                onClick={() => scrollToSection('projects')}
                data-testid="btn-view-work"
              >
                View My Work
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="rounded-full px-8 text-lg h-12 border-white/10 cursor-pointer" 
                onClick={() => scrollToSection('contact')}
                data-testid="btn-contact-hero"
              >
                Contact Me
              </Button>
            </motion.div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-muted-foreground"
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-secondary/20">
        <div className="container px-6 mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-8">About Me</h2>
            <p className="text-lg text-muted-foreground leading-relaxed" data-testid="text-about-description">
              {resumeData.personalInfo.objective}
            </p>
            <Separator className="my-10 bg-white/10" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <h3 className="text-4xl font-bold text-primary mb-2">3+</h3>
                <p className="text-sm text-muted-foreground">Years Experience</p>
              </div>
              <div className="text-center">
                <h3 className="text-4xl font-bold text-primary mb-2">15+</h3>
                <p className="text-sm text-muted-foreground">Team Size Led</p>
              </div>
              <div className="text-center">
                <h3 className="text-4xl font-bold text-primary mb-2">100k+</h3>
                <p className="text-sm text-muted-foreground">Users Served</p>
              </div>
              <div className="text-center">
                <h3 className="text-4xl font-bold text-primary mb-2">60+</h3>
                <p className="text-sm text-muted-foreground">Countries Reached</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24">
        <div className="container px-6 mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Technical Arsenal</h2>
            <p className="text-muted-foreground">Tools and technologies I use to bring ideas to life</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SkillCard 
              title="Frontend Development" 
              icon={<Layout className="w-6 h-6 text-primary" />}
              skills={resumeData.skills.frontend}
            />
            <SkillCard 
              title="Backend Architecture" 
              icon={<Server className="w-6 h-6 text-purple-400" />}
              skills={resumeData.skills.backend}
            />
            <SkillCard 
              title="Languages & Core" 
              icon={<Code2 className="w-6 h-6 text-blue-400" />}
              skills={resumeData.skills.languages}
            />
            <SkillCard 
              title="Integrations & Payments" 
              icon={<Cpu className="w-6 h-6 text-green-400" />}
              skills={resumeData.skills.integrations}
            />
            <SkillCard 
              title="DevOps & Tools" 
              icon={<Terminal className="w-6 h-6 text-orange-400" />}
              skills={resumeData.skills.tools}
            />
            <SkillCard 
              title="Soft Skills & Leadership" 
              icon={<Database className="w-6 h-6 text-pink-400" />}
              skills={resumeData.skills.soft}
            />
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 bg-secondary/10 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-secondary/20 pointer-events-none" />
        <div className="container px-6 mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Professional Journey</h2>
            <p className="text-muted-foreground">My career path and key contributions</p>
          </motion.div>

          <div className="space-y-12">
            {resumeData.experience.map((exp, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative pl-8 md:pl-0"
              >
                <div className="md:grid md:grid-cols-12 gap-8 items-start">
                  {/* Timeline Line (Desktop) */}
                  <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-px bg-white/10 -translate-x-1/2" />
                  
                  {/* Date (Desktop Left / Right alternate) */}
                  <div className={`md:col-span-5 mb-2 md:mb-0 ${index % 2 === 0 ? "md:text-right md:pr-12" : "md:col-start-8 md:pl-12"}`}>
                    <div className="inline-block px-3 py-1 rounded-full bg-secondary/50 border border-white/5 text-xs font-mono text-primary mb-2">
                      {exp.period}
                    </div>
                    <h3 className="text-xl font-bold text-foreground">{exp.company}</h3>
                    <p className="text-muted-foreground">{exp.location}</p>
                  </div>

                  {/* Dot */}
                  <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-primary -translate-x-[5px] md:-translate-x-1/2 mt-1.5 ring-4 ring-background" />

                  {/* Content */}
                  <div className={`md:col-span-5 ${index % 2 === 0 ? "md:col-start-8 md:pl-12" : "md:col-start-1 md:row-start-1 md:text-right md:pr-12"}`}>
                     <Card className="bg-secondary/30 border-white/5 hover:border-white/10 transition-colors">
                      <CardHeader className="p-4 md:p-6">
                        <CardTitle className="text-lg text-primary">{exp.role}</CardTitle>
                        <CardDescription className="mt-2 text-sm leading-relaxed text-muted-foreground/80">
                          {exp.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 md:p-6 pt-0">
                        <ul className={`space-y-2 text-sm text-muted-foreground ${index % 2 !== 0 ? "md:text-right" : ""}`}>
                          {exp.achievements.map((achievement, i) => (
                            <li key={i} className="flex gap-2 items-start">
                              <span className={`mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/50 shrink-0 ${index % 2 !== 0 ? "md:order-last" : ""}`} />
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24">
        <div className="container px-6 mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Featured Projects</h2>
            <p className="text-muted-foreground">A glimpse into what I&apos;ve built</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {resumeData.projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="group relative overflow-hidden rounded-xl bg-secondary/20 border border-white/5 hover:border-primary/30 transition-all duration-500 h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="p-8 relative z-10">
                    <div className="flex justify-between items-start mb-6">
                      <div className="p-3 rounded-lg bg-primary/10 text-primary">
                        <Terminal className="w-6 h-6" />
                      </div>
                      <Link href={project.link} target="_blank">
                        <Button variant="ghost" size="icon" className="hover:text-primary hover:bg-primary/10 cursor-pointer rounded-full" data-testid={`btn-project-link-${index}`}>
                          <ExternalLink className="w-5 h-5" />
                        </Button>
                      </Link>
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{project.name}</h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {project.tech.split(", ").map((tech, i) => (
                        <Badge key={i} variant="secondary" className="bg-secondary/50 hover:bg-secondary border-white/5">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gradient-to-t from-black to-background relative overflow-hidden">
        {/* Glow Effect */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="container px-6 mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Ready to Innovate?</h2>
            <p className="text-xl text-muted-foreground mb-10">
              I&apos;m currently looking for new opportunities. Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Button 
                size="lg" 
                className="h-14 px-8 text-lg rounded-full cursor-pointer" 
                onClick={() => window.location.href = `mailto:${resumeData.personalInfo.email}`}
                data-testid="btn-email-me"
              >
                <Mail className="mr-2 w-5 h-5" />
                Say Hello
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="h-14 px-8 text-lg rounded-full border-white/10 cursor-pointer" 
                onClick={() => window.open(`https://${resumeData.personalInfo.linkedin}`, '_blank')}
                data-testid="btn-linkedin-footer"
              >
                <Linkedin className="mr-2 w-5 h-5" />
                LinkedIn
              </Button>
            </div>

            <div className="flex flex-col items-center gap-4 text-sm text-muted-foreground">
              <p data-testid="text-location">{resumeData.personalInfo.location}</p>
              <p data-testid="text-email">{resumeData.personalInfo.email}</p>
              <div className="flex items-center gap-6 mt-4">
                <a href={`https://${resumeData.personalInfo.github}`} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors" data-testid="link-github-footer">GitHub</a>
                <a href={`https://${resumeData.personalInfo.linkedin}`} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors" data-testid="link-linkedin-footer">LinkedIn</a>
                <a href={`mailto:${resumeData.personalInfo.email}`} className="hover:text-primary transition-colors" data-testid="link-email-footer">Email</a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all cursor-pointer"
        >
          <ChevronDown className="h-5 w-5 rotate-180" />
        </motion.button>
      )}

      {/* <footer className="py-8 border-t border-white/5 text-center text-xs text-muted-foreground/50">
        <p>© {new Date().getFullYear()} {resumeData.personalInfo.name}. All rights reserved.</p>
      </footer> */}
    </div>
  );
}
