import Navbar from "@/components/Navbar";
import GavalonHeroSection from "@/components/GavalonHeroSection";
import RpaBenefitsCards from "@/components/RpaBenefitsCards";
import SectionContactFooter from "@/components/SectionContactFooter";

const benefits = [
  {
    eyebrow: "Centralized Legal Information",
    title: "รวบรวมกฎหมาย ข้อกำหนด และเอกสารที่เกี่ยวข้องไว้ในพื้นที่ส่วนกลาง ลดปัญหาข้อมูลกระจัดกระจายและการใช้งานเอกสารที่ไม่เป็นปัจจุบัน",
  },
  {
    eyebrow: "Faster Access to Relevant Requirements",
    title: "ช่วยให้ผู้ใช้งานค้นหาและเข้าถึงข้อกำหนดที่เกี่ยวข้องกับงานได้รวดเร็วขึ้น ลดเวลาในการค้นหาและตีความข้อมูลจากเอกสารจำนวนมาก",
  },
  {
    eyebrow: "Improve Compliance Visibility",
    title: "มองเห็นภาพรวมของข้อกำหนด หน่วยงานที่รับผิดชอบ และสถานะการดำเนินงาน ช่วยให้ผู้บริหารและทีมงานติดตามประเด็นที่ต้องดำเนินการได้ชัดเจน",
  },
  {
    eyebrow: "Reduce Compliance Risk",
    title: "ลดโอกาสพลาดข้อกำหนดสำคัญ สร้างความพร้อมสำหรับการตรวจประเมิน และช่วยให้องค์กรดำเนินงานตามกฎหมายอย่างสม่ำเสมอ",
  },
  {
    eyebrow: "Strengthen Enterprise Governance",
    title: "เพิ่มความโปร่งใสและความสามารถในการตรวจสอบย้อนหลัง สนับสนุนการกำกับดูแลกิจการ การบริหารความเสี่ยง และการควบคุมภายในขององค์กร",
  },
];

const capabilities = [
  "ศูนย์กลางข้อมูลกฎหมายและข้อกำหนดขององค์กร",
  "การค้นหาและจัดหมวดหมู่ข้อมูลกฎหมาย",
  "การประเมินความเกี่ยวข้องของกฎหมายต่อองค์กร",
  "การกำหนดหน่วยงานและผู้รับผิดชอบ",
  "การติดตามสถานะการปฏิบัติตามข้อกำหนด",
  "การแจ้งเตือนข้อมูลหรือรายการที่ต้องดำเนินการ",
  "การจัดเก็บหลักฐานและเอกสารประกอบ",
  "Dashboard และรายงานภาพรวม",
  "การกำหนดสิทธิ์การเข้าถึงตามบทบาท",
  "ประวัติการดำเนินงานที่สามารถตรวจสอบย้อนหลังได้",
];

const industries = [
  "พลังงานและสาธารณูปโภค",
  "ปิโตรเคมีและเคมีภัณฑ์",
  "โรงงานและภาคการผลิต",
  "น้ำมันและก๊าซ",
  "อาหารและยา",
  "โลจิสติกส์และห่วงโซ่อุปทาน",
  "หน่วยงานภาครัฐและรัฐวิสาหกิจ",
  "องค์กรขนาดใหญ่ที่มีหลายหน่วยงานหรือหลายพื้นที่ปฏิบัติงาน",
];

export const metadata = {
  title: "GAVALON | Enterprise Legal & Regulatory Management Platform",
  description:
    "GAVALON by Aileen Solutions and NPC S&E — Enterprise platform for legal and regulatory compliance management across your organization.",
};

