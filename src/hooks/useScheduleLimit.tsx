import { useEffect, useState } from "react";

export function useScheduleLimit() {
  const [limit, setLimit] = useState(1);

  useEffect(() => {
    const xs = window.matchMedia("(min-width: 320px)");
    const sm = window.matchMedia("(min-width: 425px)");
    const md = window.matchMedia("(min-width: 690px)");
    const lg = window.matchMedia("(min-width: 1440px)");

    const update = () => {
      if (lg.matches) {
        setLimit(15);
      } else if (md.matches) {
        setLimit(6);
      } else if (sm.matches) {
        setLimit(3);
      } else {
        setLimit(2);
      }
    };

    update();

    xs.addEventListener("change", update);
    sm.addEventListener("change", update);
    md.addEventListener("change", update);
    lg.addEventListener("change", update);

    return () => {
      xs.removeEventListener("change", update);
      sm.removeEventListener("change", update);
      md.removeEventListener("change", update);
      lg.removeEventListener("change", update);
    };
  }, []);

  return limit;
}
