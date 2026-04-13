import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { AuthProvider, useAuth } from "../context/AuthContext";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { session, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const inTabGroup = segments[0] === "(tab)";

    if (!session && inTabGroup) {
      router.replace("/login"); // not signed in, kick to login
    } else if (session && !inTabGroup) {
      router.replace("/(tab)"); // signed in, go to app
    }
  }, [session, isLoading, segments]);

  return <>{children}</>;
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <AuthGuard>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tab)" />
          <Stack.Screen name="login" />
          <Stack.Screen name="signup" />
        </Stack>
      </AuthGuard>
    </AuthProvider>
  );
}
