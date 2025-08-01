import { toast } from "react-hot-toast";
import { setLoading, setToken } from "../../slices/authSlice";
// import { resetCart } from "../../slices/cartSlice";
import { setUser } from "../../slices/profileSlice";
import  apiConnector  from "../apiconnector";
import  {endpoints } from "../apis";
// import {SENDOTP}

const {
   SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints;


export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Sending OTP...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST",  SENDOTP_API, {
        email,
        checkUserPresent: true,
      });

      if (!response?.data?.success) {
        throw new Error(response?.data?.message || "Unknown error from server");
      }

      toast.success("OTP sent successfully");
      navigate("/verify-email");
    } catch (error) {
      const message =
        error?.response?.data?.message || error?.message || "Failed to send OTP";
      console.error("SENDOTP ERROR:", message);
      toast.error(message);
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}



export function signUp(
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Signing Up...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Signup Successful");
      navigate("/login");
    } catch (error) {
      const message = error.response?.data?.message || "Signup failed";
      console.error("SIGNUP ERROR:", message);
      toast.error(message);
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}

export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Logging In...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Login Successful");

      dispatch(setToken(response.data.token));

      const userImage =
        response.data.user?.image ||
        `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;

      dispatch(setUser({ ...response.data.user, image: userImage }));
      localStorage.setItem("token", JSON.stringify(response.data.token));

      navigate("/dashboard/my-profile");
    } catch (error) {
      const message = error.response?.data?.message || "Login failed";
      console.error("LOGIN ERROR:", message);
      toast.error(message);
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}

export function getPasswordResetToken(email, setEmailSent) {
  return async (dispatch) => {
    const toastId = toast.loading("Sending Reset Email...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST",  RESETPASSTOKEN_API, {
        email,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Reset Email Sent");
      setEmailSent(true);
    } catch (error) {
      const message = error.response?.data?.message || "Failed to send reset email";
      console.error("RESET TOKEN ERROR:", message);
      toast.error(message);
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}

export function resetPassword(password, confirmPassword, token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Resetting Password...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", RESETPASSWORDTOKEN_API, {
        password,
        confirmPassword,
        token,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Password Reset Successful");
      navigate("/login");
    } catch (error) {
      const message = error.response?.data?.message || "Reset failed";
      console.error("RESET PASSWORD ERROR:", message);
      toast.error(message);
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    dispatch(resetCart());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged Out");
    navigate("/");
  };
}
