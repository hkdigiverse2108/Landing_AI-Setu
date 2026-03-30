import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useParams } from "react-router-dom";
import SEO from "@/components/SEO";

const PolicyPage = () => {
  const { slug } = useParams();
  const [data, setData] = useState<any>(null);
  const [livePreview, setLivePreview] = useState<any>(null);

  useEffect(() => {
    if (slug === 'new-policy') {
      setData({
        title: "New Policy",
        description: "Start typing in the admin panel to preview your policy..."
      });
      return;
    }

    fetch(`/api/policies/${slug}/`)
      .then(res => res.json())
      .then(setData);
  }, [slug]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Validate the source if necessary (e.g., check origin)
      if (event.data && event.data.source === 'django-admin' && event.data.model === 'Policy') {
        const payload = event.data.payload;
        
        setLivePreview({
            title: payload.title,
            description: payload.description
        });

        // Optional smooth scrolling
        if (event.data.scrollTarget) {
            const targetElement = document.getElementById(event.data.scrollTarget);
            if(targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const displayData = livePreview || data;

  if (!displayData) return <div className="text-center py-20">Loading...</div>;

  return (
    <>
      <SEO 
        title={displayData.seo_title || displayData.title} 
        description={displayData.seo_description || displayData.description}
        keywords={displayData.seo_keywords}
      />
      <Header />

      <main>
        {/* HERO */}
        <div id="id_title" className="bg-[#1F2E4D] text-white py-16 text-center">
          <h1 className="text-4xl font-bold">{displayData.title}</h1>
        </div>

        {/* CONTENT */}
        <div className="max-w-4xl mx-auto py-12 px-6">

          {/* DESCRIPTION / MAIN CONTENT */}
          <div 
            id="id_description" 
            className="text-gray-600 mb-8 prose prose-slate prose-xl max-w-none prose-p:leading-relaxed prose-li:my-1"
            dangerouslySetInnerHTML={{ __html: displayData.description }}
          />
        </div>
      </main>

      <Footer />
    </>
  );
};

export default PolicyPage;