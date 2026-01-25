import React from "react";

export const Clock: React.FC = () => {
  const [time, setTime] = React.useState<Date | null>(null);

  React.useEffect(() => {
    setTime(new Date());

    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!time) {
    return <></>;
  }

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const ampm = hours >= 12 ? "PM" : "AM";

  const displayHours = hours % 12 || 12;

  return (
    <div className="text-center">
      <div className="text-6xl sm:text-7xl md:text-8xl font-medium tracking-tight text-foreground">
        {displayHours.toString().padStart(2, "0")}
        <span className="animate-pulse">:</span>
        {minutes.toString().padStart(2, "0")}
        <span className="animate-pulse">:</span>
        {seconds.toString().padStart(2, "0")}
        <span className="text-3xl sm:text-4xl md:text-5xl text-muted-foreground ml-2">
          {ampm}
        </span>
      </div>
      <div className="text-lg sm:text-xl text-muted-foreground font-medium mt-2">
        {time.toLocaleDateString("en-US", {
          day: "numeric",
          month: "long",
          weekday: "long",
          year: "numeric",
        })}
      </div>
    </div>
  );
};
