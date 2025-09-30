// qa/pages/question/[id].tsx
'use client'
import { useState, useEffect, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { 
  ArrowLeft, Eye, Calendar, Edit, Flag, Share2, Bookmark, BookmarkCheck, 
  MessageCircle, Clock, CheckCircle, AlertCircle, MoreHorizontal, 
  ThumbsUp, ThumbsDown, Reply, ExternalLink, Star, TrendingUp,
  Copy, Twitter, Facebook, Linkedin, Mail, Link, ChevronDown,
  History, Heart, MessageSquare, Bell, Settings, Trash2
} from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import UserAvatar from '../../components/common/UserAvatar'
import VoteButtons from '../../components/common/VoteButtons'
import TagChip from '../../components/common/TagChip'
import AnswerList from '../../components/answer/AnswerList'
import AnswerForm from '../../components/answer/AnswerForm'
import CommentList from '../../components/comment/CommentList'
import CommentForm from '../../components/comment/CommentForm'
import { questions } from '../../lib/dummy-data/questions'
import type { Answer } from '../../lib/types/question.types'

export default function QuestionDetailPage() {
  const router = useRouter()
  const { id } = useParams<{ id: string }>()
  
  const [question, setQuestion] = useState(questions.find(q => q.id === id))
  const [showAnswerForm, setShowAnswerForm] = useState(false)
  const [showCommentForm, setShowCommentForm] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [currentUserId] = useState('current-user') // Mock current user
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [showMoreMenu, setShowMoreMenu] = useState(false)
  const [shareUrl, setShareUrl] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [isFollowingUser, setIsFollowingUser] = useState(false)
  const [isFollowingQuestion, setIsFollowingQuestion] = useState(false)
  const [showFlagModal, setShowFlagModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [flagReason, setFlagReason] = useState('')
  const shareMenuRef = useRef<HTMLDivElement>(null)
  const moreMenuRef = useRef<HTMLDivElement>(null)

  // Mock comments for the question
  const mockQuestionComments = [
    {
      id: 'comment-1',
      content: 'This is a great question! I had the same issue when migrating to Next.js 13.',
      author: {
        id: '2',
        name: 'Alex Chen',
        email: 'alex@example.com',
        avatar: '/images/avatars/alex.jpg',
        joinDate: '2022-03-20T00:00:00Z',
        reputation: 1543,
        isOnline: false,
        badges: []
      },
      targetId: question?.id || '',
      targetType: 'question' as const,
      createdAt: '2024-09-28T10:15:00Z',
      votes: 2
    },
    {
      id: 'comment-2',
      content: 'Have you tried using the new middleware approach? It works much better with App Router.',
      author: {
        id: '3',
        name: 'Maria Garcia',
        email: 'maria@example.com',
        avatar: '/images/avatars/maria.jpg',
        joinDate: '2022-07-10T00:00:00Z',
        reputation: 3921,
        isOnline: true,
        badges: []
      },
      targetId: question?.id || '',
      targetType: 'question' as const,
      createdAt: '2024-09-28T11:30:00Z',
      votes: 5
    },
    {
      id: 'comment-3',
      content: 'I recommend checking the official NextAuth.js documentation for App Router examples.',
      author: {
        id: '4',
        name: 'David Kim',
        email: 'david@example.com',
        avatar: '/images/avatars/david.jpg',
        joinDate: '2023-01-05T00:00:00Z',
        reputation: 876,
        isOnline: false,
        badges: []
      },
      targetId: question?.id || '',
      targetType: 'question' as const,
      createdAt: '2024-09-28T12:45:00Z',
      votes: 1
    }
  ]

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (shareMenuRef.current && !shareMenuRef.current.contains(event.target as Node)) {
        setShowShareMenu(false)
      }
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) {
        setShowMoreMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Mock answers data (initial seed)
  const initialAnswers: Answer[] = [
    {
      id: 'ans-1',
      questionId: question?.id || '',
      content: `Great question! Here's a comprehensive approach to implementing authentication in Next.js 13 with the App Router:

## 1. Install NextAuth.js

\`\`\`bash
npm install next-auth
\`\`\`

## 2. Configure NextAuth.js

Create \`app/api/auth/[...nextauth]/route.ts\`:

\`\`\`typescript
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ],
  callbacks: {
    async session({ session, token }) {
      // Customize session object
      return session
    }
  }
})

export { handler as GET, handler as POST }
\`\`\`

## 3. Protecting Routes

For server-side protection, create middleware:

\`\`\`typescript
// middleware.ts
import { withAuth } from 'next-auth/middleware'

export default withAuth({
  pages: {
    signIn: '/auth/signin',
  },
})

export const config = {
  matcher: ['/protected/:path*']
}
\`\`\`

This approach works seamlessly with the new App Router structure and provides type-safe authentication.`,
      author: {
        id: '1',
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        avatar: '/images/avatars/sarah.jpg',
        reputation: 2847,
        joinDate: '2023-01-15T00:00:00Z',
        isOnline: true,
        badges: []
      },
      votes: 15,
      isAccepted: true,
      createdAt: '2024-09-28T14:20:00Z',
      updatedAt: '2024-09-28T14:20:00Z',
      comments: [
        {
          id: 'comment-1',
          content: 'This is exactly what I was looking for! The middleware approach is particularly helpful.',
          author: {
            id: '2',
            name: 'Alex Chen',
            email: 'alex@example.com',
            joinDate: '2022-03-20T00:00:00Z',
            reputation: 1543,
            isOnline: false,
            badges: []
          },
          targetId: 'ans-1',
          targetType: 'answer' as const,
          createdAt: '2024-09-28T15:30:00Z',
          votes: 3
        }
      ]
    },
    {
      id: 'ans-2',
      questionId: question?.id || '',
      content: `I'd like to add to Sarah's excellent answer with some additional considerations for production apps:

## Session Storage Options

You might want to consider different session strategies:

\`\`\`typescript
// For JWT (stateless)
session: {
  strategy: 'jwt',
  maxAge: 30 * 24 * 60 * 60, // 30 days
},

// For database sessions (stateful)
session: {
  strategy: 'database',
}
\`\`\`

## Error Handling

Don't forget to handle authentication errors gracefully:

\`\`\`typescript
pages: {
  signIn: '/auth/signin',
  error: '/auth/error',
}
\`\`\`

Also, make sure to set up proper CSRF protection and secure cookies in production!`,
      author: {
        id: '3',
        name: 'Maria Garcia',
        email: 'maria@example.com',
        avatar: '/images/avatars/maria.jpg',
        reputation: 3921,
        joinDate: '2022-07-10T00:00:00Z',
        isOnline: false,
        badges: []
      },
      votes: 8,
      isAccepted: false,
      createdAt: '2024-09-28T16:45:00Z',
      updatedAt: '2024-09-28T16:45:00Z',
      comments: []
    }
  ]

  const [answers, setAnswers] = useState<Answer[]>(initialAnswers)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
  }

  const handleAcceptAnswer = (answerId: string) => {
    // Update answer acceptance logic here
    console.log('Accepting answer:', answerId)
  }

  // Share functionality
  const generateShareUrl = () => {
    const url = `${window.location.origin}/qa/question/${id}`
    setShareUrl(url)
    return url
  }

  const copyToClipboard = async () => {
    const url = generateShareUrl()
    try {
      await navigator.clipboard.writeText(url)
      // You could add a toast notification here
      console.log('URL copied to clipboard')
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const shareToSocial = (platform: string) => {
    const url = generateShareUrl()
    const title = question?.title || 'Check out this question'
    const text = `Check out this question: ${title}`
    
    let shareUrl = ''
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
        break
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
        break
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
        break
      case 'mail':
        shareUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text + '\n\n' + url)}`
        break
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400')
    }
  }

  // More menu functionality
  const handleMoreAction = (action: string) => {
    switch (action) {
      case 'edit':
        setIsEditing(true)
        break
      case 'flag':
        setShowFlagModal(true)
        break
      case 'delete':
        setShowDeleteModal(true)
        break
      case 'history':
        // Navigate to question history page
        router.push(`/qa/question/${id}/history`)
        break
      case 'follow':
        // This case is now handled by the question stats follow button
        break
      case 'notifications':
        // Toggle notification settings
        console.log('Toggle notifications')
        break
    }
    setShowMoreMenu(false)
  }

  // Edit functionality
  const handleEditSave = () => {
    // Save edited question
    console.log('Saving edited question')
    setIsEditing(false)
  }

  const handleEditCancel = () => {
    setIsEditing(false)
  }

  // Flag functionality
  const handleFlagSubmit = () => {
    console.log('Flagging question with reason:', flagReason)
    setShowFlagModal(false)
    setFlagReason('')
    // Show success message
  }

  // Delete functionality
  const handleDeleteConfirm = () => {
    console.log('Deleting question')
    setShowDeleteModal(false)
    // Navigate back to questions list
    router.push('/qa')
  }

  if (!question) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Question not found</h1>
          <p className="text-gray-600 mb-4">The question you're looking for doesn't exist.</p>
          <Button variant="primary" onClick={() => router.push('/qa')}>
            Browse Questions
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Header with Breadcrumbs */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            {/* Breadcrumbs */}
            <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
              <button
                onClick={() => router.push('/qa')}
                className="hover:text-blue-600 transition-colors"
              >
                Questions
              </button>
              <span>/</span>
              <span className="text-gray-900 font-medium">Question #{id}</span>
            </nav>
            
            {/* Question Title */}
            <div className="flex items-start justify-between gap-4">
              <h1 className="text-2xl font-bold text-gray-900 leading-tight flex-1">
                {question.title}
              </h1>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBookmark}
                  className={`flex items-center gap-1 ${
                    isBookmarked 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-500 hover:text-blue-600'
                  }`}
                >
                  {isBookmarked ? (
                    <BookmarkCheck className="w-4 h-4" />
                  ) : (
                    <Bookmark className="w-4 h-4" />
                  )}
                  <span className="hidden sm:inline">
                    {isBookmarked ? 'Saved' : 'Save'}
                  </span>
                </Button>
                
                {/* Share Menu */}
                <div className="relative" ref={shareMenuRef}>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    className="flex items-center gap-1"
                  >
                    <Share2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Share</span>
                    <ChevronDown className="w-3 h-3" />
                  </Button>
                  
                  {showShareMenu && (
                    <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg border border-gray-200 shadow-lg z-50">
                      <div className="p-3">
                        <div className="text-sm font-medium text-gray-900 mb-3">Share this question</div>
                        
                        {/* Copy Link */}
                        <div className="mb-3">
                          <div className="flex items-center gap-2 p-2 bg-gray-50 rounded border">
                            <input
                              type="text"
                              value={shareUrl || generateShareUrl()}
                              readOnly
                              className="flex-1 text-sm bg-transparent border-none outline-none"
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={copyToClipboard}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        
                        {/* Social Share Buttons */}
                        <div className="grid grid-cols-2 gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => shareToSocial('twitter')}
                            className="justify-start text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                          >
                            <Twitter className="w-4 h-4 mr-2" />
                            Twitter
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => shareToSocial('facebook')}
                            className="justify-start text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                          >
                            <Facebook className="w-4 h-4 mr-2" />
                            Facebook
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => shareToSocial('linkedin')}
                            className="justify-start text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                          >
                            <Linkedin className="w-4 h-4 mr-2" />
                            LinkedIn
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => shareToSocial('mail')}
                            className="justify-start text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                          >
                            <Mail className="w-4 h-4 mr-2" />
                            Email
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* More Menu */}
                <div className="relative" ref={moreMenuRef}>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setShowMoreMenu(!showMoreMenu)}
                    className="flex items-center gap-1"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                  
                  {showMoreMenu && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg border border-gray-200 shadow-lg z-50">
                      <div className="py-2">
                        <button
                          onClick={() => handleMoreAction('edit')}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                        >
                          <Edit className="w-4 h-4" />
                          Edit question
                        </button>
                        <button
                          onClick={() => handleMoreAction('history')}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                        >
                          <History className="w-4 h-4" />
                          View history
                        </button>
                        <button
                          onClick={() => handleMoreAction('notifications')}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                        >
                          <Bell className="w-4 h-4" />
                          Notifications
                        </button>
                        <hr className="my-2" />
                        <button
                          onClick={() => handleMoreAction('flag')}
                          className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                        >
                          <Flag className="w-4 h-4" />
                          Flag question
                        </button>
                        {question?.author.id === currentUserId && (
                          <button
                            onClick={() => handleMoreAction('delete')}
                            className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete question
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Question Meta */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>Asked {formatDate(question.createdAt)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{question.views.toLocaleString()} views</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  <span>{question.answers} answers</span>
                </div>
                {question.isAnswered && (
                  <Badge variant="success" size="sm" className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Answered
                  </Badge>
                )}
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsFollowingUser(!isFollowingUser)}
                  className={`flex items-center gap-2 ${
                    isFollowingUser 
                      ? 'text-red-600 bg-red-50 hover:bg-red-100' 
                      : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFollowingUser ? 'fill-current' : ''}`} />
                  <span className="hidden sm:inline">
                    {isFollowingUser ? 'Following' : 'Follow User'}
                  </span>
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setShowAnswerForm(true)}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  Write Answer
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Question Card - Stack Overflow Style */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <div className="flex">
                {/* Vote Section */}
                <div className="flex-shrink-0 w-16 bg-gray-50 border-r border-gray-200 p-4">
                  <div className="flex flex-col items-center space-y-4">
                  <VoteButtons
                    initialVotes={question.votes}
                    size="lg"
                  />
                    <div className="text-center">
                      <div className="text-xs text-gray-500">views</div>
                      <div className="text-sm font-medium text-gray-900">{question.views}</div>
                    </div>
                  </div>
                </div>

                {/* Question Content */}
                <div className="flex-1 p-6">
                    {/* Question Body */}
                  <div className="prose prose-lg max-w-none mb-6">
                    <div 
                      className="text-gray-900 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: question.content }}
                    />
                  </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {question.tags.map(tag => (
                        <TagChip key={tag.id} tag={tag} size="md" />
                      ))}
                    </div>

                  {/* Question Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setShowCommentForm(true)}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        <Reply className="w-4 h-4 mr-1" />
                        Comment
                        </Button>
                      </div>

                    {/* Author Card */}
                    <div className="bg-blue-50 rounded-lg p-4 min-w-0">
                      <div className="flex items-center gap-3">
                        <div className="text-sm text-gray-600">
                          <div>asked {formatDate(question.createdAt).split(',')[0]}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <UserAvatar 
                            name={question.author.name}
                            avatar={question.author.avatar}
                            size="sm"
                            isOnline={question.author.isOnline}
                          />
                          <div className="min-w-0">
                            <div className="font-medium text-gray-900 truncate">{question.author.name}</div>
                            <div className="text-xs text-gray-500 flex items-center gap-1">
                              <Star className="w-3 h-3" />
                              {question.author.reputation.toLocaleString()} reputation
                            </div>
                          </div>
                          </div>
                        </div>
                      </div>
                    </div>

                  {/* Comments Section */}
                    <div className="mt-6 pt-4 border-t border-gray-200">
                    {mockQuestionComments.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-3">
                          {mockQuestionComments.length} Comment{mockQuestionComments.length !== 1 ? 's' : ''}
                        </h4>
                        <div className="space-y-3">
                          {mockQuestionComments.map((comment) => (
                            <div key={comment.id} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                              <div className="flex-shrink-0">
                                <UserAvatar 
                                  name={comment.author.name}
                                  avatar={comment.author.avatar}
                                  size="xs"
                                  isOnline={comment.author.isOnline}
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-sm font-medium text-gray-900">
                                    {comment.author.name}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    {comment.author.reputation} reputation
                                  </span>
                                  <span className="text-xs text-gray-400">
                                    {formatDate(comment.createdAt)}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-700 leading-relaxed">
                                  {comment.content}
                                </p>
                                <div className="flex items-center gap-3 mt-2">
                                  <button className="text-xs text-gray-500 hover:text-blue-600 flex items-center gap-1">
                                    <ThumbsUp className="w-3 h-3" />
                                    {comment.votes}
                                  </button>
                                  <button className="text-xs text-gray-500 hover:text-blue-600">
                                    Reply
                                  </button>
                                  <button className="text-xs text-gray-500 hover:text-red-600">
                                    Flag
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                      {!showCommentForm && (
                        <button
                          onClick={() => setShowCommentForm(true)}
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                        >
                        <MessageSquare className="w-4 h-4" />
                          Add a comment
                        </button>
                      )}
                      {showCommentForm && (
                        <div className="mt-3">
                          <CommentForm
                            targetId={question.id}
                            targetType="question"
                            onSubmit={() => setShowCommentForm(false)}
                            onCancel={() => setShowCommentForm(false)}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

            {/* Answer Form - Directly below question */}
            {showAnswerForm && (
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Your Answer</h3>
                </div>
              <AnswerForm
                question={question}
                onSubmit={(data) => {
                  const newAnswer: Answer = {
                    id: `ans-${Date.now()}`,
                    questionId: question.id,
                    content: data.superAnswer || data.content || '',
                    author: {
                      id: currentUserId,
                      name: 'You',
                      email: 'you@example.com',
                      avatar: '/images/avatars/default.jpg',
                      reputation: 0,
                      joinDate: new Date().toISOString(),
                      isOnline: true,
                      badges: []
                    },
                    votes: 0,
                    isAccepted: false,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    comments: [],
                    ...(data.poll ? { poll: data.poll } : {})
                  }
                  setAnswers(prev => [...prev, newAnswer])
                  setQuestion(q => (q ? { ...q, answers: (q.answers || 0) + 1 } : q))
                  setShowAnswerForm(false)
                }}
                onCancel={() => setShowAnswerForm(false)}
              />
              </div>
            )}

            {/* Answers Section */}
            <div className="space-y-6">
              {/* Answers Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  {answers.length} Answer{answers.length !== 1 ? 's' : ''}
                </h2>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="text-gray-600">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    Sort by votes
                  </Button>
                </div>
              </div>

              {/* Answers List */}
              <AnswerList
                answers={answers.map((a, idx) => ({
                  ...a,
                  ...(idx === 0 && !a.poll
                    ? {
                        poll: {
                          question: 'Which approach do you prefer for data fetching?',
                          allowMultiple: false,
                          options: [
                            { id: 'opt1', label: 'SWR', votes: 6 },
                            { id: 'opt2', label: 'React Query', votes: 4 },
                            { id: 'opt3', label: 'Fetch + custom cache', votes: 1 }
                          ]
                        }
                      }
                    : {})
                }))}
                questionAuthorId={question.author.id}
                currentUserId={currentUserId}
                onAcceptAnswer={handleAcceptAnswer}
              />
            </div>
          </div>

          {/* Enhanced Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Question Stats Card */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">Question Stats</h3>
              </div>
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{question.votes}</div>
                    <div className="text-xs text-gray-600">votes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{question.views}</div>
                    <div className="text-xs text-gray-600">views</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{question.answers}</div>
                  <div className="text-xs text-gray-600">answers</div>
                </div>
                <div className="pt-3 border-t border-gray-200">
                  <div className="text-sm text-gray-600 text-center mb-3">
                    Asked {formatDate(question.createdAt).split(',')[0]}
                  </div>
                  <div className="space-y-2">
                    <Button
                      variant={isFollowingQuestion ? "primary" : "ghost"}
                      size="sm"
                      onClick={() => setIsFollowingQuestion(!isFollowingQuestion)}
                      className={`w-full flex items-center justify-center gap-2 ${
                        isFollowingQuestion 
                          ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                          : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      <Bookmark className={`w-4 h-4 ${isFollowingQuestion ? 'fill-current' : ''}`} />
                      {isFollowingQuestion ? 'Following Question' : 'Follow Question'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Tags Card */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">Tags</h3>
              </div>
              <div className="p-4">
                <div className="flex flex-wrap gap-2">
                  {question.tags.map(tag => (
                    <TagChip key={tag.id} tag={tag} size="sm" />
                  ))}
                </div>
              </div>
            </div>

            {/* Related Questions */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">Related Questions</h3>
              </div>
              <div className="p-4 space-y-3">
                        {questions.slice(0, 5).filter(q => q.id !== question.id).map(relatedQ => (
                  <a
                    key={relatedQ.id}
                    href={`/qa/question/${relatedQ.id}`}
                    className="block p-3 hover:bg-gray-50 rounded-lg transition-colors group"
                  >
                    <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 line-clamp-2 mb-2">
                      {relatedQ.title}
                    </h4>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="w-3 h-3" />
                        <span>{relatedQ.votes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-3 h-3" />
                        <span>{relatedQ.answers}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        <span>{relatedQ.views}</span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Stack Overflow Style Sidebar */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">The Overflow Blog</h3>
              </div>
              <div className="p-4 space-y-3">
                <div className="text-sm">
                  <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                    The unexpected benefits of mentoring others
                  </a>
                  <div className="text-xs text-gray-500 mt-1">6 hours ago</div>
                </div>
                <div className="text-sm">
                  <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                    Podcast 374: Feeling valued and the tools of software developers
                  </a>
                  <div className="text-xs text-gray-500 mt-1">1 day ago</div>
                </div>
              </div>
            </div>

            {/* Featured on Meta */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">Featured on Meta</h3>
              </div>
              <div className="p-4 space-y-3">
                <div className="text-sm">
                  <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                    New Focus Styles & Updated Styling for Button Groups
                  </a>
                </div>
                <div className="text-sm">
                  <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                    Upcoming initiatives on Stack Overflow and in the developer community
                  </a>
                </div>
                <div className="text-sm">
                  <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                    The [duplicate] tag is being burninated
                  </a>
                </div>
              </div>
            </div>

            {/* Hot Network Questions */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">Hot Network Questions</h3>
              </div>
              <div className="p-4 space-y-3">
                {questions.slice(0, 5).map((hotQ, index) => (
                  <div key={hotQ.id} className="flex items-start gap-2 text-sm">
                    <div className="flex-shrink-0 w-6 h-6 bg-orange-100 text-orange-600 rounded text-xs flex items-center justify-center font-medium">
                      {index + 1}
                    </div>
                    <a 
                      href={`/qa/question/${hotQ.id}`}
                      className="text-blue-600 hover:text-blue-800 line-clamp-2 leading-tight"
                    >
                      {hotQ.title}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Write Answer Button for Mobile */}
      <div className="fixed bottom-6 right-6 z-40 lg:hidden">
        <Button
          variant="primary"
          size="lg"
          onClick={() => setShowAnswerForm(true)}
          className="rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-200 bg-blue-600 hover:bg-blue-700"
        >
          <MessageSquare className="w-6 h-6" />
        </Button>
      </div>

      {/* Flag Modal */}
      {showFlagModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Flag this question</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for flagging
                </label>
                <select
                  value={flagReason}
                  onChange={(e) => setFlagReason(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select a reason</option>
                  <option value="spam">Spam</option>
                  <option value="inappropriate">Inappropriate content</option>
                  <option value="duplicate">Duplicate question</option>
                  <option value="off-topic">Off-topic</option>
                  <option value="unclear">Unclear or poorly written</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="ghost"
                  onClick={() => setShowFlagModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={handleFlagSubmit}
                  disabled={!flagReason}
                  className="flex-1 bg-red-600 hover:bg-red-700"
                >
                  Flag Question
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Delete this question</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this question? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <Button
                variant="ghost"
                onClick={() => setShowDeleteModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleDeleteConfirm}
                className="flex-1 bg-red-600 hover:bg-red-700"
              >
                Delete Question
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Edit Question</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Question Title
                </label>
                <input
                  type="text"
                  defaultValue={question?.title}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Question Content
                </label>
                <textarea
                  defaultValue={question?.content}
                  rows={10}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex gap-3">
                <Button
                  variant="ghost"
                  onClick={handleEditCancel}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={handleEditSave}
                  className="flex-1"
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
