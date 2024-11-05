interface CircleProgressProps {
    size?: number;
    textColor? : string;
    color: string;
    percentage?: number;
}

const cleanPercentage = (percentage: CircleProgressProps['percentage'] = 0) => {
    const tooLow = !Number.isFinite(+percentage) || percentage < 0;
    const tooHigh = percentage > 100;

    return tooLow ? 0 : tooHigh ? 100 : +percentage;
};
  
const Circle = ({ size = 70, color, percentage = 0 }: CircleProgressProps) => {
    const r = size;
    const circ = 2 * Math.PI * r;
    const strokePct = ((100 - percentage) * circ) / 100;

    return (
        <circle
            r={r}
            cx={100}
            cy={100}
            fill="transparent"
            stroke={strokePct !== circ ? color : ""}
            strokeWidth={"2rem"}
            strokeDasharray={circ}
            strokeDashoffset={percentage ? strokePct : 0}
            strokeLinecap="round"
        ></circle>
    );
};
  
const Text = ({
    percentage = 0,
    color,
}: CircleProgressProps) => {
    return (
        <text
            x="50%"
            y="50%"
            dominantBaseline="central"
            textAnchor="middle"
            fontSize={"1.5em"}
            fill={color}
            className='font-fira'
        >
            {percentage.toFixed(0)}%
        </text>
    );
};
  
export const CircleProgress = ({
    size,
    textColor,
    percentage,
    color,
}: CircleProgressProps) => {
    const formattedPercentage = cleanPercentage(percentage);
    
    return (
        <svg width={200} height={200}>
            <g transform={`rotate(-90 ${"100 100"})`}>
                <Circle size={size} color={'#25163C'} percentage={100} />
                <Circle size={size} color={color} percentage={formattedPercentage} />
            </g>
            <Text
                color={textColor || '#FAF5FF'}
                percentage={formattedPercentage}
            />
        </svg>
    );
};
  