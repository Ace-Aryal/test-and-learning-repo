"use client";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data"; // default emoji set
import { useState } from "react";
export default function EmojiPicker() {
  return (
    <div className="space-y-4">
      <Picker
        data={data}
        onEmojiSelect={(data) => console.log(data, "data")}
        custom={[
          {
            id: "team",
            name: "Team",
            emojis: [
              {
                id: "dipesh",
                name: "Dipesh Aryal",
                keywords: ["dipesh", "team"],
                skins: [{ src: "/emoji.avif" }],
              },
              {
                id: "karishma",
                name: "Karishma Dawadi",
                keywords: ["karishma", "team"],
                skins: [{ src: "/emoji.avif" }],
              },
            ],
          },
          {
            id: "stickers",
            name: "Company Stickers",
            emojis: [
              {
                id: "deploy_time",
                name: "Deploy Time",
                keywords: ["deploy", "meme"],
                skins: [{ src: "/emoji.avif" }],
              },
            ],
          },
        ]}
      />
      <div className="flex items-center">
        <RenderMessage
          text={`Hello this is normal emoji 🪔
, and this is a custom emoji :dipesh:`}
        />
      </div>
    </div>
  );
}

function RenderMessage({ text }: { text: string }) {
  const customEmojis = [
    { id: "dipesh", skins: [{ src: "/emoji.avif" }] },
    { id: "karishma", skins: [{ src: "/emoji.avif" }] },
  ];

  return text.split(/(:[a-zA-Z0-9_]+:)/g).map((part, i) => {
    const match = part.match(/^:([a-zA-Z0-9_]+):$/);
    if (match) {
      const emojiId = match[1];

      // 1️⃣ Check custom emojis first
      const custom = customEmojis.find((e) => e.id === emojiId);
      if (custom) {
        return (
          <img
            key={i}
            src={custom.skins[0].src}
            alt={emojiId}
            className="inline-block w-5 h-5 mx-1 rounded-full align-middle"
          />
        );
      }
      return null;
    }

    return <span key={i}>{part}</span>;
  });
}
