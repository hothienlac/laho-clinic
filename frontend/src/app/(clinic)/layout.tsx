

export default async function ClinicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const user = await currentUser();
      if (!user) {
        redirect('/sign-in');
      }
}