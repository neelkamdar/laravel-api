import React, { useCallback, useEffect, useState } from "react";
import ZoneContext from ".";

const ZoneProvider = (props) => {
  const [zones, setZones] = useState(() => {
    const storedZones = localStorage.getItem("zones");
    return storedZones ? JSON.parse(storedZones) : [];
  });
  const [isZoneSelected, setIsZoneSelected] = useState(false);

  // Function to update zones
  const updateZones = useCallback((newZones) => {
    setZones(newZones);
    localStorage.setItem("zones", JSON.stringify(newZones));
  }, []);

  useEffect(() => {
    const storedZones = localStorage.getItem("zones");
    if (storedZones) {
      setZones(JSON.parse(storedZones));
    }
  }, []);

  return (
    <ZoneContext.Provider value={{ zones, setZones: updateZones, isZoneSelected, setIsZoneSelected }}>
      {props.children}
    </ZoneContext.Provider>
  );
};

export default ZoneProvider;
