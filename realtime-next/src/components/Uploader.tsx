"use client";

import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  X,
  ImagePlus,
  Loader2,
  ChevronDown,
  ChevronUp,
  Trash2,
  File,
} from "lucide-react";
import { cn, truncate } from "@/lib/utils";

export interface Accept {
  [key: string]: readonly string[];
}

export type FileResponse = {
  publicId?: string;
  url: string;
  fileType: string;
  fileSize: string;
  fileName: string;
  deleteUrl?: string;
};

export type UploaderProps = {
  uploaderFn: (files: File[]) => Promise<FileResponse[]>;
  loadingFn: (isUploading: boolean) => void;
  setterFn: (files: FileResponse[]) => void;
  maxFileSize: number;
  maxFileCount: number;
  accept: Accept;
  disabled?: boolean;
  files?: FileResponse[];
  onFileRemove?: (file: FileResponse) => void;
  onClear?: () => void;

  previewImageClassName?: string;
  className?: string;
  iconClassName?: string;
  uploadText?: string;
  previewContainerClassName?: string;
  showExpandButton?: boolean;
};

function Uploader({
  uploaderFn,
  loadingFn,
  setterFn,
  maxFileCount,
  maxFileSize,
  accept,
  disabled,
  files = [],
  onFileRemove,
  onClear,
  className,
  previewImageClassName = "",
  iconClassName,
  previewContainerClassName,
  uploadText = "Drag & drop files here, or click to select files",
  showExpandButton = false,
}: UploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setIsUploading(true);
      setError(null);

      try {
        const res = await uploaderFn(acceptedFiles);
        setterFn(maxFileCount === 1 ? res : [...files, ...res]);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Upload failed");
      } finally {
        setIsUploading(false);
      }
    },
    [files, maxFileCount, setterFn, uploaderFn]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    onDropAccepted: onDrop,
    onDropRejected: (rejected) => {
      setError(rejected[0]?.errors[0]?.message ?? "Invalid file");
    },
    maxFiles: maxFileCount,
    maxSize: maxFileSize * 1024 * 1024,
    multiple: maxFileCount > 1,
    disabled,
  });

  useEffect(() => {
    loadingFn(isUploading);
  }, [isUploading, loadingFn]);

  const imageFiles = files.filter((f) => f.fileType.startsWith("image"));
  const otherFiles = files.filter((f) => !f.fileType.startsWith("image"));

  const visibleImages =
    isExpanded || maxFileCount === 1 ? imageFiles : imageFiles.slice(0, 2);

  const extraCount = isExpanded ? 0 : imageFiles.length - 2;

  return (
    <div className="space-y-2">
      {/* Top controls */}
      {showExpandButton && files.length > 0 && maxFileCount > 1 && (
        <div className="flex justify-end gap-2">
          <button
            type="button"
            disabled={isUploading}
            onClick={() => setIsExpanded((p) => !p)}
            className="text-sm flex items-center gap-1 text-blue-600 disabled:opacity-50"
          >
            <ChevronUp
              className={cn(
                "h-4 w-4 transition-transform",
                !isExpanded && "rotate-180"
              )}
            />
            {isExpanded ? "Collapse" : "Expand"}
          </button>
          <div className="h-5 w-px bg-gray-500"></div>

          {onClear && (
            <button
              type="button"
              disabled={isUploading}
              onClick={onClear}
              className="text-sm flex items-center gap-1 text-red-600 disabled:opacity-50 cursor-pointer "
            >
              <Trash2 className="h-4 w-4" /> Clear
            </button>
          )}
        </div>
      )}

      <div
        {...getRootProps()}
        className={cn(
          "relative rounded-lg border-2 border-dashed p-4 sm:p-6 text-center transition-all cursor-pointer flex items-center justify-center",
          error ? "border-red-500" : "border-blue-500",
          isDragActive && "border-blue-500",
          disabled && "opacity-50 cursor-not-allowed",
          { "bg-green-500/10": files.length > 0 },
          className
        )}
      >
        <input {...getInputProps()} />

        {files.length > 0 && (
          <div
            onClick={(e) => e.stopPropagation()}
            className={cn(
              "grid gap-3 transition-all",
              maxFileCount === 1 ? "grid-cols-1" : "grid-cols-4"
            )}
          >
            {visibleImages.map((file) => (
              <div
                key={file.url}
                className={cn(
                  "relative aspect-square h-20 w-20 rounded-md border",
                  previewContainerClassName
                )}
              >
                <img
                  src={file.url}
                  alt={file.fileName}
                  className={cn(
                    "h-full w-full object-contain rounded pointer-events-none",
                    previewImageClassName
                  )}
                />
                {onFileRemove && (
                  <button
                    type="button"
                    onClick={() => onFileRemove(file)}
                    className="absolute -right-1 -top-1 rounded-full bg-white p-0.5 border border-red-500"
                  >
                    <X className="h-4 w-4 text-red-500" />
                  </button>
                )}
              </div>
            ))}

            {otherFiles.map((file) => (
              <div
                key={file.url}
                className="relative h-20 w-20 rounded-md border flex flex-col items-center justify-center text-xs p-1"
              >
                <File className="h-6 w-6 text-blue-500" />
                <p className="truncate  text-center text-gray-600 break-words">
                  {truncate(file.fileName, 12)}
                </p>
                {/* <p className="text-gray-600">{file.fileType}</p> */}
                {onFileRemove && (
                  <button
                    type="button"
                    onClick={() => onFileRemove(file)}
                    className="absolute -right-1 -top-1 rounded-full bg-white p-0.5 border border-red-500"
                  >
                    <X className="h-4 w-4 text-red-500" />
                  </button>
                )}
              </div>
            ))}

            {extraCount > 0 && (
              <div className="flex items-center justify-center rounded-md border text-xl font-semibold text-blue-500">
                +{extraCount}
              </div>
            )}

            {files.length < maxFileCount && (
              <div
                {...getRootProps()}
                className={cn(
                  "flex items-center justify-center rounded-md h-20 w-20 border cursor-pointer",
                  iconClassName
                )}
              >
                <ImagePlus className="h-6 w-6 text-blue-500" />
              </div>
            )}
          </div>
        )}

        {files.length < 1 &&
          (isUploading ? (
            <Loader2 className="h-6 w-6 animate-spin" />
          ) : (
            <div className="flex flex-col items-center gap-2">
              <ImagePlus className="h-10 w-10 text-blue-500" />
              <p className="text-sm text-muted-foreground">
                {isDragActive ? "Drop files here..." : uploadText}
              </p>
            </div>
          ))}

        {/* Counter */}
        {maxFileCount > 1 && (
          <div className="absolute bottom-2 left-3 text-xs text-muted-foreground">
            {files.length}/{maxFileCount} uploaded
          </div>
        )}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}

export default Uploader;
