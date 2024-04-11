'use client'
import { useRouter } from 'next/navigation'
import { Links } from '../../components/links'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  return (
    <section>
      <button type="button" onClick={() => router.back()}>
        Dashboard
      </button>

      {/* Include shared UI here e.g. a header or sidebar */}
      <Links linkList={['dashboard', 'dashboard/settings']} />
      {children}
    </section>
  )
}
