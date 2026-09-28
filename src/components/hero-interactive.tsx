/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useRef } from 'react'
import { SplineScene } from './ui/spline'
import { ScrollReveal } from './scroll-reveal'
import { ButtonColorful } from './ui/button-colorful'
import { ButtonNeon } from './ui/button-neon'
import type { Application } from '@splinetool/runtime'

interface HeroInteractiveProps {
  splineSceneUrl: string
  heroTitle: string
  heroSubtitle: string
  homeBadge?: string | null
  homeStatus?: string | null
  homePrimaryCta?: { href: string; label: string } | null
  homeSecondaryCta?: { href: string; label: string } | null
  homeTertiaryCta?: { href: string; label: string } | null
}

export function HeroInteractive({
  splineSceneUrl,
  heroTitle,
  heroSubtitle,
  homeBadge,
  homeStatus,
  homePrimaryCta,
  homeSecondaryCta,
  homeTertiaryCta,
}: HeroInteractiveProps) {
  const heroRef = useRef<HTMLDivElement>(null)
  const aifestRef = useRef<HTMLDivElement>(null)
  const robotRef = useRef<HTMLDivElement>(null)
  const splineAppRef = useRef<Application | null>(null)
  const headObjectRef = useRef<any>(null)

  // Refs for smooth rotation interpolation
  const targetRotation = useRef({ x: 0, y: 0 })
  const currentRotation = useRef({ x: 0, y: 0 })

  // Handle Spline load
  const handleSplineLoad = (spline: Application) => {
    splineAppRef.current = spline

    // Identify Head for tracking
    const findHead = () => {
      try {
        const allObjects = spline.getAllObjects()
        const head = allObjects.find((obj: any) => obj.name?.toLowerCase().includes('head'))
        if (head) {
          headObjectRef.current = head
        }
      } catch (e) {
        // Silently fail to avoid console noise
      }
    }

    // Run in multiple phases to ensure it sticks during Spline's hydration
    [100, 500, 1500].forEach(delay => setTimeout(findHead, delay))
  }

  // Mouse move handler - updates target rotation only
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current || !robotRef.current) return

      const rect = heroRef.current.getBoundingClientRect()
      const robotRect = robotRef.current.getBoundingClientRect()

      // Calculate mouse position relative to hero
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // Calculate mouse position relative to robot center
      const robotCenterX = robotRect.left + robotRect.width / 2 - rect.left
      const robotCenterY = robotRect.top + robotRect.height / 2 - rect.top

      // Calculate angle from robot center to mouse
      const deltaX = x - robotCenterX
      const deltaY = y - robotCenterY

      // Calculate rotation angles (in radians)
      const yaw = Math.atan2(deltaX, -deltaY) // Horizontal rotation (left/right)

      // Calculate pitch - positive when mouse is below robot, negative when above
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
      const pitch = distance > 0 ? Math.atan2(deltaY, distance) : 0

      // Limit the rotation to avoid extreme angles
      const maxYaw = 0.6 // ~34 degrees in radians
      const maxPitchDown = 0.5 // ~29 degrees down
      const maxPitchUp = 0.4 // ~23 degrees up
      const clampedYaw = Math.max(-maxYaw, Math.min(maxYaw, yaw))
      const clampedPitch = Math.max(-maxPitchUp, Math.min(maxPitchDown, pitch))

      // Update target rotation (not applied directly)
      targetRotation.current = {
        x: clampedPitch,
        y: clampedYaw
      }
    }

    const heroElement = heroRef.current
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove)
      return () => {
        heroElement.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [])

  // Animation loop for smooth interpolation
  useEffect(() => {
    let animationFrameId: number

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor
    }

    const animate = () => {
      // Smoothly interpolate current rotation towards target rotation
      currentRotation.current.x = lerp(currentRotation.current.x, targetRotation.current.x, 0.1)
      currentRotation.current.y = lerp(currentRotation.current.y, targetRotation.current.y, 0.1)

      // Apply the interpolated rotation to the head object
      try {
        if (headObjectRef.current) {
          headObjectRef.current.rotation.x = currentRotation.current.x
          headObjectRef.current.rotation.y = currentRotation.current.y
        }

      } catch (e) {
        // Silently fail if object doesn't exist or rotation fails
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [])


  return (
    <div
      ref={heroRef}
      className="relative min-h-[500px] sm:min-h-[700px] lg:min-h-[800px] rounded-[3rem] bg-linear-to-br from-[#FFF0F5] via-[#E0F7FA] to-white dark:from-[#001F3F] dark:via-[#000d1a] dark:to-[#001F3F] p-6 sm:p-12 lg:p-16 overflow-visible transition-colors duration-500"
    >

      {/* AIFEST Watermark Text - Centered Behind Robot */}
      <div
        ref={aifestRef}
        className="pointer-events-none absolute left-1/2 top-[45%] md:top-[60%] -translate-x-1/2 -translate-y-1/2 z-1"
      >
        <h1
          className="text-[6rem] sm:text-[12rem] lg:text-[18rem] xl:text-[22rem] font-bold leading-none select-none text-white dark:text-white/5 transition-colors duration-500"
          style={{
            fontFamily: "Blanka, var(--font-geist-sans), sans-serif",
            textShadow: "0 0 40px rgba(0, 31, 63, 0.1)",
            letterSpacing: "0.05em"
          }}
        >
          AIFEST
        </h1>
      </div>

      {/* Spline 3D Robot - Center */}
      <div
        ref={robotRef}
        className="pointer-events-none absolute left-1/2 top-0 bottom-0 -translate-x-1/2 z-2 w-full flex items-center justify-center overflow-visible"
      >
        <div className="w-full h-full">
          <SplineScene
            scene={splineSceneUrl}
            className="w-full h-full"
            onLoad={handleSplineLoad}
          />
        </div>
      </div>

      {/* Two Column Layout - Text on left mobile/desktop, Buttons Right on desktop */}
      <div className="relative z-3 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
        {/* Left Column - Content (left half on mobile, left column on desktop) */}
        <div className="md:col-span-5 w-full md:w-auto pr-[15%] md:pr-0">
          <ScrollReveal variant="fade-in" delay={0.1}>
            <div className="flex flex-wrap items-center gap-2 mb-3 sm:mb-6">
              {homeBadge ? (
                <div className="px-3 py-1 rounded-full text-xs font-bold bg-[#00D9FF] text-[#001F3F] border border-[#00D9FF]/20 shadow-sm">
                  {homeBadge}
                </div>
              ) : null}
              <span className="text-sm font-medium text-[#001F3F]/80 dark:text-white/80">
                {homeStatus ?? ""}
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={0.2}>
            <h1
              className="text-balance text-2xl tracking-[0.02em] sm:text-5xl lg:text-6xl font-normal text-[#001F3F] dark:text-white mb-3 sm:mb-4"
              style={{ fontFamily: "Blanka, var(--font-geist-sans), sans-serif" }}
            >
              {heroTitle}
            </h1>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={0.3}>
            <p className="hidden md:block text-pretty text-sm sm:text-lg leading-6 sm:leading-8 text-[#001F3F] dark:text-white md:text-[#001F3F]/70 md:dark:text-white/70 mb-6 md:mb-0 text-right md:text-left pr-4 md:pr-0">
              {heroSubtitle}
            </p>
          </ScrollReveal>
        </div>

        {/* Right Column - Buttons, Aligned with Badge at Top */}
        <div className="md:col-span-5 md:col-start-8">
          <ScrollReveal variant="fade-up" delay={0.4}>
            <div className="mt-44 md:mt-0 flex flex-col gap-3 items-stretch md:items-end">
              {homePrimaryCta ? (
                <ButtonColorful
                  href={homePrimaryCta.href}
                  label={homePrimaryCta.label}
                  className="w-full md:w-fit"
                />
              ) : null}
              {homeSecondaryCta ? (
                <ButtonNeon
                  href={homeSecondaryCta.href}
                  variant="solid"
                  className="w-full md:w-fit"
                >
                  {homeSecondaryCta.label}
                </ButtonNeon>
              ) : null}
              {homeTertiaryCta ? (
                <ButtonNeon
                  href={homeTertiaryCta.href}
                  variant="solid"
                  className="w-full md:w-fit bg-[#00D9FF] hover:bg-[#00D9FF]/90 border-[#00D9FF] text-white"
                >
                  {homeTertiaryCta.label}
                </ButtonNeon>
              ) : null}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  )
}
