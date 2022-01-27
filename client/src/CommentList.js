import React, { useState, useEffect } from 'react';
//import axios from 'axios';

export default ({ comments }) =>{

    /*
        No longer necessary to fetch comment

    const [comments, setComments] = useState([]);

    const fetchData = async () =>{

        const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`);

        setComments(res.data);
    };

    // to call fetchData only 1 time at starting of page load
    useEffect(() => {
        fetchData();
    }, []);
    */

    const renderedComments = comments.map(comment => {
        let content;
        // check if comment has moderated
        if(comment.status === 'approved') {
            content = comment.content;
        }
        
        if(comment.status === 'pending') {
            content = 'This comment is awaiting moderation';
        }

        if(comment.status === 'rejected') {
            content = 'This comment has been rejected';
        }
        return <li key={comment.id}>{content}</li>
    });

    return (
        <ul>
            {renderedComments}
        </ul>
    );

    
};