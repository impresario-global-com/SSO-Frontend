import { atomWithStorage, createJSONStorage } from 'jotai/utils'
const storage = createJSONStorage(() => localStorage)
export const profileDetailsAtom = atomWithStorage(
  'profileDetails',
  {
    age: '',
    nationality: '',
    matrimonialStatus: '',
    profession: '',
    gender: '',
    ethnicity: '',
    qualification: '',
  },
  storage,
  { getOnInit: true }
)

export const accessTokenAtom = atomWithStorage('accessToken', null, storage, { getOnInit: true })

export const callbackUrlAtom = atomWithStorage('callbackURL', null, storage, { getOnInit: true })
