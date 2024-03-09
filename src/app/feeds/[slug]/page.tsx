'use client'

import AppLayout from '@/layout/AppLayout'
import { Avatar, Box, Card, Notification, Textarea, rem } from '@mantine/core'
import classes from '@/styles/General.module.css'
import inputClass from '@/styles/InputStyle.module.css'
import {
  IconBook,
  IconBookmarkFilled,
  IconHeartFilled,
} from '@tabler/icons-react'
import Image from 'next/image'
import { Woman } from '@/assets'
import ChButton from '@/components/Buttons/ChButton'
import { IconHeart } from '@tabler/icons-react'
import formatStats from '@/services/formatStats'
import { IconBookmark } from '@tabler/icons-react'
import { IconEye } from '@tabler/icons-react'
import { useState } from 'react'
import { IconCheck } from '@tabler/icons-react'

const FeedDetail = () => {
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isAlertVisible, setIsAlertVisible] = useState(false)
  const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />

  const likeAction = () => {
    setIsLiked(!isLiked)
  }

  const bookmarkAction = () => {
    setIsBookmarked(!isBookmarked)
    setIsAlertVisible(true)

    setTimeout(() => {
      setIsAlertVisible(false)
    }, 2000)
  }

  return (
    <AppLayout>
      <div className='md:mx-40'>
        <h2 className='text-2xl lg:text-4xl font-bold'>Starting out in Tech</h2>

        <div className={`${classes.meta} flex flex-col gap-2 my-5`}>
          <div className='flex gap-1'>
            <span className='text-xs'>March 3 2024</span>
          </div>
          <div className='flex gap-1'>
            <IconBook size={14} />
            <span className='text-xs'>5 mins read</span>
          </div>
        </div>

        <div className='flex items-center gap-2'>
          <Avatar
            src='https://avatars.githubusercontent.com/u/67343514?v=4'
            size={40}
            radius={80}
          />
          <p className='text-sm'>by Grace Davison</p>
        </div>

        <div className='my-10'>
          <Image src={Woman} className='rounded-lg' alt='image' />
        </div>

        <div className='content'>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi,
          architecto vitae. Corrupti facilis totam voluptatem id velit delectus
          ex quam tempore commodi modi, nulla quisquam a? Voluptates iusto
          laborum impedit! Mollitia, minus! Nam corporis ea doloremque laborum,
          quod quisquam quam impedit? Pariatur numquam, eaque, reiciendis
          accusamus temporibus natus quidem ea doloremque eos repudiandae sint
          explicabo ipsa dolorem, omnis facilis accusantium. Dicta reiciendis,
          repellat, recusandae eaque exercitationem pariatur ex officiis debitis
          suscipit cupiditate, adipisci ad dolores commodi iusto molestiae
          voluptatem voluptates ratione consequatur alias facere! Impedit cumque
          quis nemo facere ut. Labore, sed amet temporibus molestias autem
          tempora aliquam in facere accusamus deleniti laboriosam reprehenderit
          non rem. Saepe molestias, animi rem repellendus placeat, dolore
          necessitatibus sunt quae sed dolores nobis omnis! Perferendis adipisci
          ipsum, quia, nulla consequuntur deserunt voluptas tempora repellendus
          iure doloremque hic veritatis harum? Aut ab, debitis, minima,
          molestias illo quas hic ex praesentium libero velit quae suscipit
          quibusdam. Quasi accusamus aut explicabo molestias natus, laborum
          possimus molestiae voluptatem, aliquid ad, amet nostrum sed cupiditate
          nobis. Quaerat assumenda quia dignissimos vitae temporibus placeat
          odit molestiae at minima. Esse, veniam! Eligendi illo aspernatur fuga
          aperiam, quas pariatur officiis enim provident iure ratione.
          Cupiditate aspernatur ducimus aliquam quas amet, tempore explicabo
          facilis in! Consequuntur, libero! Eaque odit quaerat ex dolorum omnis?
          Placeat omnis, obcaecati enim autem non dolore, sapiente nulla
          officiis mollitia itaque veniam hic officia culpa quam saepe veritatis
          laboriosam, quas quae nam deserunt distinctio libero tempore! Qui,
          molestias provident? Et, nulla asperiores beatae debitis pariatur
          provident at aut quisquam unde est. Recusandae aut, quam in odit
          exercitationem natus assumenda velit dolor molestias doloribus
          deserunt nemo eaque reprehenderit. Molestias, laborum. Fugit sint
          mollitia vitae. Quae, tempore quo aliquam exercitationem ab debitis
          ducimus veniam eligendi. Eligendi beatae perferendis nulla vitae,
          voluptatem tempore, unde voluptate est et dolore quibusdam recusandae
          itaque aperiam. Eius culpa vero rem corrupti laborum deserunt
          similique totam, nisi incidunt cupiditate ex inventore eveniet tempora
          aut aliquid harum! Quas possimus odio maxime delectus eveniet, quidem
          voluptas consectetur optio at! In, libero unde quibusdam explicabo
          quasi harum suscipit labore eum eius perspiciatis sapiente dolorem ex
          odit voluptatibus autem totam a consequuntur eos aperiam sed facilis?
          Adipisci corrupti aspernatur esse quos! Tempore delectus dolores esse
          exercitationem eveniet vel facere, quam quae. Natus, deserunt dolorum!
          Aperiam modi nam, maxime placeat velit animi cum ea architecto ad,
          similique ut aut dolorum sit asperiores? Voluptate odio est
          voluptatibus repellendus, id ab pariatur maiores commodi eligendi
          quae, quos quod ullam! Porro, alias debitis, eos nostrum totam illum
          nulla eum autem doloremque consequatur molestiae magni id. Vero
          voluptas aliquam atque quia maiores itaque? Ea voluptatibus, officiis
          assumenda sapiente, eos corporis, tempora commodi debitis quibusdam
          fuga nulla velit. Voluptate recusandae asperiores earum? Obcaecati
          beatae accusamus earum voluptatem! Sequi, quia eligendi? Accusamus
          maxime aliquam deleniti sint, consequatur repudiandae incidunt
          voluptates tempore laudantium, dicta exercitationem quae fugit a, id
          ad officiis doloribus voluptate. Iusto iure fuga culpa praesentium
          perferendis? Voluptate nulla mollitia, porro ipsa rem officiis! Vitae
          at deleniti officia nam? Molestiae corrupti officia eum corporis omnis
          inventore voluptatibus nemo ullam quos autem, ex rerum sapiente odit
          ipsa. Saepe. Eligendi repudiandae quidem odio nulla minus accusamus?
          Unde placeat qui, hic repudiandae ad quae vero cum dicta tempore,
          incidunt iusto sequi cupiditate possimus facere ullam aspernatur
          deserunt quaerat consequatur animi. Nihil accusantium temporibus
          ducimus alias quaerat voluptate libero minima quisquam dolor ut fugit
          reiciendis debitis eveniet molestiae veritatis praesentium, quas illo
          ipsa vero porro blanditiis sed aperiam quo? Quibusdam, eaque.
          Voluptate, qui facere, maiores voluptatem itaque consequatur beatae
          officia eligendi deserunt illo aliquam, exercitationem cum quia odit
          nobis necessitatibus tempora eius blanditiis facilis? Dolore nam aut
          voluptates. Nihil, autem totam? Eum, at numquam. Beatae eum aperiam
          illo aliquid distinctio fugiat quibusdam inventore. Eum inventore
          quidem, hic aliquam ea, tempore saepe ducimus, ut aperiam molestiae ad
          excepturi deleniti vel numquam fugiat? Dolorum nesciunt quis facilis
          deleniti amet, veritatis tenetur voluptate repellendus nemo pariatur
          repudiandae, hic exercitationem distinctio at. Cupiditate, quam
          commodi aperiam, quae unde explicabo voluptatum laudantium ipsam
          necessitatibus quia totam. Ex nisi quas blanditiis qui. Dolor sequi
          culpa a suscipit quisquam. Atque, voluptatem sequi odit, non magnam
          nam voluptas quasi vel quidem excepturi provident temporibus illum
          amet quibusdam totam dignissimos. Neque consectetur dolor, error
          temporibus illum incidunt asperiores veniam excepturi unde explicabo,
          perferendis perspiciatis fuga quas, voluptatem optio quaerat aut id?
          Voluptatibus suscipit odit iusto aut nihil aperiam animi enim?
          Asperiores, ad vero repellendus distinctio eos quam nesciunt
          inventore, pariatur labore nostrum, dolorum accusamus totam!
          Voluptatibus impedit quas a iste eveniet quasi, magni, repellendus
          voluptates eaque fuga doloremque id inventore! Quam quidem totam
          dolorem officia tenetur vitae magni minima iusto praesentium
          asperiores? Numquam alias expedita labore, est possimus distinctio
          obcaecati corporis voluptatibus quas voluptas inventore deserunt
          excepturi. Asperiores, sint eligendi? Neque odit, autem provident
          laudantium incidunt velit obcaecati mollitia tempore, voluptates
          itaque commodi tempora eos sint beatae placeat voluptate. Ad inventore
          ut deserunt at non exercitationem ducimus aliquam porro mollitia?
          Dolorum autem aut cum laboriosam exercitationem explicabo, ratione
          necessitatibus doloribus excepturi, ad provident! Natus eum nemo error
          cumque exercitationem facilis quae debitis consequatur in, porro ab,
          ad quam saepe possimus? Ab aspernatur voluptatum error cupiditate,
          minus illo numquam, dolor possimus inventore adipisci aliquid debitis,
          tempore quo eum. Doloribus voluptates, non nulla nam deleniti iusto
          labore, at, eveniet cumque tempora repellat! Rerum, earum. Nostrum
          excepturi dolor sunt aperiam nihil facere suscipit repellat minima,
          commodi reprehenderit neque consequuntur ea quos odio laborum.
          Consequatur tempore ut, commodi nihil itaque quisquam numquam labore
          fugiat! Doloremque, nihil. Quia cupiditate a beatae odit? Aspernatur
          laboriosam commodi quia porro ex voluptas distinctio blanditiis,
          expedita deleniti fugit, nemo eos saepe quibusdam laborum consequuntur
          similique temporibus numquam illo labore? Placeat accusamus aliquid
          vero labore, tenetur fugit voluptas illum eum reiciendis sequi fugiat
          aliquam at totam similique quidem modi dolor atque. Tenetur dolores
          omnis eum iure fugit perspiciatis possimus beatae? Perferendis hic
          doloribus praesentium animi veritatis nobis modi repudiandae,
          consequuntur vero cum repellendus, similique enim distinctio veniam.
          Alias voluptatibus, rerum aliquam et at ex eligendi labore maiores
          optio dolore porro. Suscipit nesciunt unde quia aliquam, excepturi
          saepe dolores veniam sunt. Quasi aliquid aperiam pariatur officiis
          temporibus vero minima animi perspiciatis eaque tempora illo, expedita
          doloremque adipisci eum, libero quaerat soluta. Eius, nam iste? Harum
          cupiditate id facilis repellendus alias quos placeat repudiandae sed
          incidunt! Magnam in ea soluta quisquam nisi unde. Harum, ab iure
          recusandae quibusdam suscipit nemo cum earum. Voluptate, cupiditate
          accusamus doloremque ex, consectetur velit consequatur blanditiis
          voluptatibus fuga dolorum dignissimos laborum nulla. Autem, iste
          maxime nostrum, praesentium officia totam similique sit asperiores aut
          consequuntur, animi mollitia provident. Labore consequatur fugiat
          inventore id quos animi deserunt quae laboriosam doloremque nam quis
          ducimus, quaerat optio aut eos officia? Vitae, doloribus. Maxime
          repellendus odio sunt debitis dolor temporibus ipsa fugiat?
          Repudiandae illo perspiciatis magni sunt. Fugiat obcaecati unde et
          dolorum fuga dolore suscipit cum molestiae nisi quae, eligendi
          inventore vitae. Esse rerum eius veritatis exercitationem est
          reprehenderit, sed alias iusto. Provident suscipit harum molestiae?
          Magnam maiores veniam nulla labore molestiae quos ex pariatur dolores,
          aliquam, recusandae, ducimus expedita! Veritatis, cupiditate non minus
          nam odio repellendus ipsa velit aut sint delectus. Expedita amet
          tenetur fuga! Error nam officia at voluptates necessitatibus quam
          molestias asperiores dolores, cupiditate architecto expedita eos
          incidunt corporis ratione assumenda repellat odio quas rerum cum nulla
          suscipit? Quo? Numquam culpa doloremque fugiat quaerat! Voluptas quae
          voluptate eius necessitatibus iste facere odio natus atque aspernatur!
          Autem dicta possimus, explicabo odit qui velit aut repellendus
          repellat fuga id inventore exercitationem! Nobis expedita vitae ea
          quas autem suscipit cum aut reiciendis eaque, quidem beatae, maiores
          alias accusantium iure at, cumque nesciunt iste quibusdam voluptate
          laborum! Quis dolorum delectus aut esse voluptas. Eius dolorem tempora
          voluptatem rem quisquam excepturi saepe neque, maxime consectetur
          itaque necessitatibus distinctio, numquam beatae porro corrupti
          voluptatibus quia vero unde architecto nulla exercitationem aliquid
          labore nisi? Fuga, quia. Quas, veritatis dignissimos blanditiis magnam
          optio voluptate repellendus inventore. Quisquam aliquid rem ipsum
          voluptatem fuga veniam officia quam unde ab dicta eveniet sapiente
          tenetur libero dignissimos a quibusdam, fugit praesentium. Soluta
          dolorum, illo voluptates facilis omnis voluptatibus delectus
          consequuntur repudiandae, beatae, expedita rerum excepturi?
          Repellendus minus, quae voluptatibus facere eos nulla impedit non
          officia pariatur expedita totam distinctio qui numquam. Expedita
          inventore recusandae debitis asperiores corporis consequatur, totam
          velit! Quasi voluptatum necessitatibus tempore tenetur totam in vel
          maiores perferendis aspernatur quas ipsum accusamus suscipit,
          excepturi quis omnis aliquid aperiam quod! Enim eligendi nam natus
          illum facere, omnis nihil mollitia sed odit, velit assumenda dolorem
          iusto magni fugit, nostrum veniam fugiat officiis consectetur modi
          recusandae. Voluptas nostrum magnam culpa voluptate minima! Non libero
          vitae porro perspiciatis ut velit optio molestiae sapiente doloribus
          voluptate eveniet, magnam est in voluptatibus sequi. Quam aliquam
          voluptatibus quibusdam aspernatur, harum repudiandae unde soluta quis
          dolores a? Fuga praesentium vitae molestias expedita, repellendus
          error aliquid nesciunt eaque laboriosam ducimus illo id sapiente fugit
          unde ex hic. Ab illo voluptate quaerat sed tempore facere fuga
          laboriosam quam nisi! Fugiat, voluptatem aperiam, earum cumque modi
          praesentium quam magnam architecto eius, quibusdam maiores repudiandae
          illum ullam reprehenderit adipisci dolorum quas iusto? Aliquid natus
          obcaecati quod ullam quae repellendus ea iure?
        </div>

        <div className='reactions mt-10'>
          <div className='icons flex items-center gap-5 md:gap-7'>
            <div
              className='flex items-center gap-1 hover:cursor-pointer'
              onClick={likeAction}
            >
              {isLiked ? (
                <IconHeartFilled size={18} className='text-red-600' />
              ) : (
                <IconHeart size={18} stroke={1} />
              )}
              <p className='flex gap-1'>
                {formatStats(5000)}{' '}
                <span className='hidden md:block'>likes</span>
              </p>
            </div>

            <div
              className='flex items-center hover:cursor-pointer gap-1'
              onClick={bookmarkAction}
            >
              {isBookmarked ? (
                <IconBookmarkFilled size={18} />
              ) : (
                <IconBookmark size={18} stroke={1} />
              )}
              <p className='flex gap-1'>
                {formatStats(100)}{' '}
                <span className='hidden md:block'>bookmarks</span>
              </p>
            </div>

            <div className='flex items-center gap-1'>
              <IconEye size={18} stroke={1} />
              <p className='flex gap-1'>
                {formatStats(701000)}{' '}
                <span className='hidden md:block'>views</span>
              </p>
            </div>
          </div>
        </div>

        <div className='comment-section mt-16'>
          <Card>
            <Textarea
              label='Leave a comment'
              placeholder='Write something...'
              classNames={{ input: inputClass.input }}
            />
            <div className='mt-4'>
              <ChButton color='#543ee0'>Comment</ChButton>
            </div>
          </Card>
        </div>
      </div>

      {/* Bookmark Notification */}
      {isAlertVisible && (
        <Box className='fixed top-10 left-0 right-0 mx-auto w-60 z-50 bounce-down-animation'>
          <Notification
            icon={checkIcon}
            color='teal'
            title='Bookmarked'
            mx={'auto'}
            withCloseButton={false}
            mt='md'
          />
        </Box>
      )}
    </AppLayout>
  )
}

export default FeedDetail
