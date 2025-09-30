// qa/components/answer/BestAnswerBadge.tsx
import { Award } from 'lucide-react'
import { Badge } from '../ui/Badge'

export default function BestAnswerBadge() {
  return (
    <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
      <Award className="w-5 h-5 text-green-600" />
      <div>
        <Badge variant="success" size="sm" className="font-semibold">
          ✓ Best Answer
        </Badge>
        <p className="text-sm text-green-700 mt-1">
          This answer was accepted by the question author
        </p>
      </div>
    </div>
  )
}
