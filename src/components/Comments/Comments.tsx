import React, { FC, useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Comment } from './types/types';

interface ICommentsProps {
  postId: number
}

const Comments: FC <ICommentsProps> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    axios.get<Comment[]>(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
    .then((res: AxiosResponse<Comment[]>) => setComments(res.data));
  }, [postId]);

  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-4 text-gray-400">Комментарии:</h2>
      {comments.map((comment: Comment) => (
        <div key={comment.id} className="border rounded p-4 mb-4">
          <p className="text-lg font-bold text-green-500">{comment.name}</p>
          <p className="text-sm text-gray-500">{comment.email}</p>
          <p>{comment.body}</p>
        </div>
      ))}
    </div>
  );
};

export default Comments;
