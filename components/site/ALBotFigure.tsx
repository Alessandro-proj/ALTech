export type ALBotMood =
  | "home"
  | "projects"
  | "contact"
  | "loading"
  | "notfound"
  | "developer"
  | "cloud";

type ALBotFigureProps = {
  mood?: ALBotMood;
  size?: "sm" | "md" | "lg";
  className?: string;
  label?: string;
};

export function ALBotFigure({
  mood = "home",
  size = "md",
  className = "",
  label = "ALBot, assistente virtual da AL Tech",
}: ALBotFigureProps) {
  return (
    <div
      className={`albot-figure albot-${size} albot-${mood} ${className}`}
      aria-label={label}
      role="img"
    >
      <div className="albot-halo" />
      <div className="albot-head">
        <div className="albot-logo-mark">AL</div>
        <div className="albot-ear albot-ear-left" />
        <div className="albot-ear albot-ear-right" />
        <div className="albot-face">
          <span className="albot-eye albot-eye-left" />
          <span className="albot-eye albot-eye-right" />
          <span className="albot-mouth" />
        </div>
      </div>
      <div className="albot-body">
        <div className="albot-chest">
          <span>AL</span>
        </div>
        <div className="albot-core-line albot-core-line-a" />
        <div className="albot-core-line albot-core-line-b" />
      </div>
      <div className="albot-arm albot-arm-left">
        <span />
      </div>
      <div className="albot-arm albot-arm-right">
        <span />
      </div>
      <div className="albot-leg albot-leg-left" />
      <div className="albot-leg albot-leg-right" />
    </div>
  );
}
