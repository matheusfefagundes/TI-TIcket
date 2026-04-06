import Image from "next/image";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useFormContext } from "react-hook-form";
import { NewTechnicianFormData } from "@/schemas/new-technician";

type TimeSlotsProps = {
  init: string;
  end: string;
};

export function TimeSlots({ end, init }: TimeSlotsProps) {
  const { register, watch } = useFormContext<NewTechnicianFormData>();

  const selectedTimes: string[] = watch("availabilities") || [];

  const times = [
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {times.map((time) => {
        if (time < init || time > end) return null;

        const isSelected = selectedTimes.includes(time);

        return (
          <div
            key={time}
            className={`relative cursor-pointer rounded-4xl border-2 p-1.5 ${
              isSelected
                ? "border-brand-base bg-brand-base text-white"
                : "border-app-gray-400 text-app-gray-200 bg-transparent"
            } `}
          >
            <Input
              {...register("availabilities")}
              value={time}
              className="absolute inset-0 cursor-pointer opacity-0"
              placeholder={time}
              type="checkbox"
            />
            <p className="flex items-center gap-1.5">
              {time}
              {isSelected && (
                <Button
                  size="icon-xs"
                  variant="ghost"
                  type="button"
                  className="p-0"
                >
                  <Image
                    src="/icons/x.svg"
                    alt="Ícone de X"
                    width={14}
                    height={14}
                  />
                </Button>
              )}
            </p>
          </div>
        );
      })}
    </div>
  );
}
