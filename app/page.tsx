'use client'

import { useState } from 'react'
import SearchBox from '@/components/SearchBox'
import SectionRenderer from '@/components/SectionRenderer'
import SavedReplies from '@/components/SavedReplies'
import { sellerHelp, customerHelp, savedReplies } from './lib/data'

export default function DocumentationPage() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Gumroad Help Index</h1>
      
      <SearchBox value={searchTerm} onChange={setSearchTerm} />
      
      <SectionRenderer title="Creator Help Center" categories={sellerHelp} searchTerm={searchTerm} />
      <SectionRenderer title="Customer Help Center" categories={customerHelp} searchTerm={searchTerm} />
      
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Saved Replies</h2>
        <SavedReplies savedReplies={savedReplies} searchTerm={searchTerm} />
      </div>
    </div>
  )
}