import React, { useEffect, useState } from "react";
import getTrendingTerms from '../../service/giffy/getTrendingTerms'
import Category from './Category'

export default function TrendingSearches (){
    const [trends, setTrends] = useState([])

    useEffect(function (){
        getTrendingTerms().then(setTrends)
    }, [])
    return <Category  options={trends} />
}