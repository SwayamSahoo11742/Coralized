import './App.css';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import coral from "./coral.json";
import MarkerClusterGroup from '@changey/react-leaflet-markercluster'
import styles from "./index.css";
function App() {

  function linearRegression(temps) {
    const n = temps.length; // Number of data points
    const x = Array.from({ length: n }, (_, i) => i); // Days: 0, 1, 2, ..., n-1
    const y = temps; // Temperatures
  
    // Calculate means
    const meanX = x.reduce((sum, value) => sum + value, 0) / n;
    const meanY = y.reduce((sum, value) => sum + value, 0) / n;
  
    // Calculate the slope (m) and intercept (b)
    let numerator = 0;
    let denominator = 0;
  
    for (let i = 0; i < n; i++) {
      numerator += (x[i] - meanX) * (y[i] - meanY);
      denominator += (x[i] - meanX) ** 2;
    }
  
    const m = numerator / denominator; // Slope
    const b = meanY - m * meanX; // Intercept
  
    return { slope: m, intercept: b };
  }


  async function getSeaTemperature() {
    const username = "rizz_sahoo_swayam"; 
    const password = "54RqiVD9wb"; 
    const long = 115.3667
    const lat = -21.45;
    const url = `https://api.meteomatics.com/2024-10-26T00:00:00Z--2024-11-26T00:00:00Z:PT1H/t_sea_sfc:C/${lat},${long}/json`;
  
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
          temps.push(date.value)
      });
      console.log(linearRegression(temps))
      return data;
    } catch (error) {
      console.error("Failed to fetch sea temperature data:", error);
    }
  }
  
  getSeaTemperature();
  
    return (
    <div className="App">
      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

<MarkerClusterGroup>
        {coral.features.map(crl => (
          <Marker 
            key={crl.properties.ID}
            position={[crl.geometry.coordinates[1], crl.geometry.coordinates[0]]} // Accessing coordinates correctly
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
        
      </MapContainer>
    </div>
  );
}

export default App;
