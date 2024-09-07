'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ClipboardCopy } from "lucide-react"
import Link from 'next/link'

interface Article {
  title: string
  url: string
}

interface ArticleCardProps {
  category: string
  articles: Article[]
}

export default function ArticleCard({ category, articles }: ArticleCardProps) {
  const [copiedText, setCopiedText] = useState<string | null>(null)

  const copyToClipboard = async (article: Article) => {
    try {
      await navigator.clipboard.write([
        new ClipboardItem({
          'text/plain': new Blob([article.title], { type: 'text/plain' }),
          'text/html': new Blob([`<a href="${article.url}">${article.title}</a>`], { type: 'text/html' })
        })
      ])
      setCopiedText(article.title)
      setTimeout(() => setCopiedText(null), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">{category}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {articles.map((article, index) => (
            <li key={index} className="flex items-center justify-between">
              <Link href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                {article.title}
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(article)}
              >
                <ClipboardCopy className="h-4 w-4 mr-2" />
                {copiedText === article.title ? 'Copied!' : 'Copy'}
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}