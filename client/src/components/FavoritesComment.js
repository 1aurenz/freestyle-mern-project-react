import React, { useState, useEffect } from 'react';

const Comment = ({ favoriteItemId }) => {
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/favorites/comments/${favoriteItemId}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });
                const commentsData = await response.json();
                setComments(commentsData.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchComments();
    }, [favoriteItemId, setComments]);

    const handleNewCommentChange = (event) => {
        setNewComment(event.target.value);
    };

    const handleSubmitComment = async (event) => {
        event.preventDefault();

        try {
            await fetch('http://localhost:3001/api/favorites/comments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ favoriteItemId, comment: newComment }),
            });
            setNewComment('');
            window.location.reload();

        } catch (error) {
            console.error(error);
        }
    }

    const handleDeleteComment = async (commentId) => {
        try {
            await fetch(`http://localhost:3001/api/favorites/comments/${commentId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });
            setComments(comments.filter(comment => comment._id !== commentId));

        } catch (error) {
            console.error(error);
        }
    }

    const handleEditComment = (commentId) => {
        setComments(comments.map(comment => {
            if (comment._id === commentId) {
                return { ...comment, editing: true };
            } else {
                return comment;
            }
        }));
    }

    const handleEditCommentChange = (event, commentId) => {
        const { value } = event.target;
        setComments(comments.map(comment => {
            if (comment._id === commentId) {
                return { ...comment, comment: value };
            } else {
                return comment;
            }
        }));
    }

    const handleUpdateComment = async (commentId) => {
        const updatedComment = comments.find(comment => comment._id === commentId);
        try {
            await fetch(`http://localhost:3001/api/favorites/comments/${commentId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ comment: updatedComment.comment }),
            });
            setComments(comments.map(comment => {
                if (comment._id === commentId) {
                    return { ...comment, editing: false };
                } else {
                    return comment;
                }
            }));

        } catch (error) {
            console.error(error);
        }
    }


    return (
        <div className="mt-6">
            <h2 className="text-xl font-bold mb-2">Comments</h2>
            <form onSubmit={handleSubmitComment} className="flex mb-4">
                <input
                    type="text"
                    value={newComment}
                    onChange={handleNewCommentChange}
                    className="border border-gray-400 py-2 px-3 w-full rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-r-md"
                >
                    Add
                </button>
            </form>
            {comments.length > 0 ? (
                comments.map((comment) => (
                    <div key={comment._id} className="flex flex-col items-start mb-2">
                        {comment.editing ? (
                            <div className="flex w-full">
                                <input
                                    type="text"
                                    value={comment.comment}
                                    onChange={(event) => handleEditCommentChange(event, comment._id)}
                                    className="border border-gray-400 py-2 px-3 w-full rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button
                                    onClick={() => handleUpdateComment(comment._id)}
                                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-3 rounded-r-md"
                                >
                                    Save
                                </button>
                            </div>
                        ) : (
                            <div className="flex w-full">
                                <p className="italic">
                                    {comment.comment}
                                </p>
                                <div className="ml-auto flex items-center space-x-1">
                                    <button
                                        onClick={() => handleEditComment(comment._id)}
                                        className="bg-gray-500 hover:bg-gray-600 text-white py-1 px-2 rounded-md text-sm"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteComment(comment._id)}
                                        className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-r-md text-sm"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <p>No comments available yet</p>
            )}
        </div>

    );

};

export default Comment;