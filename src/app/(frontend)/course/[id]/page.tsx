import { fetchCourses } from '../../../(payload)/api/fetchCourses'

export default async function CoursePage({ params }: { params: { id: string } }) {
  const courseId = parseInt(params.id)
  const courses = await fetchCourses()
  const course = courses.find((c) => c.id === courseId)

  if (!course) {
    return <div className="text-center text-red-500 py-10">Course not found</div>
  }

  return (
    <div className="mx-auto px-4 py-8">
      <div className="mb-6">
        <h2
          className="text-3xl font-bold mb-4"
          dangerouslySetInnerHTML={{ __html: course.title.rendered }}
        />
        <div
          className="text-gray-700 text-base"
          dangerouslySetInnerHTML={{
            __html: course.content.rendered || '<p>No course description available.</p>',
          }}
        />
      </div>

      <h3 className="text-xl font-semibold mb-4">Mock Exam</h3>

      {course.link ? (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h4
            className="text-lg font-medium"
            dangerouslySetInnerHTML={{ __html: course.title.rendered }}
          />
          <a
            href={course.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 text-blue-600 hover:underline"
          >
            Take Exam
          </a>
        </div>
      ) : (
        <p className="text-gray-500">No mock exams available for this course.</p>
      )}
    </div>
  )
}
