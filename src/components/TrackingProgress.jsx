import { Check } from "lucide-react";

const STAGES = [
  { name: "Processed", status: "Processed" },
  { name: "Shipped", status: "Shipped" },
  { name: "En Route", status: "En Route" },
  { name: "Arrived", status: "Arrived" },
];

export default function TrackingProgress({ currentStatus }) {
  const currentStageIndex = STAGES.findIndex(
    (stage) => stage.status === currentStatus
  );

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute top-4 left-0 w-full h-[2px] bg-gray-200">
          <div
            className="h-full bg-green-500 transition-all duration-500"
            style={{
              width: `${(currentStageIndex * 100) / (STAGES.length - 1)}%`,
            }}
          />
        </div>

        {/* Stages */}
        <div className="relative flex justify-between">
          {STAGES.map((stage, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors duration-300 ${
                  index <= currentStageIndex
                    ? "bg-green-500 border-green-500"
                    : "bg-white border-gray-200"
                }`}
              >
                {index <= currentStageIndex ? (
                  <Check className="w-4 h-4 text-white" />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-gray-200" />
                )}
              </div>
              <span className="mt-2 text-xs font-medium text-gray-600">
                {stage.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
