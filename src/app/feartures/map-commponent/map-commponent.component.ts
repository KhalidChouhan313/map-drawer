import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet-draw/dist/leaflet.draw.js';
import { CommonModule } from '@angular/common';
import { AreaNameModalComponent } from '../../core/modal/area-name-modal.component';
(window as any).L = L;
@Component({
  selector: 'app-map-commponent',
  standalone: true,
  imports: [CommonModule, AreaNameModalComponent],
  templateUrl: './map-commponent.component.html',
  styleUrls: ['./map-commponent.component.css'],
})
export class MapCommponentComponent implements AfterViewInit {
  private map!: L.Map;
  private drawnItems = new L.FeatureGroup();
  private activeDrawHandler: any = null;

  provider = new OpenStreetMapProvider();
  suggestions: any[] = [];

  branchColors: { [key: string]: string } = {
    'DHA Branch': '#D736FF',
    'Malir Branch': '#FFD84D',
    'Saddar Branch': '#2EBC96',
    'Golshan Branch': '#4285F4',
  };

  showModal = false;
  modalLayer: any = null;

  constructor() {}

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map').setView([24.8607, 67.0011], 11);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.map);

    this.map.addLayer(this.drawnItems);

    this.map.on('draw:created', (event: any) => {
      const layer = event.layer;
      this.drawnItems.addLayer(layer);

      this.modalLayer = layer;
      this.showModal = true;
    });
  }

  // Modal callbacks
  onModalClose() {
    if (this.modalLayer) this.drawnItems.removeLayer(this.modalLayer);
    this.showModal = false;
    this.modalLayer = null;
  }

  onModalSave(selectedBranch: string) {
    if (!this.modalLayer) return;

    const color = this.branchColors[selectedBranch] || '#000000';

    if ((this.modalLayer as any).setStyle) {
      (this.modalLayer as any).setStyle({
        color: color,
        fillColor: color,
        fillOpacity: 0.5,
      });
    }

    let center: L.LatLng | null = null;
    if ((this.modalLayer as any).getBounds) {
      center = (this.modalLayer as any).getBounds().getCenter();
    } else if ((this.modalLayer as any).getLatLng) {
      center = (this.modalLayer as any).getLatLng();
    }

    if (center) {
      const textIcon = L.divIcon({
        className: 'area-label',
        html: `<div style="font-size:16px;font-weight:bold;color:white">${selectedBranch}</div>`,
        iconSize: [0, 0],
      });
      L.marker(center, { icon: textIcon, interactive: false }).addTo(this.map);
    }

    this.showModal = false;
    this.modalLayer = null;
  }

  async onSearch(event: any) {
    const value = event.target.value;
    if (value.length < 3) {
      this.suggestions = [];
      return;
    }
    try {
      const results = await this.provider.search({ query: value });
      this.suggestions = results;
    } catch (err) {
      console.error('search error', err);
      this.suggestions = [];
    }
  }

  selectLocation(s: any) {
    this.suggestions = [];
    if (s.y && s.x) {
      this.map.setView([s.y, s.x], 14);
      L.marker([s.y, s.x])
        .addTo(this.map)
        .bindPopup(s.label || '')
        .openPopup();
    }
  }

  enableDraw(type: string) {
    if (this.activeDrawHandler) {
      this.activeDrawHandler.disable();
      this.activeDrawHandler = null;
    }

    let options: any;

    switch (type) {
      case 'polygon':
        options = {
          shapeOptions: {
            color: '#2EBC96',
            fillColor: '#2EBC96',
            fillOpacity: 0.5,
          },
        };
        this.activeDrawHandler = new (L as any).Draw.Polygon(this.map, options);
        break;
      case 'rectangle':
        options = {
          shapeOptions: {
            color: '#FFD84D',
            fillColor: '#FFD84D',
            fillOpacity: 0.5,
          },
        };
        this.activeDrawHandler = new (L as any).Draw.Rectangle(
          this.map,
          options
        );
        break;
      case 'polyline':
        options = { shapeOptions: { color: '#2196F3', weight: 4 } };
        this.activeDrawHandler = new (L as any).Draw.Polyline(
          this.map,
          options
        );
        break;
      case 'circle':
        options = {
          shapeOptions: {
            color: '#D736FF',
            fillColor: '#D736FF',
            fillOpacity: 0.4,
          },
        };
        this.activeDrawHandler = new (L as any).Draw.Circle(this.map, options);
        break;
      case 'marker':
        this.activeDrawHandler = new (L as any).Draw.Marker(this.map);
        break;
      case 'crosshair':
        const center = this.map.getCenter();
        L.marker(center, {
          icon: L.divIcon({
            className: 'crosshair-icon',
            html: '<i class="fa-solid fa-crosshairs" style="color:red;font-size:20px;"></i>',
          }),
        }).addTo(this.drawnItems);
        return;
      case 'edit':
        this.activeDrawHandler = new (L as any).EditToolbar.Edit(this.map, {
          featureGroup: this.drawnItems,
        });
        break;
    }

    if (this.activeDrawHandler) {
      this.activeDrawHandler.enable();
    }
  }

  zoomIn() {
    if (this.map) this.map.zoomIn();
  }

  zoomOut() {
    if (this.map) this.map.zoomOut();
  }
}
