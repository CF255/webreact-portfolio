import {useContext} from 'react'
import GifsContext from '../../context/giffy/GifsContext'

export default function useGlobalGifs () {
  return useContext(GifsContext).gifs
}