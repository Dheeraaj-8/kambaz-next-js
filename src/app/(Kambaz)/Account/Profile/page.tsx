"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser, updateUser } from "../reducer";
import { Button, FormControl, Alert } from "react-bootstrap";

export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  
  const signout = () => {
    dispatch(setCurrentUser(null));
    router.push("/Account/Signin");
  };

  const saveProfile = () => {
    dispatch(updateUser(profile));
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };
  
  // Load from localStorage first
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        dispatch(setCurrentUser(JSON.parse(storedUser)));
      }
    }
    setLoading(false);
  }, [dispatch]);

  // Then check if user exists and redirect if needed
  useEffect(() => {
    if (!loading) {
      if (!currentUser) {
        router.push("/Account/Signin");
        return;
      }
      setProfile(currentUser);
    }
  }, [currentUser, router, loading]);

  if (loading || !currentUser) {
    return null;
  }

  return (
    <div className="p-4">
      <div className="wd-profile-screen" style={{ maxWidth: "300px", width: "100%" }}>
        <h3 className="fw-bold mb-3">Profile</h3>
        
        {success && (
          <Alert variant="success" className="py-2 px-3 small mb-2">
            Profile updated successfully!
          </Alert>
        )}

        {profile && (
          <div>
            <FormControl 
              id="wd-username" 
              className="mb-2 p-2"
              value={profile.username || ""}
              onChange={(e) => setProfile({ ...profile, username: e.target.value })}
              style={{ fontSize: "0.9rem" }}
            />
            <FormControl 
              id="wd-password" 
              className="mb-2 p-2"
              type="password"
              value={profile.password || ""}
              onChange={(e) => setProfile({ ...profile, password: e.target.value })}
              style={{ fontSize: "0.9rem" }}
            />
            <FormControl 
              id="wd-firstname" 
              className="mb-2 p-2"
              placeholder="First Name"
              value={profile.firstName || ""}
              onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
              style={{ fontSize: "0.9rem" }}
            />
            <FormControl 
              id="wd-lastname" 
              className="mb-2 p-2"
              placeholder="Last Name"
              value={profile.lastName || ""}
              onChange={(e) => setProfile({ ...profile, lastName: e.target.value })} 
              style={{ fontSize: "0.9rem" }}
            />
            <FormControl 
              id="wd-dob" 
              className="mb-2 p-2" 
              type="date"
              value={profile.dob ? profile.dob.split('T')[0] : ""}
              onChange={(e) => setProfile({ ...profile, dob: e.target.value })} 
              style={{ fontSize: "0.9rem" }}
            />
            <FormControl 
              id="wd-email" 
              className="mb-2 p-2"
              type="email"
              placeholder="Email"
              value={profile.email || ""}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })} 
              style={{ fontSize: "0.9rem" }}
            />
            <select 
              className="form-control mb-2 p-2" 
              id="wd-role"
              value={profile.role || "STUDENT"}
              onChange={(e) => setProfile({ ...profile, role: e.target.value })} 
              style={{ fontSize: "0.9rem" }}
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
              <option value="FACULTY">Faculty</option>
              <option value="STUDENT">Student</option>
            </select>
            <Button 
              onClick={saveProfile} 
              className="w-100 py-2 mb-2" 
              variant="primary" 
              style={{ fontSize: "0.9rem" }}
            >
              Save Profile
            </Button>
            <Button 
              onClick={signout} 
              className="w-100 py-2" 
              id="wd-signout-btn" 
              variant="danger" 
              style={{ fontSize: "0.9rem" }}
            >
              Sign out
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}