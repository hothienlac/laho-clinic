import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function Loading() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="h-8 w-64 animate-pulse rounded-md bg-muted"></div>
        <div className="h-4 w-96 animate-pulse rounded-md bg-muted"></div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="h-5 w-32 animate-pulse rounded-md bg-muted"></div>
              <div className="h-8 w-8 animate-pulse rounded-full bg-muted"></div>
            </CardHeader>
            <CardContent>
              <div className="mb-2 h-8 w-16 animate-pulse rounded-md bg-muted"></div>
              <div className="h-4 w-24 animate-pulse rounded-md bg-muted"></div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="col-span-1 md:col-span-2">
          <Card>
            <CardHeader>
              <div className="mb-2 h-6 w-40 animate-pulse rounded-md bg-muted"></div>
              <div className="h-4 w-64 animate-pulse rounded-md bg-muted"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 rounded-lg border p-3"
                  >
                    <div className="h-10 w-10 animate-pulse rounded-full bg-muted"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-3/4 animate-pulse rounded-md bg-muted"></div>
                      <div className="h-3 w-1/2 animate-pulse rounded-md bg-muted"></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="mb-2 h-6 w-48 animate-pulse rounded-md bg-muted"></div>
            <div className="h-4 w-32 animate-pulse rounded-md bg-muted"></div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 rounded-lg border p-3"
                >
                  <div className="h-10 w-10 animate-pulse rounded-full bg-muted"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-3/4 animate-pulse rounded-md bg-muted"></div>
                    <div className="h-3 w-1/2 animate-pulse rounded-md bg-muted"></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
