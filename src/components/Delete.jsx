import { Button, Input } from "@pancakeswap-libs/uikit";
import React, { useRef, useState } from "react";
import apiClient from "../http-common"


const DeleteData = () => {

    const delete_id = useRef(null);
    const [deleteResult, setDeleteResult] = useState(null);
    const fortmatResponse = (res) => {
        return JSON.stringify(res, null, 2);
    };

    async function deleteAllData() {
        try {
            const res = await apiClient.delete("/posts");

            const result = {
                status: res.status + "-" + res.statusText,
                headers: res.headers,
                data: res.data,
            };

            setDeleteResult(fortmatResponse(result));
        } catch (err) {
            setDeleteResult(fortmatResponse(err.response?.data || err));
        }
    }

    async function deleteDataById() {
        const id = delete_id.current.value;

        if (id) {
            try {
                const res = await apiClient.delete(`/posts/${id}`);

                const result = {
                    status: res.status + "-" + res.statusText,
                    headers: res.headers,
                    data: res.data,
                };

                setDeleteResult(fortmatResponse(result));
            } catch (err) {
                setDeleteResult(fortmatResponse(err.response?.data || err));
            }
        }
    }
    const clearDeleteOutput = () => {
        setDeleteResult(null);
    };
    return (
        <div className="card mt-3">
            <div className="card-header">DELETE Data</div>
            <div className="card-body">
                <div className="input-group input-group-sm">
                    <Button as="button" variant="primary" scale="sm" external mr="8px" onClick={deleteAllData}>Delete All</Button>
                    
                    <Input type="text" className="form-control ml-2" ref={delete_id} scale="md" placeholder="Id" />
                    <div className="input-group-append">
                        <Button as="button" variant="danger" scale="sm" external mr="8px" onClick={deleteDataById}>Delete by Id</Button>
                    </div>
                    <Button style={{ borderRadius: '30px', alignContent: "center" }} as="button" variant="subtle" scale="sm" external mr="8px" onClick={clearDeleteOutput}>Clear</Button>
                </div>

                {deleteResult && <div className="alert alert-secondary mt-2" role="alert"><pre>{deleteResult}</pre></div>}
            </div>
        </div>
    );
}

export default DeleteData;