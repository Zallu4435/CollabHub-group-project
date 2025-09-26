"use client";

import clsx from "clsx";
import { blogData } from "../data";

type Props = {
  activeCategorySlug?: string;
  onSelectCategory: (slug?: string) => void;
};

export default function Filters({ activeCategorySlug, onSelectCategory }: Props) {
  return (
    <div className="flex items-center space-x-1 mb-8 overflow-x-auto pb-2">
      <button
        onClick={() => onSelectCategory(undefined)}
        className={clsx(
          "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
          !activeCategorySlug ? "bg-black text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        )}
      >
        All
      </button>
      {blogData.categories.map((c) => (
        <button
          key={c.id}
          onClick={() => onSelectCategory(c.slug)}
          className={clsx(
            "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
            activeCategorySlug === c.slug ? "bg-black text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          )}
        >
          {c.name}
        </button>
      ))}
    </div>
  );
}


