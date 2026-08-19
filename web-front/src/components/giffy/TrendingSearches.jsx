import { Suspense } from 'react'
import React from 'react'
import useNearScreen from '../../hooks/giffy/useNearScreen'

const  TrendingSearches = React.lazy(
    ()=> import('./TrendingIndex')
)


export default function LazyTrending () {
    
    const {isNearScreen, fromRef} = useNearScreen({distance: '200px'})

     
    return<div ref={fromRef}>
        <Suspense fallback = {'Estoy cargando...'}>
        {isNearScreen ? <TrendingSearches /> : null}
        </Suspense>
    </div>
}  