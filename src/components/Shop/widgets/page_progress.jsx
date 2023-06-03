import React, { useState, useEffect } from 'react';




const PageProgress = () => {
    const [scrollProgress, setScrollProgress] = useState(0);
    useEffect(() => {
        const handleScroll = () => {
            const totalHeight =
                document.documentElement.scrollHeight -
                document.documentElement.clientHeight;
            const progress = window.pageYOffset / totalHeight;
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    return (<div
        className="fixed z-30 left-0 top-0 h-1 bg-gradient-to-r from-cyan-400 to-indigo-500"
        style={{ width: `${scrollProgress * 100}%` }}
    >
    </div>);
}

export default PageProgress;