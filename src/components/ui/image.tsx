import * as React from "react"

import { cn } from "@/lib/utils"

export interface ImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> {
  src: string | null | undefined
  alt: string
  fallback?: string
  containerClassName?: string
  aspectRatio?: "square" | "video" | "portrait" | "wide" | string
}

function Image({
  src,
  alt,
  fallback,
  className,
  containerClassName,
  aspectRatio = "square",
  ...props
}: ImageProps) {
  const [isLoading, setIsLoading] = React.useState(true)
  const [hasError, setHasError] = React.useState(!src)

  // Handle aspect ratio
  const getAspectRatioClass = React.useMemo(() => {
    switch (aspectRatio) {
      case "square":
        return "aspect-square"
      case "video":
        return "aspect-video"
      case "portrait":
        return "aspect-[3/4]"
      case "wide":
        return "aspect-[16/9]"
      default:
        return aspectRatio
    }
  }, [aspectRatio])

  return (
    <div
      className={cn(
        "overflow-hidden rounded-md",
        getAspectRatioClass,
        containerClassName
      )}
    >
      {!hasError ? (
        <img
          src={src || ""}
          alt={alt}
          className={cn(
            "data-[loading=true]:animate-pulse data-[loading=true]:bg-muted h-full w-full object-cover transition-all",
            className
          )}
          data-loading={isLoading}
          onLoad={() => setIsLoading(false)}
          onError={() => setHasError(true)}
          {...props}
        />
      ) : (
        <div
          className={cn(
            "flex h-full w-full items-center justify-center bg-muted",
            className
          )}
        >
          {fallback ? (
            <span className="text-sm text-muted-foreground">{fallback}</span>
          ) : (
            <span className="text-sm text-muted-foreground">No image</span>
          )}
        </div>
      )}
    </div>
  )
}

export { Image }
