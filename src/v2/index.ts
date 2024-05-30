import {
  Assignment,
  AssignmentsParams,
  CreateReviewData,
  ErrorResponse,
  LevelProgression,
  PaginationParams,
  RequestOptions,
  Review,
  ReviewsParams,
  Subject,
  SubjectsParams,
  WaniKaniCollection,
} from "./types";

// request util functions

const getBaseUrl = () => `https://api.wanikani.com/v2/`;

async function apiRequest<T>({
  endpoint,
  method = "GET",
  data,
  apiKey,
}: RequestOptions): Promise<T> {
  const options: RequestInit = {
    method,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(`${getBaseUrl()}${endpoint}`, options);

  if (!response.ok) {
    const errorResponse: ErrorResponse = await response.json();
    throw new Error(`Error ${errorResponse.code}: ${errorResponse.error}`);
  }

  return response.json();
}

const buildQueryString = (params: PaginationParams): string => {
  const query = new URLSearchParams(params as any).toString();
  return query ? `?${query}` : "";
};

async function fetchResource<T>(
  apiKey: string,
  endpoint: string,
  { params }: { params?: PaginationParams } = {}
): Promise<T> {
  const queryString = buildQueryString(params || {});
  return apiRequest<T>({
    apiKey,
    endpoint: `${endpoint}${queryString}`,
  });
}

async function updateResource<T>(
  apiKey: string,
  endpoint: string,
  data: any
): Promise<T> {
  return apiRequest<T>({
    apiKey,
    endpoint,
    method: "PUT",
    data,
  });
}

async function createResource<T>(
  apiKey: string,
  endpoint: string,
  data: any
): Promise<T> {
  return apiRequest<T>({
    apiKey,
    endpoint,
    method: "POST",
    data,
  });
}

// api helper functions

/**
 * Fetches a collection of assignments from the WaniKani API.
 *
 * @param apiKey - The API key for the WaniKani API.
 * @param options - Optional object containing pagination parameters.
 * @returns A promise that resolves to a WaniKaniCollection of Assignments.
 */
export const fetchAssignments = (
  apiKey: string,
  options?: { params?: AssignmentsParams }
) =>
  fetchResource<WaniKaniCollection<Assignment>>(apiKey, "assignments", options);

/**
 * Fetches a specific assignment from the WaniKani API.
 *
 * @param apiKey - The API key for the WaniKani API.
 * @param id - The ID of the assignment to fetch.
 * @param options - Optional object containing pagination parameters.
 * @returns A promise that resolves to a WaniKaniResource of an Assignment.
 */
export const fetchAssignment = (apiKey: string, id: number, options?: {}) =>
  fetchResource<Assignment>(apiKey, `assignments/${id}`, options);

/**
 * Updates a specific assignment in the WaniKani API.
 *
 * @param apiKey - The API key for the WaniKani API.
 * @param id - The ID of the assignment to update.
 * @param data - The data to update.
 * @param options - Optional object containing pagination parameters.
 * @returns A promise that resolves to a WaniKaniResource of an Assignment.
 */
export const updateAssignment = (
  apiKey: string,
  id: number,
  data: Partial<Pick<Assignment, "data">>
) => updateResource<Assignment>(apiKey, `assignments/${id}`, data);

/**
 * Fetches a collection of level progressions from the WaniKani API.
 *
 * @param apiKey - The API key for the WaniKani API.
 * @param options - Optional object containing pagination parameters.
 * @returns A promise that resolves to a WaniKaniCollection of LevelProgressions.
 */
export const fetchLevelProgressions = (
  apiKey: string,
  options?: { params?: PaginationParams }
) =>
  fetchResource<WaniKaniCollection<LevelProgression>>(
    apiKey,
    "level_progressions",
    options
  );

/**
 * Fetches a specific level progression from the WaniKani API.
 *
 * @param apiKey - The API key for the WaniKani API.
 * @param id - The ID of the level progression to fetch.
 * @param options - Optional object containing pagination parameters.
 * @returns A promise that resolves to a WaniKaniResource of a LevelProgression.
 */
export const fetchLevelProgression = (
  apiKey: string,
  id: number,
  options?: {}
) =>
  fetchResource<LevelProgression>(apiKey, `level_progressions/${id}`, options);

/**
 * Fetches a collection of reviews from the WaniKani API.
 *
 * @param apiKey - The API key for the WaniKani API.
 * @param options - Optional object containing pagination parameters.
 * @returns A promise that resolves to a WaniKaniCollection of Reviews.
 */
export const fetchReviews = (
  apiKey: string,
  options?: { params?: ReviewsParams }
) => fetchResource<WaniKaniCollection<Review>>(apiKey, "reviews", options);

/**
 * Fetches a specific review from the WaniKani API.
 *
 * @param apiKey - The API key for the WaniKani API.
 * @param id - The ID of the review to fetch.
 * @param options - Optional object containing pagination parameters.
 * @returns A promise that resolves to a WaniKaniResource of a Review.
 */
export const fetchReview = (apiKey: string, id: number, options?: {}) =>
  fetchResource<Review>(apiKey, `reviews/${id}`, options);

/**
 * Creates a new review in the WaniKani API.
 *
 * @param apiKey - The API key for the WaniKani API.
 * @param data - The data to create.
 * @returns A promise that resolves to a WaniKaniResource of a Review.
 */
export const createReview = (apiKey: string, data: CreateReviewData) =>
  createResource<Review>(apiKey, "reviews", data);

/**
 * Fetches a collection of subjects from the WaniKani API.
 *
 * @param apiKey - The API key for the WaniKani API.
 * @param options - Optional object containing pagination parameters.
 * @returns A promise that resolves to a WaniKaniCollection of Subjects.
 */
export const fetchSubjects = (
  apiKey: string,
  options?: { params?: SubjectsParams }
) => fetchResource<WaniKaniCollection<Subject>>(apiKey, "subjects", options);

/**
 * Fetches a specific subject from the WaniKani API.
 *
 * @param apiKey - The API key for the WaniKani API.
 * @param id - The ID of the subject to fetch.
 * @param options - Optional object containing pagination parameters.
 * @returns A promise that resolves to a WaniKaniResource of a Subject.
 */
export const fetchSubject = (apiKey: string, id: number, options?: {}) =>
  fetchResource<Subject>(apiKey, `subjects/${id}`, options);

/**
 * Creates a WaniKani client instance.
 *
 * @param apiKey - The API key for accessing the WaniKani API.
 * @returns An object with methods for fetching various data from the WaniKani API.
 */
export default function WaniKani(apiKey: string) {
  return {
    /**
     * Fetches a collection of assignments from the WaniKani API.
     *
     * @param options - Optional object containing pagination parameters.
     * @returns A promise that resolves to a WaniKaniCollection of Assignments.
     */
    fetchAssignments: (options?: { params?: AssignmentsParams }) =>
      fetchAssignments(apiKey, options),

    /**
     * Fetches a specific assignment from the WaniKani API.
     *
     * @param id - The ID of the assignment to fetch.
     * @param options - Optional object containing pagination parameters.
     * @returns A promise that resolves to a WaniKaniResource of an Assignment.
     */
    fetchAssignment: (id: number, options?: {}) =>
      fetchAssignment(apiKey, id, options),

    /**
     * Updates a specific assignment in the WaniKani API.
     *
     * @param id - The ID of the assignment to update.
     * @param data - The data to update.
     * @returns A promise that resolves to a WaniKaniResource of an Assignment.
     */
    updateAssignment: (id: number, data: Partial<Pick<Assignment, "data">>) =>
      updateAssignment(apiKey, id, data),

    /**
     * Fetches a collection of level progressions from the WaniKani API.
     *
     * @param options - Optional object containing pagination parameters.
     * @returns A promise that resolves to a WaniKaniCollection of LevelProgressions.
     */
    fetchLevelProgressions: (options?: { params?: PaginationParams }) =>
      fetchLevelProgressions(apiKey, options),

    /**
     * Fetches a specific level progression from the WaniKani API.
     *
     * @param id - The ID of the level progression to fetch.
     * @param options - Optional object containing pagination parameters.
     * @returns A promise that resolves to a WaniKaniResource of a LevelProgression.
     */
    fetchLevelProgression: (id: number, options?: {}) =>
      fetchLevelProgression(apiKey, id, options),

    /**
     * Fetches a collection of reviews from the WaniKani API.
     *
     * @param options - Optional object containing pagination parameters.
     * @returns A promise that resolves to a WaniKaniCollection of Reviews.
     */
    fetchReviews: (options?: { params?: ReviewsParams }) =>
      fetchReviews(apiKey, options),

    /**
     * Fetches a specific review from the WaniKani API.
     *
     * @param id - The ID of the review to fetch.
     * @param options - Optional object containing pagination parameters.
     * @returns A promise that resolves to a WaniKaniResource of a Review.
     */
    fetchReview: (id: number, options?: {}) => fetchReview(apiKey, id, options),

    /**
     * Creates a new review in the WaniKani API.
     *
     * @param data - The data to create.
     * @returns A promise that resolves to a WaniKaniResource of a Review.
     */
    createReview: (data: CreateReviewData) => createReview(apiKey, data),

    /**
     * Fetches a collection of subjects from the WaniKani API.
     *
     * @param options - Optional object containing pagination parameters.
     * @returns A promise that resolves to a WaniKaniCollection of Subjects.
     */
    fetchSubjects: (options?: { params?: SubjectsParams }) =>
      fetchSubjects(apiKey, options),

    /**
     * Fetches a specific subject from the WaniKani API.
     *
     * @param id - The ID of the subject to fetch.
     * @param options - Optional object containing pagination parameters.
     * @returns A promise that resolves to a WaniKaniResource of a Subject.
     */
    fetchSubject: (id: number, options?: {}) =>
      fetchSubject(apiKey, id, options),
  };
}
