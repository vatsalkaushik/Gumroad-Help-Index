import ArticleCard from './ArticleCard'

interface Article {
  title: string
  url: string
}

interface SectionRendererProps {
  title: string
  categories: Record<string, (string | Article)[]>
  searchTerm: string
}

export default function SectionRenderer({ title, categories, searchTerm }: SectionRendererProps) {
  const filteredCategories = Object.entries(categories).reduce((acc, [category, articles]) => {
    const filteredArticles = articles.filter(article => {
      const articleTitle = typeof article === 'string' ? article : article.title
      return articleTitle.toLowerCase().includes(searchTerm.toLowerCase())
    })
    if (filteredArticles.length > 0) {
      acc[category] = filteredArticles
    }
    return acc
  }, {} as Record<string, (string | Article)[]>)

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(filteredCategories).map(([category, articles], index) => (
          <ArticleCard 
            key={index} 
            category={category} 
            articles={articles as Article[]} 
          />
        ))}
      </div>
    </div>
  )
}