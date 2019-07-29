import {Story} from './story' 



export interface UserI {
    nickName: string,
    email: string,
    UID: number,
    stories: Story[]
}
