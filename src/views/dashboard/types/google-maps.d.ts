declare namespace google {
  export namespace maps {
    class Map {
      constructor(element: HTMLElement, options: MapOptions)
      setCenter(latLng: LatLng): void
    }

    class Marker {
      constructor(options: MarkerOptions)
      setPosition(latLng: LatLng): void
    }

    class LatLng {
      constructor(lat: number, lng: number)
    }

    interface IMapOptions {
      center: LatLng
      zoom: number
    }

    interface IMarkerOptions {
      position: LatLng
      map: Map
    }

    namespace places {
      class AutocompleteService {
        constructor()
        getPlacePredictions(
          request: AutocompleteRequest,
          callback: (predictions: AutocompletePrediction[], status: PlacesServiceStatus) => void
        ): void
      }
      class LatLngBounds {
        constructor(sw?: LatLng, ne?: LatLng)
      }
      interface IAutocompleteRequest {
        input: string
        offset?: number
        location?: LatLng
        radius?: number
        bounds?: LatLngBounds
        componentRestrictions?: ComponentRestrictions
        types?: string[]
        placeIdOnly?: boolean
        strictBounds?: boolean
      }

      interface IAutocompletePrediction {
        description: string
        distance_meters: number
        id: string
        matched_substrings: PredictionSubstring[]
        place_id: string
        reference: string
        structured_formatting: StructuredFormatting
        terms: PredictionTerm[]
        types: string[]
      }

      interface IPredictionSubstring {
        length: number
        offset: number
      }

      interface IStructuredFormatting {
        main_text: string
        main_text_matched_substrings: PredictionSubstring[]
        secondary_text: string
      }

      interface IPredictionTerm {
        offset: number
        value: string
      }

      interface IComponentRestrictions {
        country: string | string[]
      }

      enum EPlacesServiceStatus {
        INVALID_REQUEST = 'INVALID_REQUEST',
        OK = 'OK',
        OVER_QUERY_LIMIT = 'OVER_QUERY_LIMIT',
        REQUEST_DENIED = 'REQUEST_DENIED',
        UNKNOWN_ERROR = 'UNKNOWN_ERROR',
        ZERO_RESULTS = 'ZERO_RESULTS'
      }
    }
  }
}
