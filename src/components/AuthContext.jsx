// Components/AuthContext.jsx

import { createContext, useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const session = supabase.auth.getSession().then(({ data }) => {
      setUser(data?.session?.user || null);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => authListener.subscription.unsubscribe();
  }, []);

  const signup = async (email, password) => {
    return await supabase.auth.signUp({ email, password });
  };

  const login = async (email, password) => {
    return await supabase.auth.signInWithPassword({ email, password });
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// // Below is a cleaned, optimized, and fully updated version of your AuthContext with:

// // ✅ Proper async session loading
// // ✅ Real-time auth state syncing
// // ✅ Auto-fetch user profile (optional but recommended)
// // ✅ Safe cleanup of listeners
// // ✅ Ready for middleware + protected routes

// // src/components/AuthContext.jsx

// import { createContext, useState, useEffect } from "react";
// import { supabase } from "../supabaseClient";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [profile, setProfile] = useState(null); // ⭐ Optional: store user profile
//   const [loading, setLoading] = useState(true);

//   // -------------------------------------------------------
//   // 🔥 Fetch User Profile from Supabase
//   // -------------------------------------------------------
//   const fetchUserProfile = async (userId) => {
//     const { data, error } = await supabase
//       .from("profiles")         // 👈 Must exist in your DB
//       .select("*")
//       .eq("id", userId)
//       .single();

//     if (!error) setProfile(data);
//   };

//   // -------------------------------------------------------
//   // 🔥 Load initial session on mount
//   // -------------------------------------------------------
//   useEffect(() => {
//     const loadSession = async () => {
//       const { data } = await supabase.auth.getSession();
//       const sessionUser = data?.session?.user || null;

//       setUser(sessionUser);

//       if (sessionUser) {
//         await fetchUserProfile(sessionUser.id);
//       }

//       setLoading(false);
//     };

//     loadSession();

//     // -------------------------------------------------------
//     // 🔥 Listen for login / logout / session changes
//     // -------------------------------------------------------
//     const { data: listener } = supabase.auth.onAuthStateChange(
//       async (_event, session) => {
//         const sessionUser = session?.user || null;

//         setUser(sessionUser);

//         if (sessionUser) {
//           await fetchUserProfile(sessionUser.id);
//         } else {
//           setProfile(null);
//         }
//       }
//     );

//     return () => {
//       listener.subscription.unsubscribe();
//     };
//   }, []);

//   // -------------------------------------------------------
//   // 🔥 Auth Helpers
//   // -------------------------------------------------------
//   const signup = async (email, password) => {
//     return await supabase.auth.signUp({ email, password });
//   };

//   const login = async (email, password) => {
//     return await supabase.auth.signInWithPassword({ email, password });
//   };

//   const logout = async () => {
//     await supabase.auth.signOut();
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         profile,       // ⭐ Now available everywhere
//         login,
//         signup,
//         logout,
//         loading,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };
