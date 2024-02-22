/** Map point. */
export class MapPoint {

  /** Latitude. */
  public readonly lat: number;

  /** Longitude. */
  public readonly lng: number;

  public constructor(data: MapPoint) {
    this.lat = data.lat;
    this.lng = data.lng;
  }

  /**
   * Builds map point from coordinates.
   * @param lat Latitude.
   * @param lng Longitude.
   */
  public static fromLatLng(lat: number, lng: number): MapPoint {
    return new MapPoint({ lat, lng });
  }
}
