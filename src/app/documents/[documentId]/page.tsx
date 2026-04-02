

import EditorClientWrapper from "../EditorClientWrapper";
import Navbar from "./navbar";
import Toolbar from "./Toolbar";

interface DocumentProps { params: Promise<{documentId: string}> }

const DocumentLayout = async ({ params }: DocumentProps) => {
  const { documentId } = await params;

  return (

    <main className="flex flex-col min-h-screen bg-slate-400">
    {/* Header: Locked Height */}
      <header className="fixed inset-x-0 top-0 h-[150px] flex flex-col py-4 bg-[#4abbe4] z-50 print:hidden">
        <Navbar documentId={documentId}/>
        <Toolbar />
      </header>

        {/* Content: Pushed down by exactly the header's height */}
        <section className="pt-[170px] flex-1 flex justify-center">
          <EditorClientWrapper documentId={documentId} />
        </section>
      </main>
  );
};

export default DocumentLayout;
