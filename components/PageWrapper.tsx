
import React from 'react';

interface PageWrapperProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ title, description, children }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-in fade-in duration-500">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-zinc-900 mb-3 tracking-tight">{title}</h1>
        <p className="text-lg text-zinc-500 max-w-2xl">{description}</p>
      </div>
      <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-6 md:p-8">
        {children}
      </div>
    </div>
  );
};

export default PageWrapper;
