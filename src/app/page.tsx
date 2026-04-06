// apps/user-ui/pages/index.tsx (not app/page.tsx)

import { redirect } from 'next/navigation';

export default function Home() {

    redirect('/documents');
  
}