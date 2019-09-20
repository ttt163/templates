/**
 * Author：tantingting
 * Time：2019/5/22
 * Description：Description
 */

import React, {Component, useEffect, useState, useRef, useCallback} from 'react'
import './index.scss'
import { useStore } from 'react-redux'

/*export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div>home</div>
        )
    }
}*/

function useDocumentTitle(title) {
    console.log(title)
    useEffect(
        () => {
            document.title = title;
            return () => (document.title = "前端精读");
        },
        [title]
    );
}


function getSize() {
    return {
        innerHeight: window.innerHeight,
        innerWidth: window.innerWidth,
        outerHeight: window.outerHeight,
        outerWidth: window.outerWidth
    };
}

function useWindowSize() {
    let [windowSize, setWindowSize] = useState(getSize());

    function handleResize() {
        setWindowSize(getSize());
    }

    useEffect(() => {
        console.log('resize')
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return windowSize;
}

// const ref = useRef(null);
// let componentSize = useComponentSize(ref);

function useInputValue(initialValue) {
    let [value, setInput] = useState(initialValue);
    let onChange = useCallback(function(event) {
        setInput({val: event.currentTarget.value});
    }, []);

    console.log(value)
    return {
        value: value.val,
        onChange
    };
}

/*function useSpring(targetValue) {
    useEffect(
        () => {
            if (spring) {
                spring.setEndValue(targetValue);
            }
        },
        [targetValue]
    );
}

const [target, setTarget] = useState(50);
const value = useSpring(target);*/

export default function Home() {
    useDocumentTitle("home");
    let name = useInputValue({val: "Jamie"});
  const store = useStore()
  console.log(store.getState())

    const windowSize = useWindowSize();
    return <>
        页面高度：{windowSize.innerWidth}
        <input {...name}/>
        {/*<div onClick={() => setTarget(100)}>{value}</div>;*/}
        </>;
}
