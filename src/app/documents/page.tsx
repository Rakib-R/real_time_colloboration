"use client";

import React from "react";  // Optional but good practice
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from 'next/navigation';

function ListDocumentIds() {
  
  const documents = useQuery(api.documents.getAllDocuments);
  const router = useRouter()

  if (!documents) return <div className="flex justify-center items-center min-h-screen font-serif text-amber-700 text-3xl tracking-wider">Loading...</div>;
  
  return (
    <main className="flex w-screen h-screen">
      <ul className="m-auto text-2xl ">
        Dashboard : 
        {documents.map((doc: any) => (
        <div key={doc._id} className="mb-4">
           <li key={doc._id} className="ml-8">
            <p className="font-semibold">ID:</p> {doc._id}
            <p className="font-semibold">Title: {doc.title}</p>
          </li>
          
         <button className='mt-8' onClick={() => router.push(`/documents/${doc._id}`)}>
             <p className="left-8 text-2xl font-sans">
              Go to the ➡ <span className='font-medium underline text-blue-500'>{doc.title}</span>
              </p>
         </button>
        </div>
        ))}
      </ul>
    </main>
    
  );
}

export default function DocumentsPage() {
  return <ListDocumentIds />;
}