interface SearchQuery {
  placeType?: string | null;
  location?: string | null;
  useUserLocation?: boolean;
  priceLevel?: string | null;
  minimumRating?: number | null;
  openNow?: boolean | null;
  sortBy?: string | null;
}

interface UserLocation {
  latitude: number;
  longitude: number;
}

interface SearchPlacesOptions {
  query: SearchQuery;
  maxResultCount?: number;
  userLocation?: UserLocation | null;
}

interface SearchPlacesOptionsExtended extends SearchPlacesOptions {
  language?: "id" | "en";
}

export async function searchPlaces({
  query,
  userLocation,
  language,
  maxResultCount,
}: SearchPlacesOptionsExtended) {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    throw new Error(
      "GOOGLE_MAPS_API_KEY belum ditemukan."
    );
  }

  /*
   * Buat teks pencarian.
   *
   * Contoh:
   * placeType: coffeeshop
   * location: Semarang Tengah
   *
   * Hasil:
   * coffeeshop di Semarang Tengah
   */

  let textQuery =
    query.placeType ||
    "tempat";

  if (
    query.location &&
    !query.useUserLocation
  ) {
    textQuery +=
      ` di ${query.location}`;
  }

  /*
   * Google Places (New) Text Search
   * cuma balikin maksimal 20 hasil
   * per request. Kalau user minta
   * lebih dari 20 (sampai 50), kita
   * loop pakai pageToken.
   */

  const targetCount = Math.min(Math.max(maxResultCount ?? 20, 1), 50);
  const baseRequestBody: Record<string, unknown> = {
    textQuery,
    languageCode: language === "en" ? "en" : "id",
  };

  if (query.useUserLocation && userLocation) {
    baseRequestBody.locationBias = {
      circle: {
        center: {
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
        },
        /*
         * Radius 5 km.
         */
        radius: 5000,
      },
    };
  }

  if (query.minimumRating) {
    baseRequestBody.minRating = query.minimumRating;
  }

  if (query.openNow === true) {
    baseRequestBody.openNow = true;
  }

  /*
   * PRICE_LEVEL_INEXPENSIVE
   * PRICE_LEVEL_MODERATE
   * PRICE_LEVEL_EXPENSIVE
   * PRICE_LEVEL_VERY_EXPENSIVE
   */

  if (query.priceLevel === "LOW") {
    baseRequestBody.priceLevels = [
      "PRICE_LEVEL_INEXPENSIVE",
    ];
  }
  if (query.priceLevel === "MEDIUM") {
    baseRequestBody.priceLevels = [
      "PRICE_LEVEL_MODERATE",
    ];
  }
  if (query.priceLevel === "HIGH") {
    baseRequestBody.priceLevels = [
      "PRICE_LEVEL_EXPENSIVE",
      "PRICE_LEVEL_VERY_EXPENSIVE",
    ];
  }
  const fieldMask = [
    "places.displayName",
    "places.formattedAddress",
    "places.rating",
    "places.userRatingCount",
    "places.priceRange",
    "places.regularOpeningHours",
    "places.location",
    "places.googleMapsUri",
    "places.nationalPhoneNumber",
    "places.internationalPhoneNumber",
    "places.websiteUri",
    "nextPageToken",
  ].join(",");

  let collectedPlaces: unknown[] = [];
  let pageToken: string | undefined;

  do {
    const requestBody: Record<string, unknown> = {
      ...baseRequestBody,

      maxResultCount: Math.min(
        targetCount - collectedPlaces.length,
        20
      ),

      ...(pageToken ? { pageToken } : {}),
    };

    console.log(
      "Google Places request:",
      JSON.stringify(
        requestBody,
        null,
        2
      )
    );

    const response = await fetch(
      "https://places.googleapis.com/v1/places:searchText",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
          "X-Goog-Api-Key":
            apiKey,
          "X-Goog-FieldMask": fieldMask,
        },
        body: JSON.stringify(
          requestBody
        ),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        "Google Places error:",
        errorText
      );
      throw new Error(
        `Google Places gagal: ${errorText}`
      );
    }
    
    const data = await response.json();
    console.log(
      "Google Places response:",
      data
    );

    collectedPlaces = collectedPlaces.concat(
      data.places || []
    );

    pageToken = data.nextPageToken;
  } while (
    pageToken &&
    collectedPlaces.length < targetCount
  );

  return collectedPlaces.slice(0, targetCount);
}