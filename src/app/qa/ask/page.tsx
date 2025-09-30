'use client'
import QuestionForm from '../components/question/QuestionForm'

export default function AskQuestionPage() {
  const handleSubmit = (questionData: any) => {
    console.log('Question submitted:', questionData)
    // In real app: API call to create question
    // Redirect to question detail page
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <QuestionForm
          onSubmit={handleSubmit}
          onCancel={() => window.history.back()}
        />
      </div>
    </div>
  )
}
