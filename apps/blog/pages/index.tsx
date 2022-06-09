import { SearchIcon } from '@heroicons/react/outline'
import { useDebounce } from '@sushiswap/hooks'
import { Button, Container } from '@sushiswap/ui'
import { InferGetServerSidePropsType } from 'next'
import { FC, useState } from 'react'
import useSWR, { SWRConfig } from 'swr'

import { ArticleEntity, ArticleEntityResponseCollection, CategoryEntityResponseCollection } from '../.graphclient'
import { ArticleList, Card, Categories, Hero, Seo } from '../components'
import { getArticles, getCategories } from '../lib/api'

export async function getStaticProps() {
  const articles = await getArticles({ pagination: { limit: 10 } })
  const categories = await getCategories()

  return {
    props: {
      fallback: {
        ['/articles']: articles?.articles || [],
        ['/categories']: categories?.categories || [],
      },
    },
    revalidate: 1,
  }
}

const Home: FC<InferGetServerSidePropsType<typeof getStaticProps>> = ({ fallback }) => {
  return (
    <SWRConfig value={{ fallback }}>
      <_Home />
    </SWRConfig>
  )
}

const _Home: FC = () => {
  const [query, setQuery] = useState<string>()
  const debouncedQuery = useDebounce(query, 200)

  const [selected, setSelected] = useState<string[]>([])
  const { data: articlesData } = useSWR<ArticleEntityResponseCollection>('/articles')
  const { data: categoriesData } = useSWR<CategoryEntityResponseCollection>('/categories')

  const { data: filterData, isValidating } = useSWR(
    [`/articles`, selected, debouncedQuery],
    async (url, selected, debouncedQuery) => {
      return (
        await getArticles({
          filters: {
            ...(debouncedQuery && { title: { containsi: debouncedQuery } }),
            ...(selected.length > 0 && {
              categories: {
                id: {
                  in: selected,
                },
              },
            }),
          },
        })
      )?.articles
    },
    { revalidateOnFocus: false, revalidateIfStale: false, revalidateOnReconnect: false, revalidateOnMount: false }
  )

  const loading = useDebounce(isValidating, 400)
  const articles = articlesData?.data
  const categories = categoriesData?.data
  const articleList = selected && filterData?.data ? filterData?.data : articles ? articles : undefined

  return (
    <>
      <Seo />
      <div className="flex flex-col divide-y divide-slate-800">
        {articles?.[0] && <Hero article={articles[0]} />}
        <section className="py-10 pb-60">
          <Container maxWidth="5xl" className="mx-auto px-4 space-y-10">
            <div className="flex flex-col gap-y-8 md:flex-row items-center justify-between">
              <div className="order-2 md:order-1 flex gap-3">
                {categories && <Categories selected={selected} onSelect={setSelected} categories={categories} />}
              </div>
              <div className="w-full md:w-auto order-1 md:order-2 flex items-center gap-3 rounded-xl bg-slate-800 px-3 focus-within:ring-2 ring-slate-700 ring-offset-2 ring-offset-slate-900">
                <SearchIcon width={24} height={24} className="text-slate-500" />
                <input
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full font-bold placeholder:text-sm h-[40px] text-slate-300 bg-transparent text-base !ring-0 !outline-0"
                  placeholder="Search Article"
                />
              </div>
            </div>

            {articleList && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 transition-all">
                <ArticleList
                  articles={articleList as ArticleEntity[]}
                  loading={loading}
                  render={(article) => <Card article={article} key={`article__left__${article.attributes?.slug}`} />}
                />
              </div>
            )}
            <div className="flex justify-center">
              <Button as="a" href="/blog/archive" color="gray" variant="outlined" className="px-6">
                View Archive
              </Button>
            </div>
          </Container>
        </section>
      </div>
    </>
  )
}

export default Home
