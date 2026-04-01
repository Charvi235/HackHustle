
import React, { useState } from 'react';

import { X, Mail, ArrowRight, Loader2, KeyRound, CheckCircle, Eye, EyeOff } from 'lucide-react';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false); 
  const [newPassword, setNewPassword] = useState("");  

const [confirmPassword, setConfirmPassword] = useState("");
const [passwordError, setPasswordError] = useState("");

const [showNewPassword, setShowNewPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSendOtp = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!email) return;

  setIsLoading(true);

  try {
    const response = await fetch("http://localhost:8080/auth/send-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      setStep(2);
    } else {
      alert("Failed to send OTP");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Server error");
  }

  setIsLoading(false);
};

  



  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) return;

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8080/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      if (response.ok) {
        setStep(3);
      } else {
        alert("Invalid OTP");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error");
    }

    setIsLoading(false);
  };
  const handleSaveNewPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(""); 
    if (!newPassword.trim() || !confirmPassword.trim()) {
      setPasswordError("Please fill both password fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match!");
      return;
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      setPasswordError("Password must be 8+ chars and include a capital letter, a small letter, a number, and a special symbol.");
      return;
    }
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8080/auth/reset-password",  {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          newPassword,
        }),
      });

      if (response.ok) {
        alert("Password Reset Successful! Please Login.");
        onClose();
        setStep(1);
        setEmail("");
        setOtp("");
        setNewPassword("");
        setConfirmPassword(""); 
        setPasswordError("");
      } else {
        alert("Failed to reset password");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error");
    }

    setIsLoading(false);
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#1a1a2e] border border-gray-700 rounded-2xl shadow-2xl p-8">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <X size={24} />
        </button>
        {step === 1 && (
          <>
            <div className="text-center mb-6">
              <div className="mx-auto w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4">
                <Mail className="w-8 h-8 text-red-500" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Reset Password</h2>
              <p className="text-gray-400 text-sm">Enter your email to receive an OTP.</p>
            </div>
            <form onSubmit={handleSendOtp} className="space-y-4">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full bg-[#0f0f1a] border border-gray-700 text-white rounded-lg p-3 outline-none focus:ring-2 focus:ring-red-500 transition-all"
                autoFocus
              />
              <button 
                type="submit"
                disabled={isLoading || !email}
                className="w-full bg-gradient-to-r from-red-600 to-red-800 text-white font-bold py-3 rounded-lg hover:from-red-500 hover:to-red-700 transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? <Loader2 className="animate-spin" /> : "Send OTP"}
                {!isLoading && <ArrowRight size={18} />}
              </button>
            </form>
          </>
        )}
        {step === 2 && (
          <>
            <div className="text-center mb-6">
              <div className="mx-auto w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
                <KeyRound className="w-8 h-8 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Enter OTP</h2>
              <p className="text-gray-400 text-sm">
                We've sent a code to <span className="text-white font-semibold">{email}</span>
              </p>
            </div>
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <input 
                type="text" 
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit OTP"
                maxLength={6}
                className="w-full bg-[#0f0f1a] border border-gray-700 text-white rounded-lg p-3 text-center text-2xl tracking-[0.5em] outline-none focus:ring-2 focus:ring-green-500 transition-all"
                autoFocus
              />
              <button 
                type="submit"
                disabled={isLoading || otp.length < 4}
                className="w-full bg-gradient-to-r from-green-600 to-green-800 text-white font-bold py-3 rounded-lg hover:from-green-500 hover:to-green-700 transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? <Loader2 className="animate-spin" /> : "Verify OTP"}
                {!isLoading && <CheckCircle size={18} />}
              </button>
              <button 
                type="button"
                onClick={() => setStep(1)}
                className="w-full text-sm text-gray-500 hover:text-white mt-2"
              >
                Change Email
              </button>
            </form>
          </>
        )}
        {step === 3 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">Set New Password</h3>
              <p className="text-gray-400 text-sm">Create a strong password for your account</p>
            </div>
            <form onSubmit={handleSaveNewPassword} className="space-y-4">
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    setPasswordError(""); 
                  }}
                  className="w-full bg-[#1a1a2e] border border-gray-700 rounded-lg px-4 py-3 pr-12 text-white outline-none focus:ring-2 focus:ring-green-500 transition-all placeholder:text-gray-600"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <div className="relative mt-4">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setPasswordError(""); 
                  }}
                  className="w-full bg-[#1a1a2e] border border-gray-700 rounded-lg px-4 py-3 pr-12 text-white outline-none focus:ring-2 focus:ring-green-500 transition-all placeholder:text-gray-600"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {passwordError && (
                <div className="text-red-500 text-xs font-medium text-center bg-red-500/10 py-2 px-3 rounded-md mb-4 mt-2">
                  {passwordError}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-bold py-3 rounded-lg transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Saving..." : "Save Password"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordModal;