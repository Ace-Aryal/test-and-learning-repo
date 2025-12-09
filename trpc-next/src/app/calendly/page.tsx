"use client";
import React from "react";

function EmbedPage() {
  return (
    <div className="py-2">
      <h1 className="text-center text-2xl font-bold">
        Calendly Meeting Integration
      </h1>
      {/* Calendly inline widget begin */}
      <div
        className="calendly-inline-widget "
        data-url="https://calendly.com/aryaldeelep/30min?hide_event_type_details=1&hide_gdpr_banner=1&background_color=0c0c0c&text_color=f6f6f6&primary_color=9333ea"
        style={{ minWidth: "320px", height: "700px" }}
      ></div>
      <script
        type="text/javascript"
        src="https://assets.calendly.com/assets/external/widget.js"
        async
      ></script>
    </div>
  );
}

import { useEffect } from "react";

export default EmbedPage;
