import { Button, Input } from "@pancakeswap-libs/uikit";
import React, { useRef, useState } from "react";
import apiClient from "../http-common"



const PostData = () => {

    const post_title = useRef(null);
    const post_description = useRef(null);

    const [postResult, setPostResult] = useState(null);


    async function postData() {
        const postData = {
            title: post_title.current.value,
            description: post_description.current.value,
        };

        try {
            const res = await apiClient.post("/posts", postData, {
                headers: {
                    "x-access-token": "token-value",
                },
            });

            const result = {
                status: res.status + "-" + res.statusText,
                headers: res.headers,
                data: res.data,
            };

            setPostResult(fortmatResponse(result));
        } catch (err) {
            setPostResult(fortmatResponse(err.response?.data || err));
        }
    }

    const clearPostOutput = () => {
        setPostResult(null);
    };

    const fortmatResponse = (res) => {
        return JSON.stringify(res, null, 2);
    };

    return (


        <div className="card mt-3">
            <div className="card-header">Post Data</div>
            <div className="card-body">

                <div className="form-group">
                    <Input type="text" className="form-control" ref={post_title} scale="md" placeholder="Title" />
                </div>

                <div className="form-group">
                    <Input type="text" className="form-control" ref={post_description} scale="md" placeholder="Description" />
                </div>
                <Button as="button" variant="danger" scale="sm" external mr="8px" onClick={postData}>Post Data</Button>
                <Button style={{ borderRadius: '30px', alignContent: "center" }} as="button" variant="subtle" scale="sm" external mr="8px" onClick={clearPostOutput}>Clear</Button>
                {postResult && <div className="alert alert-secondary mt-2" role="alert"><pre>{postResult}</pre></div>}
            </div>
        </div>

    );
}

export default PostData;