// Update the import path below to the correct location of your payload-types file
// Example: import { Course, Quiz } from '../../../payload-types'
import { Course, Quiz } from '../../../payload-types'

const BASE_URL2 = 'https://piacademy.co.uk/wp-json'
const BASE_URL = 'https://woocommerce-673951-4597289.cloudwaysapps.com/wp-json'

// Courses
export async function fetchCourses(): Promise<Course[]> {
  const response = await fetch(`${BASE_URL}/ldlms/v2/sfwd-courses`, {})
  if (!response.ok) {
    throw new Error('Failed to fetch courses')
  }
  return response.json()
}

// Quizzes
export async function fetchAllQuizzes(): Promise<Quiz[]> {
  const response = await fetch(`${BASE_URL}/ldlms/v1/sfwd-quiz`, {})
  if (!response.ok) {
    throw new Error('Failed to fetch quizzes')
  }
  return response.json()
}

// Quizzes by Course
export async function fetchQuizzesByCourse(courseId: number): Promise<Quiz[]> {
  const response = await fetch(`${BASE_URL}/ldlms/v2/sfwd-courses/${courseId}/steps`, {})
  if (!response.ok) {
    throw new Error('Failed to fetch course steps')
  }

  const stepsData = await response.json()
  const quizzes: Quiz[] = []

  function extractQuizzes(steps: any) {
    if (!steps || typeof steps !== 'object') return

    if (Array.isArray(steps)) {
      steps.forEach((step) => extractQuizzes(step))
    } else {
      Object.values(steps).forEach((value: any) => {
        if (Array.isArray(value)) {
          value.forEach((item: any) => {
            if (item.type === 'sfwd-quiz') {
              quizzes.push({
                id: item.id,
                title: { rendered: item.title || 'Unnamed Quiz' },
                link: item.permalink || '',
              })
            } else if (item.steps) {
              extractQuizzes(item.steps)
            }
          })
        }
      })
    }
  }

  extractQuizzes(stepsData)
  return quizzes
}
