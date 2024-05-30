# The (Unofficial) WaniKani Client

This package provides a client for interacting with the [WaniKani API](https://docs.api.wanikani.com/20170710).

## Installation

```bash
npm install unofficial-wanikani
```

## Usage

```typescript
import WaniKani, { fetchAssignments } from "unofficial-wanikani";

const apiKey = "your_wanikani_api_key";

// using a client instance

const wk = WaniKani(apiKey);

const assignments = await wk.fetchAssignments({
  params: { immediately_available_for_review: true },
});

const subjectsAvailableForReview = await wk.fetchSubjects({
  params: {
    ids: assignments.data.map((assign) => assign.data.subject_id).join(","),
  },
});

// using bare function

const assignments = await fetchAssignments(apiKey, {
  params: { immediately_available_for_review: true },
});
```

## Projects Using `unofficial-wanikani`

- [WaniKani Wallpaper](https://patrickeddy.github.io/wanikani-wallpaper)
