import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import Link from "next/link";
import BentoGridSection from "./_components/bento-grid-section";

const HomePage = () => {
  return (
    <div>
      <section className="grid place-content-center place-items-center gap-6 text-center">
        <Badge size="sm">
          Forged with security <Lock className="ml-1 w-4 h-4" />
        </Badge>

        <h1 className="max-w-6xl">
          Forge, the best crowdfunding platform
        </h1>

        <p className="max-w-3xl">
          Explore the World of Open Source Web3.
          Every Line of Code is Open Source - Contribute to the Future of Web3
          Developed with love from Bangalore!
        </p>

        <div className="flex items-center gap-3">
          <Button className="rounded-full">
            <Link href="/login">Get Started</Link>
          </Button>

          <Button variant="outline" className="rounded-full">
            <a href="https://github.com/adityakm24/forgeapp">
              GitHub
            </a>
          </Button>
        </div>
      </section>

      <section className="space-y-12">
        <h2 className="text-center">Key Features</h2>

        <BentoGridSection />
      </section>

    </div>
  );
};

export default HomePage;
