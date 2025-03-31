"use client";
import { useEffect, useState } from "react";
import { socket } from "../socket";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Textingschema } from "../schemas/textingschema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const [messages, setMessages] = useState([]); // Stores messages as {name, text}
  const [open, setOpen] = useState(true); // Dialog opens initially
  const [username, setUsername] = useState(""); // Stores username

  // Form validation
  const form = useForm({
    resolver: zodResolver(Textingschema),
    defaultValues: {
      text: "",
    },
  });

  // ✅ Handle username input change
  function handleChange(e) {
    setUsername(e.target.value);
  }

  // ✅ Handle username submission (closes dialog)
  function handleNameSubmit(e) {
    e.preventDefault();
    setOpen(false); // Close the dialog after setting the username
  }

  // ✅ Send message with username
  function onSubmit(values) {
    const messageData = { name: username, text: values.text }; // Attach username
    socket.emit("chat", messageData);
    form.reset();
  }

  useEffect(() => {
    if (socket.connected) {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);
    }

    // ✅ Receive messages & update state
    socket.on("chat", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]); // Push message with name & text
    });

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("chat");
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return (
    <div>
      <p>Status: {isConnected ? "connected" : "disconnected"}</p>
      <p>Transport: {transport}</p>

      {/* ✅ Chat Message List */}
      <div className="border p-4 mb-4 h-64 overflow-y-auto">
        {messages.map((msg, index) => (
          <p key={index} className="bg-gray-200 p-2 my-1 rounded">
            <strong>{msg.name}:</strong> {msg.text}
          </p>
        ))}
      </div>

      {/* ✅ Name Entry Dialog (Opens Initially) */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>Fill the Details</DialogHeader>
          <form onSubmit={handleNameSubmit} className="space-y-3">
            <Input
              name="name"
              placeholder="Enter your name"
              value={username}
              onChange={handleChange}
              required
            />
            <DialogFooter>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ✅ Chat Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Text</FormLabel>
                <FormControl>
                  <Input placeholder="Type a message..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Send</Button>
        </form>
      </Form>
    </div>
  );
}
