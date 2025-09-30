// qa/lib/utils/constants.ts
export const REPUTATION_LEVELS = {
    NEWCOMER: 0,
    CONTRIBUTOR: 100,
    REGULAR: 500,
    ESTABLISHED: 1000,
    TRUSTED: 2500,
    MODERATOR: 5000,
    EXPERT: 10000
  } as const
  
  export const BADGE_TYPES = {
    BRONZE: 'bronze',
    SILVER: 'silver',
    GOLD: 'gold'
  } as const
  
  export const VOTE_TYPES = {
    UP: 'up',
    DOWN: 'down'
  } as const
  
  export const NOTIFICATION_TYPES = {
    ANSWER: 'answer',
    COMMENT: 'comment',
    VOTE: 'vote',
    FOLLOW: 'follow',
    BADGE: 'badge',
    ACCEPTED_ANSWER: 'accepted_answer',
    MENTION: 'mention'
  } as const
  
  export const MAX_TAGS_PER_QUESTION = 5
  export const MIN_QUESTION_TITLE_LENGTH = 10
  export const MAX_QUESTION_TITLE_LENGTH = 150
  export const MIN_QUESTION_BODY_LENGTH = 20
  export const MIN_ANSWER_LENGTH = 30
  export const MAX_ANSWER_LENGTH = 30000
  export const MIN_COMMENT_LENGTH = 10
  export const MAX_COMMENT_LENGTH = 600
  
  export const KEYBOARD_SHORTCUTS = {
    BOLD: 'Ctrl+B',
    ITALIC: 'Ctrl+I',
    CODE: 'Ctrl+`',
    LINK: 'Ctrl+K',
    HEADING: 'Ctrl+H',
    LIST: 'Ctrl+L',
    QUOTE: 'Ctrl+Q'
  } as const
  