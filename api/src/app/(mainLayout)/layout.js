import MainLayout from "@/layout"

export default function RootLayout({ children}) {
  return (
    <>
      <MainLayout>
        {children}
      </MainLayout>
    </>
  )
}
