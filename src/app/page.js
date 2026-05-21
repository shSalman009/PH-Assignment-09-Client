import Banner from "@/components/home/Banner";
import { Categories } from "@/components/home/Categories";
import { HowItWorks } from "@/components/home/HowItWorks";
import TrendingIdeas from "@/components/home/TrendingIdeas";
import Loading from "@/components/shared/LoadingState";
import { Suspense } from "react";

export default function Home() {
  return (
    <div>
      <Banner />
      <Suspense fallback={<Loading />}>
        <TrendingIdeas />
      </Suspense>
      <Categories />
      <HowItWorks />
    </div>
  );
}
