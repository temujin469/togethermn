import '@/styles/global.css'
import ModalProvider from '@/providers/ModalProvider'
import QueryProvider from '@/providers/QueryClientProvider'
import { Toaster } from '@/components/ui/toaster'
import getQueryClient from '@/utils/getQueryClient'
import getAttributes from '@/utils/fetch/getAttributes'
import { Hydrate, dehydrate } from '@tanstack/react-query'
import getProfessions from '@/utils/fetch/getProfessions'
import {Commissioner} from "next/font/google"
import ScrollTop from '@/components/element/ScrollTop'


export const metadata = {
  title: 'Together',
  description: 'Generated by create next app',
}

const commissioner = Commissioner({
  weight: '400',
  subsets: ['latin'],
  variable:"--default-font"
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(["attributes"],getAttributes)
  await queryClient.prefetchQuery(["professions"],getProfessions)
  const dehydratedState = dehydrate(queryClient)

  return (
    <html lang="en" className={commissioner.className}>
      <body >
        <QueryProvider>
          <Hydrate state={dehydratedState}>
            <Toaster />
            <ModalProvider />
            {children}
          </Hydrate>
        </QueryProvider>
        <ScrollTop/>
      </body>
    </html>
  )
}
