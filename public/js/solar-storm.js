"use strict";

// Магнітна буря 🌞
async function fetchMagneticStormData() {
    try {
        const response = await fetch('/api/k-index');
        const data = await response.json();
  
        const stormTime = new Date(data.time);
        document.getElementById('storm-time').textContent = `Last updated: ${stormTime.toLocaleString()}`;
  
        const kp = data.kp;
        let kpColor;
  
        if (kp >= 7) {
            kpColor = 'rgb(234, 59, 59)';
        } else if (kp >= 5) {
            kpColor = 'rgb(234, 231, 61)';
        } else {
            kpColor = 'rgb(98, 235, 57)';
        }
  
        const kpElement = document.getElementById('storm-kp');
        kpElement.textContent = `Kp index: ${kp}`;
        kpElement.style.color = kpColor;
  
    } catch (error) {
        console.error('Error fetching magnetic storm data:', error);
        document.getElementById('storm-time').textContent = 'Error loading storm data.';
    }
  }
  fetchMagneticStormData();