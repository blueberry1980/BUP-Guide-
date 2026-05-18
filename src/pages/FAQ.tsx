import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';

export default function FAQPage() {
  const faqs = [
    {
      q: "Where is the Computer Department Dean's office located?",
      a: "The Dean's office is located on the second floor of the main CS building, Room 201."
    },
    {
      q: "How do I reset my BU Portal password?",
      a: "You can request a password reset through the IT Helpdesk situated at the ground floor library, or email bu-it-support@bicol-u.edu.ph using your official student email."
    },
    {
      q: "What are the operating hours of the Computer Labs?",
      a: "Labs are open from 8:00 AM to 7:00 PM, Monday to Friday. Saturdays require a special permit."
    },
    {
      q: "How can I request my Transcript of Records (TOR)?",
      a: "Proceed to the University Registrar's Office with your clearance and school ID. Processing usually takes 7-10 working days."
    }
  ];

  const links = [
    { title: "Bicol University Student Portal", url: "https://bicol-u.edu.ph" },
    { title: "Library E-Resources", url: "#" },
    { title: "Academic Calendar", url: "#" },
    { title: "Student Handbook", url: "#" },
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto h-full flex flex-col">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-[#002d54] inline-block">Frequently Asked Questions</h1>
        <div className="w-16 h-1 bg-[#e1ae05] mt-2 mb-2"></div>
        <p className="text-slate-500 mt-2">Find quick answers to common queries about campus services.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-6 flex-1">
        <div className="md:col-span-2 space-y-4">
          {faqs.map((faq, idx) => (
            <Card key={idx} className="shadow-sm border border-slate-200">
              <CardHeader className="pb-3 border-b border-slate-100 bg-[#f8fafc]">
                <CardTitle className="text-lg text-[#002d54] leading-snug break-words whitespace-normal font-bold flex items-start gap-2">
                   <div className="bg-[#002d54] text-white px-2 py-0.5 rounded text-xs mt-1 shrink-0">Q</div>
                   {faq.q}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 flex items-start gap-4">
                <div className="bg-[#e1ae05] text-[#002d54] px-2 py-0.5 rounded text-xs mt-0.5 font-bold shrink-0">A</div>
                <p className="text-slate-700 text-sm">{faq.a}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div>
          <Card className="shadow-sm sticky top-6 border border-slate-200">
            <CardHeader className="bg-[#002d54] text-white pb-4 rounded-t-xl">
              <CardTitle className="text-white text-base flex items-center gap-2">
                 <span className="bg-[#e1ae05] w-2 h-4 rounded-sm"></span>
                 Important Links
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2 p-0 bg-white rounded-b-xl">
              <ul className="flex flex-col">
                {links.map((link, idx) => (
                  <li key={idx} className="border-b last:border-0 border-slate-100">
                    <a 
                      href={link.url}
                      className="flex items-center justify-between p-4 hover:bg-slate-50 text-[#002d54] font-medium transition-colors text-sm"
                      target="_blank" rel="noreferrer"
                    >
                      {link.title}
                      <ExternalLink size={16} className="text-slate-400" />
                    </a>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
