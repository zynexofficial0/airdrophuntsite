'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { Upload, X, Loader2, ImageIcon } from 'lucide-react';
import { uploadFile, validateImageFile } from '@/lib/storage/upload';
import { cn } from '@/lib/utils';

export function ImageUpload({
  bucket,
  onUploaded,
  label = 'Upload Image',
}: {
  bucket: 'article-logos' | 'airdrop-logos';
  onUploaded: (url: string) => void;
  label?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    setError(null);
    const validationError = validateImageFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setPreview(URL.createObjectURL(file));
    setUploading(true);
    const { url, error: uploadError } = await uploadFile(bucket, file);
    setUploading(false);

    if (uploadError) {
      setError(uploadError);
      setPreview(null);
      return;
    }
    onUploaded(url);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const clear = () => {
    setPreview(null);
    setError(null);
    onUploaded('');
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div>
      <label className="text-sm font-medium mb-2 block">{label} <span className="text-primary">*</span></label>
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/webp"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />

      {!preview ? (
        <div
          onClick={() => inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className={cn(
            'relative rounded-xl border-2 border-dashed p-8 text-center cursor-pointer transition-colors',
            error ? 'border-red-500/50' : 'border-border hover:border-primary/50'
          )}
        >
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-xl glass flex items-center justify-center">
              <Upload className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">Click to upload or drag and drop</p>
              <p className="text-xs text-muted-foreground mt-1">PNG, JPG, WEBP up to 4MB</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative rounded-xl overflow-hidden border border-border/60 bg-secondary">
          <div className="relative w-full aspect-video">
            <Image src={preview} alt="Preview" fill sizes="400px" className="object-cover" />
          </div>
          <div className="absolute top-2 right-2 flex gap-2">
            {uploading && (
              <div className="w-8 h-8 rounded-lg glass-strong flex items-center justify-center">
                <Loader2 className="w-4 h-4 text-primary animate-spin" />
              </div>
            )}
            <button
              type="button"
              onClick={clear}
              className="w-8 h-8 rounded-lg glass-strong flex items-center justify-center text-muted-foreground hover:text-red-400 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          {uploading && (
            <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
              <span className="text-sm text-primary flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" /> Uploading...
              </span>
            </div>
          )}
          {!uploading && (
            <div className="absolute bottom-2 left-2 px-2 py-1 rounded-md glass text-xs text-emerald-400 flex items-center gap-1">
              <ImageIcon className="w-3 h-3" /> Uploaded
            </div>
          )}
        </div>
      )}

      {error && <p className="text-xs text-red-400 mt-2">{error}</p>}
    </div>
  );
}
