import { signInWithPopup } from "firebase/auth"
import { auth, googleProvider } from "../firebase/firebase"

const Login = () => {
  const handleLogin = async (): Promise<void> => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      console.log("User:", result.user)
    } catch (error) {
      console.error("Login Error:", error)
    }
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <button
        onClick={handleLogin}
        className="rounded bg-blue-500 px-4 py-2 text-white"
      >
        Login with Google
      </button>
    </div>
  )
}

export default Login
