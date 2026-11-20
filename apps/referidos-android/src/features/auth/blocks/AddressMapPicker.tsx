import React, { useMemo, useRef, useState } from "react";
import {
  Image,
  Linking,
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
  View,
  type GestureResponderEvent,
} from "react-native";
import { authText } from "./AuthStartLayout";

const TILE_SIZE = 256;
const MIN_ZOOM = 8;
const MAX_ZOOM = 19;
const HEADERS = { "User-Agent": "ReferidosAndroid/0.1" };
const ATTRIBUTION_URL = "https://www.openstreetmap.org/copyright";
const EMPTY_GESTURE = { x: 0, y: 0, scale: 1 };

export type AddressMapRegion = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

type Props = {
  region: AddressMapRegion;
  onRegionChange: (region: AddressMapRegion) => void;
};

function clampZoom(zoom: number) {
  return Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, zoom));
}

function project(latitude: number, longitude: number, world: number) {
  const mercatorLatitude = Math.max(-85.05112878, Math.min(85.05112878, latitude));
  const sine = Math.sin(mercatorLatitude * Math.PI / 180);
  return {
    x: ((longitude + 180) / 360) * world,
    y: (0.5 - Math.log((1 + sine) / (1 - sine)) / (4 * Math.PI)) * world,
  };
}

function unproject(x: number, y: number, world: number) {
  const horizontal = ((x % world) + world) % world;
  const vertical = Math.max(0, Math.min(world, y));
  return {
    longitude: horizontal / world * 360 - 180,
    latitude: Math.atan(Math.sinh(Math.PI * (1 - 2 * vertical / world))) * 180 / Math.PI,
  };
}

function touchDistance(event: GestureResponderEvent) {
  const [first, second] = event.nativeEvent.touches;
  return first && second ? Math.hypot(first.pageX - second.pageX, first.pageY - second.pageY) : 0;
}

export default function AddressMapPicker({ region, onRegionChange }: Props) {
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const [gesture, setGesture] = useState(EMPTY_GESTURE);
  const scaleStart = useRef(0);
  const gestureRef = useRef(EMPTY_GESTURE);
  const [loadFailed, setLoadFailed] = useState(false);
  const zoom = clampZoom(Math.round(Math.log2(180 / region.longitudeDelta)));
  const count = 2 ** zoom;
  const world = count * TILE_SIZE;
  const center = project(region.latitude, region.longitude, world);
  const callback = useRef({ center, world, zoom, onRegionChange });
  callback.current = { center, world, zoom, onRegionChange };

  function applyGesture(x: number, y: number, direction: number) {
    const current = callback.current;
    const nextZoom = clampZoom(current.zoom + direction);
    const delta = 180 / 2 ** nextZoom;
    current.onRegionChange({
      ...unproject(current.center.x - x, current.center.y - y, current.world),
      latitudeDelta: delta,
      longitudeDelta: delta,
    });
    setLoadFailed(false);
  }

  const responder = useMemo(() => PanResponder.create({
    onMoveShouldSetPanResponder: (_, state) =>
      state.numberActiveTouches > 1 || Math.abs(state.dx) > 4 || Math.abs(state.dy) > 4,
    onPanResponderGrant: (event) => {
      scaleStart.current = touchDistance(event);
      gestureRef.current = EMPTY_GESTURE;
    },
    onPanResponderMove: (event, state) => {
      const distance = touchDistance(event);
      if (distance && !scaleStart.current) scaleStart.current = distance;
      const scale = distance && scaleStart.current
        ? Math.max(0.55, Math.min(2.2, distance / scaleStart.current))
        : gestureRef.current.scale;
      const next = { x: state.dx, y: state.dy, scale };
      gestureRef.current = next;
      setGesture(next);
    },
    onPanResponderRelease: () => {
      const { x, y, scale } = gestureRef.current;
      applyGesture(x, y, Math.round(Math.log2(scale)));
      setGesture(EMPTY_GESTURE);
    },
    onPanResponderTerminate: () => setGesture(EMPTY_GESTURE),
    onPanResponderTerminationRequest: () => false,
  }), []);

  const left = center.x - viewport.width / 2;
  const top = center.y - viewport.height / 2;
  const tiles = [];
  if (viewport.width && viewport.height) {
    for (let row = Math.max(0, Math.floor(top / TILE_SIZE)); row <= Math.min(count - 1, Math.floor((top + viewport.height) / TILE_SIZE)); row++) {
      for (let column = Math.floor(left / TILE_SIZE); column <= Math.floor((left + viewport.width) / TILE_SIZE); column++) {
        tiles.push({ row, column, x: ((column % count) + count) % count });
      }
    }
  }

  return (
    <View style={styles.surface}>
      <View
        {...responder.panHandlers}
        accessibilityRole="adjustable"
        accessibilityLabel="Mapa. Desliza para mover y pellizca para acercar."
        accessibilityActions={[{ name: "increment", label: "Acercar mapa" }, { name: "decrement", label: "Alejar mapa" }]}
        onAccessibilityAction={(event) => applyGesture(0, 0, event.nativeEvent.actionName === "increment" ? 1 : -1)}
        onLayout={({ nativeEvent: { layout } }) => setViewport({ width: layout.width, height: layout.height })}
        style={styles.map}
      >
        <View pointerEvents="none" style={[styles.tiles, {
          transform: [{ translateX: gesture.x }, { translateY: gesture.y }, { scale: gesture.scale }],
        }]}>
          {tiles.map(({ row, column, x }) => (
            <Image
              key={`${zoom}/${column}/${row}`}
              source={{
                uri: `https://tile.openstreetmap.org/${zoom}/${x}/${row}.png`,
                headers: HEADERS,
                cache: "force-cache",
              }}
              onError={() => setLoadFailed(true)}
              style={[styles.tile, { left: column * TILE_SIZE - left, top: row * TILE_SIZE - top }]}
              fadeDuration={0}
            />
          ))}
        </View>
        {loadFailed && <Text style={styles.unavailable}>Mapa no disponible. Puedes buscar la dirección.</Text>}
      </View>
      <Pressable
        accessibilityRole="link"
        onPress={() => Linking.openURL(ATTRIBUTION_URL)}
        style={styles.attribution}
      >
        <Text style={styles.attributionText}>© OpenStreetMap contributors</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  surface: { flex: 1, backgroundColor: "#E9E9E7" },
  map: { flex: 1, overflow: "hidden" },
  tiles: { ...StyleSheet.absoluteFillObject },
  tile: { position: "absolute", width: TILE_SIZE, height: TILE_SIZE },
  unavailable: {
    ...authText.caption,
    position: "absolute",
    top: 8,
    alignSelf: "center",
    borderRadius: 4,
    padding: 6,
    color: "#364153",
    backgroundColor: "#FFFFFFE6",
  },
  attribution: { position: "absolute", bottom: 0, left: 0, backgroundColor: "#FFFFFFD9", paddingHorizontal: 4 },
  attributionText: { ...authText.normal, fontSize: 10, lineHeight: 14, color: "#315F81" },
});
