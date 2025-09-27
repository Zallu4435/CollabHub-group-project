"use client";

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';

interface GoogleMapWrapperProps {
  center: google.maps.LatLngLiteral;
  zoom: number;
  onMapClick?: (lat: number, lng: number) => void;
  onMarkerDrag?: (lat: number, lng: number) => void;
  initialMarker?: google.maps.LatLngLiteral;
  className?: string;
}

const MapComponent: React.FC<{
  center: google.maps.LatLngLiteral;
  zoom: number;
  onMapClick?: (lat: number, lng: number) => void;
  onMarkerDrag?: (lat: number, lng: number) => void;
  initialMarker?: google.maps.LatLngLiteral;
  className?: string;
}> = ({ center, zoom, onMapClick, onMarkerDrag, initialMarker, className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();
  const [marker, setMarker] = useState<google.maps.Marker>();

  useEffect(() => {
    if (ref.current && !map) {
      const newMap = new window.google.maps.Map(ref.current, {
        center,
        zoom,
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
        zoomControl: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      });
      setMap(newMap);
    }
  }, [ref, map, center, zoom]);

  // Update map center when prop changes
  useEffect(() => {
    if (map) {
      map.setCenter(center);
    }
  }, [map, center]);

  // Update map zoom when prop changes
  useEffect(() => {
    if (map) {
      map.setZoom(zoom);
    }
  }, [map, zoom]);

  // Handle map clicks
  useEffect(() => {
    if (map && onMapClick) {
      const listener = map.addListener('click', (event: google.maps.MapMouseEvent) => {
        if (event.latLng) {
          const lat = event.latLng.lat();
          const lng = event.latLng.lng();
          onMapClick(lat, lng);
        }
      });

      return () => {
        google.maps.event.removeListener(listener);
      };
    }
  }, [map, onMapClick]);

  // Create or update marker
  useEffect(() => {
    if (map) {
      if (marker) {
        marker.setMap(null);
      }

      if (initialMarker) {
        const newMarker = new google.maps.Marker({
          position: initialMarker,
          map,
          draggable: true,
          title: 'Selected Location',
        });

        // Handle marker drag
        if (onMarkerDrag) {
          const dragListener = newMarker.addListener('dragend', () => {
            const position = newMarker.getPosition();
            if (position) {
              onMarkerDrag(position.lat(), position.lng());
            }
          });

          return () => {
            google.maps.event.removeListener(dragListener);
          };
        }

        setMarker(newMarker);
      }
    }
  }, [map, initialMarker, onMarkerDrag]);

  return <div ref={ref} className={className} />;
};

const render = (status: Status, props: GoogleMapWrapperProps) => {
  switch (status) {
    case Status.LOADING:
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-gray-600">Loading Google Maps...</p>
          </div>
        </div>
      );
    case Status.FAILURE:
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚠️</span>
            </div>
            <p className="text-red-600 font-medium">Failed to load Google Maps</p>
            <p className="text-sm text-gray-500 mt-1">Please check your API key and internet connection</p>
          </div>
        </div>
      );
    case Status.SUCCESS:
      return (
        <MapComponent
          center={props.center}
          zoom={props.zoom}
          onMapClick={props.onMapClick}
          onMarkerDrag={props.onMarkerDrag}
          initialMarker={props.initialMarker}
          className={props.className}
        />
      );
  }
};

export default function GoogleMapWrapper(props: GoogleMapWrapperProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

  if (!apiKey) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🔑</span>
          </div>
          <p className="text-yellow-600 font-medium">Google Maps API Key Required</p>
          <p className="text-sm text-gray-500 mt-1">
            Please add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your environment variables
          </p>
        </div>
      </div>
    );
  }

  return (
    <Wrapper apiKey={apiKey} render={(status) => render(status, props)}>
      <MapComponent {...props} />
    </Wrapper>
  );
}
