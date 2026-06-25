export const CATEGORIES = [
  'Entertainment',
  'Bills',
  'Groceries',
  'Dining Out',
  'Transportation',
  'Personal Care',
  'General',
  'Shopping',
  'Education',
  'Lifestyle',
] as const

export const CATEGORY_THEMES: Record<string, string> = {
  Entertainment: '#277C78',
  Bills: '#82C9D7',
  Groceries: '#F2CDAC',
  'Dining Out': '#826CB0',
  Transportation: '#C94736',
  'Personal Care': '#626070',
  General: '#201F24',
  Shopping: '#934F6D',
  Education: '#F8B4B4',
  Lifestyle: '#597C7C',
}

export const SORT_OPTIONS = [
  { label: 'Latest', value: 'latest' },
  { label: 'Oldest', value: 'oldest' },
  { label: 'A to Z', value: 'a-z' },
  { label: 'Z to A', value: 'z-a' },
  { label: 'Highest', value: 'highest' },
  { label: 'Lowest', value: 'lowest' },
] as const

export const PAGE_SIZE = 10

export type Category = (typeof CATEGORIES)[number]
export type SortOption = (typeof SORT_OPTIONS)[number]['value']
