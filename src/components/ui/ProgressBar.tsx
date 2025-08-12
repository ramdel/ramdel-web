interface ProgressBarProps {
    label: string;
    percentage: number;
    color?: string;
  }
  
  export default function ProgressBar({ label, percentage, color = 'terminal-green' }: ProgressBarProps) {
    return (
      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          <span className="text-terminal-gray">{label}</span>
          <span className="text-terminal-white">{percentage}%</span>
        </div>
        <div className="w-full bg-terminal-black rounded-full h-2 border border-terminal-green/30">
          <div 
            className={`bg-${color} h-2 rounded-full transition-all duration-1000 ease-out`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    );
  }