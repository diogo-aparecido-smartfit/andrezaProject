interface SectionProps {
  section: string;
  children: React.ReactNode;
}

export default function Section({ children, section }: SectionProps) {
  return (
    <section id={section} className="w-full mt-9 md:mt-12">
      {children}
    </section>
  );
}
