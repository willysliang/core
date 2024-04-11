import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard',
}

// `app/dashboard/page.tsx` is the UI for the `/dashboard` URL
export default function Page() {
  return <h1>Hello, Dashboard Page!</h1>
}
