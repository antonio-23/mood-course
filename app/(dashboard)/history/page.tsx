import HistoryChart from '@/components/HistoryChart'
import { getUserByClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'

const getData = async () => {
  const user = await getUserByClerkID()
  const analysis = await prisma.analysis.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'asc',
    },
  })

  const sum = analysis.reduce((acc, curr) => acc + curr.sentimentScore, 0)
  const average = Math.round(sum / analysis.length)

  return { analysis, average }
}

const History = async () => {
  const { analysis, average } = await getData()

  console.log(analysis)

  return (
    <div className="w-full h-full">
      <div>{`Avg. Sentiment ${average}`}</div>
      <div className="w-full h-full">
        <HistoryChart data={analysis} />
      </div>
    </div>
  )
}

export default History
