import { Assignment, AssignmentsParams, CreateReviewData, LevelProgression, PaginationParams, Review, ReviewsParams, Subject, SubjectsParams, WaniKaniCollection, WaniKaniResource } from "./types";
/**
 * Fetches a collection of assignments from the WaniKani API.
 *
 * @param apiKey - The API key for the WaniKani API.
 * @param options - Optional object containing pagination parameters.
 * @returns A promise that resolves to a WaniKaniCollection of Assignments.
 */
export declare const fetchAssignments: (apiKey: string, options?: {
    params?: AssignmentsParams;
}) => Promise<WaniKaniCollection<Assignment>>;
/**
 * Fetches a specific assignment from the WaniKani API.
 *
 * @param apiKey - The API key for the WaniKani API.
 * @param id - The ID of the assignment to fetch.
 * @param options - Optional object containing pagination parameters.
 * @returns A promise that resolves to a WaniKaniResource of an Assignment.
 */
export declare const fetchAssignment: (apiKey: string, id: number, options?: {}) => Promise<WaniKaniResource<Assignment>>;
/**
 * Updates a specific assignment in the WaniKani API.
 *
 * @param apiKey - The API key for the WaniKani API.
 * @param id - The ID of the assignment to update.
 * @param data - The data to update.
 * @param options - Optional object containing pagination parameters.
 * @returns A promise that resolves to a WaniKaniResource of an Assignment.
 */
export declare const updateAssignment: (apiKey: string, id: number, data: Partial<Assignment>) => Promise<WaniKaniResource<Assignment>>;
/**
 * Fetches a collection of level progressions from the WaniKani API.
 *
 * @param apiKey - The API key for the WaniKani API.
 * @param options - Optional object containing pagination parameters.
 * @returns A promise that resolves to a WaniKaniCollection of LevelProgressions.
 */
export declare const fetchLevelProgressions: (apiKey: string, options?: {
    params?: PaginationParams;
}) => Promise<WaniKaniCollection<LevelProgression>>;
/**
 * Fetches a specific level progression from the WaniKani API.
 *
 * @param apiKey - The API key for the WaniKani API.
 * @param id - The ID of the level progression to fetch.
 * @param options - Optional object containing pagination parameters.
 * @returns A promise that resolves to a WaniKaniResource of a LevelProgression.
 */
export declare const fetchLevelProgression: (apiKey: string, id: number, options?: {}) => Promise<WaniKaniResource<LevelProgression>>;
/**
 * Fetches a collection of reviews from the WaniKani API.
 *
 * @param apiKey - The API key for the WaniKani API.
 * @param options - Optional object containing pagination parameters.
 * @returns A promise that resolves to a WaniKaniCollection of Reviews.
 */
export declare const fetchReviews: (apiKey: string, options?: {
    params?: ReviewsParams;
}) => Promise<WaniKaniCollection<Review>>;
/**
 * Fetches a specific review from the WaniKani API.
 *
 * @param apiKey - The API key for the WaniKani API.
 * @param id - The ID of the review to fetch.
 * @param options - Optional object containing pagination parameters.
 * @returns A promise that resolves to a WaniKaniResource of a Review.
 */
export declare const fetchReview: (apiKey: string, id: number, options?: {}) => Promise<WaniKaniResource<Review>>;
/**
 * Creates a new review in the WaniKani API.
 *
 * @param apiKey - The API key for the WaniKani API.
 * @param data - The data to create.
 * @returns A promise that resolves to a WaniKaniResource of a Review.
 */
export declare const createReview: (apiKey: string, data: CreateReviewData) => Promise<WaniKaniResource<Review>>;
/**
 * Fetches a collection of subjects from the WaniKani API.
 *
 * @param apiKey - The API key for the WaniKani API.
 * @param options - Optional object containing pagination parameters.
 * @returns A promise that resolves to a WaniKaniCollection of Subjects.
 */
