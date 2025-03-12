import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted p-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-primary mb-2">
          Clinic Management
        </h1>
        <p className="text-muted-foreground">
          Create an account to get started
        </p>
      </div>
      <div className="w-full max-w-md">
        <div className="rounded-xl bg-white p-6 shadow-lg">
          <SignUp />
        </div>
      </div>
    </div>
  );
}
