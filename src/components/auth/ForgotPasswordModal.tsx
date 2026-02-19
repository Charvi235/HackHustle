
import React, { useState } from 'react';
import { X, Mail, ArrowRight, Loader2, KeyRound, CheckCircle } from 'lucide-react'; 

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1); // Step 1: Email, Step 2: OTP
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false); // OTP verify hua ya nahi track karne ke liye
  const [newPassword, setNewPassword] = useState("");        // Naya password store karne ke liye

  // Step 1: Email se OTP bhejo
  // const handleSendOtp = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!email) return;

  //   setIsLoading(true);
  //   // Fake Backend Call
  //   setTimeout(() => {
  //     setIsLoading(false);
  //     setStep(2); // <-- Yahan hum Step 2 (OTP Page) par ja rahe hain
  //     alert(`OTP sent to ${email}`); // Testing ke liye
  //   }, 1500);
  // };

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

  // Step 2: OTP Verify karo
  // const handleVerifyOtp = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!otp) return;

  //   setIsLoading(true);
  //   // Fake Verification
  //   setTimeout(() => {
  //     setIsLoading(false);
  //     alert("OTP Verified! Password Reset Successful.");
  //     onClose(); // Modal band kar do
  //     setStep(1); // Wapis reset kar do next time ke liye
  //     setEmail("");
  //     setOtp("");
  //   }, 1500);
  // };


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

  // // Step 2: OTP Verify Logic
  // const handleVerifyOtp = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!otp) return;

  //   setIsLoading(true);

  //   // Fake Verification for now
  //   setTimeout(() => {
  //     setIsLoading(false);
  //     // alert("OTP Verified!"); // Alert hata sakte ho agar chaho
      
  //     // onClose();  <--- IS LINE KO HATA DO OR COMMENT KAR DO
  //     setStep(3); // <--- YE NAYI LINE ADD KARO (Step 3 = Password Reset Screen)
  //   }, 1000);
  // };


//   const handleSaveNewPassword = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!newPassword.trim()) return;

//     setIsLoading(true);

//     try {
//       // Backend API Call to Save Password
//       const response = await fetch('http://localhost:8080/auth/reset-password', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         // body: JSON.stringify({ 
//         //     email: email, 
//         //     new_password: newPassword 
//         // })
//         body: JSON.stringify({ 
//    email: email, 
//    newPassword: newPassword 
// })
//       });

//       // Agar backend abhi ready nahi hai toh bas ye Simulation chalne do:
//       setTimeout(() => {
//         setIsLoading(false);
//         alert("Password Reset Successful! Please Login.");
        
//         onClose(); // Ab Modal band karo
//         setStep(1); // Reset sab kuch
//         setEmail("");
//         setOtp("");
//         setNewPassword("");
//       }, 1000);
      
//     } catch (error) {
//       console.error("Error:", error);
//       setIsLoading(false);
//     }
//   };


const handleSaveNewPassword = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!newPassword.trim()) return;

  setIsLoading(true);

  try {
    const response = await fetch("http://localhost:8080/api/students/update-password", {

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
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <X size={24} />
        </button>

        {/* --- STEP 1: EMAIL ENTER KARO --- */}
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

        {/* --- STEP 2: OTP ENTER KARO (Ye naya hai) --- */}
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

              {/* Back Option */}
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
        {/* --- STEP 3: NEW PASSWORD SCREEN --- */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  {/* Lock Icon */}
                  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white">Set New Password</h3>
                <p className="text-gray-400 text-sm">Create a strong password for your account</p>
              </div>

              <form onSubmit={handleSaveNewPassword} className="space-y-4">
                <div>
                  <input
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-[#1a1a2e] border border-gray-700 rounded-lg px-4 py-3 text-white outline-none focus:ring-2 focus:ring-green-500 transition-all placeholder:text-gray-600"
                    required
                  />
                </div>

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