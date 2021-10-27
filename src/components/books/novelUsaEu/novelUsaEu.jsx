import React from "react";
import { Link, Switch, Route, useParams } from "react-router-dom";
import styles from "./novelUsaEu.module.css";
import { useRef } from "react/cjs/react.development";

const NovelUsaEu = ({ novelUsaEuData }) => {
  const initialBoxRef = useRef();
  const { keyValue } = useParams();
  console.log(Boolean(keyValue));

  return (
    <>
      {!keyValue && (
        <div ref={initialBoxRef} className={styles.novelUsaEuInitialBox}>
          <div>
            <h1>{novelUsaEuData[Object.keys(novelUsaEuData).length].type}</h1>
            <h2>{novelUsaEuData[Object.keys(novelUsaEuData).length].title}</h2>
            <div>
              {novelUsaEuData[
                Object.keys(novelUsaEuData).length
              ].contents.props.children.map((str) => {
                if (str.type !== "br") {
                  return str;
                }
                if (str.type === "br") {
                  return (
                    <>
                      <br></br>
                      <br></br>
                    </>
                  );
                }
              })}
            </div>
          </div>
        </div>
      )}
      {Object.keys(novelUsaEuData)
        .reverse()
        .map((key) => {
          const testStr = novelUsaEuData[key].contents.props.children.map(
            (str) => {
              if (str.type !== "br") {
                return str;
              }
              if (str.type === "br") {
                return "<br></br>";
              }
            }
          );
          // testStr.join("") 배열을 하나로 연결된 문자열로 바꾼다.
          let codes = `
              <div>
                <h1>${novelUsaEuData[key].type}</h1>
                <h2>${novelUsaEuData[key].title}</h2>
                <div>
                  ${testStr.join("")}
                </div>
              </div>`;
          return (
            <>
              <div className={styles.switchBox}>
                <Switch>
                  <Route path={`/novelUsaEU/${key}`}>
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
        {Object.keys(novelUsaEuData)
          .reverse()
          .map((key) => {
            return (
              <li>
                <Link
                  className={styles.novelUsaEuDataList}
                  to={`/novelUsaEU/${key}`}
                >
                  <h4>{key}.&emsp;</h4>
                  <h4>{novelUsaEuData[key].type}&nbsp;-&nbsp;</h4>
                  <h4>{novelUsaEuData[key].title}</h4>
                </Link>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default NovelUsaEu;