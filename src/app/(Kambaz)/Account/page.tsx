"use client";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { setCurrentUser } from "./reducer";

export default function AccountPage() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  
  // Load from localStorage FIRST
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        dispatch(setCurrentUser(JSON.parse(storedUser)));
      }
    }
    setLoading(false); // Mark loading as complete
  }, [dispatch]);

  // THEN redirect based on loaded state
  useEffect(() => {
    if (!loading) {
      if (!currentUser) {
        router.push("/Account/Signin");
      } else {
        router.push("/Account/Profile");
      }
    }
  }, [currentUser, router, loading]);

  return null;
}