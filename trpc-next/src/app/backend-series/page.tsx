"use client";
import { useFetch } from "@/hooks/useFetch";
import React, { useState } from "react";

export default function JokesPage() {
  const { data, error, loading } = useFetch("/api/jokes");
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div>
      {data.map((joke) => {
        return <div key={joke.id}>{joke.joke}</div>;
      })}
    </div>
  );
}
