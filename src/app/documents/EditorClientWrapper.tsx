
'use client';

import { Editor } from "../documents/[documentId]/editor";

export default function EditorClientWrapper({ documentId }: { documentId: string }) {
  return (
    <Editor key={documentId} />

  )
}
