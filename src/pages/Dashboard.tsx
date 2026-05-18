import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { BookOpen, Calendar, MapPin, Phone, Bot, X, Mail, Facebook, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

export default function DashboardPage() {
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isGradesOpen, setIsGradesOpen] = useState(false);
  const [isDirectoryOpen, setIsDirectoryOpen] = useState(false);

  const scheduleData = [
    {
      course: "CS 119 — Networks and Communication",
      section: "BSCS-P-3A",
      professor: "Arnold Platon",
      classes: [
        { day: "Thu", time: "08:00 AM - 10:00 AM", room: "ECB 203" },
        { day: "Wed", time: "01:00 PM - 04:00 PM", room: "CL 6" }
      ]
    },
    {
      course: "CS 118 — Software Engineering 2",
      section: "BSCS-P-3A",
      professor: "Jerry B. Agsunod",
      classes: [
        { day: "Fri", time: "09:00 AM - 12:00 PM", room: "CL 6" },
        { day: "Thu", time: "03:00 PM - 05:00 PM", room: "CL 5" }
      ]
    },
    {
      course: "GEC 17 — Science, Technology, and Society",
      section: "BSCS-P-3A",
      professor: "Agnes P. Rabelas",
      classes: [
        { day: "Sat", time: "09:00 AM - 12:00 PM", room: "CSD 22" }
      ]
    },
    {
      course: "CS 121 — Information Assurance and Security",
      section: "BSCS-P-3A",
      professor: "Guillermo Jr. V. Red",
      classes: [
        { day: "Tue", time: "04:00 PM - 06:00 PM", room: "CL 3" }
      ]
    },
    {
      course: "CS Elec 2 — CS Elec 2",
      section: "BSCS-P-3A",
      professor: "Jaypee Divinaflor",
      classes: [
        { day: "Wed", time: "05:30 PM - 07:30 PM", room: "CL 1" },
        { day: "Sat", time: "01:00 PM - 04:00 PM", room: "CL 5" }
      ]
    },
    {
      course: "CS 120 — Human Computer Interaction",
      section: "BSCS-P-3A",
      professor: "Blessica B. Dorosan",
      classes: [
        { day: "Thu", time: "01:00 PM - 02:00 PM", room: "ECB 204" }
      ]
    },
    {
      course: "GEC 18 — Ethics",
      section: "BSCS-P-3A",
      professor: "Mary Antoniette S. Ariño",
      classes: [
        { day: "Fri", time: "01:00 PM - 04:00 PM", room: "ECB 204" }
      ]
    }
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto flex flex-col gap-6 h-full relative">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
          <p className="text-xs uppercase text-slate-400 font-bold mb-1">Next Class</p>
          <p className="text-lg font-bold text-blue-900">CS Elect 2</p>
          <p className="text-xs text-slate-500">1:00 PM - Lab 5</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
          <p className="text-xs uppercase text-slate-400 font-bold mb-1">Account Status</p>
          <p className="text-lg font-bold text-green-600">Online</p>
          <p className="text-xs text-slate-500">S.Y. 2025-2026</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard 
          icon={<Calendar className="text-[#002d54]" size={20} />}
          title="Schedules"
          description="View timetable"
          onClick={() => setIsScheduleOpen(true)}
        />
        <DashboardCard 
          icon={<BookOpen className="text-[#e1ae05]" size={20} />}
          title="Grades"
          description="Student Portal"
          onClick={() => setIsGradesOpen(true)}
        />
        <DashboardCard 
          icon={<MapPin className="text-[#002d54]" size={20} />}
          title="Map"
          description="Find classrooms"
          onClick={() => setIsMapOpen(true)}
        />
        <DashboardCard 
          icon={<Phone className="text-[#e1ae05]" size={20} />}
          title="Directory"
          description="Important contacts"
          onClick={() => setIsDirectoryOpen(true)}
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1">
        <div className="flex-1 bg-[#002d54] text-white p-5 rounded-xl shadow-lg flex flex-col">
          <h3 className="text-sm font-bold text-[#e1ae05] mb-4 flex items-center gap-2">
            <Bot size={16} />
            NLP Integration Notes
          </h3>
          <ul className="space-y-4 flex-1">
            <li className="border-l-2 border-[#1a4b77] pl-3">
              <p className="text-xs font-bold">1. Intent Recognition via LLM</p>
              <p className="text-[10px] text-blue-200 mt-1">Processes user queries (using Gemini AI) for accurate responses.</p>
            </li>
            <li className="border-l-2 border-[#1a4b77] pl-3">
              <p className="text-xs font-bold">2. Speech Processing</p>
              <p className="text-[10px] text-blue-200 mt-1">Uses Web Speech API for voice-to-text input and text-to-speech output.</p>
            </li>
            <li className="border-l-2 border-[#1a4b77] pl-3">
              <p className="text-xs font-bold">3. Sentiment Analysis</p>
              <p className="text-[10px] text-blue-200 mt-1">Classifies user input as positive, negative, or neutral.</p>
            </li>
          </ul>
          <div className="mt-6 pt-4 border-t border-[#1a4b77]">
             <Link to="/chat" className="inline-block text-[10px] bg-[#e1ae05] text-[#002d54] px-3 py-1.5 rounded font-bold hover:bg-[#c99b04]">
               TRY VIRTUAL ASSISTANT
             </Link>
          </div>
        </div>

        <div className="flex-1 bg-white rounded-xl p-5 shadow-sm border border-slate-100 flex flex-col">
          <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
             Recent Announcements
          </h3>
          <ul className="space-y-4">
            <li className="border-b border-slate-100 pb-3">
              <span className="text-[10px] font-bold text-[#e1ae05] bg-yellow-50 px-2 py-0.5 rounded mb-1 inline-block border border-yellow-200">Enrollment</span>
              <p className="font-bold text-sm text-slate-800">Registration for Next Semester</p>
              <p className="text-xs text-slate-500 mt-1">Advising starts next week. Please clear your deficiencies.</p>
            </li>
            <li className="border-b border-slate-100 pb-3">
              <span className="text-[10px] font-bold text-[#002d54] bg-blue-50 px-2 py-0.5 rounded mb-1 inline-block border border-blue-100">Event</span>
              <p className="font-bold text-sm text-slate-800">IT Week Celebration 2026</p>
              <p className="text-xs text-slate-500 mt-1">Join the coding competitions and tech talks coming this Friday.</p>
            </li>
          </ul>
        </div>
      </div>

      <AnimatePresence>
        {isScheduleOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setIsScheduleOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-4xl overflow-hidden relative flex flex-col max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
                <h2 className="font-bold text-slate-800 flex items-center gap-2">
                  <Calendar size={18} className="text-[#002d54]" />
                  Schedule Overview
                </h2>
                <button 
                  onClick={() => setIsScheduleOpen(false)}
                  className="p-1 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  <X size={20} className="text-slate-500" />
                </button>
              </div>
              
              <div className="p-4 lg:p-6 bg-slate-50 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {scheduleData.map((item, idx) => (
                    <div 
                      key={idx} 
                      className="group bg-white border-2 border-slate-200 rounded-xl p-5 transition-all hover:-translate-y-1 hover:border-[#86efac] hover:bg-[#f0fdf4] hover:shadow-[0_4px_20px_rgba(134,239,172,0.4)] cursor-pointer"
                    >
                      <h3 className="font-bold text-[#002d54] text-lg mb-2 group-hover:text-[#16a34a] transition-colors">{item.course}</h3>
                      <div className="flex gap-4 text-[10px] font-bold text-slate-500 mb-4 uppercase tracking-widest">
                        <span className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 bg-[#e1ae05] rounded-full"></span> 
                          {item.section}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 bg-[#002d54] group-hover:bg-[#16a34a] transition-colors rounded-full"></span> 
                          Prof: {item.professor}
                        </span>
                      </div>
                      
                      <div className="space-y-2 flex-1 flex flex-col justify-end mt-4">
                        {item.classes.map((cls, cId) => (
                          <div key={cId} className="flex items-center gap-3 bg-slate-50 group-hover:bg-[#dcfce7] p-2.5 rounded-lg border border-slate-100 group-hover:border-[#bbf7d0] transition-colors">
                            <span className="bg-[#002d54] group-hover:bg-[#16a34a] text-white text-[10px] uppercase font-bold px-2 py-1 rounded transition-colors shrink-0">
                              {cls.day}
                            </span>
                            <span className="text-xs font-semibold text-slate-700 group-hover:text-[#15803d] transition-colors">
                              {cls.time}
                            </span>
                            <span className="ml-auto text-[10px] font-bold bg-[#e1ae05] group-hover:bg-[#86efac] group-hover:text-[#14532d] text-[#002d54] px-2 py-1 rounded-full transition-colors flex items-center gap-1">
                              <MapPin size={10} />
                              {cls.room}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {isMapOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setIsMapOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-3xl overflow-hidden relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h2 className="font-bold text-slate-800 flex items-center gap-2">
                  <MapPin size={18} className="text-[#002d54]" />
                  2nd Floor Plan - Computer Department
                </h2>
                <button 
                  onClick={() => setIsMapOpen(false)}
                  className="p-1 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  <X size={20} className="text-slate-500" />
                </button>
              </div>
              <div className="p-4 lg:p-6 bg-slate-50">
                {/* Interactive Map Recreated from Image */}
                <div className="bg-white border-2 border-blue-50 rounded-[2rem] p-4 lg:p-6 relative max-w-xl mx-auto shadow-sm flex flex-col gap-4 lg:gap-5">
                  
                  {/* Top center pill */}
                  <div className="absolute -top-4 w-full flex justify-center left-0">
                    <div className="bg-[#1ea1d9] text-white flex px-6 py-1.5 rounded-full text-[10px] sm:text-xs font-bold shadow-sm">
                      MAIN ENTRANCE
                    </div>
                  </div>

                  <h3 className="text-center text-slate-400 font-medium text-lg lg:text-xl tracking-widest mt-2">2ND FLOOR PLAN</h3>

                  {/* Top row */}
                  <div className="flex justify-between items-center gap-2">
                    <MapRoom name="ELECTRICAL" sub="RESTRICTED" />
                    <MapRoom name="LAB 4" sub="RESTRICTED" />
                    <MapRoom name="CS DEPT" sub="RESTRICTED" />
                    <MapRoom name="LAB 1" sub="RESTRICTED" />
                    <MapRoom name="CR" sub="RESTRICTED" />
                  </div>

                  {/* Middle Section */}
                  <div className="flex justify-between items-stretch gap-4 h-36 lg:h-44">
                    {/* Left Column */}
                    <div className="flex flex-col justify-between w-[28%] gap-3">
                      <MapRoom name="LAB 5" flex={1} />
                      <MapRoom name="LAB 6" flex={1} />
                    </div>

                    {/* Hallway */}
                    <div className="flex-1 border border-dashed border-slate-300 rounded-xl flex items-center justify-center bg-transparent">
                      <p className="text-slate-500 font-medium tracking-[0.2em] text-sm lg:text-base">HALLWAY</p>
                    </div>

                    {/* Right Column */}
                    <div className="flex flex-col justify-between w-[28%] gap-3">
                      <MapRoom name="ECB 203" flex={1} />
                      <MapRoom name="ECB 202" flex={1} />
                    </div>
                  </div>

                  {/* Bottom Row */}
                  <div className="flex justify-between items-stretch gap-2 h-24 lg:h-28">
                    <div className="w-[28%] flex">
                      <MapRoom name="ECB 204" />
                    </div>
                    <div className="flex-1 flex justify-center gap-3">
                       <MapRoom name="LAB 3" width="w-20 lg:w-24 px-1" />
                       <MapRoom name="LAB 2" width="w-20 lg:w-24 px-1" />
                    </div>
                    <div className="w-[28%] flex">
                      <MapRoom name="ECB 201" />
                    </div>
                  </div>
                  
                  <div className="text-center text-slate-400 font-medium text-lg lg:text-2xl tracking-[0.2em] mt-2 mb-2 lg:mb-4">
                    2ND FLOOR
                  </div>

                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
        {isGradesOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsGradesOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.5, opacity: 0, rotate: -5 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotate: 5 }}
              transition={{ type: "spring", damping: 15, stiffness: 200 }}
              className="bg-black rounded-lg shadow-2xl overflow-hidden relative w-full border-4 border-zinc-900 flex flex-col"
              style={{ maxWidth: '400px', height: '400px' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-black text-white text-center py-4 px-2 font-serif text-[1.3rem] leading-tight tracking-wide shrink-0 border-b border-zinc-800">
                Grades are going down<br/>but weights up
              </div>
              <div className="flex-1 relative w-full h-full bg-zinc-900 border-t border-white overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1000&auto=format&fit=crop" 
                  alt="Gym Meme" 
                  className="absolute inset-0 w-full h-full object-cover object-[center_30%] opacity-90 grayscale-[20%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 right-3 text-white/70 font-bold text-2xl tracking-tighter drop-shadow-md">
                   gymzar
                </div>
              </div>
              <button 
                onClick={() => setIsGradesOpen(false)}
                className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-black text-white rounded-full transition-colors backdrop-blur-sm shadow-md"
              >
                <X size={16} />
              </button>
            </motion.div>
          </motion.div>
        )}
        {isDirectoryOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setIsDirectoryOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden relative flex flex-col max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
                <h2 className="font-bold text-slate-800 flex items-center gap-2">
                  <Phone size={18} className="text-[#002d54]" />
                  Directory & Contacts
                </h2>
                <button 
                  onClick={() => setIsDirectoryOpen(false)}
                  className="p-1 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  <X size={20} className="text-slate-500" />
                </button>
              </div>
              
              <div className="p-4 lg:p-6 bg-slate-50 overflow-y-auto space-y-4">
                
                {/* Email Contacts */}
                <div className="group bg-white border-2 border-slate-200 rounded-xl p-4 lg:p-5 transition-all hover:-translate-y-1 hover:border-[#86efac] hover:bg-[#f0fdf4] hover:shadow-[0_4px_20px_rgba(134,239,172,0.4)] cursor-pointer">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-green-100 group-hover:text-green-600 transition-colors">
                      <Mail size={20} />
                    </div>
                    <h3 className="font-bold text-slate-800 text-lg group-hover:text-[#16a34a] transition-colors">Email</h3>
                  </div>
                  <div className="space-y-2 pl-12 text-sm text-slate-600 font-medium">
                    <a href="mailto:op@bicol-u.edu.ph" className="block hover:text-[#16a34a] transition-colors">op@bicol-u.edu.ph</a>
                    <a href="mailto:bu-cpro@bicol-u.edu.ph" className="block hover:text-[#16a34a] transition-colors">bu-cpro@bicol-u.edu.ph</a>
                  </div>
                </div>

                {/* Facebook Contact */}
                <a href="https://www.facebook.com/BicolUniversity" target="_blank" rel="noopener noreferrer" className="block">
                  <div className="group bg-white border-2 border-slate-200 rounded-xl p-4 lg:p-5 transition-all hover:-translate-y-1 hover:border-[#86efac] hover:bg-[#f0fdf4] hover:shadow-[0_4px_20px_rgba(134,239,172,0.4)] cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-green-100 group-hover:text-green-600 transition-colors">
                        <Facebook size={20} />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800 text-lg group-hover:text-[#16a34a] transition-colors mb-1">Facebook</h3>
                        <span className="text-sm text-slate-500 font-medium group-hover:text-[#15803d] transition-colors">facebook.com/BicolUniversity</span>
                      </div>
                    </div>
                  </div>
                </a>

                {/* Website Contact */}
                <a href="https://bicol-u.edu.ph/" target="_blank" rel="noopener noreferrer" className="block">
                   <div className="group bg-white border-2 border-slate-200 rounded-xl p-4 lg:p-5 transition-all hover:-translate-y-1 hover:border-[#86efac] hover:bg-[#f0fdf4] hover:shadow-[0_4px_20px_rgba(134,239,172,0.4)] cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-green-100 group-hover:text-green-600 transition-colors">
                        <Globe size={20} />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800 text-lg group-hover:text-[#16a34a] transition-colors mb-1">Website</h3>
                        <span className="text-sm text-slate-500 font-medium group-hover:text-[#15803d] transition-colors">bicol-u.edu.ph</span>
                      </div>
                    </div>
                  </div>
                </a>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MapRoom({ name, sub, flex, width }: { name: string, sub?: string, flex?: number, width?: string }) {
  return (
    <div className={`group border-2 border-slate-200 bg-white rounded-xl flex flex-col items-center justify-center p-2 lg:p-3 text-center transition-all hover:-translate-y-1 cursor-pointer 
      hover:border-[#86efac] hover:bg-[#f0fdf4] hover:shadow-[0_4px_20px_rgba(134,239,172,0.4)]
      ${flex ? 'flex-1' : ''} ${width ? width : 'w-full'}`}>
      <span className={`font-medium text-xs lg:text-[13px] text-slate-700 group-hover:text-[#16a34a] transition-colors leading-tight`}>{name}</span>
      {sub && <span className={`text-[7px] lg:text-[9px] font-bold mt-1 text-slate-300 group-hover:text-[#22c55e] transition-colors uppercase`}>{sub}</span>}
    </div>
  );
}

function DashboardCard({ icon, title, description, onClick }: { icon: React.ReactNode, title: string, description: string, onClick?: () => void }) {
  return (
    <div 
      onClick={onClick}
      className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:shadow-md hover:border-blue-200 transition-all cursor-pointer flex items-center gap-3"
    >
      <div className="p-2 bg-slate-50 rounded-lg border border-slate-100 shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-sm font-bold text-slate-800">{title}</p>
        <p className="text-[10px] text-slate-500 uppercase tracking-wide">{description}</p>
      </div>
    </div>
  );
}

