import React, {useState, useEffect } from "react";
import axios from 'axios';
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

export default () =>{
    // request from post servide and display all post
    // initital state {}==empty object
    const [posts, setPosts] = useState({});
    
    /* No longer need to query from post
        Query from Query-Service

    const fetchPost = async () =>{
        const res = await axios.get('http://localhost:4000/posts');

        setPosts(res.data);
    };
    */
   // using query service
    const fetchPost = async () =>{
        const res = await axios.get('http://localhost:4002/posts');

        setPosts(res.data);
    };
    // use to call function only one time at time of reload
    useEffect(() => {
        fetchPost();
    }, []);

    // render Posts using JSX
    const renderedPosts = Object.values(posts).map(post => {
        return <div className="card" 
        style={{width: '30%', marginBottom: '20px' }}
        key={post.id}
        >
            <div className="card-body">
                <h3>{post.title}</h3>
                {/* since now we have all comment in post pass the 
                    all comments directly
                    <CommentList postId={post.id} />
                */}
                <CommentList comments={post.comments} />
                <CommentCreate postId={post.id} />
            </div>
        </div>
    });
 
    return (
        <div className="d-flec flex-row flex-wrap justify-content-between">
            {renderedPosts}
        </div>
    );
};