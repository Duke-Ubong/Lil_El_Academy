import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { ParentUser, ChildProfile, AuthResponse } from "../types/auth";

interface AddChildPayload {
  name: string;
  gender?: "male" | "female" | "other";
  yearGroup: string;
  keyStage?: string;
  coreSubjects?: string[];
  academicGoal?: string;
  diagnosticRef?: string;
}

interface AuthContextType {
  user: ParentUser | null;
  children: ChildProfile[];
  activeChild: ChildProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isAuthModalOpen: boolean;
  authModalTab: "signin" | "register";
  isChildOnboardingOpen: boolean;
  isPortalViewActive: boolean;
  openAuthModal: (tab?: "signin" | "register") => void;
  closeAuthModal: () => void;
  openChildOnboarding: () => void;
  closeChildOnboarding: () => void;
  openPortalView: () => void;
  closePortalView: () => void;
  selectActiveChild: (childId: string) => void;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string, phone?: string) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  quickDemoLogin: () => Promise<void>;
  addChild: (data: AddChildPayload) => Promise<{ success: boolean; error?: string; child?: ChildProfile }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = "lilel_auth_token";

export function AuthProvider({ children: reactChildren }: { children: ReactNode }) {
  const [user, setUser] = useState<ParentUser | null>(null);
  const [childrenList, setChildrenList] = useState<ChildProfile[]>([]);
  const [activeChildId, setActiveChildId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalTab, setAuthModalTab] = useState<"signin" | "register">("signin");
  const [isChildOnboardingOpen, setIsChildOnboardingOpen] = useState<boolean>(false);
  const [isPortalViewActive, setIsPortalViewActive] = useState<boolean>(false);

  const activeChild = childrenList.find((c) => c.id === activeChildId) || childrenList[0] || null;

  // Restore authenticated session on mount
  useEffect(() => {
    async function restoreSession() {
      const storedToken = localStorage.getItem(TOKEN_KEY);
      if (!storedToken) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/auth/me", {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });
        const data = await response.json();
        if (data.success && data.user) {
          setUser(data.user);
          setChildrenList(data.children || []);
          if (data.children && data.children.length > 0) {
            setActiveChildId(data.children[0].id);
          }
        } else {
          localStorage.removeItem(TOKEN_KEY);
        }
      } catch (err) {
        console.warn("Failed to rehydrate session:", err);
      } finally {
        setIsLoading(false);
      }
    }

    restoreSession();
  }, []);

  const openAuthModal = useCallback((tab: "signin" | "register" = "signin") => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setIsAuthModalOpen(false);
  }, []);

  const openChildOnboarding = useCallback(() => {
    setIsChildOnboardingOpen(true);
  }, []);

  const closeChildOnboarding = useCallback(() => {
    setIsChildOnboardingOpen(false);
  }, []);

  const openPortalView = useCallback(() => {
    setIsPortalViewActive(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const closePortalView = useCallback(() => {
    setIsPortalViewActive(false);
  }, []);

  const selectActiveChild = useCallback((childId: string) => {
    setActiveChildId(childId);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data: AuthResponse = await res.json();
      if (data.success && data.user && data.token) {
        localStorage.setItem(TOKEN_KEY, data.token);
        setUser(data.user);
        setChildrenList(data.children || []);
        if (data.children && data.children.length > 0) {
          setActiveChildId(data.children[0].id);
        }
        setIsAuthModalOpen(false);
        setIsPortalViewActive(true);
        return { success: true };
      }
      return { success: false, error: data.error || "Login failed" };
    } catch {
      return { success: false, error: "Network error connecting to admissions server." };
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    phone?: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, phone }),
      });
      const data: AuthResponse = await res.json();
      if (data.success && data.user && data.token) {
        localStorage.setItem(TOKEN_KEY, data.token);
        setUser(data.user);
        setChildrenList(data.children || []);
        setIsAuthModalOpen(false);
        // Prompt immediate child onboarding as requested!
        setIsChildOnboardingOpen(true);
        setIsPortalViewActive(true);
        return { success: true };
      }
      return { success: false, error: data.error || "Registration failed" };
    } catch {
      return { success: false, error: "Network error connecting to admissions server." };
    }
  };

  const loginWithGoogle = async (): Promise<{ success: boolean; error?: string }> => {
    try {
      // Clean, seamless Google account integration
      const googleMockProfile = {
        name: "Dr. Hannah Adams",
        email: "hannah.adams.oxon@gmail.com",
        avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=160",
      };

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(googleMockProfile),
      });

      const data: AuthResponse = await res.json();
      if (data.success && data.user && data.token) {
        localStorage.setItem(TOKEN_KEY, data.token);
        setUser(data.user);
        setChildrenList(data.children || []);
        if (data.children && data.children.length > 0) {
          setActiveChildId(data.children[0].id);
        } else {
          // If brand new Google user with no enrolled children, open onboarding wizard
          setIsChildOnboardingOpen(true);
        }
        setIsAuthModalOpen(false);
        setIsPortalViewActive(true);
        return { success: true };
      }
      return { success: false, error: data.error || "Google sign-in could not be completed." };
    } catch {
      return { success: false, error: "Network error with Google sign-in service." };
    }
  };

  const quickDemoLogin = async () => {
    await login("dr.hannah.adams@example.co.uk", "password123");
  };

  const addChild = async (
    payload: AddChildPayload
  ): Promise<{ success: boolean; error?: string; child?: ChildProfile }> => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      return { success: false, error: "You must be signed in to add a child." };
    }

    try {
      const res = await fetch("/api/portal/children", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success && data.children) {
        setChildrenList(data.children);
        if (data.child) {
          setActiveChildId(data.child.id);
        }
        setIsChildOnboardingOpen(false);
        setIsPortalViewActive(true);
        return { success: true, child: data.child };
      }
      return { success: false, error: data.error || "Failed to save child details." };
    } catch {
      return { success: false, error: "Network error saving child details." };
    }
  };

  const logout = async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      try {
        await fetch("/api/auth/logout", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch {
        // silent fail
      }
    }
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
    setChildrenList([]);
    setActiveChildId(null);
    setIsPortalViewActive(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        children: childrenList,
        activeChild,
        isAuthenticated: Boolean(user),
        isLoading,
        isAuthModalOpen,
        authModalTab,
        isChildOnboardingOpen,
        isPortalViewActive,
        openAuthModal,
        closeAuthModal,
        openChildOnboarding,
        closeChildOnboarding,
        openPortalView,
        closePortalView,
        selectActiveChild,
        login,
        register,
        loginWithGoogle,
        quickDemoLogin,
        addChild,
        logout,
      }}
    >
      {reactChildren}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
