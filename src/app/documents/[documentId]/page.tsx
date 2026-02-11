
import EditorClientWrapper from "../EditorClientWrapper";

interface DocumentProps { params: Promise<{documentId: string}> }

const DocumentLayout = async ({ params }: DocumentProps) => {
  const { documentId } = await params;

  return (
    <main className="max-w-min min-h-screen bg-red-500">
      <div className="min-h-screen flex flex-col">
        <EditorClientWrapper documentId={documentId} />
      </div>
    </main>
  );
};

export default DocumentLayout;
