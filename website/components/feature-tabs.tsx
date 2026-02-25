"use client";

import { useState } from "react";
import Image from "next/image";

const features = [
  {
    id: "strategic",
    label: "Strategic Planning",
    title: "Strategic decision-making for long-term success",
    description:
      "Get thoughtful analysis of your options with long-term implications. Our AI agents help you think through trade-offs calmly and strategically, avoiding the pressure of quick decisions.",
    image: "/brand/LinkedIn_Banner_003.png",
  },
  {
    id: "growth",
    label: "Sustainable Growth",
    title: "Build systems that scale without burning out",
    description:
      "Avoid the growth-at-all-costs trap. Get guidance on building processes that scale sustainably. Focus on what matters for long-term success, not vanity metrics.",
    image: "/brand/SoulGamesStudios_Square_Logo.jpg",
  },
  {
    id: "vision",
    label: "Vision Alignment",
    title: "Stay focused on your values and long-term goals",
    description:
      "When everyone tells you to move fast, your AI board helps you maintain perspective. Get strategic advice that aligns with your values, not just industry trends.",
    image: "/brand/LinkedIn_Banner_003.png",
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
        <div
          key={activeTab}
          className="animate-fade-in relative aspect-video w-full"
        >
          <Image
            src={activeFeature.image}
            alt={activeFeature.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <h3 className="mb-2 text-2xl font-semibold">
              {activeFeature.title}
            </h3>
            <p className="max-w-2xl text-gray-100">
              {activeFeature.description}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <button className="text-sm font-medium text-gray-700 transition-colors hover:text-gray-900">
          View All Features →
        </button>
      </div>
    </div>
  );
}
