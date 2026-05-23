import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export default function Calendar() {
  return (
    <div className="bg-white text-black rounded-2xl p-4 w-full overflow-x-auto">
      <DayPicker
        mode="single"
        className="mx-auto"
        classNames={{
          months: "flex flex-col sm:flex-row gap-4",
          month: "space-y-4",
          caption: "flex justify-center font-semibold",
          table: "w-full border-collapse",
          head_row: "flex justify-between",
          row: "flex justify-between",
          cell: "text-center w-10 h-10",
          day: "rounded-full hover:bg-indigo-100 transition",
          day_selected: "bg-indigo-600 text-white",
          day_today: "font-bold text-indigo-600",
        }}
      />
    </div>
  );
}
