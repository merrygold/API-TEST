import { Button, Checkbox, Input } from "@pancakeswap-libs/uikit";
import React, { useRef, useState } from "react";
import apiClient from "../http-common"


const PutData = () => {

  const put_id = useRef(null);
  const put_title = useRef(null);
  const put_description = useRef(null);
  const put_published = useRef(null);
  const [putResult, setPutResult] = useState(null);

  const fortmatResponse = (res) => {
    return JSON.stringify(res, null, 2);
  };

  async function putData() {
    const id = put_id.current.value;

    if (id) {
      const putData = {
        title: put_title.current.value,
        description: put_description.current.value,
        published: put_published.current.checked,
      };

      try {
        const res = await apiClient.put(`/posts/${id}`, putData, {
          headers: {
            "x-access-token": "token-value",
          },
        });

        const result = {
          status: res.status + "-" + res.statusText,
          headers: res.headers,
          data: res.data,
        };

        setPutResult(fortmatResponse(result));
      } catch (err) {
        setPutResult(fortmatResponse(err.response?.data || err));
      }
    }
  }


  const clearPutOutput = () => {
    setPutResult(null);
  };

  return (
    <div className="card mt-3">
      <div className="card-header">Update Data</div>
      <div className="card-body">
        <div className="form-group">
          <Input type="text" className="form-control" ref={put_id} scale="md" placeholder="Id" />
        </div>
        <div className="form-group">
          <Input type="text" className="form-control" ref={put_title} scale="md" placeholder="Title" />
        </div>
        <div className="form-group">
          <Input type="text" className="form-control" ref={put_description} scale="md" placeholder="Description" />
        </div>
        <div className="form-check mb-2">
          <Checkbox style={{ margin: '5px' }} scale="sm" ref={put_published} />
          <label className="form-check-label" htmlFor="put_published">Publish</label>
        </div>

        <Button as="button" variant="danger" scale="sm" external mr="8px" onClick={putData}>Update Data</Button>
        <Button style={{ borderRadius: '30px', alignContent: "center" }} as="button" variant="subtle" scale="sm" external mr="8px" onClick={clearPutOutput}>Clear</Button>

        {putResult && <div className="alert alert-secondary mt-2" role="alert"><pre>{putResult}</pre></div>}
      </div>
    </div>

  );
}

export default PutData;