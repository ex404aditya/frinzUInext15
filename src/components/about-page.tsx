import Image from "next/image";
import React from "react";
import { Brain, Share2, Zap, Pen, Sparkles, ChevronRight } from "lucide-react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Footer } from "./footer";

interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
  isPopular?: boolean;
}

export default function Home() {
  const pricingPlans = [
    {
      title: "Basic",
      price: "Free",
      features: [
        "Basic AI writing assistance",
        "5 research queries/month",
        "Standard editor features",
        "Basic grammar checking",
      ],
    },
    {
      title: "Pro",
      price: "$19",
      features: [
        "Advanced AI writing tools",
        "Unlimited research queries",
        "Premium editor features",
        "Citation generator",
        "Plagiarism checker",
        "Research paper templates",
      ],
      isPopular: true,
    },
    {
      title: "Enterprise",
      price: "$49",
      features: [
        "Everything in Pro",
        "Custom AI models",
        "Team collaboration",
        "API access",
        "Priority support",
        "Custom templates",
      ],
    },
  ];

  const testimonials = [
    {
      content:
        "Frinz has revolutionized how I write my research papers. The AI suggestions and research assistant save me countless hours of work.",
      author: "Sarah Chen",
      role: "Graduate Student",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
    },
    {
      content:
        "The research capabilities and writing assistance are incredible. It's like having a personal writing coach and research assistant.",
      author: "Michael Torres",
      role: "Content Researcher",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150",
    },
    {
      content:
        "As a professional writer, Frinz has become an indispensable tool. The AI suggestions are spot-on and the research features are comprehensive.",
      author: "Emily Watson",
      role: "Professional Writer",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150",
    },
  ];

  return (
    <div className="bg-white text-black">
      <main className="container mx-auto flex flex-col gap-20 mt-20 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="flex flex-col items-center text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Write smarter, research faster
            <span className="text-primary"> with AI</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-3xl">
            Your intelligent writing and research companion. Let AI help you
            craft better content, conduct thorough research, and elevate your
            writing to the next level.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button size="lg" className="rounded gap-2">
              Start Writing
              <ChevronRight className="h-5 w-5" />
            </Button>
            <Button size="lg" className="rounded " variant="outline">
              Try Demo
            </Button>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-yellow-500" />
              <span>AI-powered writing</span>
            </div>
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-blue-500" />
              <span>Smart research</span>
            </div>
            <div className="flex items-center gap-2">
              <Pen className="h-5 w-5 text-purple-500" />
              <span>Advanced editor</span>
            </div>
          </div>
        </section>

        {/* Feature Preview */}
        <section className="relative z-10">
          <Card className="relative aspect-video overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1542435503-956c469947f6?auto=format&fit=crop&q=80"
              alt="Advanced WYSIWYG editor interface"
              layout="fill"
              objectFit="cover"
              className="opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-purple-600/20" />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
              <Card className="flex items-center gap-4 px-8 py-4">
                <div className="animate-pulse h-3 w-3 bg-green-500 rounded-full" />
                <span>AI Assistant Active</span>
              </Card>
            </div>
          </Card>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="flex flex-col items-center">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground">
              Choose the plan that's right for you
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl w-full">
            {pricingPlans.map((plan, index) => (
              <Card
                key={index}
                className={`p-8 relative ${
                  plan.isPopular ? "border-primary" : ""
                }`}
              >
                {plan.isPopular && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-1 rounded-full text-sm">
                    Most Popular
                  </span>
                )}
                <div className="text-center">
                  <h3 className="text-2xl font-bold">{plan.title}</h3>
                  <div className="mt-4 flex items-baseline justify-center gap-x-2">
                    <span className="text-5xl font-bold">{plan.price}</span>
                    {plan.price !== "Free" && (
                      <span className="text-sm text-muted-foreground">
                        /month
                      </span>
                    )}
                  </div>
                </div>
                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full mt-8"
                  variant={plan.isPopular ? "default" : "outline"}
                >
                  Get started
                </Button>
              </Card>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="flex flex-col items-center">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Trusted by writers worldwide
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground">
              See what our users have to say about Frinz
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-8">
                <div className="flex flex-col h-full">
                  <div className="flex-grow">
                    <div className="h-7 w-7 text-primary mb-4">"</div>
                    <p className="text-lg">{testimonial.content}</p>
                  </div>
                  <div className="flex items-center gap-4 mt-8 pt-8 border-t">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.author}
                      width={48}
                      height={48}
                      className="rounded-full object-cover"
                    />
                    <div>
                      <div className="font-medium">{testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
