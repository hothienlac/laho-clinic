"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"

export default function NotFound() {
  const t = useTranslations("errors")

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="rounded-xl bg-white p-8 shadow-lg max-w-md w-full text-center">
        <div className="h-20 w-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-accent"
          >
            <path d="M16 16v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" />
            <path d="M12 8h8v8h-8z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-2">{t("pageNotFound")}</h2>
        <p className="text-muted-foreground mb-6">{t("pageNotFoundMessage")}</p>
        <Button asChild className="w-full">
          <Link href="/">{t("returnToDashboard")}</Link>
        </Button>
      </div>
    </div>
  )
}

