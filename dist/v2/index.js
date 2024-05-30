var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// request util functions
const getBaseUrl = () => `https://api.wanikani.com/v2/`;
function apiRequest({ endpoint, method = "GET", data, apiKey, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const options = {
            method,
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
        };
        if (data) {
            options.body = JSON.stringify(data);
        }
        const response = yield fetch(`${getBaseUrl()}${endpoint}`, options);
        if (!response.ok) {
            const errorResponse = yield response.json();
            throw new Error(`Error ${errorResponse.code}: ${errorResponse.error}`);
        }
        return response.json();
    });
}
const buildQueryString = (params) => {
    const query = new URLSearchParams(params).toString();
    return query ? `?${query}` : "";
};
function fetchResource(apiKey, endpoint, { params } = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        const queryString = buildQueryString(params || {});
        return apiRequest({
            apiKey,
            endpoint: `${endpoint}${queryString}`,
        });
    });
}
function updateResource(apiKey, endpoint, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return apiRequest({
            apiKey,
            endpoint,
            method: "PUT",
            data,
        });
    });
}
function createResource(apiKey, endpoint, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return apiRequest({
            apiKey,
            endpoint,
            method: "POST",
            data,
        });
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
export const fetchAssignments = (apiKey, options) => fetchResource(apiKey, "assignments", options);
/**
 * Fetches a specific assignment from the WaniKani API.
 *
 * @param apiKey - The API key for the WaniKani API.
 * @param id - The ID of the assignment to fetch.
 * @param options - Optional object containing pagination parameters.
 * @returns A promise that resolves to a WaniKaniResource of an Assignment.
 */
export const fetchAssignment = (apiKey, id, options) => fetchResource(apiKey, `assignments/${id}`, options);
/**
 * Updates a specific assignment in the WaniKani API.
 *
 * @param apiKey - The API key for the WaniKani API.
 * @param id - The ID of the assignment to update.
 * @param data - The data to update.
 * @param options - Optional object containing pagination parameters.
 * @returns A promise that resolves to a WaniKaniResource of an Assignment.
 */
export const updateAssignment = (apiKey, id, data) => updateResource(apiKey, `assignments/${id}`, data);
/**
 * Fetches a collection of level progressions from the WaniKani API.
 *
 * @param apiKey - The API key for the WaniKani API.
 * @param options - Optional object containing pagination parameters.
 * @returns A promise that resolves to a WaniKaniCollection of LevelProgressions.
 */
export const fetchLevelProgressions = (apiKey, options) => fetchResource(apiKey, "level_progressions", options);
/**
 * Fetches a specific level progression from the WaniKani API.
 *
 * @param apiKey - The API key for the WaniKani API.
 * @param id - The ID of the level progression to fetch.
 * @param options - Optional object containing pagination parameters.
 * @returns A promise that resolves to a WaniKaniResource of a LevelProgression.
 */
export const fetchLevelProgression = (apiKey, id, options) => fetchResource(apiKey, `level_progressions/${id}`, options);
/**
 * Fetches a collection of reviews from the WaniKani API.
 *
 * @param apiKey - The API key for the WaniKani API.
 * @param options - Optional object containing pagination parameters.
 * @returns A promise that resolves to a WaniKaniCollection of Reviews.
 */
export const fetchReviews = (apiKey, options) => fetchResource(apiKey, "reviews", options);
/**
 * Fetches a specific review from the WaniKani API.
 *
 * @param apiKey - The API key for the WaniKani API.
 * @param id - The ID of the review to fetch.
 * @param options - Optional object containing pagination parameters.
 * @returns A promise that resolves to a WaniKaniResource of a Review.
 */
export const fetchReview = (apiKey, id, options) => fetchResource(apiKey, `reviews/${id}`, options);
/**
 * Creates a new review in the WaniKani API.
 *
 * @param apiKey - The API key for the WaniKani API.
 * @param data - The data to create.
 * @returns A promise that resolves to a WaniKaniResource of a Review.
 */
export const createReview = (apiKey, data) => createResource(apiKey, "reviews", data);
/**
 * Fetches a collection of subjects from the WaniKani API.
 *
 * @param apiKey - The API key for the WaniKani API.
 * @param options - Optional object containing pagination parameters.
 * @returns A promise that resolves to a WaniKaniCollection of Subjects.
 */
export const fetchSubjects = (apiKey, options) => fetchResource(apiKey, "subjects", options);
/**
 * Fetches a specific subject from the WaniKani API.
 *
 * @param apiKey - The API key for the WaniKani API.
 * @param id - The ID of the subject to fetch.
 * @param options - Optional object containing pagination parameters.
 * @returns A promise that resolves to a WaniKaniResource of a Subject.
 */
export const fetchSubject = (apiKey, id, options) => fetchResource(apiKey, `subjects/${id}`, options);
/**
 * Creates a WaniKani client instance.
 *
 * @param apiKey - The API key for accessing the WaniKani API.
 * @returns An object with methods for fetching various data from the WaniKani API.
 */
export default function WaniKani(apiKey) {
    return {
        /**
         * Fetches a collection of assignments from the WaniKani API.
         *
         * @param options - Optional object containing pagination parameters.
         * @returns A promise that resolves to a WaniKaniCollection of Assignments.
         */
        fetchAssignments: (options) => fetchAssignments(apiKey, options),
        /**
         * Fetches a specific assignment from the WaniKani API.
         *
         * @param id - The ID of the assignment to fetch.
         * @param options - Optional object containing pagination parameters.
         * @returns A promise that resolves to a WaniKaniResource of an Assignment.
         */
        fetchAssignment: (id, options) => fetchAssignment(apiKey, id, options),
        /**
         * Updates a specific assignment in the WaniKani API.
         *
         * @param id - The ID of the assignment to update.
         * @param data - The data to update.
         * @returns A promise that resolves to a WaniKaniResource of an Assignment.
         */
        updateAssignment: (id, data) => updateAssignment(apiKey, id, data),
        /**
         * Fetches a collection of level progressions from the WaniKani API.
         *
         * @param options - Optional object containing pagination parameters.
         * @returns A promise that resolves to a WaniKaniCollection of LevelProgressions.
         */
        fetchLevelProgressions: (options) => fetchLevelProgressions(apiKey, options),
        /**
         * Fetches a specific level progression from the WaniKani API.
         *
         * @param id - The ID of the level progression to fetch.
         * @param options - Optional object containing pagination parameters.
         * @returns A promise that resolves to a WaniKaniResource of a LevelProgression.
         */
        fetchLevelProgression: (id, options) => fetchLevelProgression(apiKey, id, options),
        /**
         * Fetches a collection of reviews from the WaniKani API.
         *
         * @param options - Optional object containing pagination parameters.
         * @returns A promise that resolves to a WaniKaniCollection of Reviews.
         */
        fetchReviews: (options) => fetchReviews(apiKey, options),
        /**
         * Fetches a specific review from the WaniKani API.
         *
         * @param id - The ID of the review to fetch.
         * @param options - Optional object containing pagination parameters.
         * @returns A promise that resolves to a WaniKaniResource of a Review.
         */
        fetchReview: (id, options) => fetchReview(apiKey, id, options),
        /**
         * Creates a new review in the WaniKani API.
         *
         * @param data - The data to create.
         * @returns A promise that resolves to a WaniKaniResource of a Review.
         */
        createReview: (data) => createReview(apiKey, data),
        /**
         * Fetches a collection of subjects from the WaniKani API.
         *
         * @param options - Optional object containing pagination parameters.
         * @returns A promise that resolves to a WaniKaniCollection of Subjects.
         */
        fetchSubjects: (options) => fetchSubjects(apiKey, options),
        /**
         * Fetches a specific subject from the WaniKani API.
         *
         * @param id - The ID of the subject to fetch.
         * @param options - Optional object containing pagination parameters.
         * @returns A promise that resolves to a WaniKaniResource of a Subject.
         */
        fetchSubject: (id, options) => fetchSubject(apiKey, id, options),
    };
}
