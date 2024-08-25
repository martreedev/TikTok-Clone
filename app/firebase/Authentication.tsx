'use client'
import { useState, useEffect } from 'react';
import { app } from '@/app/firebase/config'
import { getAuth } from 'firebase/auth';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { signOut } from 'firebase/auth';

const signInWithGoogle = async () => {
    try {
        const auth = getAuth(app);
        const provider = new GoogleAuthProvider();

        await signInWithPopup(auth, provider);
        console.log("Logged in with Google")
        return true
    }
    catch (error) {
        console.error("Error signing in with Google: ", error);
        return false
    }
}

const LogOut = async () => {
    const auth = getAuth(app);
    try {
        await signOut(auth);
        return true
    } catch (error) {
        console.log("Error signing out: ", error)
        return false
    }
}

const CheckUserStatus = () => {
    const [user, setUser] = useState<any>(null);
    useEffect(() => {
        const auth = getAuth(app);
        const unSubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(false);
            }
        });
        return () => unSubscribe();
    }, [])
    return { user }
}

export { CheckUserStatus, signInWithGoogle, LogOut };