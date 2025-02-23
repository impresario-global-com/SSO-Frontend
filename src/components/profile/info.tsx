import { CauseLevelDto } from '@/api/survey'

const ProfileInfo = (props: CauseLevelDto) => {
  return (
    <section className="my-9 flex flex-col gap-6 lg:my-16 lg:flex-row">
      <div className="relative ">
        <img src={props?.imgUrl} alt={props?.name} className="h-[164px] object-cover w-[128px] rounded-2xl" />
      </div>
      <div className="space-y-2">
        <p className="uppercase">You are a</p>
        <h1 className="bg-gradient-to-t from-pink to-orange bg-clip-text text-4xl font-bold text-transparent">
          {props.name}
        </h1>
        <p className="max-w-5xl text-sm opacity-90">{props.description}</p>
      </div>
    </section>
  )
}

export default ProfileInfo
