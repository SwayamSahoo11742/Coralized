# Coralized

![Screenshot 2024-11-01 210341](https://github.com/user-attachments/assets/5a7a4fd9-2e89-41b3-9df3-72affea8fe86)



Coralized is an app aimed to visualize and access coral bleaching


# Purpose

- Coralized is made to shine light on the vastly underlooked issue of coral bleaching
- It also aims to provide a method of quantifying the severity and likeliness of future bleaching for a selected reefs
- This is important as we are going through the 4th global bleaching event right now, which started back in 2023
- By 2050, 90% of global coral reefs are projected to experience coral bleaching every year

# Image Gallery
![Screenshot 2024-11-01 200852](https://github.com/user-attachments/assets/62837f57-f10f-463b-ae32-9598cbbc8026)
![Screenshot 2024-11-01 200947](https://github.com/user-attachments/assets/0ac56bd1-dde1-44e9-a9a5-7e4775a02bba)
![Screenshot 2024-11-01 201024](https://github.com/user-attachments/assets/c02fc94f-505b-4385-a158-15d9705c9d29)


# Tech Stack and Tools
- JS/HTML/CSS
- ArcGIS
- ReactJS
- Leaflet
- NOAA Public Data
- Mateomatics API


# Process

### Mapping
- To map the coral reefs and their bleaching level currently we utilized public data given by the NOAA
- We then mapped the data into GeoJSON 
- The GeoJSON was fed into Leaflet to be graphed

### Future Bleaching Predictions
- To create predictions, we identified two variables that are primary causes of bleaching: UV radiation and temperature
- We used Mateomatics API to see past trends in both factors and made a weighted score
- This score represents whether the area will bleach or heal, and its severity
- Score < 0, it will bleach
- Score > 0, it will heal
- |Score| = severity


