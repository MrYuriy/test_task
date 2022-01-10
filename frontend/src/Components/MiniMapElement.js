import React, { useEffect, useMemo, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import Leaflet from "leaflet";
import { MapContainer, Marker, useMap, TileLayer, Popup } from "react-leaflet";

export default function MiniMap(props, { text }) {
  const [x, setX] = useState(24.71046);
  const [y, setY] = useState(48.922466);
  // console.log(y, x);

  const [markerDragged, setMarkerDragged] = useState(false);

  const icon = new Leaflet.DivIcon({
    className: "custom-div-icon",
    html:
      "<div style='background-color:#c30b82;' class='marker-pin'></div><i class='material-icons'><img src='https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png'></i>",
    iconSize: [30, 42],
    iconAnchor: [15, 42],
    popupAnchor: [-3, -42]
  });

  function SetViewOnClick({ coords }) {
    const map = useMap();
    map.setView(coords, map.getZoom());

    return null;
  }

  useEffect(() => {
    if (text) {
      setX(text.features[0].geometry.coordinates[0]);
      setY(text.features[0].geometry.coordinates[1]);
    }
  }, [text]);
  

  const markerRef = useRef(null);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const { lat, lng } = marker.getLatLng();
          setX(lng);
          setY(lat);
          props.setLat(lat);
          props.setLng(lng);
          setMarkerDragged(true);
        }
      }
    }),
    []
  );

  const popup = () => {
    if (markerDragged) return `New latitude: ${y}, new longitude: ${x}`;
    return text ? text.query : "Location Default";
  };

  return (
    <MapContainer
      center={[y, x]}
      attributionControl={false}
      zoomControl={false}
      zoom={13}
      style={{
        height: "350px",
        position: "relative",
        outline: "none",
        maxWidth: "696px",
        display: "block",
        margin: "15px auto",
        width: "100%"
      }}
    >
      <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
      <Marker
        position={[y, x]}
        icon={icon}
        draggable={"true"}
        ref={markerRef}
        eventHandlers={eventHandlers}
      >
        <Popup>
          <span>{popup()}</span>
        </Popup>
        <SetViewOnClick coords={[y, x]} />
      </Marker>
    </MapContainer>
  );
}
