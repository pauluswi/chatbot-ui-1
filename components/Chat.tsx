import { useState, useEffect } from "react"
import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  QueryDocumentSnapshot,
  DocumentData
} from "firebase/firestore"
import { auth, db } from "../firebase/firebase"

interface Message {
  id: string
  text: string
  sender: string
  timestamp?: Date
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState<string>("")

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "messages"), snapshot => {
      const msgs = snapshot.docs.map(
        (doc: QueryDocumentSnapshot<DocumentData>) =>
          ({
            id: doc.id,
            ...doc.data()
          }) as Message
      )
      setMessages(msgs)
    })

    return () => unsubscribe()
  }, [])

  const sendMessage = async () => {
    if (!input.trim()) return
    await addDoc(collection(db, "messages"), {
      text: input,
      sender: auth.currentUser?.displayName || "Anonymous",
      timestamp: serverTimestamp()
    })
    setInput("")
  }

  return (
    <div className="p-4">
      <div className="space-y-2">
        {messages.map(msg => (
          <div key={msg.id}>
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div className="mt-4 flex">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          className="flex-1 rounded border p-2"
          placeholder="Type a message"
        />
        <button
          onClick={sendMessage}
          className="ml-2 rounded bg-blue-500 px-4 py-2 text-white"
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default Chat
