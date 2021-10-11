import React, { useState, useEffect, Component } from 'react'
import {
  CCard,
  CCardHeader,
  CCardBody
} from '@coreui/react'
import { DocsLink } from 'src/reusable'
import axios from 'axios';



export default function Typography({ navigation, route }) {
  const [info, setInfo] = useState([]);


  useEffect(() => {
    // Post updated, do something with route.params.post
    // For example, send the post to the server 

    axios.get('http://34.126.181.144/showdata.php')
      .then(response => {
        setInfo(response.data);
      })
      .catch(err => {
        console.log(err)
      })
  })

  return (
    <>
      <CCard>
        <CCardHeader>
          Headings
          <DocsLink href="https://coreui.io/docs/content/typography/" />
        </CCardHeader>
        <CCardBody>
          <p>Documentation and examples for Bootstrap typography, including global settings, headings, body text, lists, and more.</p>
          <table className="table">
            <thead>
              <tr>
                <th>Heading</th>
                <th>Example</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <p><code className="highlighter-rouge">&lt;h1&gt;&lt;/h1&gt;</code></p>
                </td>
                <td>

                </td>
              </tr>
              <tr>
                <td>
                  <p><code className="highlighter-rouge">&lt;h2&gt;&lt;/h2&gt;</code></p>
                </td>
                <td>{info.map((item) => (
                  <td><span className="h3">{item.Topic_new_feed_exer}</span></td>
                ))}</td>
              </tr>
              <tr>
                <td>
                  <p><code className="highlighter-rouge">&lt;h3&gt;&lt;/h3&gt;</code></p>
                </td>
                <td><span className="h3">h3. Bootstrap heading</span></td>
              </tr>
              <tr>
                <td>
                  <p><code className="highlighter-rouge">&lt;h4&gt;&lt;/h4&gt;</code></p>
                </td>
                <td><span className="h4">h4. Bootstrap heading</span></td>
              </tr>
              <tr>
                <td>
                  <p><code className="highlighter-rouge">&lt;h5&gt;&lt;/h5&gt;</code></p>
                </td>
                <td><span className="h5">h5. Bootstrap heading</span></td>
              </tr>
              <tr>
                <td>
                  <p><code className="highlighter-rouge">&lt;h6&gt;&lt;/h6&gt;</code></p>
                </td>
                <td><span className="h6">h6. Bootstrap heading</span></td>
              </tr>
            </tbody>
          </table>
        </CCardBody>
      </CCard>

    </>
  );
}



