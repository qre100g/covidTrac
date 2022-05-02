import {useEffect, useState} from 'react';
import '../App.css';

function FetchingData (props) {
    var i = 0 ;
    const [j, setJ] = useState(0);
    const [data, setData] = useState();
    const [allCountryData, setCountryData] = useState();
    useEffect(() => {

        {props.alldata 

        ?
            setData(props.alldata)
        : 
            fetch(`https://covid-193.p.rapidapi.com/statistics?country=${props.country}`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "covid-193.p.rapidapi.com",
                    "x-rapidapi-key": "62ad2338e8msh8a612dad982d309p128c89jsna8da92e0a484"
                }
            })
            .then(res => res.json())
            .then(response => {
                setData(response.response);
                console.log(response);
            })
            .catch(err => {
                console.error(err);
            });
        }

    },[])
    return(<div >
        <h1>Covid Data</h1>
        <span style= {{
            fontSize: '11px'
        }}>Note: Apply the filters on clicking the headings</span>
        {data ? 

        <div style={{overflowX: 'auto', padding: '10px', overflowY: 'auto'}}>
            
            <table className='table' >
                <thead >
                    <tr className='row'>
                        <th>SNO</th>
                        <th onClick={() => {
                            if(j === 0) {
                                props.sort('countryA');
                                setJ(1);
                            }
                            else {
                                props.sort('countryD')
                                setJ(0);
                            }
                        }}>Country Name</th>
                        <th onClick={() => {
                            console.log('clicked', j)

                            if(j === 0) {
                                props.sort('totalA');
                                setJ(1);
                            }
                            else {
                                props.sort('totalD')
                                setJ(0);
                            }
                            
                        }}>
                            Total Cases
                        
                        </th>

                        <th onClick={() => {
                            if(j === 0) {
                                props.sort('newCasesAsc');
                                setJ(1);
                            }
                            else {
                                props.sort('newCasesDesc')
                                setJ(0);
                            }
                        }}>
                            New Cases
                        </th>

                        <th onClick={() => {
                            console.log('clicked', j)
                            if(j === 0) {
                                props.sort('criticalA');
                                setJ(1);
                            }
                            else {
                                props.sort('criticalD')
                                setJ(0);
                            }
                        }}>
                            Critical Cases
                        </th>

                        <th onClick={() => {
                            if(j === 0) {
                                props.sort('activeA');
                                setJ(1);
                            }
                            else {
                                props.sort('activeD')
                                setJ(0);
                            }
                        }}>Active Cases</th>
                        <th onClick={() => {
                            if(j === 0) {
                                props.sort('deathsA');
                                setJ(1);
                            }
                            else {
                                props.sort('deathsD')
                                setJ(0);
                            }
                        }}>Deaths</th>
                        <th onClick={() => {
                            if(j === 0) {
                                props.sort('recoveredA');
                                setJ(1);
                            }
                            else {
                                props.sort('recoveredD')
                                setJ(0);
                            }
                        }}>Recovered</th>

                        <th onClick={() => {
                            if(j === 0) {
                                props.sort('cases1MpopA');
                                setJ(1);
                            }
                            else {
                                props.sort('cases1MpopD')
                                setJ(0);
                            }
                        }}>Cases/ 1M</th>
                        <th onClick={() => {
                            if(j === 0) {
                                props.sort('deaths1MpopA');
                                setJ(1);
                            }
                            else {
                                props.sort('deaths1MpopD')
                                setJ(0);
                            }
                        }}>Deaths/ 1M</th>
                    </tr>
                </thead>
                
                    
                {data.map((e) => {
                    return (<tr className='row'>
                        <td>{++i}</td>
                        <td style={{
                            fontWeight: '600',
                            color: 'black',
                            textTransform: 'capitalize',
                            width: 'auto',
                        }}>
                            {data.length > 10 ? <span>{e.country}</span> : <span></span>}
                        </td>
                        <td>{e.cases.total}</td>
                        <td>{e.cases.new}</td>
                        <td>{e.cases.critical}</td>
                        <td>{e.cases.active}</td>
                        <td>{e.deaths.total}</td>
                        <td>{e.cases.recovered}</td>
                        <td>{e.cases["1M_pop"]}</td>
                        <td>{e.deaths["1M_pop"]}</td>
                    </tr>)
                })}
            </table>
        </div>

         : <h1>Loading data</h1> }
    </div>)
}

