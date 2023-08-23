import {useState, useEffect} from 'react'

const ITunesChartContainer = () => {

    const [iTunesTop20All, setITunesTop20All] = useState([])

    useEffect(() => {
        fetch("https://itunes.apple.com/gb/rss/topsongs/limit=20/json")
        .then(response => response.json())
        .then(data => {
            const formattedResults = formatResults(data["feed"]["entry"])
            setITunesTop20All(formattedResults)
        })
    }, [])

    console.log(iTunesTop20All)
    
    const formatResults = (results) => {
        const formattedResults = results.map((result, index) => ({
            chartPosition: index + 1,
            songTitle: result["im:name"]["label"],
            artistName: result["im:artist"]["label"]
        }))
        return formattedResults
    }

    const chartNodes = iTunesTop20All.map((entry, index) => 
        <div key={index} className="chart-item">
            <h2>{entry.chartPosition}</h2>
            <div className="item-info">
                <h2>{entry.songTitle}</h2>
                <h3>{entry.artistName}</h3>
            </div>
        </div>
    )

    return (
        <>
            {chartNodes}
        </>
    )

}

export default ITunesChartContainer