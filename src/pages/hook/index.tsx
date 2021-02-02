/** @format */

import React, {useState, useEffect} from 'react'
export default function HookPage() {
    const [count, setCount] = useState(0)
    const [date, setDate] = useState(new Date())
    // 与 componentDidMount 和 componentDidUpdate相似
    useEffect(() => {
        document.title = `You clicked ${count} times`
    }, [count])
    useEffect(() => {
        const timer = setInterval(() => {
            setDate(new Date())
        }, 1000)
        // componentWillUnMount 清除
        return () => {
            clearInterval(timer)
        }
    }, [])
    return (
        <div>
            <h3>HookPage</h3>
            <p>{count}</p>
            <p>{date.toLocaleTimeString}</p>
            <button onClick={() => setCount(count + 1)}>add</button>
        </div>
    )
}