export default function GavalonPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />

      <main className="overflow-hidden">
        <GavalonHeroSection />

        <section className="bg-[#f4f8fc] px-6 py-24 md:px-10">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-3xl text-center">
              <span className="lv8-pill">
                <span className="lv8-hdot" />
                Overview
              </span>
              <h2 className="mt-5 text-3xl font-extrabold leading-[1.08] tracking-tight text-slate-900 md:text-5xl">
                Simplify Legal Compliance
                <span className="mt-1 block bg-[linear-gradient(90deg,#0b639b,#62e5da)] bg-clip-text text-transparent">
                  Across Your Organization
                </span>
              </h2>
            </div>
            <div className="mx-auto mt-8 max-w-4xl space-y-5 text-base leading-8 text-slate-600">
              <p>
                องค์กรต้องรับมือกับกฎหมาย ประกาศ กฎกระทรวง และข้อกำหนดจำนวนมาก ซึ่งมีการเปลี่ยนแปลงอยู่เสมอ
                การบริหารจัดการด้วยเอกสารหรือไฟล์ที่กระจัดกระจายอาจทำให้ติดตามข้อมูลได้ยาก เกิดความคลาดเคลื่อน
                และเพิ่มความเสี่ยงในการไม่ปฏิบัติตามข้อกำหนด
              </p>
              <p>
                GAVALON ช่วยเปลี่ยนข้อมูลกฎหมายให้เป็นองค์ความรู้ที่องค์กรสามารถค้นหา เชื่อมโยงกับหน่วยงาน
                และนำไปดำเนินการได้อย่างเป็นระบบ ตั้งแต่การรวบรวมกฎหมาย การพิจารณาความเกี่ยวข้อง
                ไปจนถึงการติดตามสถานะการปฏิบัติตามข้อกำหนด
              </p>
            </div>
          </div>
        </section>

        <RpaBenefitsCards
          benefits={benefits}
          eyebrow="Business Benefits"
          title="ประโยชน์ทางธุรกิจ"
          subtitle="จาก GAVALON"
          description="ยกระดับการบริหารกฎหมายและข้อกำหนดให้เป็นระบบ ลดความซ้ำซ้อน และเพิ่มความมั่นใจในการปฏิบัติตามกฎหมายทั่วทั้งองค์กร"
        />

        <section className="bg-white px-6 py-24 md:px-10">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <span className="lv8-pill">
                <span className="lv8-hdot" />
                Key Capabilities
              </span>
              <h2 className="mt-5 text-3xl font-extrabold leading-[1.05] tracking-tight text-slate-900 md:text-5xl">
                ความสามารถหลัก
                <span className="mt-1 block bg-[linear-gradient(90deg,#0b639b,#62e5da)] bg-clip-text text-transparent">
                  ของแพลตฟอร์ม
                </span>
              </h2>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {capabilities.map((item) => (
                <div
                  key={item}
                  className="flex gap-4 rounded-2xl border border-slate-200/70 bg-white p-5 shadow-[0_4px_12px_rgba(15,23,42,0.02)]"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#0b639b,#62e5da)]">
                    <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
                      <path d="M4.5 10.5L7.8 13.8L15.5 6.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <p className="text-sm font-medium leading-6 text-slate-800 md:text-[15px]">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f4f8fc] px-6 py-24 md:px-10">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <span className="lv8-pill">
                <span className="lv8-hdot" />
                Designed for Regulated Industries
              </span>
              <h2 className="mt-5 text-3xl font-extrabold leading-[1.05] tracking-tight text-slate-900 md:text-5xl">
                เหมาะสำหรับองค์กร
                <span className="mt-1 block bg-[linear-gradient(90deg,#0b639b,#62e5da)] bg-clip-text text-transparent">
                  ที่ต้องบริหารกฎหมายจำนวนมาก
                </span>
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-500">
                โดยเฉพาะกลุ่มธุรกิจที่ต้องรับมือกับข้อกำหนดที่ซับซ้อนและเปลี่ยนแปลงอยู่เสมอ
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {industries.map((industry) => (
                <div
                  key={industry}
                  className="rounded-2xl border border-slate-200/70 bg-white px-5 py-4 text-sm font-medium leading-6 text-slate-700"
                >
                  {industry}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-6 py-24 md:px-10">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <span className="lv8-pill">
                <span className="lv8-hdot" />
                Technology Meets Regulatory Expertise
              </span>
              <h2 className="mt-5 text-3xl font-extrabold leading-[1.05] tracking-tight text-slate-900 md:text-5xl">
                Aileen Solutions
                <span className="mt-1 block bg-[linear-gradient(90deg,#0b639b,#62e5da)] bg-clip-text text-transparent">
                  × NPC S&amp;E
                </span>
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-500">
                GAVALON เกิดจากการผสานความเชี่ยวชาญสองด้านเข้าด้วยกัน เพื่อเชื่อมโยงความรู้ด้านกฎหมายและข้อกำหนด
                เข้ากับเทคโนโลยีที่สามารถนำไปใช้งานจริงในระดับองค์กร
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="rounded-[24px] border border-cyan-100 bg-[linear-gradient(180deg,#f4fcff_0%,#ffffff_100%)] p-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-700">Aileen Solutions</p>
                <p className="mt-4 text-base leading-8 text-slate-600">
                  ความเชี่ยวชาญด้านการออกแบบและพัฒนา Enterprise Platform, Digital Process, Workflow,
                  System Integration และ AI
                </p>
              </div>
              <div className="rounded-[24px] border border-emerald-100 bg-[linear-gradient(180deg,#f7fffc_0%,#ffffff_100%)] p-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-700">NPC S&amp;E</p>
                <p className="mt-4 text-base leading-8 text-slate-600">
                  ประสบการณ์ด้านความปลอดภัย อาชีวอนามัย สิ่งแวดล้อม ระบบมาตรฐาน และการให้คำปรึกษาแก่ภาคอุตสาหกรรม
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#07131f] px-6 py-24 text-white md:px-10">
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-100">
              <span className="h-2 w-2 rounded-full bg-emerald-300" />
              Why GAVALON
            </span>
            <h2 className="mt-6 text-3xl font-extrabold leading-tight md:text-5xl">
              Turn Complex Regulations into Actionable Compliance
            </h2>
            <p className="mt-6 text-base leading-8 text-slate-300">
              GAVALON ไม่ได้เป็นเพียงพื้นที่จัดเก็บเอกสารกฎหมาย แต่เป็นแพลตฟอร์มที่ช่วยเปลี่ยนข้อมูลกฎหมายให้กลายเป็นกระบวนการทำงานที่ชัดเจน
              เชื่อมโยงผู้รับผิดชอบ ติดตามผลได้ และตรวจสอบย้อนหลังได้ เพื่อให้องค์กรบริหาร Compliance ได้อย่างมั่นใจและพร้อมรับการเปลี่ยนแปลง
            </p>
            <p className="mt-5 text-base leading-8 text-slate-400">
              ยกระดับการบริหารกฎหมายและข้อกำหนดขององค์กรให้เป็นระบบ เข้าถึงง่าย และติดตามได้ในแพลตฟอร์มเดียว
            </p>
            <a
              href="/contact"
              className="btn-fancy group relative mt-9 inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/5 px-7 py-3 text-sm font-semibold text-white backdrop-blur transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-500/15"
            >
              <span className="relative z-10">Contact Us</span>
              <svg className="w-3.5 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
              </svg>
            </a>
          </div>
        </section>
      </main>

      <SectionContactFooter />
    </div>
  );
}
