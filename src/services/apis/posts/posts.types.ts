export type CPostPayload = {
  title: string
  content: string
  tags: Array<string>
  image: string
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
  userId: string
}

export type CCommentsPayload = {
  postId: string
  userId: string
  comment: string
}

export type CSearchPayload = {
  keyword: string
}
