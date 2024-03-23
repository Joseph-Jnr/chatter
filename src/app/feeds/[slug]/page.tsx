import { GetPosts, GetSinglePost } from '@/services/apis'
import FeedDetail from './FeedDetail'
import { Metadata } from 'next'

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug

  const posts = await GetPosts()
  const currentPost = posts.data.find((post: any) => post.slug === slug)
  const currentPostId = currentPost.id
  const postDetails = await GetSinglePost(currentPostId)
  const postDetailData = postDetails?.data
  console.log('Aha!', postDetailData)
  return {
    title: `Chatter | ${postDetailData.title}`,
    description: postDetailData.excerpt,
    openGraph: {
      type: 'article',
      url: `https://chatter-appx.vercel.app/feeds/${postDetailData.slug}`,
      title: postDetailData.title,
      description: postDetailData.excerpt,
      siteName: 'Chatter',
      images: [
        {
          url: postDetailData.imageUrl,
        },
      ],
    },
  }
}

const page = () => {
  return <FeedDetail />
}

export default page
