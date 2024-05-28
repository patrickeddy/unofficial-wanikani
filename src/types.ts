// api data types

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

export interface LevelProgression {
  created_at: string;
  level: number;
  unlocked_at: string;
  started_at: string | null;
  passed_at: string | null;
  completed_at: string | null;
  abandoned_at: string | null;
}

export interface Review {
  created_at: string;
  subject_id: number;
  subject_type: string;
  starting_srs_stage: number;
  ending_srs_stage: number;
  incorrect_meaning_answers: number;
  incorrect_reading_answers: number;
}

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

// api responses

type WaniKaniDataType = Assignment | LevelProgression | Review | Subject;

export interface WaniKaniResourceResponse<T extends WaniKaniDataType> {
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
  data: T | T[];
}

export interface WaniKaniResource<T extends WaniKaniDataType>
  extends WaniKaniResourceResponse<T> {
  data: T;
}

export interface WaniKaniCollection<T extends WaniKaniDataType>
  extends WaniKaniResourceResponse<T> {
  data: T[];
}
