
import EditorClientWrapper from "../EditorClientWrapper";
import Toolbar from "./Toolbar";

interface DocumentProps { params: Promise<{documentId: string}> }

const DocumentLayout = async ({ params }: DocumentProps) => {
  const { documentId } = await params;

  return (
    <main className="flex flex-col w-dvw mx-auto">
        <Toolbar />
        <EditorClientWrapper documentId={documentId} />
    </main>
  );
};

export default DocumentLayout;
