import React from "react";
import { Link, Switch, Route, useParams } from "react-router-dom";
import styles from "./nodeJs.module.css";
import { useRef } from "react/cjs/react.development";

const NodeJs = ({ nodeJSs }) => {
  const initialBoxRef = useRef();
  const { keyValue } = useParams();
  const initialCodes = `
    <div>
      ${nodeJSs[nodeJSs.length - 1].contents}
    </div>`;

  return (
    <>
      {!keyValue && (
        <div ref={initialBoxRef} className={styles.novelUsaEuInitialBox}>
          <div>
            <h1>{nodeJSs[nodeJSs.length - 1].type}</h1>
            <h2>{nodeJSs[nodeJSs.length - 1].title}</h2>
            <div dangerouslySetInnerHTML={{ __html: initialCodes }}></div>
          </div>
        </div>
      )}
      {Object.keys(nodeJSs)
        .reverse()
        .map((key) => {
          const testStr = nodeJSs[key].contents;
          // testStr.join("") 배열을 하나로 연결된 문자열로 바꾼다.
          let codes = `
              <div>
                <h1>${nodeJSs[key].type}</h1>
                <h2>${nodeJSs[key].title}</h2>
                <div>
                  ${testStr}
                </div>
              </div>`;
          return (
            <>
              <div className={styles.switchBox}>
                <Switch>
                  <Route path={`/nodeJS/${nodeJSs[key].id}`}>
                    <div
                      className={styles.novelUsaEuBox}
                      dangerouslySetInnerHTML={{ __html: codes }}
                    ></div>
                  </Route>
                </Switch>
              </div>
            </>
          );
        })}
      <ul className={styles.novelUsaEuDataUlBox}>
        {Object.keys(nodeJSs)
          .reverse()
          .map((key) => {
            return (
              <li>
                <Link
                  className={styles.novelUsaEuDataList}
                  to={`/nodeJS/${nodeJSs[key].id}`}
                >
                  <h4>{nodeJSs[key].id}.&emsp;</h4>
                  <h4>{nodeJSs[key].type}&nbsp;-&nbsp;</h4>
                  <h4>{nodeJSs[key].title}</h4>
                </Link>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default NodeJs;
