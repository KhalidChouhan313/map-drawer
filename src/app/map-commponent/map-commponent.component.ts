import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-draw/dist/leaflet.draw.js';
import 'leaflet-control-geocoder';

@Component({
  selector: 'app-map-commponent',
  templateUrl: './map-commponent.component.html',
  styleUrls: ['./map-commponent.component.css'],
})
export class MapCommponentComponent implements AfterViewInit {
  private map!: L.Map;
  private activeDrawHandler: any = null;

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    // Map
    this.map = L.map('map').setView([51.505, -0.09], 4);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.map);

    (L.Control as any)
      .geocoder({ defaultMarkGeocode: false })
      .on('markgeocode', (e: any) => {
        const bbox = e.geocode.bbox;
        const poly = L.polygon([
          [bbox.getSouthEast().lat, bbox.getSouthEast().lng],
          [bbox.getNorthEast().lat, bbox.getNorthEast().lng],
          [bbox.getNorthWest().lat, bbox.getNorthWest().lng],
          [bbox.getSouthWest().lat, bbox.getSouthWest().lng],
        ]);
        this.map.fitBounds(poly.getBounds());
      })
      .addTo(this.map);

    const drawnItems = new L.FeatureGroup();
    this.map.addLayer(drawnItems);

    const drawControl = new L.Control.Draw({
      edit: { featureGroup: drawnItems },
      draw: {
        polygon: {
          allowIntersection: true,
          shapeOptions: { color: '#3388ff' },
        },
        polyline: { shapeOptions: { color: '#3388ff' } },
        rectangle: {},
        circle: {},
        marker: {},
      },
    });
    this.map.addControl(drawControl);

    this.map.on('draw:created', (event: any) => {
      this.activeDrawHandler = null;
      const layer = event.layer;
      drawnItems.addLayer(layer);

      const name = prompt('Enter name for the Area:');
      if (name) {
        let center: L.LatLng | null = null;

        if ((layer as any).getBounds) {
          center = (layer as any).getBounds().getCenter();
        } else if ((layer as any).getLatLng) {
          center = (layer as any).getLatLng();
        }

        if (center) {
          const textIcon = L.divIcon({
            className: 'area-label',
            html: `<div style="
              background: transparent;
              width:100%;
              border-radius:4px;
              font-size:16px;        
              font-weight:bold;
              white-space: nowrap;">${name}</div>`,
            iconSize: [0, 0],
          });
          L.marker(center, { icon: textIcon, interactive: false }).addTo(
            this.map
          );
        }
        (layer as any).areaName = name;
      }
    });

    this.map.on('draw:drawvertex', () => {
      if (
        this.activeDrawHandler &&
        (this.activeDrawHandler instanceof (L.Draw as any).Polyline ||
          this.activeDrawHandler instanceof (L.Draw as any).Polygon)
      ) {
        const latlngs = this.activeDrawHandler._markers.map((m: any) =>
          m.getLatLng()
        );
        if (latlngs.length > 2) {
          this.activeDrawHandler._finishShape();
        }
      }
    });
  }
}
