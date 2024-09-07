'use client'

import { useState, useMemo } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ClipboardCopy } from "lucide-react"
import { SavedReply } from '@/app/types'

interface SavedRepliesProps {
  savedReplies: SavedReply[]
  searchTerm: string
}

export default function SavedReplies({ savedReplies, searchTerm }: SavedRepliesProps) {
  const [copiedText, setCopiedText] = useState<string | null>(null)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedText(text)
      setTimeout(() => setCopiedText(null), 2000)
    })
  }

  const filteredSavedReplies = useMemo(() => 
    savedReplies.filter(reply => 
      reply.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reply.content.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [savedReplies, searchTerm]
  )

  return (
    <Card>
      <CardContent className="pt-6">
        <Accordion type="single" collapsible className="w-full space-y-2">
          {filteredSavedReplies.map((reply, index) => (
            <AccordionItem key={index} value={`reply-${index}`} className="border-b">
              <div className="flex items-center justify-between">
                <AccordionTrigger className="hover:no-underline">
                  {reply.title}
                </AccordionTrigger>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    copyToClipboard(reply.content);
                  }}
                >
                  <ClipboardCopy className="h-4 w-4 mr-2" />
                  {copiedText === reply.content ? 'Copied!' : 'Copy Text'}
                </Button>
              </div>
              <AccordionContent>
                <p className="pt-2">{reply.content}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  )
}