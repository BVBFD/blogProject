import Image from 'next/image';
import styles from './index.module.scss';

interface PostType {
  _id: string;
  __v: number;
  updatedAt: string;
  title: string;
  text: string;
  imgUrl: string;
  createdAt: string;
  catName: string;
  author: string;
}

const Post = ({ post }: { post: PostType }) => {
  const inputText = () => {
    return { __html: `${post?.text}` };
  };

  return (
    <div className={styles.wrapper}>
      <Image alt="postImg" crossOrigin="anonymous" height={300} src={post?.imgUrl} width={300} />
      <div className={styles.content}>
        <header>{post?.title}</header>
        <span>{new Date(post?.updatedAt).toDateString()}</span>
        <div dangerouslySetInnerHTML={inputText()} />
      </div>
    </div>
  );
};

export default Post;
