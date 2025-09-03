import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-draw';

@Component({
  selector: 'app-map-commponent',
  templateUrl: './map-commponent.component.html',
  styleUrls: ['./map-commponent.component.css'],
})
export class MapCommponentComponent implements AfterViewInit {
  map!: L.Map;

  ngAfterViewInit() {
    this.initMap();
  }

  initMap() {
    this.map = L.map('map').setView([52.2053, 0.1218], 8);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.map);

    const drawnItems = new L.FeatureGroup();
    this.map.addLayer(drawnItems);

    const drawControl = new L.Control.Draw({
      edit: {
        featureGroup: drawnItems,
        polygon: {
          allowIntersection: true,
        },
      } as any,
      draw: {
        polygon: {},
        rectangle: {},
        circle: {},
        marker: {},
        polyline: {},
      },
    });
    this.map.addControl(drawControl);

    this.map.on(L.Draw.Event.CREATED, (event: any) => {
      const layer = event.layer;
      drawnItems.addLayer(layer);

      layer.on('click', () => {
        const name = prompt('Enter name for the Area:');
        if (!name) return;

        let center: L.LatLng | null = null;

        if ((layer as any).getBounds) {
          center = (layer as any).getBounds().getCenter();
        } else if ((layer as any).getLatLng) {
          center = (layer as any).getLatLng();
        }

        if (!center) {
          console.warn('Center not found for this shape');
          return;
        }

        const textIcon = L.divIcon({
          className: 'area-label',
          html: `<div style="
    background: transparent;
    width:100%;
    border-radius:4px;
    font-size:16px;        
    font-weight:bold;
    white-space: nowrap;  
  ">
  ${name}</div>`,
          iconSize: [0, 0],
        });

        L.marker(center, { icon: textIcon, interactive: false }).addTo(
          this.map
        );

        (layer as any).areaName = name;
      });

      if ((layer as any).getLatLngs) {
        const coords = (layer as any)
          .getLatLngs()[0]
          .map((point: any) => ({ lat: point.lat, lng: point.lng }));
        console.log('Polygon/Rect coords:', coords);
      }

      if ((layer as any).getLatLng && (layer as any).getRadius) {
        console.log('Circle center:', (layer as any).getLatLng());
        console.log('Circle radius (meters):', (layer as any).getRadius());
      }

      if ((layer as any).getLatLng && !(layer as any).getRadius) {
        console.log('Marker:', (layer as any).getLatLng());
      }
    });
  }
}
