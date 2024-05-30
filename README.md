# The (Unofficial) WaniKani Client

This package provides a client for interacting with the WaniKani API. It supports fetching and updating assignments, reviews, and subjects, as well as creating reviews.

## Installation

```bash
npm install unofficial-wanikani
```

## Usage

### Importing the Client

```typescript
import WaniKani from "unofficial-wanikani";
```

### Creating a Client Instance

```typescript
const client = WaniKani("your_wanikani_api_key");
```

### Fetching Data with Client Instance

#### Fetching Assignments

```typescript
const assignments = await client.fetchAssignments({
  params: { immediately_available_for_lessons: true },
});
```

#### Fetching a Specific Assignment

```typescript
const assignment = await client.fetchAssignment(12345);
```

#### Fetching Level Progressions

```typescript
const levelProgressions = await client.fetchLevelProgressions();
```

#### Fetching a Specific Level Progression

```typescript
const levelProgression = await client.fetchLevelProgression(67890);
```

#### Fetching Reviews

```typescript
const reviews = await client.fetchReviews({
  params: { assignment_ids: "12345,67890" },
});
```

#### Fetching a Specific Review

```typescript
const review = await client.fetchReview(111213);
```

#### Creating a Review

```typescript
const newReview = await client.createReview({
  assignment_id: 12345,
  incorrect_meaning_answers: 1,
  incorrect_reading_answers: 0,
});
```

#### Fetching Subjects

```typescript
const subjects = await client.fetchSubjects({ params: { ids: "12345,67890" } });
```

#### Fetching a Specific Subject

```typescript
const subject = await client.fetchSubject(12345);
```

### Fetching Data with Raw Functions

If you prefer to use the raw functions without creating a client instance, you can do so as follows:

#### Fetching Assignments

```typescript
import { fetchAssignments } from "unofficial-wanikani";

const assignments = await fetchAssignments("your_wanikani_api_key", {
  params: { immediately_available_for_lessons: true },
});
```

#### Fetching a Specific Assignment

```typescript
import { fetchAssignment } from "unofficial-wanikani";

const assignment = await fetchAssignment("your_wanikani_api_key", 12345);
```

#### Fetching Level Progressions

```typescript
import { fetchLevelProgressions } from "unofficial-wanikani";

const levelProgressions = await fetchLevelProgressions("your_wanikani_api_key");
```

#### Fetching a Specific Level Progression

```typescript
import { fetchLevelProgression } from "unofficial-wanikani";

const levelProgression = await fetchLevelProgression(
  "your_wanikani_api_key",
  67890
);
```

#### Fetching Reviews

```typescript
import { fetchReviews } from "unofficial-wanikani";

const reviews = await fetchReviews("your_wanikani_api_key", {
  params: { assignment_ids: "12345,67890" },
});
```

#### Fetching a Specific Review

```typescript
import { fetchReview } from "unofficial-wanikani";

const review = await fetchReview("your_wanikani_api_key", 111213);
```

#### Creating a Review

```typescript
import { createReview } from "unofficial-wanikani";

const newReview = await createReview("your_wanikani_api_key", {
  assignment_id: 12345,
  incorrect_meaning_answers: 1,
  incorrect_reading_answers: 0,
});
```

#### Fetching Subjects

```typescript
import { fetchSubjects } from "unofficial-wanikani";

const subjects = await fetchSubjects("your_wanikani_api_key", {
  params: { ids: "12345,67890" },
});
```

#### Fetching a Specific Subject

```typescript
import { fetchSubject } from "unofficial-wanikani";

const subject = await fetchSubject("your_wanikani_api_key", 12345);
```

### Client Functions

The client instance provides the following functions:

- `fetchAssignments(options?: { params?: AssignmentsParams })`: Fetches a collection of assignments.
- `fetchAssignment(id: number)`: Fetches a specific assignment.
- `updateAssignment(id: number, data: Assignment)`: Updates a specific assignment.
- `fetchLevelProgressions(options?: { params?: PaginationParams })`: Fetches a collection of level progressions.
- `fetchLevelProgression(id: number)`: Fetches a specific level progression.
- `fetchReviews(options?: { params?: ReviewsParams })`: Fetches a collection of reviews.
- `fetchReview(id: number)`: Fetches a specific review.
- `createReview(data: CreateReviewData)`: Creates a new review.
- `fetchSubjects(options?: { params?: SubjectsParams })`: Fetches a collection of subjects.
- `fetchSubject(id: number)`: Fetches a specific subject.

### Types

#### `Assignment`

```typescript
export interface Assignment {
  created_at: string;
  subject_id: number;
  subject_type: string;
  srs_stage: number;
  srs_stage_name: string;
  unlocked_at: string;
  started_at: string | null;
  passed_at: string | null;
  burned_at: string | null;
  available_at: string;
  resurrected_at: string | null;
  passed: boolean;
  resurrected: boolean;
  hidden: boolean;
}
```

#### `LevelProgression`

```typescript
export interface LevelProgression {
  created_at: string;
  level: number;
  unlocked_at: string;
  started_at: string | null;
  passed_at: string | null;
  completed_at: string | null;
  abandoned_at: string | null;
}
```

#### `Review`

```typescript
export interface Review {
  created_at: string;
  subject_id: number;
  subject_type: string;
  starting_srs_stage: number;
  ending_srs_stage: number;
  incorrect_meaning_answers: number;
  incorrect_reading_answers: number;
}
```

#### `Subject`

```typescript
export interface Subject {
  created_at: string;
  level: number;
  slug: string;
  hidden_at: string | null;
  document_url: string;
  characters: string;
  meanings: Array<{
    meaning: string;
    primary: boolean;
    accepted_answer: boolean;
  }>;
  auxiliary_meanings: Array<{ type: string; text: string }>;
  readings: Array<{ type: string; primary: boolean; reading: string }>;
  parts_of_speech: string[];
  component_subject_ids: number[];
  amalgamation_subject_ids: number[];
}
```

#### `WaniKaniResource`

```typescript
export interface WaniKaniResource<T> {
  id: number;
  object: string;
  url: string;
  data_updated_at: string;
  data: T;
}
```

#### `WaniKaniCollection`

```typescript
export interface WaniKaniCollection<T> {
  object: string;
  url: string;
  pages: {
    per_page: number;
    next_url: string | null;
    previous_url: string | null;
  };
  total_count: number;
  data_updated_at: string;
  data: T[];
}
```

#### `CreateReviewData`

```typescript
export interface CreateReviewData {
  created_at?: string;
  assignment_id: number;
  incorrect_meaning_answers: number;
  incorrect_reading_answers: number;
}
```

## Example Project

An example project demonstrating how to use this client can be found [here](https://patrickeddy.github.io/unofficial-wanikani).

## License

This project is licensed under the MIT License.
