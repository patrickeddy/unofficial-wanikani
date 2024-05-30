export interface WaniKaniResource<T> {
  id: number;
  object: string;
  url: string;
  data_updated_at: string;
  data: T;
}

export interface WaniKaniCollection<T> {
  id: number;
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

export type Assignment = WaniKaniResource<{
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
}>;

export type LevelProgression = WaniKaniResource<{
  created_at: string;
  level: number;
  unlocked_at: string;
  started_at: string | null;
  passed_at: string | null;
  completed_at: string | null;
  abandoned_at: string | null;
}>;

export type Review = WaniKaniResource<{
  created_at: string;
  assignment_id: number;
  subject_id: number;
  starting_srs_stage: number;
  ending_srs_stage: number;
  incorrect_meaning_answers: number;
  incorrect_reading_answers: number;
}>;

export type Subject = WaniKaniResource<{
  created_at: string;
  level: number;
  slug: string;
  hidden_at: string | null;
  document_url: string;
  characters: string | null;
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
}>;

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

export interface AssignmentsParams extends PaginationParams {
  available_after?: string;
  available_before?: string;
  burned?: boolean;
  hidden?: boolean;
  ids?: string;
  immediately_available_for_lessons?: boolean;
  immediately_available_for_review?: boolean;
  in_review?: boolean;
  levels?: string;
  resource_types?: string;
  srs_stages?: string;
  started?: boolean;
  subject_ids?: string;
  unlocked?: boolean;
}

export interface ReviewsParams extends PaginationParams {
  assignment_ids?: string;
  ids?: string;
  subject_ids?: string;
  subject_types?: string;
  updated_after?: string;
}

export interface SubjectsParams extends PaginationParams {
  hidden?: boolean;
  ids?: string;
  levels?: string;
  slugs?: string;
  types?: string;
  updated_after?: string;
}

export interface CreateReviewData {
  created_at?: string;
  assignment_id: number;
  incorrect_meaning_answers: number;
  incorrect_reading_answers: number;
}
