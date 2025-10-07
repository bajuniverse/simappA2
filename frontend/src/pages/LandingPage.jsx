import React, { useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { 
    Rocket, Users, TrendingUp, Award, MessageCircle, Calendar,
    CheckCircle, ArrowRight, Menu, X, Star, Zap, Target,
    BookOpen, BarChart3, Shield, ChevronDown, ExternalLink
} from 'lucide-react';

const LandingPage = () => {
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeTestimonial, setActiveTestimonial] = useState(0);


    // Navigation Component
    const Navigation = () => (
        <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                <div className="flex items-center">
                    <Rocket className="h-8 w-8 text-blue-600" />
                    <span className="ml-2 text-2xl font-bold text-gray-900">SIMS</span>
                </div>
                
                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                    <a href="#features" className="text-gray-600 hover:text-blue-600 transition">Features</a>
                    <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition">How It Works</a>
                    <a href="#testimonials" className="text-gray-600 hover:text-blue-600 transition">Testimonials</a>
                    <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition">Pricing</a>
                    <button className="text-gray-600 hover:text-blue-600 transition">Sign In</button>
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                    Get Started
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button 
                    className="md:hidden"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                <div className="md:hidden py-4 space-y-2">
                    <a href="#features" className="block px-4 py-2 text-gray-600 hover:bg-gray-50">Features</a>
                    <a href="#how-it-works" className="block px-4 py-2 text-gray-600 hover:bg-gray-50">How It Works</a>
                    <a href="#testimonials" className="block px-4 py-2 text-gray-600 hover:bg-gray-50">Testimonials</a>
                    <a href="#pricing" className="block px-4 py-2 text-gray-600 hover:bg-gray-50">Pricing</a>
                    <button 
                        className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-50"
                        onClick={() => navigate("/login")}
                    >
                        Sign In
                    </button>
                    <button className="block w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    Get Started
                    </button>
                </div>
                )}
            </div>
        </nav>
    );

    // Hero Section
    const HeroSection = () => (
        <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                    🚀 Accelerate Your Startup Journey
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                    Transform Your
                    <span className="text-blue-600"> Startup Ideas</span> Into Reality
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                    Connect with expert mentors, access world-class programs, and join a thriving community of entrepreneurs ready to disrupt industries.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                    <button className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition flex items-center justify-center group">
                        Start Your Journey
                        <ArrowRight className="ml-2 group-hover:translate-x-1 transition" size={20} />
                    </button>
                    <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:border-gray-400 transition">
                        Watch Demo
                    </button>
                    </div>
                    <div className="mt-8 flex items-center gap-8">
                    <div>
                        <div className="text-3xl font-bold text-gray-900">500+</div>
                        <div className="text-sm text-gray-600">Startups Launched</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-gray-900">150+</div>
                        <div className="text-sm text-gray-600">Expert Mentors</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-gray-900">$50M+</div>
                        <div className="text-sm text-gray-600">Funding Raised</div>
                    </div>
                    </div>
                </div>
                <div className="relative">
                    <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 shadow-2xl">
                    <div className="absolute -top-4 -right-4 bg-yellow-400 rounded-full p-4 shadow-lg">
                        <Star className="text-yellow-700" size={32} />
                    </div>
                    <div className="absolute -bottom-4 -left-4 bg-green-400 rounded-full p-4 shadow-lg">
                        <Zap className="text-green-700" size={32} />
                    </div>
                    <div className="bg-white rounded-xl p-6 space-y-4">
                        <div className="flex items-center gap-4">
                        <div className="bg-blue-100 p-3 rounded-lg">
                            <Rocket className="text-blue-600" size={24} />
                        </div>
                        <div>
                            <div className="font-semibold text-gray-900">Application Submitted</div>
                            <div className="text-sm text-gray-500">TechVenture 2024</div>
                        </div>
                        <CheckCircle className="ml-auto text-green-500" size={24} />
                        </div>
                        <div className="flex items-center gap-4">
                        <div className="bg-green-100 p-3 rounded-lg">
                            <Users className="text-green-600" size={24} />
                        </div>
                        <div>
                            <div className="font-semibold text-gray-900">Mentor Assigned</div>
                            <div className="text-sm text-gray-500">Sarah Johnson - Marketing Expert</div>
                        </div>
                        </div>
                        <div className="flex items-center gap-4">
                        <div className="bg-purple-100 p-3 rounded-lg">
                            <Calendar className="text-purple-600" size={24} />
                        </div>
                        <div>
                            <div className="font-semibold text-gray-900">Next Session</div>
                            <div className="text-sm text-gray-500">Tomorrow at 2:00 PM</div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </section>
    );

    // Features Section
    const FeaturesSection = () => {
        const features = [
            {
                icon: <Users className="text-blue-600" size={32} />,
                title: "Expert Mentorship",
                description: "Get paired with industry veterans who've been there, done that. Receive personalized guidance tailored to your startup's unique needs.",
                color: "bg-blue-50"
            },
            {
                icon: <BookOpen className="text-green-600" size={32} />,
                title: "Structured Programs",
                description: "Access carefully designed incubation programs with proven frameworks, workshops, and resources to accelerate your growth.",
                color: "bg-green-50"
            },
            {
                icon: <MessageCircle className="text-purple-600" size={32} />,
                title: "Real-time Collaboration",
                description: "Stay connected with mentors and peers through integrated messaging, video calls, and collaborative workspaces.",
                color: "bg-purple-50"
            },
            {
                icon: <BarChart3 className="text-orange-600" size={32} />,
                title: "Progress Tracking",
                description: "Monitor your startup's journey with detailed analytics, milestone tracking, and performance insights.",
                color: "bg-orange-50"
            },
            {
                icon: <Target className="text-red-600" size={32} />,
                title: "Demo Day Ready",
                description: "Prepare for investor pitches with our demo day management tools, feedback sessions, and presentation coaching.",
                color: "bg-red-50"
            },
            {
                icon: <Shield className="text-indigo-600" size={32} />,
                title: "Secure & Reliable",
                description: "Enterprise-grade security with encrypted communications, role-based access, and reliable 99.9% uptime.",
                color: "bg-indigo-50"
            }
        ];

        return (
        <section id="features" className="py-20 px-4 bg-white">
            <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything You Need to Succeed</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Comprehensive tools and support system designed to take your startup from idea to launch
                </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                <div 
                    key={index}
                    className="p-6 rounded-xl border-2 border-gray-100 hover:border-blue-200 hover:shadow-lg transition group"
                >
                    <div className={`inline-block p-3 rounded-lg ${feature.color} mb-4 group-hover:scale-110 transition`}>
                    {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                </div>
                ))}
            </div>
            </div>
        </section>
        );
    };

    // How It Works Section
    const HowItWorksSection = () => {
        const steps = [
            {
                number: "01",
                title: "Apply to Programs",
                description: "Submit your startup application and tell us about your vision, team, and goals.",
                icon: <Rocket size={32} />
            },
            {
                number: "02",
                title: "Get Matched with Mentors",
                description: "Our algorithm pairs you with the perfect mentor based on your industry and needs.",
                icon: <Users size={32} />
            },
            {
                number: "03",
                title: "Learn & Grow",
                description: "Attend workshops, complete milestones, and receive continuous guidance from experts.",
                icon: <TrendingUp size={32} />
            },
            {
                number: "04",
                title: "Launch Successfully",
                description: "Present at demo day, connect with investors, and launch your product to the world.",
                icon: <Award size={32} />
            }
        ];

        return (
        <section id="how-it-works" className="py-20 px-4 bg-gray-50">
            <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Your Path to Success</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                A simple, proven process to transform your idea into a thriving business
                </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {steps.map((step, index) => (
                <div key={index} className="relative">
                    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
                    <div className="text-5xl font-bold text-blue-100 mb-4">{step.number}</div>
                    <div className="bg-blue-600 text-white p-3 rounded-lg inline-block mb-4">
                        {step.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                    </div>
                    {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                        <ArrowRight className="text-blue-300" size={32} />
                    </div>
                    )}
                </div>
                ))}
            </div>
            </div>
        </section>
        );
    };

    // Testimonials Section
    const TestimonialsSection = () => {
        const testimonials = [
            {
                name: "Alex Chen",
                role: "Founder, TechFlow AI",
                image: "AC",
                content: "SIMS transformed our startup journey. The mentorship from Sarah helped us refine our product-market fit and we raised $2M in seed funding!",
                rating: 5
            },
            {
                name: "Maria Rodriguez",
                role: "CEO, GreenEarth Solutions",
                image: "MR",
                content: "The structured program and amazing community at SIMS gave us the foundation we needed. We're now serving 10,000+ customers across 5 countries.",
                rating: 5
            },
            {
                name: "James Wilson",
                role: "Co-founder, HealthTech Plus",
                image: "JW",
                content: "From idea to demo day in 6 months! The resources, mentorship, and support system at SIMS are unmatched. Highly recommend to any serious entrepreneur.",
                rating: 5
            }
        ];

        return (
        <section id="testimonials" className="py-20 px-4 bg-white">
            <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Trusted by Founders</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Join hundreds of successful entrepreneurs who started their journey with SIMS
                </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                <div 
                    key={index}
                    className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl hover:shadow-lg transition"
                >
                    <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="text-yellow-400 fill-current" size={20} />
                    ))}
                    </div>
                    <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                    <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                        {testimonial.image}
                    </div>
                    <div>
                        <div className="font-bold text-gray-900">{testimonial.name}</div>
                        <div className="text-sm text-gray-600">{testimonial.role}</div>
                    </div>
                    </div>
                </div>
                ))}
            </div>
            </div>
        </section>
        );
    };

    // Pricing Section
    const PricingSection = () => {
        const plans = [
            {
                name: "Startup",
                price: "Free",
                description: "Perfect for early-stage founders",
                features: [
                "Application submission",
                "Community access",
                "Basic resources library",
                "Networking events",
                "Email support"
                ],
                highlighted: false
            },
            {
                name: "Growth",
                price: "$499",
                period: "/program",
                description: "For startups ready to scale",
                features: [
                "Everything in Startup",
                "Dedicated mentor matching",
                "12-week structured program",
                "Weekly 1-on-1 sessions",
                "Priority support",
                "Demo day participation"
                ],
                highlighted: true
            },
            {
                name: "Enterprise",
                price: "Custom",
                description: "For organizations and accelerators",
                features: [
                "Everything in Growth",
                "Custom program design",
                "Multiple cohort management",
                "Advanced analytics",
                "White-label options",
                "Dedicated account manager"
                ],
                highlighted: false
            }
        ];

        return (
        <section id="pricing" className="py-20 px-4 bg-gray-50">
            <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Choose the plan that fits your startup's stage and ambitions
                </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
                {plans.map((plan, index) => (
                <div 
                    key={index}
                    className={`bg-white rounded-xl p-8 ${
                    plan.highlighted 
                        ? 'ring-4 ring-blue-600 shadow-2xl transform scale-105' 
                        : 'shadow-lg'
                    }`}
                >
                    {plan.highlighted && (
                    <div className="bg-blue-600 text-white text-sm font-bold px-4 py-1 rounded-full inline-block mb-4">
                        MOST POPULAR
                    </div>
                    )}
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    {plan.period && <span className="text-gray-600">{plan.period}</span>}
                    </div>
                    <p className="text-gray-600 mb-6">{plan.description}</p>
                    <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
                        <span className="text-gray-700">{feature}</span>
                        </li>
                    ))}
                    </ul>
                    <button 
                    className={`w-full py-3 rounded-lg font-semibold transition ${
                        plan.highlighted
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                    >
                    {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                    </button>
                </div>
                ))}
            </div>
            </div>
        </section>
        );
    };

    // CTA Section
    const CTASection = () => (
        <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl font-bold text-white mb-6">
                Ready to Launch Your Startup?
                </h2>
                <p className="text-xl text-blue-100 mb-8">
                Join thousands of entrepreneurs who are building the future with SIMS
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition font-semibold flex items-center justify-center">
                    Start Your Application
                    <ArrowRight className="ml-2" size={20} />
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-blue-600 transition font-semibold">
                    Schedule a Demo
                </button>
                </div>
            </div>
        </section>
    );

    // Footer
    const Footer = () => (
        <footer className="bg-gray-900 text-gray-300 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                <div>
                    <div className="flex items-center mb-4">
                    <Rocket className="h-8 w-8 text-blue-500" />
                    <span className="ml-2 text-2xl font-bold text-white">SIMS</span>
                    </div>
                    <p className="text-gray-400">
                    Empowering startups to achieve their full potential through mentorship and structured programs.
                    </p>
                </div>
                <div>
                    <h4 className="text-white font-semibold mb-4">Product</h4>
                    <ul className="space-y-2">
                    <li><a href="#" className="hover:text-white transition">Features</a></li>
                    <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                    <li><a href="#" className="hover:text-white transition">Programs</a></li>
                    <li><a href="#" className="hover:text-white transition">Demo</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-semibold mb-4">Company</h4>
                    <ul className="space-y-2">
                    <li><a href="#" className="hover:text-white transition">About Us</a></li>
                    <li><a href="#" className="hover:text-white transition">Careers</a></li>
                    <li><a href="#" className="hover:text-white transition">Blog</a></li>
                    <li><a href="#" className="hover:text-white transition">Contact</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-semibold mb-4">Legal</h4>
                    <ul className="space-y-2">
                    <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                    <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
                    <li><a href="#" className="hover:text-white transition">Cookie Policy</a></li>
                    </ul>
                </div>
                </div>
                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
                <p className="text-gray-400 text-sm">
                    © 2024 SIMS - Startup Incubation Management System. All rights reserved.
                </p>
                <div className="flex gap-4 mt-4 md:mt-0">
                    <a href="#" className="hover:text-white transition">Twitter</a>
                    <a href="#" className="hover:text-white transition">LinkedIn</a>
                    <a href="#" className="hover:text-white transition">GitHub</a>
                </div>
                </div>
            </div>
        </footer>
    );

    return (
        <div className="min-h-screen bg-white">
            <Navigation />
            <HeroSection />
            <FeaturesSection />
            <HowItWorksSection />
            <TestimonialsSection />
            <PricingSection />
            <CTASection />
            <Footer />
        </div>
    );
};

export default LandingPage;