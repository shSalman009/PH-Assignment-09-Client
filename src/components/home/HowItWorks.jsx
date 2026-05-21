import { Lightbulb, Users, Rocket } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: "Pitch Your Idea",
      desc: "Share your startup concept, target audience, and vision with the community.",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Gather Feedback",
      desc: "Get real insights and critiques from other builders to refine your concept.",
    },
    {
      icon: <Rocket className="h-8 w-8" />,
      title: "Build the Future",
      desc: "Connect with potential co-founders or validators to bring your idea to life.",
    },
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">From Spark to Startup</h2>
          <p className="text-muted-foreground">
            The simple three-step process to validating your next big move.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center space-y-4 p-6 rounded-xl hover:bg-muted/50 transition-colors"
            >
              <div className="p-4 bg-primary/10 text-primary rounded-xl">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
