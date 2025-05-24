import Link from 'next/link'
import { fetchCourses, fetchAllQuizzes } from '../../(payload)/api/fetchCourses'

export default async function HomePage() {
  const courses = await fetchCourses()
  const quizzes = await fetchAllQuizzes()

  return (
    <div className="mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Available Video Courses</h2>
      <div className="grid grid-cols-1 gap-6">
        {courses.map((course) => (
          <Link key={course.id} href={`/course/${course.id}`}>
            <div className="bg-white w-1/2 m-auto shadow-md hover:shadow-xl transition-shadow duration-300 rounded-2xl p-4 border border-gray-200">
              <h3
                className="text-lg font-semibold mb-2"
                dangerouslySetInnerHTML={{ __html: course.title.rendered }}
              />
              <div
                className="text-gray-700 text-sm"
                dangerouslySetInnerHTML={{ __html: course.content.rendered }}
              />
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-6 text-center">All Quizzes</h2>
        <div className="grid grid-cols-1 gap-6">
          {quizzes.length > 0 ? (
            quizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="bg-white w-1/2 m-auto shadow-md hover:shadow-xl transition-shadow duration-300 rounded-2xl p-4 border border-gray-200"
              >
                <h3
                  className="text-lg font-semibold mb-2"
                  dangerouslySetInnerHTML={{ __html: quiz.title.rendered }}
                />
                <a
                  href={quiz.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Take Quiz
                </a>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No quizzes available.</p>
          )}
        </div>
      </div>
    </div>
  )
}
