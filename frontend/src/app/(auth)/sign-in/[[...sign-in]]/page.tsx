import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted p-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-primary mb-2">
          Clinic Management
        </h1>
        <p className="text-muted-foreground">
          Sign in to access your clinic dashboard
        </p>
      </div>
      <div className="w-full max-w-md">
        <div className="rounded-xl bg-white p-6 shadow-lg">
          <SignIn />
        </div>
      </div>
    </div>
  );
}
