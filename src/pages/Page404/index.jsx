import React, {useEffect, useState} from "react";
import {Content} from "../../components/Content";
// import './style.css';


const Page404 = () => {
    return (
        <Content title="Page not found">
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                flexDirection: 'column',
                textAlign:'center'
            }}>
                <h1>404</h1>
                <h3>Ooops!</h3>
                <h4>THAT PAGE DOESN'T EXIST OR IS UNAVAILABLE</h4>
            </div>
            <style>{`
              html,
              body,
              body > div {
                height: 100%;
              }

              body > div * {
                margin: 15px 0;
              }

              h1 {
                font-size: 80px;
              }

              h3 {
                font-size: 40px;
              }

              h4 {
                font-size: 18px;
              }
            `}</style>
        </Content>
    );
}

export default Page404;
