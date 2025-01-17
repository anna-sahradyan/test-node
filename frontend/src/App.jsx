import {useState} from "react";
import {Posts} from "./components/posts/Posts.jsx";



export const App = () => {
    const [selectedPosts, setSelectedPosts] = useState(new Set());
    return (
        <>
            <div className={'wrapper'}>
                <div className="effect"></div>
                <Posts selectedPosts={selectedPosts} setSelectedPosts={ setSelectedPosts}/>
            </div>
        </>
    );
};
