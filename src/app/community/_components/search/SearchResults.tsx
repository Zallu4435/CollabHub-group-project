import PostCard from '../content/PostCard';
import ProfileCard from '../profiles/ProfileCard';
import GroupCard from '../groups/GroupCard';
import EventCard from '../events/EventCard';

interface SearchResult {
  type: 'post' | 'profile' | 'group' | 'event';
  data: any;
}

interface SearchResultsProps {
  results: SearchResult[];
  query: string;
}

export default function SearchResults({ results, query }: SearchResultsProps) {
  const postResults = results.filter(r => r.type === 'post');
  const profileResults = results.filter(r => r.type === 'profile');
  const groupResults = results.filter(r => r.type === 'group');
  const eventResults = results.filter(r => r.type === 'event');

  return (
    <div className="space-y-8">
      {results.length === 0 ? (
        <div className="text-center py-12">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
          <p className="text-gray-600">Try adjusting your search or filters</p>
        </div>
      ) : (
        <>
          <div className="text-gray-600">
            Found <span className="font-semibold text-gray-900">{results.length}</span> results for "{query}"
          </div>

          {profileResults.length > 0 && (
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                People ({profileResults.length})
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {profileResults.map((result, index) => (
                  <ProfileCard key={index} {...result.data} />
                ))}
              </div>
            </section>
          )}

          {groupResults.length > 0 && (
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Groups ({groupResults.length})
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {groupResults.map((result, index) => (
                  <GroupCard key={index} {...result.data} />
                ))}
              </div>
            </section>
          )}

          {eventResults.length > 0 && (
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Events ({eventResults.length})
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {eventResults.map((result, index) => (
                  <EventCard key={index} {...result.data} />
                ))}
              </div>
            </section>
          )}

          {postResults.length > 0 && (
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Posts ({postResults.length})
              </h3>
              <div className="space-y-4">
                {postResults.map((result, index) => (
                  <PostCard key={index} {...result.data} />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
