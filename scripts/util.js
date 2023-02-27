import uniqid from "uniqid";
import react from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import React from "react";

export const MapPortfolioDataArray = (props) => {

    return (<>
        {props.dataArray.map((item) => {
            return (
                <div key={uniqid()}>
                    {!react.isValidElement(item) ?
                        <ReactMarkdown rehypePlugins={[rehypeRaw]} children={item} />
                        :
                        <>{item}</>/**/
                    }
                </div>)
        })}
    </>)
}

export const MapProjectStack = (props) => {
    return <ul className="project__stack">
        {props.stack.map((item) => (
            <li key={uniqid()} className='project__stack-item'>
                {item}
            </li>
        ))}
    </ul>;
}