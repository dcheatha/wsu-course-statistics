export interface CourseSearchItem {
  subject: string;
  catalog_no: number;
  title?: string | null;
  total_headcount?: number | null;
}

export interface CourseSearch {
  courses: CourseSearchItem[];
}

export interface Subject {
  subject?: string;
  total_headcount?: number;
  total_dropped?: number;
  courses_offered?: number;
  campuses?: string[];
}

export interface Subjects {
  items: Subject[];
}

export interface SubjectCourses {
  courses: SubjectCourse[];
}

export interface SubjectCourse {
  catalog_no?: number;
  titles?: string[];
  total_headcount?: number;
  total_dropped?: number;
  campuses?: string[];
}