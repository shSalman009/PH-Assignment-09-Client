import Banner from "@/components/home/Banner";
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
    </div>
  );
}
