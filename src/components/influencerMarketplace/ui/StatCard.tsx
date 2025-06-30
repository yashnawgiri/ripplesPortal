interface StatCardProps {
  number: string;
  label: string;
  description: string;
}

export default function StatCard({
  number,
  label,
  description,
}: StatCardProps) {
  return (
    <div className="bg-[#18082A] rounded-2xl p-8 border border-[#2E1A47] hover:border-secondary hover:glow-secondary transition-all duration-300 hover:-translate-y-1 group shadow-3xl">
      <div className="text-center">
        <div className="text-4xl lg:text-5xl font-bold text-custom-gradient mb-2 font-poppins">
          {number}
        </div>
        <div className="text-xl font-semibold text-white mb-2 font-poppins">
          {label}
        </div>
        <div className="text-sm text-[#CFCFCF]">{description}</div>
      </div>
    </div>
  );
}
