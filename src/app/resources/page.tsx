"use client";

import { useState } from "react";
import { Container, Section, Badge } from "@/lib/ui";
import { VerticalCutReveal } from "../../components/ui/vertical-cut-reveal";
import { Card, CardHeader, CardContent } from "../../components/ui/card";
import {
    ExternalLink,
    Zap,
    Search,
    BookOpen,
    Layout,
    Cpu,
    Globe,
    BrainCircuit,
    Rocket,
    Database,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

type Category = "All" | "AI & ML" | "Web3 Hub" | "Africa Tech" | "SDGs" | "Tools";

interface Resource {
    title: string;
    category: Category;
    badge: string;
    provider: string; // Dynamic company label
    description: string;
    url: string;
    image: string;
    icon: React.ReactNode;
}

export default function ResourcesPage() {
    const [activeTab, setActiveTab] = useState<Category>("All");

    const getBrandIcon = (slug: string) => (
        <div className="relative w-full h-full p-1">
            <Image
                src={`https://cdn.simpleicons.org/${slug}/white`}
                alt={`${slug} icon`}
                fill
                className="object-contain"
                unoptimized
            />
        </div>
    );

    const resources: Resource[] = [
        // AI & ML
        {
            title: "5-Day Gen AI Intensive",
            category: "AI & ML",
            badge: "Kaggle Course",
            provider: "Kaggle",
            description: "An intensive guide to mastering Generative AI fundamentals and implementation.",
            url: "https://www.kaggle.com/learn-guide/5-day-genai",
            image: "/media/shared/resources/kaggle.png",
            icon: <Cpu className="w-4 h-4" />
        },
        {
            title: "Machine Learning Foundations",
            category: "AI & ML",
            badge: "IBM Think",
            provider: "IBM",
            description: "Explore the core concepts that power modern machine learning models.",
            url: "https://www.ibm.com/think/topics/machine-learning",
            image: "/media/shared/resources/ibm.png",
            icon: <BrainCircuit className="w-4 h-4" />
        },
        {
            title: "AI For Beginners",
            category: "AI & ML",
            badge: "Microsoft",
            provider: "Microsoft",
            description: "A comprehensive 12-week curriculum on the fundamentals of Artificial Intelligence.",
            url: "https://github.com/microsoft/AI-For-Beginners",
            image: "/media/shared/resources/microsoft.png",
            icon: <Layout className="w-4 h-4" />
        },
        {
            title: "Generative AI for Beginners",
            category: "AI & ML",
            badge: "Microsoft",
            provider: "Microsoft",
            description: "A practical guide to building applications with generative AI models.",
            url: "https://github.com/microsoft/generative-ai-for-beginners",
            image: "/media/shared/resources/microsoft.png",
            icon: <Zap className="w-4 h-4" />
        },
        {
            title: "What is Machine Learning?",
            category: "AI & ML",
            badge: "DataCamp",
            provider: "DataCamp",
            description: "A deep dive into how computers learn from data without explicit programming.",
            url: "https://www.datacamp.com/blog/what-is-machine-learning",
            image: "/media/shared/resources/datacamp.png",
            icon: <Search className="w-4 h-4" />
        },
        {
            title: "Model Training Basics",
            category: "AI & ML",
            badge: "IBM",
            provider: "IBM",
            description: "Understand the lifecycle and challenges of training high-performance AI models.",
            url: "https://www.ibm.com/think/topics/model-training",
            image: "/media/shared/resources/ibm.png",
            icon: <Cpu className="w-4 h-4" />
        },
        {
            title: "Google Skills Courses",
            category: "AI & ML",
            badge: "Google",
            provider: "Google",
            description: "Accelerate your career with curated AI and data science courses from Google.",
            url: "https://www.skills.google/",
            image: "/media/shared/resources/google.jpeg",
            icon: <Layout className="w-4 h-4" />
        },
        {
            title: "Hugging Face Learn",
            category: "AI & ML",
            badge: "Hugging Face",
            provider: "Hugging Face",
            description: "The definitive library for learning NLP, Diffusion, and transformer models.",
            url: "https://huggingface.co/learn",
            image: "/media/shared/resources/huggingface.jpeg",
            icon: <BrainCircuit className="w-4 h-4" />
        },

        // Web3 Hub
        {
            title: "Web3 Learning Track",
            category: "Web3 Hub",
            badge: "Google Cloud",
            provider: "Google",
            description: "Build on the next generation of decentralized infrastructure with Google Cloud.",
            url: "https://cloud.google.com/application/web3/learn",
            image: "/media/shared/resources/googlecloud.png",
            icon: <Globe className="w-4 h-4" />
        },
        {
            title: "What is Web3?",
            category: "Web3 Hub",
            badge: "AWS",
            provider: "Amazon",
            description: "A foundational guide to decentralized protocols and blockchain technology.",
            url: "https://aws.amazon.com/what-is/web3/",
            image: "/media/shared/resources/aws.jpeg",
            icon: <Search className="w-4 h-4" />
        },
        {
            title: "Agentic AI Overview",
            category: "Web3 Hub",
            badge: "IBM",
            provider: "IBM",
            description: "How autonomous AI agents are reshaping the digital landscape.",
            url: "https://www.ibm.com/think/topics/agentic-ai",
            image: "/media/shared/resources/ibm.png",
            icon: <Cpu className="w-4 h-4" />
        },
        {
            title: "AI & Web3 Innovation",
            category: "Web3 Hub",
            badge: "EY",
            provider: "EY",
            description: "Discover how the fusion of AI and Web3 is reinventing global business models.",
            url: "https://www.ey.com/en_gl/innovation-realized/how-the-combination-of-ai-and-web3-could-reinvent-business",
            image: "/media/shared/resources/ey.png",
            icon: <Rocket className="w-4 h-4" />
        },
        {
            title: "Web3 University",
            category: "Web3 Hub",
            badge: "Community",
            provider: "Alchemy",
            description: "The world's largest educator for blockchain development and DeAI.",
            url: "https://www.web3.university/",
            image: "/media/shared/resources/community.jpeg",
            icon: <Globe className="w-4 h-4" />
        },
        {
            title: "Metacamp Hub",
            category: "Web3 Hub",
            badge: "Research",
            provider: "Metacamp",
            description: "Exploring the intersection of modern finance, decentralized tech, and AI.",
            url: "https://www.metacamp.sg/",
            image: "/media/shared/resources/metacamp.jpeg",
            icon: <Layout className="w-4 h-4" />
        },
        {
            title: "Web3 Fundamentals",
            category: "Web3 Hub",
            badge: "Coursera",
            provider: "Coursera",
            description: "Professional certification in blockchain and decentralized network design.",
            url: "https://www.coursera.org/learn/web3-blockchain-fundamentals",
            image: "/media/shared/resources/coursera.png",
            icon: <BookOpen className="w-4 h-4" />
        },

        // Africa Tech
        {
            title: "AI for Africa",
            category: "Africa Tech",
            badge: "Smart Africa",
            provider: "Smart Africa",
            description: "Policy recommendations and strategic frameworks for AI adoption in Africa.",
            url: "https://smartafrica.org/knowledge/artificial-intelligence-for-africa/",
            image: "/media/shared/resources/smartafrica.jpeg",
            icon: <Rocket className="w-4 h-4" />
        },
        {
            title: "Africa's AI Revolution",
            category: "Africa Tech",
            badge: "GIZ / AU",
            provider: "African Union",
            description: "Insights on how Africa's data revolution is empowering the youth.",
            url: "https://www.giz.de/en/regions/africa/african-union/news/africas-ai-revolution-needs-you-lets-build-it-data",
            image: "/media/shared/resources/giz.png",
            icon: <Zap className="w-4 h-4" />
        },
        {
            title: "AI for Socio-Economic Dev",
            category: "Africa Tech",
            badge: "NEPAD",
            provider: "NEPAD",
            description: "Leveraging Artificial Intelligence for Africa's socio-economic development.",
            url: "https://www.nepad.org/publication/ai-africa-artificial-intelligence-africas-socio-economic-development",
            image: "/media/shared/resources/nepad.png",
            icon: <BookOpen className="w-4 h-4" />
        },
        {
            title: "Agentic AI & MCP",
            category: "Africa Tech",
            badge: "GitHub Blog",
            provider: "GitHub",
            description: "The top blog posts of 2025 on Agentic AI and developer skills.",
            url: "https://github.blog/developer-skills/agentic-ai-mcp-and-spec-driven-development-top-blog-posts-of-2025/",
            image: "/media/shared/resources/github.png",
            icon: <Layout className="w-4 h-4" />
        },

        // SDGs
        {
            title: "UN Sustainable Goals",
            category: "SDGs",
            badge: "UN Official",
            provider: "United Nations",
            description: "Explore the 17 goals that define the roadmap for a sustainable global future.",
            url: "https://sdgs.un.org/goals",
            image: "/media/shared/resources/sdgs.png",
            icon: <Globe className="w-4 h-4" />
        },

        // Tools - Hosting & Deployment
        {
            title: "Hugging Face Spaces",
            category: "Tools",
            badge: "Hosting",
            provider: "Hugging Face",
            description: "Host ML demo apps and collaborate globally with zero setup.",
            url: "https://huggingface.co/spaces",
            image: "/media/shared/resources/huggingface.jpeg",
            icon: getBrandIcon("huggingface")
        },
        {
            title: "Vercel AI SDK",
            category: "Tools",
            badge: "Framework",
            provider: "Vercel",
            description: "Build high-performance AI apps with Next.js and streaming UI.",
            url: "https://sdk.vercel.ai/",
            image: "/media/shared/resources/community.jpeg",
            icon: getBrandIcon("vercel")
        },
        {
            title: "Streamlit Cloud",
            category: "Tools",
            badge: "Hosting",
            provider: "Streamlit",
            description: "The fastest way to deploy data scripts into shareable web apps.",
            url: "https://streamlit.io/cloud",
            image: "/media/shared/resources/community.jpeg",
            icon: getBrandIcon("streamlit")
        },
        {
            title: "Railway App",
            category: "Tools",
            badge: "Deploying",
            provider: "Railway",
            description: "Deploy any app or database instantly with automatic CI/CD.",
            url: "https://railway.app/",
            image: "/media/shared/resources/community.jpeg",
            icon: getBrandIcon("railway")
        },

        // Tools - MLOps & Tracking
        {
            title: "Weights & Biases",
            category: "Tools",
            badge: "Tracking",
            provider: "W&B",
            description: "The developer platform for visualizing and tracking ML experiments.",
            url: "https://wandb.ai/",
            image: "/media/shared/resources/ai-ml.png",
            icon: getBrandIcon("weightsandbiases")
        },
        {
            title: "MLflow Platform",
            category: "Tools",
            badge: "MLOps",
            provider: "Linux Foundation",
            description: "Open source platform for the complete machine learning lifecycle.",
            url: "https://mlflow.org/",
            image: "/media/shared/resources/ai-ml.png",
            icon: getBrandIcon("mlflow")
        },
        {
            title: "Comet ML",
            category: "Tools",
            badge: "Tracking",
            provider: "Comet",
            description: "Track, compare, explain and optimize machine learning models.",
            url: "https://www.comet.com/",
            image: "/media/shared/resources/ai-ml.png",
            icon: <Rocket className="w-8 h-8 opacity-80" />
        },

        // Tools - Development & Frameworks
        {
            title: "Cursor AI IDE",
            category: "Tools",
            badge: "Development",
            provider: "Cursor",
            description: "An AI-native code editor designed to make you 10x faster.",
            url: "https://cursor.com/",
            image: "/media/shared/resources/community.jpeg",
            icon: getBrandIcon("cursor")
        },
        {
            title: "DeepSeek Coder",
            category: "Tools",
            badge: "Model",
            provider: "DeepSeek",
            description: "Open-source LLM that beats the best in coding benchmarks.",
            url: "https://deepseek.com/",
            image: "/media/shared/resources/community.jpeg",
            icon: <BrainCircuit className="w-8 h-8 opacity-80" />
        },
        {
            title: "Pinecone DB",
            category: "Tools",
            badge: "Vector DB",
            provider: "Pinecone",
            description: "Managed vector database for lightning-fast AI search.",
            url: "https://www.pinecone.io/",
            image: "/media/shared/resources/web3.png",
            icon: <Database className="w-8 h-8 opacity-80" />
        },
        {
            title: "LangChain",
            category: "Tools",
            badge: "Framework",
            provider: "LangChain",
            description: "The leading framework for building LLM-powered autonomous agents.",
            url: "https://www.langchain.com/",
            image: "/media/shared/resources/community.jpeg",
            icon: getBrandIcon("langchain")
        },
        {
            title: "Netlify",
            category: "Tools",
            badge: "Hosting",
            provider: "Netlify",
            description: "Connect your repo and deploy your web app in seconds.",
            url: "https://www.netlify.com/",
            image: "/media/shared/resources/community.jpeg",
            icon: getBrandIcon("netlify")
        }
    ];

    const filteredResources = activeTab === "All"
        ? resources.filter(res => res.category !== "Tools")
        : resources.filter(res => res.category === activeTab);

    const tabs: Category[] = ["All", "AI & ML", "Web3 Hub", "Africa Tech", "SDGs", "Tools"];

    return (
        <main className="overflow-hidden bg-transparent transition-colors duration-500 pb-20 relative pt-24 md:pt-32">
            {/* Unified Gradient Background */}
            <div className="absolute inset-0 bg-linear-to-br from-white via-blue-50/50 to-white dark:from-[#000d1a] dark:via-[#001224] dark:to-[#000d1a] -z-10" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] dark:opacity-[0.05] -z-10" />

            <Section className="relative py-6! md:py-10! overflow-hidden bg-transparent">
                <Container>
                    <div className="max-w-4xl mx-auto text-center space-y-3 md:space-y-4 mb-16">
                        <div className="flex justify-center">
                            <Badge className="border-0 text-[#001F3F] bg-[#00D9FF] px-4 py-1.5 font-bold tracking-[0.2em] uppercase mb-2 shadow-sm italic text-xs">Knowledge Hub</Badge>
                        </div>
                        <h1 className="text-4xl md:text-7xl font-bold text-[#001F3F] dark:text-white leading-tight mb-6" style={{ fontFamily: "Blanka, sans-serif" }}>
                            <VerticalCutReveal splitBy="words">Resource Hub</VerticalCutReveal>
                        </h1>
                        <p className="text-lg md:text-xl text-[#001F3F]/70 dark:text-white/70 leading-relaxed max-w-3xl mx-auto font-medium">
                            Explore our curated pathways designed for both traditional AI development and the emerging African technology ecosystem.
                        </p>
                    </div>

                    {/* Tabs Navigation */}
                    <div className="flex flex-wrap justify-center gap-2 mb-16 border-b border-[#00D9FF]/10 pb-4">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={cn(
                                    "px-6 py-2 text-sm font-bold uppercase tracking-wider transition-all duration-300 relative rounded-t-xl overflow-hidden",
                                    activeTab === tab
                                        ? "text-[#00D9FF] bg-[#00D9FF]/5 border-x border-t border-[#00D9FF]/20"
                                        : "text-[#001F3F]/40 dark:text-white/40 hover:text-[#001F3F] dark:hover:text-white"
                                )}
                            >
                                {tab}
                                {activeTab === tab && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00D9FF] rounded-full" />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Resources Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {filteredResources.map((res, index) => (
                            <Link
                                href={res.url}
                                target="_blank"
                                key={index}
                                className="group block focus:outline-none h-full"
                            >
                                {res.category === "Tools" ? (
                                    /* Specialized Tool Card - Circle Icon Style */
                                    <Card className="h-full border border-slate-100 dark:border-white/5 bg-white/40 dark:bg-black/40 backdrop-blur-2xl shadow-[0_4px_25px_rgba(0,0,0,0.02)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] transition-all duration-700 rounded-[2.5rem] overflow-hidden flex flex-col hover:-translate-y-4 border-b-4 border-b-[#00D9FF]/30">
                                        <div className="p-8 pb-0 flex justify-between items-start">
                                            <div className="w-16 h-16 rounded-full bg-linear-to-br from-[#00D9FF]/20 to-[#00D9FF]/5 flex items-center justify-center text-[#00D9FF] shadow-inner group-hover:scale-110 transition-transform duration-500 border border-[#00D9FF]/20">
                                                {res.icon}
                                            </div>
                                            <Badge className="bg-white/10 dark:bg-white/5 text-[#001F3F] dark:text-white border border-[#001F3F]/10 dark:border-white/10 text-[9px] uppercase tracking-widest px-3 py-1 font-bold">
                                                {res.badge}
                                            </Badge>
                                        </div>

                                        <CardHeader className="p-8 pt-6 pb-2">
                                            <h3 className="text-xl font-black text-[#001F3F] dark:text-white leading-tight group-hover:text-[#00D9FF] transition-colors">
                                                {res.title}
                                            </h3>
                                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#001F3F]/40 dark:text-white/40 mt-1 block">
                                                Provided by {res.provider}
                                            </span>
                                        </CardHeader>

                                        <CardContent className="px-8 pb-8 flex-1 flex flex-col justify-between">
                                            <p className="text-[14px] text-[#001F3F]/70 dark:text-white/70 font-medium leading-relaxed mb-6">
                                                {res.description}
                                            </p>
                                            <div className="mt-auto flex items-center gap-2 text-[#00D9FF] font-black text-[10px] uppercase tracking-[0.2em]">
                                                <span>Launch Tool</span>
                                                <ExternalLink className="w-3.5 h-3.5" />
                                            </div>
                                        </CardContent>
                                    </Card>
                                ) : (
                                    /* Standard Resource Card - Image Style */
                                    <Card className="h-full border border-slate-100 dark:border-white/10 bg-white dark:bg-black/90 shadow-[0_4px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.15)] transition-all duration-700 rounded-[2.5rem] overflow-hidden flex flex-col hover:-translate-y-3">
                                        <div className="relative h-64 overflow-hidden">
                                            <Image
                                                src={res.image}
                                                alt={res.title}
                                                fill
                                                unoptimized
                                                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-transparent flex flex-col justify-end p-6">
                                                {/* Refined Provider Label - High Contrast Dark Text */}
                                                <div className="bg-white/90 backdrop-blur-2xl px-5 py-2 rounded-2xl border border-white/40 inline-block self-start shadow-xl">
                                                    <span className="text-[#001F3F] text-[11px] font-black uppercase tracking-[0.3em]">
                                                        {res.provider}
                                                    </span>
                                                </div>

                                                {/* Icon floating in top right */}
                                                <div className="absolute top-6 right-6 p-2 bg-black/30 backdrop-blur-xl rounded-xl border border-white/20 text-white">
                                                    {res.icon}
                                                </div>
                                            </div>
                                        </div>

                                        <CardHeader className="p-8 pb-4">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#00D9FF]" />
                                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#00D9FF]">
                                                    {res.category}
                                                </span>
                                            </div>
                                            <h3 className="text-2xl font-black text-[#001F3F] dark:text-white leading-tight group-hover:text-[#00D9FF] transition-colors line-clamp-2">
                                                {res.title}
                                            </h3>
                                        </CardHeader>

                                        <CardContent className="px-8 pb-10 flex-1 flex flex-col justify-between">
                                            <p className="text-[15px] text-[#001F3F]/70 dark:text-white/70 font-medium leading-relaxed line-clamp-3 mb-8">
                                                {res.description}
                                            </p>
                                            <div className="mt-auto pt-6 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-[#00D9FF] font-black text-[10px] uppercase tracking-widest group/btn">
                                                <span className="group-hover/btn:tracking-[0.2em] transition-all duration-300">Official Access</span>
                                                <div className="w-10 h-10 rounded-full border border-[#00D9FF]/30 flex items-center justify-center group-hover/btn:bg-[#00D9FF] group-hover/btn:text-white transition-all duration-300">
                                                    <ExternalLink className="w-4 h-4" />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* Empty State */}
                    {filteredResources.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-[#001F3F]/40 dark:text-white/40 font-medium">No resources found in this category.</p>
                        </div>
                    )}
                </Container>
            </Section>
        </main>
    );
}
