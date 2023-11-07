import { CourseSearch } from './models';
import { Subjects } from './models';



export async function fetchSubjects(): Promise<Subjects | null> {
  try {
    const response = await fetch('http://127.0.0.1:8000/subject');
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}export async function fetchSearch(text: String): Promise<CourseSearch | null> {
  try {
    const response = await fetch(`http://127.0.0.1:8000/search?search=${text}`);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

