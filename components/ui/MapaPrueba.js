import { useEffect } from "react";

const MapPage = ({ setCordenadas, cordenadas = {} }) => {
  useEffect(() => {
    // Define la función initMap que será llamada por el script de Google Maps
    window.initMap = () => {
      const { lat, lon } = cordenadas;
      const myLatLng = { lat: lat || -12.449, lng: lon || -76.757864 };

      const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 16,
        center: myLatLng,
      });

      var imageBounds = {
        north: -12.44703,
        south: -12.45009,
        east: -76.752305,
        west: -76.762954,
      };

      var overlay = new google.maps.GroundOverlay(
        "/static/img/mapa.svg", // Ruta de la imagen que deseas superponer
        imageBounds
      );
      overlay.setMap(map);

      const marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        draggable: true,
      });

      google.maps.event.addListener(marker, "dragend", function (event) {
        const newPosition = event.latLng;
        const newLat = newPosition.lat();
        const newLng = newPosition.lng();
        setCordenadas({ lat: newLat, lon: newLng });
      });
    };

    // Carga el script de Google Maps y llama a la función initMap una vez cargado
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBB2CViIy1tu-h-NbBqKkNT97q68K6jgww&callback=initMap`;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Limpia el script cuando el componente se desmonta
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div id="map" style={{ height: "100%", backgroundColor: "black" }}></div>
  );
};

export default MapPage;
