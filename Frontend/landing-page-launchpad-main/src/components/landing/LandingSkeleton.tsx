import { Skeleton } from "@/components/ui/skeleton";

const LandingSkeleton = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Skeleton */}
      <div className="container py-4 flex items-center justify-between">
        <Skeleton className="h-8 w-32" />
        <div className="hidden md:flex gap-6">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-10 w-28" />
      </div>

      {/* Hero Section Skeleton */}
      <section className="container py-20 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <Skeleton className="h-6 w-48 rounded-full" />
          <Skeleton className="h-16 w-full max-w-md" />
          <Skeleton className="h-16 w-3/4" />
          <Skeleton className="h-24 w-full max-w-sm" />
          <div className="flex gap-4 pt-4">
            <Skeleton className="h-12 w-40" />
            <Skeleton className="h-12 w-40" />
          </div>
        </div>
        <div className="relative">
          <Skeleton className="aspect-video w-full rounded-2xl" />
          <Skeleton className="absolute -top-4 -right-4 h-24 w-24 rounded-xl" />
          <Skeleton className="absolute -bottom-4 -left-4 h-32 w-32 rounded-xl" />
        </div>
      </section>

      {/* Trust Strip Skeleton */}
      <div className="bg-muted/30 py-10">
        <div className="container flex flex-wrap justify-center gap-8 md:gap-16">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-6 w-32" />
        </div>
      </div>

      {/* Features Section Skeleton */}
      <section className="container py-24 space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <Skeleton className="h-4 w-24 mx-auto rounded-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-4 w-3/4 mx-auto" />
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-6 border rounded-2xl space-y-4">
              <Skeleton className="h-12 w-12 rounded-xl" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-20 w-full" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const PricingSkeleton = () => {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container max-w-md mx-auto space-y-8">
        <div className="text-center space-y-4">
          <Skeleton className="h-4 w-24 mx-auto rounded-full" />
          <Skeleton className="h-10 w-3/4 mx-auto" />
        </div>
        <div className="p-8 border-2 border-accent/20 rounded-2xl space-y-6">
          <div className="text-center space-y-2">
            <Skeleton className="h-4 w-32 mx-auto" />
            <Skeleton className="h-6 w-24 mx-auto" />
            <Skeleton className="h-16 w-40 mx-auto mt-4" />
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex gap-3 items-center">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
          <Skeleton className="h-12 w-full mt-4" />
        </div>
      </div>
    </section>
  );
};

const AboutSkeleton = () => {
  return (
    <div className="bg-background">
      <div className="bg-muted/10 py-16 text-center space-y-4">
        <Skeleton className="h-4 w-32 mx-auto rounded-full" />
        <Skeleton className="h-12 w-1/2 mx-auto" />
        <Skeleton className="h-6 w-2/3 mx-auto" />
      </div>
      <section className="container py-20 grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <Skeleton className="h-4 w-24 rounded-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <Skeleton className="aspect-video w-full rounded-xl" />
      </section>
    </div>
  );
};

const BlogSkeleton = () => {
  return (
    <div className="container py-20 space-y-12">
      <div className="text-center space-y-4">
        <Skeleton className="h-10 w-1/2 mx-auto" />
        <Skeleton className="h-4 w-1/3 mx-auto" />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="aspect-video w-full rounded-xl" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/4" />
          </div>
        ))}
      </div>
    </div>
  );
};

const JobSkeleton = () => {
  return (
    <div className="container py-16 space-y-8 max-w-4xl mx-auto">
      <div className="space-y-4">
        <Skeleton className="h-4 w-32 rounded-full" />
        <Skeleton className="h-12 w-3/4" />
        <div className="flex gap-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      <div className="grid gap-6 border p-8 rounded-2xl">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ))}
      </div>
    </div>
  );
};

const BlogDetailSkeleton = () => {
  return (
    <div className="container py-20 max-w-4xl mx-auto space-y-8">
      <Skeleton className="h-4 w-24 rounded-full" />
      <Skeleton className="h-16 w-full" />
      <div className="flex gap-4">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-32" />
      </div>
      <Skeleton className="aspect-video w-full rounded-2xl" />
      <div className="space-y-4 pt-8">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  );
};

const ContactSkeleton = () => {
  return (
    <div className="space-y-12">
      <div className="bg-[#1F2E4D] py-20">
        <div className="container mx-auto px-6 text-center space-y-4">
          <Skeleton className="h-12 w-2/3 mx-auto bg-white/20" />
          <Skeleton className="h-6 w-1/2 mx-auto bg-white/20" />
        </div>
      </div>
      <div className="container mx-auto px-6 -mt-16 relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-32 w-full rounded-2xl" />
        ))}
      </div>
      <div className="container mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16">
        <div className="space-y-6">
          <Skeleton className="h-10 w-1/2" />
          <div className="space-y-4 bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-14 w-full rounded-xl" />
          </div>
        </div>
        <div className="space-y-8">
          <div className="space-y-4">
            <Skeleton className="h-10 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-24 w-full rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const PolicySkeleton = () => {
  return (
    <div className="space-y-12">
      <div className="bg-[#1F2E4D] py-16 text-center">
        <Skeleton className="h-10 w-1/3 mx-auto bg-white/20" />
      </div>
      <div className="max-w-4xl mx-auto py-12 px-6 space-y-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-8 w-1/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ))}
      </div>
    </div>
  );
};

const FAQSkeleton = () => {
  return (
    <div className="container max-w-3xl py-12 space-y-8">
      <div className="text-center space-y-4">
        <Skeleton className="h-4 w-24 mx-auto" />
        <Skeleton className="h-10 w-2/3 mx-auto" />
      </div>
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-16 w-full rounded-xl" />
        ))}
      </div>
    </div>
  );
};

export { LandingSkeleton, PricingSkeleton, AboutSkeleton, BlogSkeleton, BlogDetailSkeleton, JobSkeleton, ContactSkeleton, PolicySkeleton, FAQSkeleton };
