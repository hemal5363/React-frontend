import React from "react";
import { X, User } from "lucide-react";

import IconButton from "./IconButton";

interface ImagePreviewProps {
  src?: string;
  alt?: string;
  removable?: boolean;
  onRemove?: () => void;
  size?: number; // tailwind size like 32, 40, 48
  padding?: number;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({
  src,
  alt = "Image Preview",
  removable = false,
  onRemove,
  size = 32,
  padding = 0,
}) => {
  return (
    <div className="relative inline-block">
      {!src ? (
        <User
          className={`w-${size} h-${size} p-${padding} object-cover rounded-full border dark:border-gray-600`}
        />
      ) : (
        <img
          src={src}
          alt={alt}
          className={`w-${size} h-${size} object-cover rounded-full border dark:border-gray-600`}
        />
      )}

      {removable && (
        <IconButton
          variant="danger"
          onClick={onRemove}
          className="absolute top-0 right-0 rounded-full"
        >
          <X size={14} />
        </IconButton>
      )}
    </div>
  );
};

export default ImagePreview;
