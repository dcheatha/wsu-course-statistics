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
  subject: string,
  catalog_no?: number;
  titles?: string[];
  total_headcount?: number;
  total_dropped?: number;
  campuses?: string[];
}

export interface Courses {
  courses: Course[];
}

export interface Course {
  year: number;
  semester: string;
  campus: string;
  academic_group: string;
  subject: string;
  catalog_no: number;
  section: string;
  course_no: number;
  title: string;
  instructor?: string | null;
  headcount: number;
  dropped: number;
  meeting_times?: string | null;
}