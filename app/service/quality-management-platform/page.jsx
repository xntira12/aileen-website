import Navbar from "@/components/Navbar";
import QmsHeroSection from "@/components/QmsHeroSection";
import QmsFeaturesAccordion from "@/components/QmsFeaturesAccordion";
import QmsModulesSection from "@/components/QmsModulesSection";
import SectionContactFooter from "@/components/SectionContactFooter";

const benefits = [
  { eyebrow: "Accuracy", title: "ลดความผิดพลาดจากการทำงานที่ไม่เป็นมาตรฐาน" },
  { eyebrow: "Compliance", title: "รองรับ Audit and Compliance ได้ง่ายขึ้นและมีความโปร่งใสอย่างแท้จริง" },
  { eyebrow: "Efficiency", title: "ลดเวลาการเตรียมเอกสารสำหรับการ Audit ในแต่ละรอบ" },
  { eyebrow: "Control", title: "ควบคุมเอกสารและขั้นตอนคุณภาพจากแพลตฟอร์มเดียว" },
  { eyebrow: "Transparency", title: "เพิ่มความโปร่งใสในการทำงานทั้งองค์กร" },
  { eyebrow: "Risk", title: "ลดความเสี่ยงของการละเมิดกฎหมายโดยมิทราบ" },
];

const features = [
  {
    eyebrow: "Version Control",
    title: "Version Control & History Tracking",
    body: "ระบบจัดการเวอร์ชันเอกสารให้อัตโนมัติ และเก็บประวัติว่าใครแก้ไข แก้เมื่อไร เพื่อลดความสับสนจากการใช้เอกสารผิดเวอร์ชัน",
  },
  {
    eyebrow: "Audit Trail",
    title: "Audit Trail Visibility",
    body: "ตรวจสอบได้ว่าเอกสารหรือข้อมูลต่าง ๆ ใครเป็นผู้แก้ไข และแก้ไขเมื่อใด ทำให้สามารถติดตามความถูกต้องของข้อมูลได้ตลอดเวลา",
  },
  {
    eyebrow: "Analytics",
    title: "Executive Dashboard & Analytics",
    body: "หน้าจอสรุปผลแบบกราฟิกเรียลไทม์ เพื่อให้ผู้บริหารเห็นภาพรวมของการดำเนินงานได้ทันที โดยไม่ต้องรอรายงานสรุปแบบเดิม",
  },
  {
    eyebrow: "Notifications",
    title: "Email & In-App Notifications",
    body: "ระบบแจ้งเตือนที่รวดเร็ว ช่วยลดปัญหาคอขวดในการรออนุมัติหรือดำเนินงาน ทำให้กระบวนการไม่สะดุด",
  },
  {
    eyebrow: "Security",
    title: "Enterprise Security & SSO",
    body: "รองรับการล็อกอินด้วยบัญชีเดิมของบริษัท เช่น Microsoft 365 หรือ Active Directory พร้อมการกำหนดสิทธิ์แบบ Role-Based Access Control",
  },
];

export const metadata = {
  title: "Quality Management Platform | Aileen Solutions",
  description:
    "Quality Management Platform by Aileen Solutions for compliance, document control, and quality operations.",
};

export default function QualityManagementPlatformPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />

      <main className="overflow-hidden">
        <QmsHeroSection />
        <QmsModulesSection />

        <section id="benefits" className="bg-[#f4f8fc] px-6 py-24 md:px-10">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <span className="lv8-pill">
                <span className="lv8-hdot" />
                Key Benefits
              </span>
              <h2 className="mt-5 text-3xl font-extrabold leading-[1.05] tracking-tight text-slate-900 md:text-5xl">
                ยกระดับคุณภาพ
                <span className="mt-1 block bg-[linear-gradient(90deg,#0b639b,#62e5da)] bg-clip-text text-transparent">
                  ด้วยแพลตฟอร์มเดียว
                </span>
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-500">
                ออกแบบเพื่อให้ทีมทำงานบนมาตรฐานเดียวกัน ลดความเสี่ยงด้านเอกสาร
                ข้อกำหนด และการกำกับดูแล
              </p>
            </div>

            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="group flex gap-4 rounded-2xl border border-slate-200/70 bg-white p-5 shadow-[0_4px_12px_rgba(15,23,42,0.02)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(15,23,42,0.035)]"
                >
                  <div className="mt-0.5 shrink-0">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[linear-gradient(135deg,#0b639b,#62e5da)]">
                      <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
                        <path d="M4.5 10.5L7.8 13.8L15.5 6.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-cyan-600">
                      {benefit.eyebrow}
                    </p>
                    <h3 className="mt-1.5 text-sm font-medium leading-6 text-slate-900">
                      {benefit.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <QmsFeaturesAccordion features={features} />
      </main>

      <SectionContactFooter />
    </div>
  );
}
