'use client'
import { useState, useEffect, useCallback } from 'react'
import { Plus, Users, MessageCircle, RefreshCw } from 'lucide-react'
import Link from 'next/link'
import { Button } from './components/ui/Button'
import SearchBar from './components/common/SearchBar'
import FilterSidebar from './components/common/FilterSidebar'
import QuestionList from './components/question/QuestionList'
import TrendingTopics from './components/explore/TrendingTopics'
import QuestionOfTheDay from './components/explore/QuestionOfTheDay'
import RandomQuestion from './components/explore/RandomQuestion'
import { questions } from './lib/dummy-data/questions'

export default function QAHomePage() {
  const [filteredQuestions, setFilteredQuestions] = useState(questions)
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [selectedSort, setSelectedSort] = useState('newest')
  const [hasMore, setHasMore] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [allQuestions] = useState(questions) // Simulate having more data
  const [isSearching, setIsSearching] = useState(false)

  // Method to get all questions (simulates API call)
  const getAllQuestions = useCallback(async (page: number = 1, limit: number = 10) => {
    setLoading(true)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // Generate more questions based on page
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    
    // Create new questions for each page
    const newQuestions = Array.from({ length: limit }, (_, index) => {
      const baseQuestion = allQuestions[index % allQuestions.length]
      const globalIndex = startIndex + index
      
      return {
        ...baseQuestion,
        id: `question-${globalIndex + 1}`,
        title: `${baseQuestion.title} (Page ${page})`,
        votes: Math.floor(Math.random() * 200) + 10,
        views: Math.floor(Math.random() * 3000) + 100,
        answers: Math.floor(Math.random() * 20),
        createdAt: new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - Math.random() * 14 * 24 * 60 * 60 * 1000).toISOString(),
        isAnswered: Math.random() > 0.25,
        acceptedAnswerId: Math.random() > 0.4 ? `ans-${globalIndex + 1}` : undefined,
        bookmarked: Math.random() > 0.7,
        followed: Math.random() > 0.6
      }
    })
    
    setLoading(false)
    return newQuestions
  }, [allQuestions])

  // Load more questions for infinite scroll
  const loadMoreQuestions = useCallback(async () => {
    if (loading || !hasMore || isSearching) return
    
    const nextPage = currentPage + 1
    const newQuestions = await getAllQuestions(nextPage, 10)
    
    if (newQuestions.length === 0) {
      setHasMore(false)
      return
    }
    
    setFilteredQuestions(prev => [...prev, ...newQuestions])
    setCurrentPage(nextPage)
    
    // Stop loading after 10 pages for demo purposes
    if (nextPage >= 10) {
      setHasMore(false)
    }
  }, [loading, hasMore, currentPage, isSearching, getAllQuestions])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setIsSearching(query.trim().length > 0)
    setLoading(true)
    
    setTimeout(() => {
      if (query.trim()) {
        const filtered = allQuestions.filter(q => 
          q.title.toLowerCase().includes(query.toLowerCase()) ||
          q.content.toLowerCase().includes(query.toLowerCase()) ||
          q.tags.some(tag => tag.name.toLowerCase().includes(query.toLowerCase()))
        )
        setFilteredQuestions(filtered)
        setHasMore(false) // Disable infinite scroll during search
      } else {
        setFilteredQuestions(allQuestions)
        setIsSearching(false)
        setHasMore(true) // Re-enable infinite scroll
        setCurrentPage(1) // Reset pagination
      }
      setLoading(false)
    }, 300)
  }

  const handleFilterChange = (filters: any) => {
    setLoading(true)
    setIsSearching(false) // Reset search state when filtering
    
    setTimeout(() => {
      let filtered = [...allQuestions]
      
      // Apply status filters
      if (filters.status?.length > 0) {
        filtered = filtered.filter(q => {
          if (filters.status.includes('answered') && q.isAnswered) return true
          if (filters.status.includes('unanswered') && !q.isAnswered) return true
          return false
        })
      }
      
      // Apply sorting
      const sortBy = filters.sortBy || selectedSort
      switch (sortBy) {
        case 'votes':
          filtered.sort((a, b) => b.votes - a.votes)
          break
        case 'views':
          filtered.sort((a, b) => b.views - a.views)
          break
        case 'answers':
          filtered.sort((a, b) => b.answers - a.answers)
          break
        case 'active':
          filtered.sort((a, b) => b.answers - a.answers)
          break
        default:
          filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      }
      
      setFilteredQuestions(filtered)
      setSelectedSort(sortBy)
      setHasMore(true) // Re-enable infinite scroll
      setCurrentPage(1) // Reset pagination
      setLoading(false)
    }, 300)
  }

  // Method to refresh all questions
  const refreshAllQuestions = useCallback(async () => {
    setLoading(true)
    setIsSearching(false)
    setCurrentPage(1)
    setHasMore(true)
    
    const newQuestions = await getAllQuestions(1, 10)
    setFilteredQuestions(newQuestions)
  }, [getAllQuestions])

  const sortOptions = [
    { id: 'newest', label: 'Newest', count: allQuestions.length },
    { id: 'active', label: 'Active', count: allQuestions.filter(q => q.answers > 0).length },
    { id: 'unanswered', label: 'Unanswered', count: allQuestions.filter(q => !q.isAnswered).length },
    { id: 'votes', label: 'Most Votes', count: allQuestions.filter(q => q.votes > 0).length }
  ]

  const stats = {
    totalQuestions: allQuestions.length,
    totalAnswers: allQuestions.reduce((sum, q) => sum + q.answers, 0),
    totalUsers: 1247,
    activeToday: 89
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section - Stack Overflow Style */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <h1 className="text-2xl font-bold text-gray-900">Questions</h1>
              <div className="hidden md:flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  <span>{stats.totalQuestions.toLocaleString()} questions</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{stats.activeToday} active today</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={refreshAllQuestions}
                disabled={loading}
                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Refresh</span>
              </Button>
              
              <div className="h-6 w-px bg-gray-300"></div>
              
              <Link href="/qa/ask">
                <Button 
                  variant="primary" 
                  size="sm" 
                  className="flex items-center gap-2 px-4 py-2 font-medium shadow-sm hover:shadow-md transition-all duration-200 bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4" />
                  Ask Question
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="max-w-2xl">
            <SearchBar 
              placeholder="Search for questions, topics, or keywords..." 
              onSearch={handleSearch}
              className="shadow-sm"
            />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-3 space-y-6 order-2 lg:order-1">
            {/* Question of the Day - Featured at top */}
            <QuestionOfTheDay questions={questions} />
            
            {/* Random Question */}
            <RandomQuestion 
              questions={questions} 
              onQuestionSelect={(question) => {
                // You can add navigation logic here
                console.log('Selected question:', question.title)
              }}
            />
            
            {/* Filter Sidebar */}
            <FilterSidebar onFilterChange={handleFilterChange} />
            
            {/* Trending Topics */}
            <TrendingTopics maxVisible={6} />
          </div>

          {/* Main Content - Stack Overflow Style */}
          <div className="lg:col-span-9 space-y-4 order-1 lg:order-2">
            {/* Sort Tabs */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="px-4 py-3 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <h2 className="text-lg font-semibold text-gray-900">
                      {searchQuery ? `Search Results` : 'All Questions'}
                    </h2>
                    {searchQuery && (
                      <div className="text-sm text-gray-600">
                        {filteredQuestions.length} result{filteredQuestions.length !== 1 ? 's' : ''} for "{searchQuery}"
                      </div>
                    )}
                  </div>
                  <div className="text-sm text-gray-500">
                    {filteredQuestions.length.toLocaleString()} question{filteredQuestions.length !== 1 ? 's' : ''}
                  </div>
                </div>
              </div>
              
              {/* Sort Options */}
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                <div className="flex flex-wrap items-center gap-1">
                  {sortOptions.map(option => (
                    <button
                      key={option.id}
                      onClick={() => handleFilterChange({ sortBy: option.id })}
                      className={`
                        px-3 py-1.5 text-sm font-medium rounded transition-all duration-200
                        ${selectedSort === option.id
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                        }
                      `}
                    >
                      <div className="flex items-center gap-2">
                        <span className="whitespace-nowrap">{option.label}</span>
                        <span className={`
                          text-xs px-1.5 py-0.5 rounded-full
                          ${selectedSort === option.id
                            ? 'bg-blue-500 text-blue-100'
                            : 'bg-gray-200 text-gray-600'
                          }
                        `}>
                          {option.count}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Questions List with Infinite Scroll */}
              <QuestionList 
                questions={filteredQuestions} 
                loading={loading}
                hasMore={hasMore && !isSearching}
                onLoadMore={loadMoreQuestions}
                emptyMessage={searchQuery ? 'No questions match your search. Try different keywords or browse all questions.' : 'No questions found. Be the first to ask!'}
                showHeader={false}
                showStats={false}
                className="divide-y-0"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
