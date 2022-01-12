import React, { useEffect, useState } from "react";
import {
  CircleMarker,
  MapContainer,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import Sidebar from "./Sidebar.js";

import "../App.css";

function Map() {
  const [bbox, setBbox] = useState();
  const [allApartsFromAPI, fetchAllApartsFromAPI] = useState();
  const [visibleApartments, handleVisibleApartments] = useState();
  const [lastClick, handleLastClick] = useState(undefined);
  const [cards, handleCards] = useState();

  function inBounds(item, bbox) {
    var lng =
      (item.lng - bbox._northEast.lng) * (item.lng - bbox._southWest.lng) < 0;
    var lat =
      (item.lat - bbox._northEast.lat) * (item.lat - bbox._southWest.lat) < 0;
    return lng && lat;
  }

  useEffect(() => {
    if (bbox) {
      fetchFromApi();
    }

    async function fetchFromApi() {
      let response = await fetch("https://internship-test-t.herokuapp.com/api/aparts/");
      response = await response.json();
      fetchAllApartsFromAPI(response);
    }
  }, [bbox]);

  useEffect(() => {
    async function checkVisibleApartments() {
      if (bbox && allApartsFromAPI) {
        let items = [];

        allApartsFromAPI.map((item) => {
          let visible = inBounds(item, bbox);
          if (visible > 0) {
            items.push(item);
          }
        }, handleVisibleApartments(items));
        // console.log(items);
      }
    }
    checkVisibleApartments();
  }, [allApartsFromAPI]);

  useEffect(() => {
    if (lastClick === "MAP") {
      console.log("clicked on map");
      handleCards(allApartsFromAPI);
    } else {
      console.log("clicked on marker:", lastClick);
      try {
        handleCards([lastClick.item]);
      } catch (error) {
        handleCards(allApartsFromAPI);
      }
    }
  }, [lastClick]);

  function RenderMarkers({ data }) {
    const markers = data.map((item) => (
      <CircleMarker
        key={item.id}
        className="circle_marker"
        center={[item.lat, item.lng]}
        color="white"
        fillColor="#3072ac"
        fillOpacity={1}
        radius={11}
        eventHandlers={{
          click: () => {
            handleLastClick({ item });
          },
        }}
      ></CircleMarker>
    ));

    return <div>{markers}</div>;
  }

  const MapEvents = ({ setBbox }) => {
    const setBounds = () => setBbox(map.getBounds());
    const map = useMapEvents({
      load: setBounds,
      moveend: setBounds,
      click: () => {
        if (lastClick === "MAP" || lastClick === undefined) {
          console.log("map again");
        } else {
          handleLastClick("MAP");
        }
      },
    });
    return null;
  };

  return (
    <div className="grid">
      <div className="content">
        <MapContainer
          doubleClickZoom={false}
          id="mapId"
          zoom={14}
          center={[48.922466, 24.71046]}
          whenCreated={(map) => setBbox(map.getBounds())}
        >
          <MapEvents setBbox={setBbox} />

          <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />

          {!!visibleApartments && <RenderMarkers data={visibleApartments} />}
        </MapContainer>
      </div>
      <div className="side">
        {(lastClick === "MAP" || lastClick === undefined) &&
          !!visibleApartments && <Sidebar items={visibleApartments} />}
        {lastClick !== "MAP" && cards !== undefined && !!cards && (
          <Sidebar items={cards} />
        )}
      </div>
    </div>
  );
}

export default Map;
