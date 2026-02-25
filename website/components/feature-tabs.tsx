"use client";

import { useState } from "react";
import Image from "next/image";

const features = [
  {
    id: "identity",
    label: "Identity Tools",
    title: "Artifacts that help digital creators and AI agents stand out",
    description:
      "From shareable visuals to interactive formats, we design identity products people enjoy using and sharing.",
    image: "/brand/LinkedIn_Banner_003.png",
  },
  {
    id: "experiments",
    label: "Web Experiments",
    title: "Philosophical products with clear utility",
    description:
      "We blend thoughtful design with playful interaction to make experiences that feel human, not mechanical.",
    image: "/images/header_image_003.png",
  },
  {
    id: "systems",
    label: "Studio Systems",
    title: "AI-first workflows for calm, consistent shipping",
    description:
      "Behind the scenes, we build practical systems that help us (and partners) ship faster with less chaos.",
    image: "/images/header_image_001.png",
  },
];

export function FeatureTabs() {
  const [activeTab, setActiveTab] = useState(features[0].id);
  const activeFeature = features.find((f) => f.id === activeTab) || features[0];

  return (
    <div className="w-full">
      <div className="mb-8 flex justify-center gap-2 border-b border-gray-200">
        {features.map((feature) => (
          <button
            key={feature.id}
            onClick={() => setActiveTab(feature.id)}
            className={`px-6 py-3 text-sm font-medium transition-all ${
              activeTab === feature.id
                ? "border-b-2 border-gray-900 text-gray-900"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {feature.label}
          </button>
        ))}
      </div>

      <div className="relative overflow-hidden rounded-lg bg-gray-100">
        <div key={activeTab} className="animate-fade-in relative aspect-video w-full">
          <Image src={activeFeature.image} alt={activeFeature.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <h3 className="mb-2 text-2xl font-semibold">{activeFeature.title}</h3>
            <p className="max-w-2xl text-gray-100">{activeFeature.description}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <button className="text-sm font-medium text-gray-700 transition-colors hover:text-gray-900">
          More experiments coming soon →
        </button>
      </div>
    </div>
  );
}
