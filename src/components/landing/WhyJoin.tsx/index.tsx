'use client'

import { ActionIcon, Box, Card, Stack, Text } from '@mantine/core'
import {
  IconArticle,
  IconChartHistogram,
  IconUsersGroup,
} from '@tabler/icons-react'

const whyCardData = [
  {
    icon: <IconChartHistogram color='#543EE0' />,
    title: 'Analytics',
    desc: 'Analytics to track the number of views, likes and comment and also analyze the performance of your articles over a period of time',
  },
  {
    icon: <IconUsersGroup color='#543EE0' />,
    title: 'Social interactions',
    desc: 'Users on the platform can interact with posts they like, comment and engage in discussions',
  },
  {
    icon: <IconArticle color='#543EE0' />,
    title: 'Content creation',
    desc: 'Write nice and appealing with our in-built markdown, a rich text editor',
  },
]

const WhyJoin = () => {
  return (
    <>
      <Box className='py-5 md:py-20'>
        <Box className='ch--container'>
          <Box className='text-center'>
            <h1 className='text-2xl md:text-4xl font-bold'>
              Why you should join chatter
            </h1>
            <div className='text-slate-700 w-full md:w-9/12 mx-auto mt-3'>
              <Text c={'dimmed'} fz={{ base: 14, sm: 16 }}>
                Our goal is to make writers and readers see our platform as
                their next heaven for blogging.
              </Text>
            </div>
          </Box>

          <Box className='cards mt-20'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
              {whyCardData.map((data) => (
                <Card
                  key={data.title}
                  padding='lg'
                  radius='md'
                  className='w-fit'
                  data-aos='fade-up'
                  withBorder
                >
                  <Stack mt='md' mb='xs'>
                    <ActionIcon
                      size='xl'
                      radius='xl'
                      color='white'
                      className='shadow-lg hover:bg-gray-50'
                    >
                      {data.icon}
                    </ActionIcon>
                    <Text fw={500}>{data.title}</Text>
                  </Stack>

                  <Text size='sm' c='dimmed'>
                    {data.desc}
                  </Text>
                </Card>
              ))}
            </div>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default WhyJoin
