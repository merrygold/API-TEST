import { Button, Input, Text} from "@pancakeswap-libs/uikit";
import React, { useRef, useState } from "react";
import apiClient from "../http-common"

const GetData = () => {


    const get_id = useRef(null);
    const get_title = useRef(null);
    const [getResult, setGetResult] = useState(null);


    const fortmatResponse = (res) => {
        return JSON.stringify(res, null, 2);
    };

    async function getAllData() {
        try {
            const res = await apiClient.get("/posts?_limit=10");

            const result = {
                status: res.status + "-" + res.statusText,
                headers: res.headers,
                data: res.data,
            };
            setGetResult(fortmatResponse(result));


        } catch (err) {
            setGetResult(fortmatResponse(err.response?.data || err));

        }


    }




    async function getDataById() {
        const id = get_id.current.value;

        if (id) {
            try {
                const res = await apiClient.get(`/posts/${id}`);

                const result = {
                    data: res.data,
                    status: res.status,
                    statusText: res.statusText,
                    headers: res.headers,
                };

                setGetResult(fortmatResponse(result));
            } catch (err) {
                setGetResult(fortmatResponse(err.response?.data || err));
            }
        }
    }

    async function getDataByTitle() {
        const title = get_title.current.value;

        if (title) {
            try {
                // const res = await instance.get(`/posts?title=${title}`);
                const res = await apiClient.get("/posts", {
                    params: {
                        title: title,
                    },
                });

                const result = {
                    status: res.status + "-" + res.statusText,
                    headers: res.headers,
                    data: res.data,
                };

                setGetResult(fortmatResponse(result));
            } catch (err) {
                setGetResult(fortmatResponse(err.response?.data || err));
            }
        }
    }

    const clearGetOutput = () => {
        setGetResult(null);
    };

    return (

        <div className="card mt-3">

            <div className="card-header">GET All the Data</div>
            <div className="card-body">

                <div className="input-group input-group-sm">


                    <Button as="button" variant="danger" scale="sm" external mr="8px" onClick={getAllData}>
                        GetData
                    </Button>
                    <Input style={{ borderRadius: '10px' }} className="form-control" type="number" placeholder="Id" ref={get_id} scale="sm" />
                    <div className="input-group-append">
                        <Button style={{ borderRadius: '0px' }} as="button" variant="primary" scale="sm" external ml="4px" mr="8px" onClick={getDataById}>
                            Get by Id
                        </Button>
                    </div>

                    <Input style={{ borderRadius: '10px' }} className="form-control" type="text" placeholder="Title" ref={get_title} scale="sm" />
                    <div className="input-group-append">
                        <Button style={{ borderRadius: '0px' }} as="button" variant="primary" scale="sm" external ml="4px" mr="8px" onClick={getDataByTitle}>
                            Find By Title
                        </Button>

                    </div>
                    <Button style={{ borderRadius: '30px', alignContent: "center" }} as="button" variant="subtle" scale="sm" external ml="4px" mr="8px" onClick={clearGetOutput}>
                        Clear
                    </Button>

                </div>
               
                {getResult && <pre><b><Text style={{ backgroundColor: 'black' , margin: "15px", padding: "15px" , borderRadius: '35px' }} color="primary" textTransform="uppercase"> { getResult }</Text></b></pre>}
                    
                       
           

            </div>
        </div>


    );
}

export default GetData;