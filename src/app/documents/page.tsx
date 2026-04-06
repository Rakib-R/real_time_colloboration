"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from 'next/navigation';
import { FileText, ArrowRight, Clock, Edit3 } from 'lucide-react';

function ListDocumentIds() {
  const documents = useQuery(api.documents.getAllDocuments);
  const router = useRouter();

  if (!documents) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
          <p className="mt-4 text-gray-500">Loading documents...</p>
        </div>
      </div>
    );
  }

  if (documents.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <FileText className="w-12 h-12 text-gray-400 mx-auto" />
          <h2 className="mt-4 text-lg font-medium text-gray-900">No documents yet</h2>
          <p className="mt-1 text-gray-500">Create your first document to get started</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Documents</h1>
          <p className="mt-1 text-sm text-gray-500">
            {documents.length} document{documents.length !== 1 ? 's' : ''} total
          </p>
        </div>

        {/* Document List */}
        <div className="space-y-3">
          {documents.map((doc: any) => (
            <div
              key={doc._id}
              className="bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
            >
              <div className="p-4 sm:p-5">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  {/* Document Info */}
                  <div className="flex items-start gap-3 min-w-0">
                    <FileText className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <h2 className="text-base font-medium text-gray-900 truncate">
                        {doc.title || 'Untitled Document'}
                      </h2>
                      <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          ID: {doc._id.slice(-8)}
                        </span>
                        {doc.updatedAt && (
                          <span className="flex items-center gap-1">
                            <Edit3 className="w-3 h-3" />
                            Updated recently
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => router.push(`/documents/${doc._id}`)}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors">
                    <span>Open Document</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default function DocumentsPage() {
  return <ListDocumentIds />;
}