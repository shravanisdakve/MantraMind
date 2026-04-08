import { redirect } from 'next/navigation';

export default function Home() {
  // Directly redirect new users to onboarding
  redirect('/onboarding');
}
