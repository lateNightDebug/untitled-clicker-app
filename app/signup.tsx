
// Sign-up screen. Cross-field validation (password === confirmPassword) via Zod's
// .refine(). On success, shows a "check your email" screen if Supabase requires
// email confirmation, or auto-signs-in if confirmation is disabled.
import { AnimatedCartoonButtonSmall } from "@/components/AnimatedCartoonButtonSmall copy";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { z } from "zod";
import { useAuth } from "../context/AuthContext"; 
import { theme } from "../styles/theme";

// ── Validation schema ─────────────────────────────────────────────────────────

const signUpSchema = z
  .object({
    email: z.string().trim().email("Please enter a valid email address."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
      .regex(/[0-9]/, "Password must contain at least one number.")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character.",
      ),
    confirmPassword: z.string().min(1, "Please confirm your password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"],
  });

type SignUpForm = z.infer<typeof signUpSchema>;

// ── Component ─────────────────────────────────────────────────────────────────

const SignUp = () => {
  const { signUp } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false); // shown if email confirmation is required

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { email: "", password: "", confirmPassword: "" },
    mode: "onSubmit",
  });

  const onSubmit = async (data: SignUpForm) => {
    try {
      setAuthError(null);
      setIsSubmitting(true);
      await signUp(data.email, data.password); 
      // Two possible outcomes:
      //   A) Supabase "Confirm email" disabled → session set immediately → AuthGuard redirects
      //   B) Supabase "Confirm email" enabled  → no session yet → show success screen
      setEmailSent(true);
    } catch (e) {
      setAuthError(
        e instanceof Error ? e.message : "Sign up failed. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Success state (email confirmation required) ───────────────────────────

  if (emailSent) {
    return (
      <View style={styles.successContainer}>
        <View style={styles.successIcon}>
          <Ionicons name="mail-outline" size={56} color={theme.colors.bg2} />
        </View>
        <Text style={styles.successTitle}>Check your inbox</Text>
        <Text style={styles.successMessage}>
          We sent a confirmation link to your email address. Tap the link to
          activate your account, then come back and sign in.
        </Text>
        <Pressable
          style={styles.button}
          onPress={() => router.replace("./login")}
        >
          <Text style={styles.buttonText}>Go to Sign In</Text>
        </Pressable>
      </View>
    );
  }

  // ── Form ─────────────────────────────────────────────────────────────────────

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        {/* ── Header ── */}
        <View style={styles.header}>
          <View style={styles.logoCircle}>
            <FontAwesome5
              name="plus-circle"
              size={82}
              color={theme.colors.text}
            />
          </View>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Let's Get you Clicking!</Text>
        </View>

        {/* ── Auth error banner ── */}
        {authError && (
          <View style={styles.errorBanner}>
            <Ionicons
              name="alert-circle-outline"
              size={16}
              color={theme.colors.button}
            />
            <Text style={styles.errorBannerText}>{authError}</Text>
          </View>
        )}

        {/* ── Email field ── */}
        <Text style={styles.label}>Email: </Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={[styles.input, errors.email && styles.inputError]}
              placeholder="you@example.com"
              placeholderTextColor={theme.colors.subText}
              value={value}
              onChangeText={onChange}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
          )}
        />
        {errors.email && (
          <Text style={styles.fieldError}>{errors.email.message}</Text>
        )}

        {/* ── Password field ── */}
        <Text style={styles.label}>Password: </Text>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={[styles.input, errors.password && styles.inputError]}
              placeholder="Min 8 chars, upper, lower, number, symbol"
              placeholderTextColor={theme.colors.subText}
              value={value}
              onChangeText={onChange}
              secureTextEntry
              autoComplete="new-password"
            />
          )}
        />
        {errors.password && (
          <Text style={styles.fieldError}>{errors.password.message}</Text>
        )}

        {/* ── Confirm Password field ── */}
        <Text style={styles.label}>Confirm Password: </Text>
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={[
                styles.input,
                errors.confirmPassword && styles.inputError,
              ]}
              placeholder="••••••••"
              placeholderTextColor={theme.colors.subText}
              value={value}
              onChangeText={onChange}
              secureTextEntry
              autoComplete="new-password"
            />
          )}
        />
        {errors.confirmPassword && (
          <Text style={styles.fieldError}>
            {errors.confirmPassword.message}
          </Text>
        )}

        <AnimatedCartoonButtonSmall
          onPress={handleSubmit(onSubmit)}
          isDisabled={isSubmitting}
          title="Create Account"
        />

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <Pressable onPress={() => router.replace("./login")}>
            <Text style={styles.footerLink}>Sign In</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },
  content: {
    padding: theme.spacing.screen,
    paddingTop: 60,
    flexGrow: 1,
  },
  successContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing.screen,
    backgroundColor: theme.colors.bg,
  },
  successIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#e8f0fd",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: theme.colors.text,
    marginBottom: 12,
  },
  successMessage: {
    fontSize: 15,
    color: theme.colors.subText,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 32,
  },
  header: {
    alignItems: "center",
    marginBottom: 36,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.accent,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: theme.colors.text,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 15,
    color: theme.colors.subText,
  },
  errorBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: theme.colors.button,
    borderWidth: 1,
    borderColor: theme.colors.buttonshadow,
    borderRadius: theme.radius.input,
    padding: 12,
    marginBottom: 16,
  },
  errorBannerText: {
    flex: 1,
    fontSize: 14,
    color: "#ffff",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.colors.text,
    marginBottom: 6,
    marginTop: 16,
  },
  input: {
    backgroundColor: "#fffafa",
    borderWidth: 1,
    borderColor: theme.colors.bg2,
    borderRadius: theme.radius.input,
    padding: 14,
    fontSize: 16,
    marginBottom: 10,
    color: theme.colors.text,
  },
  inputError: {
    borderColor: theme.colors.buttonshadow,
  },
  fieldError: {
    color: theme.colors.button,
    fontSize: 13,
    marginTop: 4,
  },
  button: {
    backgroundColor: theme.colors.accent,
    borderRadius: theme.radius.input,
    padding: 16,
    alignItems: "center",
    marginTop: 28,
    borderWidth: 2,
    borderColor: theme.colors.bg2,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "700",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  footerText: {
    color: theme.colors.subText,
    fontSize: 15,
  },
  footerLink: {
    color: theme.colors.bg2,
    fontSize: 15,
    fontWeight: "700",
  },
});
