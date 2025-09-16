interface CarbonFootprintMeterProps {
  currentFootprint: number;
  maxFootprint?: number;
  showTips?: boolean;
}

const CarbonFootprintMeter = ({ 
  currentFootprint, 
  maxFootprint = 1000, 
  showTips = true 
}: CarbonFootprintMeterProps) => {
  const percentage = Math.max(0, Math.min(100, (currentFootprint / maxFootprint) * 100));
  
  const getCarbonStatus = () => {
    if (percentage <= 25) return { class: "carbon-excellent", label: "EXCELLENT!", color: "text-pixel-success" };
    if (percentage <= 50) return { class: "carbon-good", label: "GOOD", color: "text-pixel-success" };
    if (percentage <= 75) return { class: "carbon-warning", label: "WARNING", color: "text-pixel-warning" };
    return { class: "carbon-danger", label: "DANGER!", color: "text-pixel-danger" };
  };

  const status = getCarbonStatus();

  const getTip = () => {
    if (percentage <= 25) return "🌟 Amazing! You're a true eco-warrior!";
    if (percentage <= 50) return "🌿 Great job! Keep up the good work!";
    if (percentage <= 75) return "⚠️ Answer quiz questions correctly to reduce your footprint!";
    return "🚨 Critical! Focus on environmental learning to save the planet!";
  };

  return (
    <div className="card-pixel">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-pixel text-sm text-foreground">CARBON METER</h3>
        <span className={`font-pixel text-xs ${status.color}`}>
          {status.label}
        </span>
      </div>
      
      <div className="progress-pixel mb-4">
        <div 
          className={`progress-pixel-fill ${status.class}`}
          style={{ width: `${percentage}%` }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-digital text-xs font-bold text-background mix-blend-difference">
            {currentFootprint}/{maxFootprint}
          </span>
        </div>
      </div>

      {showTips && (
        <div className="bg-muted p-3 border border-border">
          <p className="font-pixel text-[10px] text-muted-foreground leading-relaxed">
            {getTip()}
          </p>
        </div>
      )}
    </div>
  );
};

export default CarbonFootprintMeter;