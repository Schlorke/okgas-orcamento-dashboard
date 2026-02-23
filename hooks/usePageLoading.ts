"use client"

/**
 * Hook: usePageLoading
 * Define quando a página está "pronta" (tempo mínimo + recursos), remove page-loading do body,
 * adiciona page-ready e dispara o evento 'page-ready' para a animação de introdução.
 */

import { useEffect, useState, useCallback } from "react"

interface UsePageLoadingOptions {
  minLoadingTime?: number
  maxLoadingTime?: number
}

export function usePageLoading(options: UsePageLoadingOptions = {}) {
  const { minLoadingTime = 2000, maxLoadingTime = 8000 } = options
  const [isLoading, setIsLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)

  const checkAllResourcesLoaded = useCallback(() => {
    const images = Array.from(document.querySelectorAll("img"))
    const loadedImages = images.filter(
      img => img.complete && img.naturalHeight !== 0
    )
    const videos = Array.from(
      document.querySelectorAll<HTMLVideoElement>(
        'video[preload="auto"], video[preload="metadata"]'
      )
    )
    const loadedVideos = videos.filter(video => video.readyState >= 2)
    const totalResources = images.length + videos.length
    const loadedResources = loadedImages.length + loadedVideos.length
    const progress =
      totalResources > 0 ? (loadedResources / totalResources) * 100 : 100
    return {
      isComplete: loadedResources >= totalResources,
      progress,
      details: {
        images: { loaded: loadedImages.length, total: images.length },
        videos: { loaded: loadedVideos.length, total: videos.length },
      },
    }
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return
    const startTime = Date.now()
    let checkInterval: ReturnType<typeof setInterval> | null = null
    let minTimeoutId: ReturnType<typeof setTimeout> | null = null
    let maxTimeoutId: ReturnType<typeof setTimeout> | null = null
    let minTimePassed = false
    let resourcesLoaded = false

    const finishLoading = () => {
      if (checkInterval) {
        clearInterval(checkInterval)
        checkInterval = null
      }
      if (maxTimeoutId) {
        clearTimeout(maxTimeoutId)
        maxTimeoutId = null
      }
      setIsLoading(false)
      setLoadingProgress(100)
      document.body.classList.remove("page-loading")
      document.body.classList.add("page-ready")
      window.dispatchEvent(new CustomEvent("page-ready"))
    }

    const tryFinishLoading = () => {
      if (minTimePassed && resourcesLoaded) finishLoading()
    }

    const checkResources = () => {
      const status = checkAllResourcesLoaded()
      setLoadingProgress(status.progress)
      if (status.isComplete) {
        resourcesLoaded = true
        tryFinishLoading()
      }
    }

    minTimeoutId = setTimeout(() => {
      minTimePassed = true
      tryFinishLoading()
    }, minLoadingTime)

    maxTimeoutId = setTimeout(() => {
      console.warn(
        "[usePageLoading] Timeout máximo atingido, forçando fim do loading"
      )
      finishLoading()
    }, maxLoadingTime)

    document.body.classList.add("page-loading")
    checkInterval = setInterval(checkResources, 100)
    checkResources()

    const handleWindowLoad = () => {
      const elapsed = Date.now() - startTime
      if (elapsed >= minLoadingTime) {
        resourcesLoaded = true
        tryFinishLoading()
      } else {
        setTimeout(() => {
          resourcesLoaded = true
          tryFinishLoading()
        }, minLoadingTime - elapsed)
      }
    }
    window.addEventListener("load", handleWindowLoad)

    return () => {
      if (checkInterval) clearInterval(checkInterval)
      if (minTimeoutId) clearTimeout(minTimeoutId)
      if (maxTimeoutId) clearTimeout(maxTimeoutId)
      window.removeEventListener("load", handleWindowLoad)
    }
  }, [checkAllResourcesLoaded, minLoadingTime, maxLoadingTime])

  return { isLoading, loadingProgress }
}
