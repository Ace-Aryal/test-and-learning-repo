"use client";
import Uploader, { FileResponse } from "@/components/Uploader";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const tenantDisplay = [
  {
    slug: "tenant-1",
    text: "Hello i am tenant 1",
  },
  { slug: "tenant-2", text: "Hello i am tenant 2" },
];
export default function Test() {
  const [loading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<FileResponse[]>([]);
  // this will be in the provider
  const fullUrl = window.location.href;
  const spliliitedByDot = fullUrl.split(".")[0];
  const tenantSubdomain = spliliitedByDot.split("//")[1];
  console.log(tenantSubdomain, "tenant-subdomain");

  console.log(fullUrl, "pathname");
  const tenant = tenantDisplay.find(
    (tenant) => tenant.slug === tenantSubdomain
  );

  return (
    <div className="bg-white flex items-center justify-center pt-40">
      <div className="w-100 h-64">
        <Uploader
          uploadText="Upload images upto 5 mb"
          className="h-fit w-full"
          iconClassName=""
          previewImageClassName=""
          previewContainerClassName=""
          onFileRemove={(file) => {
            const filesAfterRemoval = files.filter((f) => file.url !== f.url);
            setFiles(filesAfterRemoval);
          }}
          files={files}
          accept={{
            "images/*": [".jpg", ".png", ".jpeg"],
            "application/pdf": [".pdf"],
          }}
          loadingFn={(loading) => setIsLoading(loading)}
          maxFileCount={10}
          maxFileSize={5}
          setterFn={(files) => setFiles(files)}
          uploaderFn={async (files) => {
            return files.map((file) => ({
              fileName: file.name,
              fileSize: file.size.toString(),
              fileType: file.type,
              url: URL.createObjectURL(file),
            }));
          }}
          showExpandButton={true}
          onClear={() => setFiles([])}
        />
      </div>

      {loading && <div>Loading...</div>}
      <p className="text-black">{tenant ? tenant?.text : "404 not found"}</p>
    </div>
  );
}
