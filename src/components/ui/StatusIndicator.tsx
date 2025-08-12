interface StatusIndicatorProps {
    label: string;
    status: string;
    icon: React.ReactNode;
  }
  
  export default function StatusIndicator({ label, status, icon }: StatusIndicatorProps) {
    const getStatusColor = (status: string) => {
      switch (status) {
        case 'OPERATIONAL':
        case 'ACTIVE':
        case 'MAXIMUM':
          return 'text-terminal-green';
        case 'WARNING':
          return 'text-yellow-500';
        case 'ERROR':
          return 'text-red-500';
        default:
          return 'text-terminal-gray';
      }
    };
  
    return (
      <div className="flex items-center justify-between bg-terminal-dark/50 border border-terminal-green/20 rounded px-3 py-2">
        <div className="flex items-center space-x-2">
          {icon}
          <span className="text-sm text-terminal-white">{label}</span>
        </div>
        <div className={`text-xs font-mono ${getStatusColor(status)} flex items-center`}>
          <div className={`w-2 h-2 rounded-full mr-2 ${
            status === 'OPERATIONAL' || status === 'ACTIVE' || status === 'MAXIMUM' 
              ? 'bg-terminal-green animate-pulse' 
              : 'bg-gray-500'
          }`}></div>
          {status}
        </div>
      </div>
    );
  }