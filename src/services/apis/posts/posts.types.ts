export type CPostPayload = {
  title: string
  content: string
  tags: Array<string>
  imageUrl: string
  slug: string
  excerpt: string
  authorId: string
  duration: number
  category: string
}

export type CLikesPayload = {
  postId: string
  userId: string
}

export type CBookmarksPayload = {
  postId: string
}

export type CCommentsPayload = {
  comment?: string
}

export type CSearchPayload = {
  keyword: string
}
