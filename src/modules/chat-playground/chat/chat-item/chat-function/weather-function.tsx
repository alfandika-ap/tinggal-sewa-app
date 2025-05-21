import type { ChatContent, ChatFunctionItem } from "@/types/chat";
import { Cloud, Sun, ThermometerSun } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function WeatherFunction({ chat }: { chat: ChatContent }) {
  const chatFunction = chat as ChatFunctionItem;
  const weatherText = chatFunction.data;
  
  // Extract location and temperature if available
  const locationMatch = weatherText.match(/di ([^s]+) sekarang/);
  const tempMatch = weatherText.match(/suhu (\d+)/);
  const conditionMatch = weatherText.match(/sekarang ([^d]+) dengan/);
  
  const location = locationMatch ? locationMatch[1] : null;
  const temperature = tempMatch ? tempMatch[1] : null;
  const condition = conditionMatch ? conditionMatch[1].trim() : null;

  return (
    <Card className="w-full overflow-hidden bg-gradient-to-br from-blue-50 to-sky-100 dark:from-slate-800 dark:to-slate-900 border-0 shadow-md">
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            {location && (
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                {location}
              </h3>
            )}
            
            <p className="text-slate-600 dark:text-slate-300 my-2 text-md">
              {weatherText}
            </p>
            
            <div className="flex gap-4 mt-4">
              {temperature && (
                <div className="flex items-center gap-1.5">
                  <ThermometerSun className="text-orange-500" size={18} />
                  <span className="text-slate-700 dark:text-slate-200 font-medium">{temperature}°C</span>
                </div>
              )}
              
              {condition && (
                <div className="flex items-center gap-1.5">
                  {condition.includes("cerah") ? (
                    <Sun className="text-yellow-500" size={10} />
                  ) : (
                    <Cloud className="text-blue-500" size={10} />
                  )}
                  <span className="text-slate-700 dark:text-slate-200 font-medium">{condition}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="hidden md:block ml-3">
            {condition && (
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-300 to-orange-400 flex items-center justify-center">
                {condition.includes("cerah") ? (
                  <Sun className="text-white" size={20} />
                ) : condition.includes("berawan") ? (
                  <Cloud className="text-white" size={20} />
                ) : (
                  <Sun className="text-white" size={20} />
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
