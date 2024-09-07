'use client'

import { useState, useMemo } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ClipboardCopy } from "lucide-react"
import { SavedReply } from '@/app/types'

interface SavedRepliesProps {
  savedReplies: SavedReply[]
  searchTerm: string
}

export default function SavedReplies({ savedReplies, searchTerm }: SavedRepliesProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const copyToClipboard = async (html: string, index: number) => {
    try {
      // Create a temporary element to render the HTML
      const tempElement = document.createElement('div');
      tempElement.innerHTML = html;
      
      // Extract plain text
      const plainText = tempElement.innerText;

      // Use the Clipboard API to copy both plain text and HTML
      await navigator.clipboard.write([
        new ClipboardItem({
          'text/plain': new Blob([plainText], { type: 'text/plain' }),
          'text/html': new Blob([html], { type: 'text/html' })
        })
      ]);

      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
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
                <AccordionTrigger className="hover:no-underline font-semibold">
                  {reply.title}
                </AccordionTrigger>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    copyToClipboard(reply.content, index);
                  }}
                >
                  <ClipboardCopy className="h-4 w-4 mr-2" />
                  {copiedIndex === index ? 'Copied!' : 'Copy'}
                </Button>
              </div>
              <AccordionContent>
                <div 
                  className="pt-2 saved-reply-content"
                  dangerouslySetInnerHTML={{ __html: reply.content }}
                />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  )
}