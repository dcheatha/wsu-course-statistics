import { CourseSearch, Courses, SubjectCourses } from "./models";
import { Subjects } from "./models";

export async function fetchAllSubjects(): Promise<Subjects | null> {
  try {
    const response = await fetch("http://127.0.0.1:8000/subject");
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export async function fetchSubjectCourses(
  subject: string,
): Promise<SubjectCourses | null> {
  try {
    const response = await fetch(`http://127.0.0.1:8000/subject/${subject}`);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export async function fetchCourse(
  subject: string,
  catalogNo: String,
): Promise<Courses | null> {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/course/${subject}/${catalogNo}`,
    );
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export async function fetchSearch(text: string): Promise<CourseSearch | null> {
  try {
    const response = await fetch(`http://127.0.0.1:8000/search?search=${text}`);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
