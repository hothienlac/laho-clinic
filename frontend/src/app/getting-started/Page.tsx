"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Building2, Mail, Phone, MapPin, ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function GettingStartedPage() {
  const t = useTranslations("onboarding")
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // This would be determined by the user's role in a real app
  const userRole = "ADMIN" // or "DOCTOR" or "PHARMACIST"

  const handleCreateClinic = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Redirect to dashboard after "creating" the clinic
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-muted flex flex-col">
      <header className="bg-white border-b py-4">
        <div className="container flex justify-between items-center">
          <h1 className="text-xl font-bold text-primary">{t("title")}</h1>
        </div>
      </header>

      <main className="flex-1 container py-8 max-w-5xl">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">{t("welcome")}</h2>
          <p className="text-muted-foreground">{t("getStartedDescription")}</p>
        </div>

        <Tabs defaultValue={userRole === "ADMIN" ? "create" : "join"}>
          <TabsList className="mb-6">
            <TabsTrigger value="create" disabled={userRole !== "ADMIN"}>
              {t("createClinic")}
            </TabsTrigger>
            <TabsTrigger value="join">{t("joinClinic")}</TabsTrigger>
          </TabsList>

          <TabsContent value="create">
            <Card>
              <CardHeader>
                <CardTitle>{t("createNewClinic")}</CardTitle>
                <CardDescription>{t("createClinicDescription")}</CardDescription>
              </CardHeader>
              <form onSubmit={handleCreateClinic}>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="clinic-name">{t("clinicName")}</Label>
                      <div className="relative mt-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Building2 className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input id="clinic-name" placeholder={t("clinicNamePlaceholder")} className="pl-10" required />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="clinic-email">{t("clinicEmail")}</Label>
                      <div className="relative mt-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input
                          id="clinic-email"
                          type="email"
                          placeholder={t("clinicEmailPlaceholder")}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="clinic-phone">{t("clinicPhone")}</Label>
                      <div className="relative mt-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input id="clinic-phone" placeholder={t("clinicPhonePlaceholder")} className="pl-10" required />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="clinic-address">{t("clinicAddress")}</Label>
                      <div className="relative mt-1">
                        <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                          <MapPin className="h-5 w-5 text-gray-400" />
                        </div>
                        <Textarea
                          id="clinic-address"
                          placeholder={t("clinicAddressPlaceholder")}
                          className="pl-10 min-h-[80px]"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? t("creating") : t("createClinic")}
                    {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="join">
            <Card>
              <CardHeader>
                <CardTitle>{t("joinExistingClinic")}</CardTitle>
                <CardDescription>{t("joinClinicDescription")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="bg-muted rounded-full p-4 mb-4">
                    <Mail className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">{t("waitingForInvitation")}</h3>
                  <p className="text-muted-foreground max-w-md mb-6">{t("invitationExplanation")}</p>
                  <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground border border-border">
                    <p>{t("checkEmailPrompt")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

