import Head from 'next/head'

const withMetadata =
  (Component: any) =>
  ({ postDetailData, slug, ...props }: any) => {
    return (
      <>
        <Head>
          <title>{postDetailData?.title || 'Chatter'}</title>
          <meta
            name='description'
            content={
              postDetailData?.summary ||
              'A home for writers and readers. Unleash the power of words, connect with like-minded readers and writers.'
            }
          />
          <meta
            property='og:title'
            content={postDetailData?.title || 'Chatter'}
          />
          <meta
            property='og:description'
            content={
              postDetailData?.summary ||
              'A multi-functional platform where authors and readers can have access to their own content.'
            }
          />
          <meta
            property='og:url'
            content={`https://chatter-appx.vercel.app/${slug}`}
          />
          <meta
            property='og:image'
            content={
              postDetailData?.imageUrl ||
              'https://drive.google.com/uc?export=view&id=1M3tNb1zfdzn-_rB7Jy1EWWVpZufSiQnZ'
            }
          />
        </Head>
        <Component {...props} />
      </>
    )
  }

export default withMetadata
