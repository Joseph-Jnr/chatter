import Head from 'next/head'

interface MetadataProps {
  title: string
  description: string
  keywords: string
  type: string
  imageUrl: string
  canonicalUrl: string
}

const MetaData = ({
  title,
  description,
  keywords,
  type,
  imageUrl,
  canonicalUrl,
}: MetadataProps) => {
  return (
    <Head>
      <title>Chatter | {title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={imageUrl} />
      <meta property='og:url' content={canonicalUrl} />
      <meta property='og:type' content={type} />
      <meta property='og:site_name' content='Chatter' />
      <link rel='canonical' href={canonicalUrl} />
    </Head>
  )
}

export default MetaData
