"use client";
import React, { useState, useCallback, useEffect, useContext } from "react";
import {
  GoogleMap,
  Marker,
  Polygon,
  useJsApiLoader,
} from "@react-google-maps/api";
import { Button } from "reactstrap";
import SettingContext from "@/helper/settingContext";

const libraries = ["places"]; // Load additional libraries if needed
const mapContainerStyle = {
  width: "100%",
  height: "500px",
};

const defaultCenter = { lat: 37.7749, lng: -122.4194 }; // Default center (San Francisco)

const ZoneMap = ({updateId, onCoordinatesChange, initialCoordinates = [] }) => {
  const { settingObj } = useContext(SettingContext)
  const googleMapsApiKey = settingObj?.general?.google_map_api_key;
 
  const shouldLoad = !!googleMapsApiKey; // Ensure API key exists before loading

const { isLoaded } = useJsApiLoader(
  shouldLoad
    ? {
        id: "google-map-script",
        googleMapsApiKey,
        libraries,
        version: "weekly",
      }
    : { id: "google-map-script", googleMapsApiKey: "", libraries }
);

  const [markers, setMarkers] = useState(initialCoordinates);
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [zoom, setZoom] = useState(12); // Initial zoom level
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [lastActiveIndex, setLastActiveIndex] = useState(null);
  // Marker Icons
  const inactiveIcon = "/assets//images/svg/map-inactive-mark.svg"; // Path relative to public
  const activeIcon = "/assets/images/svg/map-active-mark.svg";

  // Fallback to user location if API key is missing/invalid
  useEffect(() => {
    if (!googleMapsApiKey || !isLoaded) {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setMapCenter({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
            setZoom(12); // Adjust zoom level for user location
          },
          (error) => {
            console.warn("Geolocation error:", error);
          }
        );
      }
    }
  }, [googleMapsApiKey, isLoaded]);

  useEffect(() => {
    onCoordinatesChange(markers);
    if (markers.length > 0 && isLoaded && window.google && window.google.maps) {
      try {
        const bounds = new window.google.maps.LatLngBounds();
        markers.forEach((marker) => {
          bounds.extend(new window.google.maps.LatLng(marker.lat, marker.lng));
        });

        if(updateId){
          setMapCenter(bounds.getCenter().toJSON());
          const newZoom = calculateZoomLevel(bounds);
          setZoom(newZoom);
        }
      } catch (error) {
        console.error("Error calculating bounds:", error);
      }
    }
  }, [markers, isLoaded]);

  useEffect(() => {
    if (initialCoordinates.length > 0) {
      setMarkers(initialCoordinates);
    }
  }, [initialCoordinates]);

  const handleMapClick = useCallback((e) => {
    if (!e.latLng) return;

    const newMarker = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    setMarkers((prev) => {
      const updatedMarkers = [...prev, newMarker];
      setUndoStack((prevUndo) => [...prevUndo, prev]);
      setRedoStack([]);
      return updatedMarkers;
    });
    setLastActiveIndex(markers.length);
  }, [markers.length]);

  const handleMarkerClick = (index) => {
    setLastActiveIndex(index);
  };

  // Undo last change
  const handleUndo = () => {
    if (undoStack.length > 0) {
      const lastState = undoStack.pop(); // Remove last state
      setRedoStack((prev) => [...prev, markers]); // Push current state to redo stack
      setMarkers(lastState); // Restore previous state
      setLastActiveIndex(null);
    }
  };

  // Redo last undone change
  const handleRedo = () => {
    if (redoStack.length > 0) {
      const nextState = redoStack.pop(); // Remove last redo state
      setUndoStack((prev) => [...prev, markers]); // Push current state to undo stack
      setMarkers(nextState); // Restore redo state
      setLastActiveIndex(null);
    }
  };

  // Function to calculate zoom level based on bounds
  const calculateZoomLevel = (bounds) => {
    const worldWidth = 256;
    const angle = bounds.getNorthEast().lng() - bounds.getSouthWest().lng();
    return Math.max(0, Math.min(20, Math.floor(Math.log2(worldWidth / angle))));
  };

  if (!isLoaded) return <div>Loading maps...</div>;

  return (
    <div>
      <div className="align-items-center g-2 mb-4 row">
        <label className="col-sm-2 form-label-title mb-0">Select zone</label>
        <div className="col-sm-10">
          <div className="map-button-group">
            <Button
              className="btn-outline btn"
              color="transparent"
              onClick={handleUndo}
              disabled={undoStack.length === 0}
            >
              Undo
            </Button>
            <Button onClick={handleRedo} className="btn-outline btn" color="transparent" disabled={redoStack.length === 0}>
              Redo
            </Button>
          </div>
        </div>
      </div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={mapCenter}
        zoom={zoom}
        className="zone-map"
        onClick={handleMapClick}
      >
        {markers.map((position, index) => (
          <Marker
            key={index}
            position={position}
            icon={{
              url: index === lastActiveIndex ? activeIcon : inactiveIcon, // Use proper icon URL
            }}
            onClick={() => handleMarkerClick(index)}
          />
        ))}
        {markers.length > 2 && (
          <Polygon
            paths={markers}
            options={{
              fillColor: "#00FF00",
              fillOpacity: 0.3,
              strokeColor: "#000",
              strokeWeight: 1,
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
};

export default ZoneMap;
