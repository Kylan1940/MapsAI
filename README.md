# MapsAI

> Find places naturally. Let AI understand what you mean.

MapsAI is an AI-powered place discovery app that turns natural-language
requests into real place searches.

Instead of filling out multiple filters, you can simply search for
things like:

-   `coffeshop in Semarang`
-   `cheapest barbershop in Jakarta`
-   `best restaurant in Bandung`
-   `popular tourist spot near me`
-   `hotels that are open now in Yogyakarta`

MapsAI interprets the request, figures out what kind of place and location you're looking for, then searches Google Places and presents the results on an interactive map.

## Live

**Website:** https://mapsai.site

## What it does

MapsAI sits between a natural-language prompt and a traditional place search.

``` text
Your request
     │
     ▼
   Gemini
     │
     │ understands the request
     ▼
Structured search query
     │
     ▼
Google Places API
     │
     ▼
Places + map + details
```

For example:

``` text
"cheapest coffeshop in Semarang"
```

can be interpreted as something similar to:

``` json
{
  "placeType": "coffee shop",
  "location": "Semarang",
  "priceLevel": "LOW",
  "sortBy": "relevance"
}
```

The structured query is then used to search Google Places.

## Features

### Natural-language search

Search using normal sentences instead of manually selecting place types, locations, and filters.

### Location-aware search

Requests such as:

``` text
cafe near me
```

can use the user's current location.

MapsAI asks for permission before accessing the location. The location is used for the search and distance-related functionality rather than requiring the user to manually enter coordinates.

### Place information

Search results can include:

-   Name
-   Address
-   Rating
-   Number of reviews
-   Price range
-   Opening hours
-   Phone number
-   Website
-   Google Maps link
-   Geographic coordinates

### Sorting

Results can be interpreted and sorted based on:

-   Relevance
-   Price
-   Rating
-   Distance

### Interactive map

Search results are displayed on Google Maps with markers corresponding to the returned places.

### Two-language support

MapsAI supports **2 languages**:

- `Bahasa Indonesia`
- `English`

The interface and search experience are available in both languages, so users can search naturally using either `Bahasa Indonesia` or `English`.

## Tech Stack

### Frontend

-   Next.js
-   React
-   TypeScript
-   Tailwind CSS
-   Lucide React
-   `@vis.gl/react-google-maps`

### AI

-   Google Gemini API
-   `@google/genai`

Gemini is used to understand the user's request and convert it into a structured search query.

### Maps & Places

-   Google Maps JavaScript API
-   Google Places API (New)

Google Places is responsible for retrieving actual place data, while the Maps JavaScript API handles the interactive map.

## API Flow

MapsAI uses a server-side API route to process searches.

``` text
Browser
  │
  │ POST /api/search
  │
  ▼
Next.js API Route
  │
  ├── Gemini
  │     └── Interpret user prompt
  │
  └── Google Places API
        └── Search actual places
              │
              ▼
          Search results
              │
              ▼
           Browser
```

The API route also handles requests that require the user's location before sending the search to Google Places.

### Google APIs

Depending on your configuration, the required Google services include:

-   Gemini API
-   Places API (New)
-   Maps JavaScript API

Make sure the API key restrictions and enabled APIs are configured in Google Cloud before running the project.


## Project Structure

The project uses Next.js App Router.

``` text
MapsAI/
├── app/
│   ├── api/
│   │   └── search/
│   │       └── route.ts
│   │
│   ├── components/
│   ├── lib/
│   │   └── googlePlaces.ts
│   │
│   ├── layout.tsx
│   └── page.tsx
│
├── public/
├── package.json
├── tsconfig.json
└── README.md
```

The main search flow lives in:

``` text
app/api/search/route.ts
```

while Google Places communication is handled separately in:

``` text
app/lib/googlePlaces.ts
```

## Why MapsAI?

Traditional place search often makes users translate what they want into
a collection of filters.

MapsAI takes the opposite approach.

You describe what you're looking for.

The application figures out the search parameters.

That makes searches such as:

> `Affordable, highly-rated places to eat in Semarang`

possible without forcing the user to manually configure every option.

## Limitations

MapsAI depends on external services, so search quality and availability are affected by:

-   Gemini API availability
-   Google Places data
-   Google Maps Platform availability
-   API quotas and billing configuration
-   Accuracy of the user's search request
-   Browser location permissions

AI also isn't psychic, despite what every startup landing page has apparently decided to imply. Ambiguous requests can still produce ambiguous results.

## Privacy

MapsAI may request browser location access when a search requires the user's current location.

Location access is permission-based and is not required for ordinary searches using a specified location.

## Support

If you find a bug or have an idea for improving MapsAI, open an issue in this repository.

## License

This project is licensed under the Apache License 2.0.

See [LICENSE](LICENSE) for the full license text.

------------------------------------------------------------------------

Built by [Kylan1940](https://github.com/Kylan1940)