function FetchAllData () {
    const [allData, setAllData] = useState();
    const [b, setB] = useState();

    const [reload, setReload] = useState(false);


    const [sort, setSort] = useState();

    function sortCases (e) {
        console.log('Control to Parant')
        setSort(e)
    }

    useEffect(() => {
        fetch("https://covid-193.p.rapidapi.com/statistics", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "covid-193.p.rapidapi.com",
                "x-rapidapi-key": "62ad2338e8msh8a612dad982d309p128c89jsna8da92e0a484"
            }
        })
        .then(res => res.json())
        .then(response => {
            setAllData(response.response.sort((a,b) => b.cases.new - a.cases.new))
        })
        .catch(err => {
            console.error(err);
        });
    }, [])



    useEffect(() => {
        if(sort === 'total') {
            setAllData(allData.sort((a,b) => a.cases.total - b.cases.total))
            setReload(!reload);
        }


        switch (sort) {
            case 'criticalD':
                setAllData(allData.sort((a,b) => b.cases.critical - a.cases.critical));
                setReload(!reload);
                break;
            
            case 'criticalA':
                setAllData(allData.sort((a,b) => a.cases.critical - b.cases.critical));
                setReload(!reload);
                break;
            
            case 'totalA': 
                setAllData(allData.sort((a,b) => a.cases.total - b.cases.total))
                setReload(!reload);
                break;
            
            case 'totalD':
                setAllData(allData.sort((a,b) => b.cases.total - a.cases.total))
                setReload(!reload);
                break;

            case 'newCasesAsc':
                setAllData(allData.sort((a,b) => a.cases.new - b.cases.new))
                setReload(!reload);
                break;

            case 'newCasesDesc':
                setAllData(allData.sort((a,b) => b.cases.new - a.cases.new))
                setReload(!reload);
                break;
            
            case 'activeA':
                setAllData(allData.sort((a,b) => a.cases.active - b.cases.active))
                setReload(!reload);
                break;

            case 'activeD':
                setAllData(allData.sort((a,b) => b.cases.active - a.cases.active))
                setReload(!reload);
                break;

            case 'deathsA':
                setAllData(allData.sort((a,b) => a.deaths.total - b.deaths.total))
                setReload(!reload);
                break;

            case 'deathsD':
                setAllData(allData.sort((a,b) => b.deaths.total - a.deaths.total))
                setReload(!reload);
                break;

            case 'recoveredA':
                setAllData(allData.sort((a,b) => a.cases.recovered - b.cases.recovered))
                setReload(!reload);
                break;

            case 'recoveredD':
                setAllData(allData.sort((a,b) => b.cases.recovered - a.cases.recovered))
                setReload(!reload);
                break;

            case 'cases1MpopA':
                setAllData(allData.sort((a,b) => a.cases['1M_pop'] - b.cases['1M_pop']))
                setReload(!reload);
                break;
            
            case 'cases1MpopD':
                setAllData(allData.sort((a,b) => b.cases['1M_pop'] - a.cases['1M_pop']))
                setReload(!reload);
                break;

            case 'deaths1MpopA':
                setAllData(allData.sort((a,b) => a.deaths['1M_pop'] - b.deaths['1M_pop']))
                setReload(!reload);
                break;

            case 'deaths1MpopD':
                setAllData(allData.sort((a,b) => b.deaths['1M_pop'] - a.deaths['1M_pop']))
                setReload(!reload);
                break;

            case 'countryA' :
                setAllData(allData.sort((a,b) => {
                    var s1 = a.country.toLowerCase();
                    var s2 = b.country.toLowerCase();
                    if(s1 < s2) {
                        return -1;
                    }
                    if(s1 > s2) {
                        return 1;
                    }
                    return 0;
                }))
                setReload(!reload);
                break;

            case 'countryD':
                setAllData(allData.sort((a,b) => {
                    var s1 = a.country.toLowerCase();
                    var s2 = b.country.toLowerCase();
                    if(s1 < s2) {
                        return 1;
                    }
                    if(s1 > s2) {
                        return -1;
                    }
                    return 0;
                }))
                setReload(!reload);
                break;
        
            default:
                break;
        }
    },[sort])


    return (<div>
        { allData ? <>
            {console.log('render', allData)}
            <FetchingData alldata = {allData} sort = {sortCases}/>
        </> : <h1>Loading Covid Data</h1>}
    </div>)
}
export {FetchAllData} ;

export default FetchingData;