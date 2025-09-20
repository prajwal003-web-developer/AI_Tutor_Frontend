'use client'

import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import api from '@/app/utils/axios'
import { Send, Loader2 } from 'lucide-react'

const LoadingPage = () => (
  <div className="flex justify-center items-center h-screen text-gray-300 text-lg md:text-xl">
    Loading Chat...
  </div>
)

const ChatPage = () => {
  const params = useParams()
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await api.get(`messages/${params.id}`)
        const data = res.data
        setMessages(data.messages)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
        scrollToBottom()
      }
    }

    fetchMessages()
  }, [params.id])

  const scrollToBottom = () => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleSend = async () => {
    if (!input.trim()) return
    setSending(true)

    const newMsg = { MessageBy: 'user', Message: input }
    setMessages(prev => [...prev, newMsg])
    setInput('')
    scrollToBottom()

    try {
      const res = await api.post(`message/${params.id}`, { Message: input })
      const aiReply = res.data
      console.log(aiReply)
      setMessages(prev => [...prev, aiReply])
      scrollToBottom()
    } catch (err) {
      console.error(err)
    } finally {
      setSending(false)
    }
  }

  if (loading) return <LoadingPage />

  return (
    <div className="flex flex-col h-[90vh] my-auto bg-gray p-3 md:p-4 text-white">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto mb-3 md:mb-4 space-y-3 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent noScrollBar">
       { messages.length>0 &&
        <>
           {messages?.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-2xl w-fi max-w-[80%] md:max-w-[70%] break-words text-sm md:text-base ${
              msg.MessageBy === 'user'
                ? 'bg-[#121212] ml-auto rounded-br-none'
                : 'bg-gray-900 rounded-bl-none'
            }`}
          >
            <ReactMarkdown>{msg.Message}</ReactMarkdown>
          </div>
        ))}
        </>
       }
        <div ref={bottomRef} />
      </div>

      {/* Input Area */}
      <div className="flex items-center gap-2 mt-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          className="flex-1 px-3 py-2 rounded-lg bg-gray-900 text-gray-100 border border-gray-700 focus:outline-none focus:border-blue-500 text-sm md:text-base"
          placeholder="Type your message..."
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          disabled={sending}
        />
        <button
          onClick={handleSend}
          disabled={sending}
          className="p-2 md:p-3 rounded-lg bg-blue-600 hover:bg-blue-500 transition flex items-center justify-center disabled:opacity-50"
        >
          {sending ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <Send size={20} className="text-white" />
          )}
        </button>
      </div>
    </div>
  )
}

export default ChatPage
