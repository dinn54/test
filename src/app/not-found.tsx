import { ROUTES } from '@/constants/route'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex h-[calc(100dvh-200px)] flex-col items-center justify-center gap-2">
      <h2 className="text-2xl font-bold">페이지가 존재하지 않습니다.</h2>
      <Link className="text-blue-500 hover:underline" href={ROUTES.HOME}>
        뒤로가기
      </Link>
    </div>
  )
}
