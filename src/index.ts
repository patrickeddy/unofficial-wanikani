import {
  Assignment,
  LevelProgression,
  Review,
  Subject,
  WaniKaniCollection,
  WaniKaniResource,
} from "./types";

// types

export interface RequestOptions {
  endpoint: string;
  method?: string;
  data?: any;
  apiKey: string;
  version?: string;
}

export interface ErrorResponse {
  code: number;
  error: string;
}

export interface PaginationParams {
  page_after_id?: string;
  page_before_id?: string;
  page_after?: string;
  page_before?: string;
  per_page?: string;
}

// request util functions

const getBaseUrl = (version: string = "20170710") =>
  `https://api.wanikani.com/${version}/`;

async function apiRequest<T>({
  endpoint,
  method = "GET",
  data,
  apiKey,
  version,
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

  const response = await fetch(`${getBaseUrl(version)}${endpoint}`, options);

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
  { version, params }: { version?: string; params?: PaginationParams } = {}
): Promise<T> {
  const queryString = buildQueryString(params || {});
  return apiRequest<T>({
    apiKey,
    endpoint: `${endpoint}${queryString}`,
    version,
  });
}

// api helper functions

/**
 * Fetches a collection of assignments from the WaniKani API.
 *
 * @param apiKey - The API key for the WaniKani API.
 * @param options - Optional object containing version and pagination parameters.
 * @returns A promise that resolves to a WaniKaniCollection of Assignments.
 */
export const fetchAssignments = (
  apiKey: string,
  options?: { version?: string; params?: PaginationParams }
) =>
  fetchResource<WaniKaniCollection<Assignment>>(apiKey, "assignments", options);

/**
 * Fetches a specific assignment from the WaniKani API.
 *
 * @param apiKey - The API key for the WaniKani API.
 * @param id - The ID of the assignment to fetch.
 * @param options - Optional object containing version.
 * @returns A promise that resolves to a WaniKaniResource of an Assignment.
 */
export const fetchAssignment = (
  apiKey: string,
  id: number,
  options?: { version?: string }
) =>
  fetchResource<WaniKaniResource<Assignment>>(
    apiKey,
    `assignments/${id}`,
    options
  );

/**
 * Fetches a collection of level progressions from the WaniKani API.
 *
 * @param apiKey - The API key for the WaniKani API.
 * @param options - Optional object containing version and pagination parameters.
 * @returns A promise that resolves to a WaniKaniCollection of LevelProgressions.
 */
export const fetchLevelProgressions = (
  apiKey: string,
  options?: { version?: string; params?: PaginationParams }
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
 * @param options - Optional object containing version.
 * @returns A promise that resolves to a WaniKaniResource of a LevelProgression.
 */
export const fetchLevelProgression = (
  apiKey: string,
  id: number,
  options?: { version?: string }
) =>
  fetchResource<WaniKaniResource<LevelProgression>>(
    apiKey,
    `level_progressions/${id}`,
    options
  );

/**
 * Fetches a collection of reviews from the WaniKani API.
 *
 * @param apiKey - The API key for the WaniKani API.
 * @param options - Optional object containing version and pagination parameters.
 * @returns A promise that resolves to a WaniKaniCollection of Reviews.
 */
export const fetchReviews = (
  apiKey: string,
  options?: { version?: string; params?: PaginationParams }
) => fetchResource<WaniKaniCollection<Review>>(apiKey, "reviews", options);

/**
 * Fetches a specific review from the WaniKani API.
 *
 * @param apiKey - The API key for the WaniKani API.
 * @param id - The ID of the review to fetch.
 * @param options - Optional object containing version.
 * @returns A promise that resolves to a WaniKaniResource of a Review.
 */
export const fetchReview = (
  apiKey: string,
  id: number,
  options?: { version?: string }
) => fetchResource<WaniKaniResource<Review>>(apiKey, `reviews/${id}`, options);

/**
 * Fetches a collection of subjects from the WaniKani API.
 *
 * @param apiKey - The API key for the WaniKani API.
 * @param options - Optional object containing version and pagination parameters.
 * @returns A promise that resolves to a WaniKaniCollection of Subjects.
 */
export const fetchSubjects = (
  apiKey: string,
  options?: { version?: string; params?: PaginationParams }
) => fetchResource<WaniKaniCollection<Subject>>(apiKey, "subjects", options);

/**
 * Fetches a specific subject from the WaniKani API.
 *
 * @param apiKey - The API key for the WaniKani API.
 * @param id - The ID of the subject to fetch.
 * @param options - Optional object containing version.
 * @returns A promise that resolves to a WaniKaniResource of a Subject.
 */
export const fetchSubject = (
  apiKey: string,
  id: number,
  options?: { version?: string }
) =>
  fetchResource<WaniKaniResource<Subject>>(apiKey, `subjects/${id}`, options);

/**
 * Creates a WaniKani client instance.
 *
 * @param apiKey - The API key for accessing the WaniKani API.
 * @param options - Optional object containing version.
 * @returns An object with methods for fetching various data from the WaniKani API.
 */
export default function WaniKani(
  apiKey: string,
  options?: { version?: string }
) {
  return {
    /**
     * Fetches a collection of assignments from the WaniKani API.
     *
     * @param options - Optional object containing version and pagination parameters.
     * @returns A promise that resolves to a WaniKaniCollection of Assignments.
     */
    fetchAssignments: (options?: {
      version?: string;
      params?: PaginationParams;
    }) => fetchAssignments(apiKey, options),

    /**
     * Fetches a specific assignment from the WaniKani API.
     *
     * @param id - The ID of the assignment to fetch.
     * @param options - Optional object containing version.
     * @returns A promise that resolves to a WaniKaniResource of an Assignment.
     */
    fetchAssignment: (id: number, options?: { version?: string }) =>
      fetchAssignment(apiKey, id, options),

    /**
     * Fetches a collection of level progressions from the WaniKani API.
     *
     * @param options - Optional object containing version and pagination parameters.
     * @returns A promise that resolves to a WaniKaniCollection of LevelProgressions.
     */
    fetchLevelProgressions: (options?: {
      version?: string;
      params?: PaginationParams;
    }) => fetchLevelProgressions(apiKey, options),

    /**
     * Fetches a specific level progression from the WaniKani API.
     *
     * @param id - The ID of the level progression to fetch.
     * @param options - Optional object containing version.
     * @returns A promise that resolves to a WaniKaniResource of a LevelProgression.
     */
    fetchLevelProgression: (id: number, options?: { version?: string }) =>
      fetchLevelProgression(apiKey, id, options),

    /**
     * Fetches a collection of reviews from the WaniKani API.
     *
     * @param options - Optional object containing version and pagination parameters.
     * @returns A promise that resolves to a WaniKaniCollection of Reviews.
     */
    fetchReviews: (options?: { version?: string; params?: PaginationParams }) =>
      fetchReviews(apiKey, options),

    /**
     * Fetches a specific review from the WaniKani API.
     *
     * @param id - The ID of the review to fetch.
     * @param options - Optional object containing version.
     * @returns A promise that resolves to a WaniKaniResource of a Review.
     */
    fetchReview: (id: number, options?: { version?: string }) =>
      fetchReview(apiKey, id, options),

    /**
     * Fetches a collection of subjects from the WaniKani API.
     *
     * @param options - Optional object containing version and pagination parameters.
     * @returns A promise that resolves to a WaniKaniCollection of Subjects.
     */
    fetchSubjects: (options?: {
      version?: string;
      params?: PaginationParams;
    }) => fetchSubjects(apiKey, options),

    /**
     * Fetches a specific subject from the WaniKani API.
     *
     * @param id - The ID of the subject to fetch.
     * @param options - Optional object containing version.
     * @returns A promise that resolves to a WaniKaniResource of a Subject.
     */
    fetchSubject: (id: number, options?: { version?: string }) =>
      fetchSubject(apiKey, id, options),
  };
}
