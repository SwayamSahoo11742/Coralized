import './App.css';
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import coral from "./coral.json";
import MarkerClusterGroup from '@changey/react-leaflet-markercluster';
import styles from "./index.css";
import L from 'leaflet';
const createClusterCustomIcon = function (cluster) {
  return L.divIcon({
    html: `<span>${cluster.getChildCount()}</span>`,
    className: 'marker-cluster-custom',
    iconSize: L.point(40, 40, true),
  });
};

function CoralMap() {
  

  
  function linearRegression(temps) {
    const n = temps.length;
    const x = Array.from({ length: n }, (_, i) => i);
    const y = temps;
  
    const meanX = x.reduce((sum, value) => sum + value, 0) / n;
    const meanY = y.reduce((sum, value) => sum + value, 0) / n;
  
    let numerator = 0;
    let denominator = 0;
  
    for (let i = 0; i < n; i++) {
      numerator += (x[i] - meanX) * (y[i] - meanY);
      denominator += (x[i] - meanX) ** 2;
    }
  
    const m = numerator / denominator;
    const b = meanY - m * meanX;
  
    return { slope: m, intercept: b };
  }

  async function getSeaTemperature(long, lat) {
    const username = "rizz_sahoo_swayam"; 
    const password = "54RqiVD9wb"; 

    const url = `https://api.meteomatics.com/2024-10-28T00:00:00Z--2024-11-26T00:00:00Z:PT1H/t_sea_sfc:F/${lat},${long}/json`;
  
    try {
      const response = await fetch(url, {
        headers: {
          "Authorization": "Basic " + btoa(`${username}:${password}`)
        }
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const data = await response.json();
      const dates = data.data[0].coordinates[0].dates;
      let temps = [];
      dates.forEach(date => {
          temps.push(date.value);
      });
      console.log(linearRegression(temps));
      return data;
    } catch (error) {
      console.error("Failed to fetch sea temperature data:", error);
    }
  }
  
  const severity2color = (sev) =>{
    let col = "";
    if(sev === "No Bleaching"){
      col = "#4CAF50"
    }
    else if(sev === "Low"){
      col = "#FFEB3B"
    }
    else if(sev === "Medium"){
      col = "#FF9800"
    }else if(sev === "HIGH"){
      col = "#F44336"
    }else{
      col = "#abf5c8"
    }
    return col;
  }
  
  return (
    <div className="App">
      <MapContainer 
        center={[51.505, -0.09]} 
        zoom={3} 
        scrollWheelZoom={true} 
        minZoom={3} 
        worldCopyJump={true}
        maxBounds={[[-85, -Infinity],[85,Infinity]]}
        maxBoundsViscosity={1}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup
          showCoverageOnHover={true}
          spiderfyDistanceMultiplier={2}
          iconCreateFunction={createClusterCustomIcon}
        >
          {coral.features.map(crl => (
            <Marker 
              key={crl.properties.ID}
              position={[crl.geometry.coordinates[1], crl.geometry.coordinates[0]]}
            >
              <Popup>
                <table className="min-w-full border border-gray-300">
                  <tbody className="divide-y divide-gray-300">
                    <tr>
                      <td className="px-4 py-2 font-semibold">Depth:</td>
                      <td className="px-4 py-2">{crl.properties.DEPTH}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-semibold">Bleaching Severity:</td>
                      <td className="px-4 py-2">{crl.properties.BLEACHING_SEVERITY}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-semibold">Water Temp:</td>
                      <td className="px-4 py-2">{crl.properties.WATER_TEMPERATURE}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-semibold">Coral Family:</td>
                      <td className="px-4 py-2">{crl.properties.CORAL_FAMILY}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-semibold">Country:</td>
                      <td className="px-4 py-2">{crl.properties.COUNTRY_CODE}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-semibold">Region:</td>
                      <td className="px-4 py-2">{crl.properties.REGION}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-semibold">Location:</td>
                      <td className="px-4 py-2">{crl.properties.LOCATION}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-semibold">Remarks:</td>
                      <td className="px-4 py-2">{crl.properties.REMARKS}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-semibold">Other Factors:</td>
                      <td className="px-4 py-2">{crl.properties.OTHER_FACTORS}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-semibold">ID:</td>
                      <td className="px-4 py-2">{crl.properties.ID}</td>
                    </tr>
                  </tbody>
                </table>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>

        {/* Circles around each marker */}
        {coral.features.map(crl => (
          <Circle
            key={`circle-${crl.properties.ID}`} // unique key for each circle
            center={[crl.geometry.coordinates[1], crl.geometry.coordinates[0]]}
            radius={100000} // Radius in meters
            color={severity2color(crl.properties.BLEACHING_SEVERITY)}
            fillColor={severity2color(crl.properties.BLEACHING_SEVERITY)}
            fillOpacity={0.4}
          />
        ))}
      </MapContainer>
    </div>
  );
}

export default CoralMap;
