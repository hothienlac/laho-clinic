import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="h-8 w-64 bg-muted animate-pulse rounded-md"></div>
        <div className="h-4 w-96 bg-muted animate-pulse rounded-md"></div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="h-5 w-32 bg-muted animate-pulse rounded-md"></div>
              <div className="h-8 w-8 rounded-full bg-muted animate-pulse"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 w-16 bg-muted animate-pulse rounded-md mb-2"></div>
              <div className="h-4 w-24 bg-muted animate-pulse rounded-md"></div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="col-span-1 md:col-span-2">
          <Card>
            <CardHeader>
              <div className="h-6 w-40 bg-muted animate-pulse rounded-md mb-2"></div>
              <div className="h-4 w-64 bg-muted animate-pulse rounded-md"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center gap-4 rounded-lg border p-3">
                    <div className="h-10 w-10 rounded-full bg-muted animate-pulse"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-3/4 bg-muted animate-pulse rounded-md"></div>
                      <div className="h-3 w-1/2 bg-muted animate-pulse rounded-md"></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="h-6 w-48 bg-muted animate-pulse rounded-md mb-2"></div>
            <div className="h-4 w-32 bg-muted animate-pulse rounded-md"></div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4 rounded-lg border p-3">
                  <div className="h-10 w-10 rounded-full bg-muted animate-pulse"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-3/4 bg-muted animate-pulse rounded-md"></div>
                    <div className="h-3 w-1/2 bg-muted animate-pulse rounded-md"></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

