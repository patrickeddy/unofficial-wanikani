# unofficial-wanikani

The (Unofficial) WaniKani Client

This package provides a set of utility functions and a client factory to interact with the WaniKani API. It includes support for fetching various resources such as assignments, level progressions, reviews, and subjects.

## Installation

To install the package, run:

```sh
npm install unofficial-wanikani
```

## Usage

### Client Factory

The client factory function allows you to create a WaniKani client instance with [your API key](https://www.wanikani.com/settings/personal_access_tokens). This client instance provides methods to fetch various resources from the WaniKani API.

```typescript
import WaniKani from "unofficial-wanikani";

const apiKey = "your-api-key";
const wanikani = WaniKani(apiKey);

// Fetch assignments with optional pagination parameters
wanikani
  .fetchAssignments({ params: { per_page: "100" } })
  .then((assignments) => {
    console.log(assignments);
  });

// Fetch a specific assignment by ID
wanikani.fetchAssignment(12345).then((assignment) => {
  console.log(assignment);
});

// Fetch level progressions
wanikani.fetchLevelProgressions().then((progressions) => {
  console.log(progressions);
});

// Fetch a specific level progression by ID
wanikani.fetchLevelProgression(67890).then((progression) => {
  console.log(progression);
});

// Fetch reviews
wanikani.fetchReviews().then((reviews) => {
  console.log(reviews);
});

// Fetch a specific review by ID
wanikani.fetchReview(112233).then((review) => {
  console.log(review);
});

// Fetch subjects
wanikani.fetchSubjects().then((subjects) => {
  console.log(subjects);
});

// Fetch a specific subject by ID
wanikani.fetchSubject(445566).then((subject) => {
  console.log(subject);
});
```

### Pure Exported Functions

If you prefer not to use the client factory, you can directly use the exported functions. Each function requires the API key as the first argument.

```typescript
import {
  fetchAssignments,
  fetchAssignment,
  fetchLevelProgressions,
  fetchLevelProgression,
  fetchReviews,
  fetchReview,
  fetchSubjects,
  fetchSubject,
} from "unofficial-wanikani";

const apiKey = "your-api-key";

// Fetch assignments with optional pagination parameters
fetchAssignments(apiKey, { params: { per_page: "100" } }).then(
  (assignments) => {
    console.log(assignments);
  }
);

// Fetch a specific assignment by ID
fetchAssignment(apiKey, 12345).then((assignment) => {
  console.log(assignment);
});

// Fetch level progressions
fetchLevelProgressions(apiKey).then((progressions) => {
  console.log(progressions);
});

// Fetch a specific level progression by ID
fetchLevelProgression(apiKey, 67890).then((progression) => {
  console.log(progression);
});

// Fetch reviews
fetchReviews(apiKey).then((reviews) => {
  console.log(reviews);
});

// Fetch a specific review by ID
fetchReview(apiKey, 112233).then((review) => {
  console.log(review);
});

// Fetch subjects
fetchSubjects(apiKey).then((subjects) => {
  console.log(subjects);
});

// Fetch a specific subject by ID
fetchSubject(apiKey, 445566).then((subject) => {
  console.log(subject);
});
```

### Pagination Support

The fetch functions for collections support optional pagination parameters. You can pass these parameters to control the number of items returned and navigate through the results.

### Error Handling

The functions will throw an error if the API request fails. Ensure you handle errors appropriately in your application.

```typescript
fetchAssignments(apiKey, { params: { per_page: "100" } })
  .then((assignments) => {
    console.log(assignments);
  })
  .catch((error) => {
    console.error("Error fetching assignments:", error);
  });
```

If you encounter any issues or have further questions, please refer to the [WaniKani API documentation](https://docs.api.wanikani.com/20170710/) or create an issue.
