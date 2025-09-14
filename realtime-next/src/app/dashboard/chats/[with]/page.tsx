"use client";
import { useParams } from "next/navigation";
import React from "react";

export default function ChatPage() {
  const params = useParams<{ with: string }>();
  const { with: withParam } = params;

  return <div>{withParam}</div>;
}
