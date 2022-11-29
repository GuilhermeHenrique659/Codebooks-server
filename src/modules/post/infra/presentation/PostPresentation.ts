import { Post } from '../../domain/entities/Post';
import { IPostPaginate } from '../../domain/repositories/IPostRepostirory';

export class PostPresentation {
    static getPostList(postList: IPostPaginate) {
        return {
            ...postList,
            data: postList.data.flatMap((post) => {
                return {
                    ...post,
                    user: {
                        id: post.user.id,
                        name: post.user.name,
                        avatar: post.user.avatar
                    }
                }
            })
        }
    }

    static getPost(post: Post) {
        return {
            ...post,
            user: {
                id: post.user.id,
                name: post.user.name,
                avatar: post.user.avatar,
            }
        }
    }
}