export declare const fetchSubjects: (apiKey: string, options?: {
    params?: SubjectsParams;
}) => Promise<WaniKaniCollection<Subject>>;
/**
 * Fetches a specific subject from the WaniKani API.
 *
 * @param apiKey - The API key for the WaniKani API.
 * @param id - The ID of the subject to fetch.
 * @param options - Optional object containing pagination parameters.
 * @returns A promise that resolves to a WaniKaniResource of a Subject.
 */
export declare const fetchSubject: (apiKey: string, id: number, options?: {}) => Promise<WaniKaniResource<Subject>>;
/**
 * Creates a WaniKani client instance.
 *
 * @param apiKey - The API key for accessing the WaniKani API.
 * @returns An object with methods for fetching various data from the WaniKani API.
 */
export default function WaniKani(apiKey: string): {
    /**
     * Fetches a collection of assignments from the WaniKani API.
     *
     * @param options - Optional object containing pagination parameters.
     * @returns A promise that resolves to a WaniKaniCollection of Assignments.
     */
    fetchAssignments: (options?: {
        params?: AssignmentsParams;
    }) => Promise<WaniKaniCollection<Assignment>>;
    /**
     * Fetches a specific assignment from the WaniKani API.
     *
     * @param id - The ID of the assignment to fetch.
     * @param options - Optional object containing pagination parameters.
     * @returns A promise that resolves to a WaniKaniResource of an Assignment.
     */
    fetchAssignment: (id: number, options?: {}) => Promise<WaniKaniResource<Assignment>>;
    /**
     * Updates a specific assignment in the WaniKani API.
     *
     * @param id - The ID of the assignment to update.
     * @param data - The data to update.
     * @returns A promise that resolves to a WaniKaniResource of an Assignment.
     */
    updateAssignment: (id: number, data: Partial<Assignment>) => Promise<WaniKaniResource<Assignment>>;
    /**
     * Fetches a collection of level progressions from the WaniKani API.
     *
     * @param options - Optional object containing pagination parameters.
     * @returns A promise that resolves to a WaniKaniCollection of LevelProgressions.
     */
    fetchLevelProgressions: (options?: {
        params?: PaginationParams;
    }) => Promise<WaniKaniCollection<LevelProgression>>;
    /**
     * Fetches a specific level progression from the WaniKani API.
     *
     * @param id - The ID of the level progression to fetch.
     * @param options - Optional object containing pagination parameters.
     * @returns A promise that resolves to a WaniKaniResource of a LevelProgression.
     */
    fetchLevelProgression: (id: number, options?: {}) => Promise<WaniKaniResource<LevelProgression>>;
    /**
     * Fetches a collection of reviews from the WaniKani API.
     *
     * @param options - Optional object containing pagination parameters.
     * @returns A promise that resolves to a WaniKaniCollection of Reviews.
     */
    fetchReviews: (options?: {
        params?: ReviewsParams;
    }) => Promise<WaniKaniCollection<Review>>;
    /**
     * Fetches a specific review from the WaniKani API.
     *
     * @param id - The ID of the review to fetch.
     * @param options - Optional object containing pagination parameters.
     * @returns A promise that resolves to a WaniKaniResource of a Review.
     */
    fetchReview: (id: number, options?: {}) => Promise<WaniKaniResource<Review>>;
    /**
     * Creates a new review in the WaniKani API.
     *
     * @param data - The data to create.
     * @returns A promise that resolves to a WaniKaniResource of a Review.
     */
    createReview: (data: CreateReviewData) => Promise<WaniKaniResource<Review>>;
    /**
     * Fetches a collection of subjects from the WaniKani API.
     *
     * @param options - Optional object containing pagination parameters.
     * @returns A promise that resolves to a WaniKaniCollection of Subjects.
     */
    fetchSubjects: (options?: {
        params?: SubjectsParams;
    }) => Promise<WaniKaniCollection<Subject>>;
    /**
     * Fetches a specific subject from the WaniKani API.
     *
     * @param id - The ID of the subject to fetch.
     * @param options - Optional object containing pagination parameters.
     * @returns A promise that resolves to a WaniKaniResource of a Subject.
     */
    fetchSubject: (id: number, options?: {}) => Promise<WaniKaniResource<Subject>>;
};
