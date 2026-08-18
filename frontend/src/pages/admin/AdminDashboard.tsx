// import { Card } from '@/components/ui/card';
// import { Users, BookOpen, GraduationCap, Layers, HelpCircle } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// export const AdminDashboard = () => {
//   const navigate = useNavigate();

//   const menuItems = [
//     { title: 'Manage Student', icon: Users, path: '/admin/students', color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'hover:border-blue-500' },
//     { title: 'Manage Teacher', icon: GraduationCap, path: '/admin/teachers', color: 'text-green-500', bg: 'bg-green-500/10', border: 'hover:border-green-500' },
//     { title: 'Manage Subject', icon: BookOpen, path: '/admin/subjects', color: 'text-purple-500', bg: 'bg-purple-500/10', border: 'hover:border-purple-500' },
//     { title: 'Manage Topic', icon: Layers, path: '/admin/topics', color: 'text-yellow-500', bg: 'bg-yellow-500/10', border: 'hover:border-yellow-500' },
//     { title: 'Manage Questions', icon: HelpCircle, path: '/admin/questions', color: 'text-red-500', bg: 'bg-red-500/10', border: 'hover:border-red-500' },
//   ];

//   return (
//     <div className="min-h-screen bg-background p-8 pt-24">
//       <div className="max-w-6xl mx-auto">
//         <div className="mb-10">
//           <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
//           <p className="text-zinc-400">Welcome back, Admin. Select a module to manage your system.</p>
//         </div>

//         {/* 5 Cards Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {menuItems.map((item, index) => (
//             <Card
//               key={index}
//               onClick={() => {
//                 console.log(`Navigating to ${item.path}`);
//                 navigate(item.path);
//               }}
//               className={`p-6 bg-zinc-950 border-2 border-zinc-800 transition-all duration-300 cursor-pointer group ${item.border}`}
//             >
//               <div className={`w-14 h-14 rounded-xl ${item.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
//                 <item.icon className={`w-7 h-7 ${item.color}`} />
//               </div>
//               <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-zinc-200 transition-colors">
//                 {item.title}
//               </h3>
//               <p className="text-zinc-400 text-sm">
//                 Click to view, add, edit, or delete records.
//               </p>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button'; // Button import karlo
import { Users, BookOpen, GraduationCap, Layers, HelpCircle, LogOut } from 'lucide-react'; // LogOut icon add kiya
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
export const AdminDashboard = () => {
  const navigate = useNavigate();
  // const navigate = useNavigate();

  useEffect(() => {
    // 1. Dashboard par aate hi Navbar ko dhund kar hide kardo
    const navbar = document.querySelector('header'); // Agar aapka navbar <nav> tag hai
    if (navbar) {
      navbar.style.display = 'none';
    }

    // 2. Clean-up: Jab user is page se bahar jaye (Logout ya Back), toh Navbar wapas dikhao
    return () => {
      if (navbar) {
        navbar.style.display = 'flex'; // Ya 'block' jo bhi aapki default styling ho
      }
    };
  }, []);
  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem('adminToken'); // Sirf admin token hatao ya localStorage.clear() kardo
    console.log("Admin Logged Out");
    navigate('/auth'); // Wapas login page par bhej do
    window.location.reload(); // Navbar ko update karne ke liye refresh zaroori hai
  };

  const menuItems = [
    { title: 'Manage Student', icon: Users, path: '/admin/students', color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'hover:border-blue-500' },
    { title: 'Manage Teacher', icon: GraduationCap, path: '/admin/teachers', color: 'text-green-500', bg: 'bg-green-500/10', border: 'hover:border-green-500' },
    { title: 'Manage Subject', icon: BookOpen, path: '/admin/subjects', color: 'text-purple-500', bg: 'bg-purple-500/10', border: 'hover:border-purple-500' },
    { title: 'Manage Topic', icon: Layers, path: '/admin/topics', color: 'text-yellow-500', bg: 'bg-yellow-500/10', border: 'hover:border-yellow-500' },
    { title: 'Manage Questions', icon: HelpCircle, path: '/admin/questions', color: 'text-red-500', bg: 'bg-red-500/10', border: 'hover:border-red-500' },
  ];

  return (
    <div className="min-h-screen bg-background p-8 pt-8 relative">
      {/* --- Logout Button (Top Right) --- */}
      <div className="absolute top-0 right-4">
        <Button 
          variant="destructive" 
          onClick={handleLogout}
          className="flex items-center gap-2 font-bold shadow-lg shadow-red-500/20"
        >
          <LogOut className="w-4 h-4 " />
          Logout System
        </Button>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-zinc-400">Welcome back, Admin. Select a module to manage your system.</p>
        </div>

        {/* 5 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item, index) => (
            <Card
              key={index}
              onClick={() => {
                console.log(`Navigating to ${item.path}`);
                navigate(item.path);
              }}
              className={`p-6 bg-zinc-950 border-2 border-zinc-800 transition-all duration-300 cursor-pointer group ${item.border}`}
            >
              <div className={`w-14 h-14 rounded-xl ${item.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <item.icon className={`w-7 h-7 ${item.color}`} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-zinc-200 transition-colors">
                {item.title}
              </h3>
              <p className="text-zinc-400 text-sm">
                Click to view, add, edit, or delete records.
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};