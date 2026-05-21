import {
  Code,
  Heart,
  Coins,
  ShoppingBag,
  Brain,
  Briefcase,
  Book,
  Pen,
  Cpu,
} from "lucide-react";
import Link from "next/link";

export function Categories() {
  const categories = [
    {
      name: "Tech",
      icon: <Cpu />,
      count: 124,
      color: "bg-blue-500/10 text-blue-600",
    },
    {
      name: "AI",
      icon: <Brain />,
      count: 210,
      color: "bg-purple-500/10 text-purple-600",
    },
    {
      name: "Health",
      icon: <Heart />,
      count: 86,
      color: "bg-red-500/10 text-red-600",
    },
    {
      name: "Education",
      icon: <Pen />,
      count: 94,
      color: "bg-orange-500/10 text-orange-600",
    },
    {
      name: "Fintech",
      icon: <Coins />,
      count: 52,
      color: "bg-emerald-500/10 text-emerald-600",
    },
    {
      name: "Business",
      icon: <Briefcase />,
      count: 75,
      color: "bg-slate-500/10 text-slate-600",
    },
  ];

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="space-y-2 mb-10 md:text-start text-center">
          <h2 className="text-4xl font-bold tracking-tight">
            Explore by Industry
          </h2>
          <p className="text-muted-foreground text-lg">
            Discover Industry-Specific Ideas
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={`/ideas?category=${cat.name}`}
              className="group flex flex-col items-center p-6 bg-background border rounded-3xl hover:border-primary hover:shadow-lg transition-all"
            >
              <div
                className={`p-3 rounded-2xl mb-3 transition-transform group-hover:scale-110 ${cat.color}`}
              >
                {cat.icon}
              </div>
              <span className="font-semibold text-sm">{cat.name}</span>
              <span className="text-xs text-muted-foreground mt-1">
                {cat.count} Ideas
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
