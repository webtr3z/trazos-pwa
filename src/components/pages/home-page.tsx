import { AppFeatures } from "@/components/data-display/app-features";
import { PageHeader } from "@/components/layouts/page-header";

export default function HomePage() {
  return (
    <div className="container max-w-screen-lg mx-auto py-0 px-4">
      <div className="mt-32">
        <PageHeader />
      </div>
      <div className="mt-12">
        <AppFeatures />
      </div>
    </div>
  );
}
