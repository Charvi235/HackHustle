// import React, { useState } from 'react';
// import { X, Mail, ArrowRight, Loader2 } from 'lucide-react'; 

// interface ForgotPasswordModalProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({ isOpen, onClose }) => {
//   const [email, setEmail] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSent, setIsSent] = useState(false);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault(); // Page refresh hone se rokega
//     if (!email) return;

//     setIsLoading(true);

//     // Fake API Call (Baad me yahan backend connect karenge)
//     setTimeout(() => {
//       setIsLoading(false);
//       setIsSent(true);
//       // 2 second baad modal band ho jayega
//       setTimeout(() => {
//         onClose();
//         setIsSent(false);
//         setEmail("");
//       }, 2000);
//     }, 1500);
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      
//       {/* Modal Box */}
//       <div className="relative w-full max-w-md bg-[#1a1a2e] border border-gray-700 rounded-2xl shadow-2xl p-8 transform transition-all scale-100">
        
//         {/* Close Button */}
//         <button 
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
//         >
//           <X size={24} />
//         </button>

//         {/* Content */}
//         <div className="text-center mb-6">
//           <div className="mx-auto w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4">
//             {isSent ? (
//               <div className="text-green-500 font-bold text-2xl">✓</div>
//             ) : (
//               <Mail className="w-8 h-8 text-red-500" />
//             )}
//           </div>
          
//           <h2 className="text-2xl font-bold text-white mb-2">
//             {isSent ? "Email Sent!" : "Reset Password"}
//           </h2>
          
//           <p className="text-gray-400 text-sm">
//             {isSent 
//               ? `We have sent a reset link to ${email}`
//               : "Enter your email address and we'll send you a link to reset your password."}
//           </p>
//         </div>

//         {/* Form */}
//         {!isSent && (
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <input 
//                 type="email" 
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="name@company.com"
//                 className="w-full bg-[#0f0f1a] border border-gray-700 text-white rounded-lg p-3 outline-none focus:ring-2 focus:ring-red-500 transition-all placeholder:text-gray-600"
//                 autoFocus
//               />
//             </div>

//             <button 
//               type="submit"
//               disabled={isLoading || !email}
//               className="w-full bg-gradient-to-r from-red-600 to-red-800 text-white font-bold py-3 rounded-lg hover:from-red-500 hover:to-red-700 transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {isLoading ? (
//                 <>
//                   <Loader2 className="w-5 h-5 animate-spin" />
//                   Sending...
//                 </>
//               ) : (
//                 <>
//                   Send Reset Link
//                   <ArrowRight size={18} />
//                 </>
//               )}
//             </button>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ForgotPasswordModal;
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

  // Step 1: Email se OTP bhejo
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    // Fake Backend Call
    setTimeout(() => {
      setIsLoading(false);
      setStep(2); // <-- Yahan hum Step 2 (OTP Page) par ja rahe hain
      alert(`OTP sent to ${email}`); // Testing ke liye
    }, 1500);
  };

  // Step 2: OTP Verify karo
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) return;

    setIsLoading(true);
    // Fake Verification
    setTimeout(() => {
      setIsLoading(false);
      alert("OTP Verified! Password Reset Successful.");
      onClose(); // Modal band kar do
      setStep(1); // Wapis reset kar do next time ke liye
      setEmail("");
      setOtp("");
    }, 1500);
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

      </div>
    </div>
  );
};

export default ForgotPasswordModal;