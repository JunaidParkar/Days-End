import React from 'react'
import Navbar from '../component/navbar'
import noUser from '../assets/noUser.jpg'
import SearchCard from '../component/searchCard'

const Search = () => {
  return (
    <>
      <div className="searchContainer">
        <Navbar page="search" />
        <div className="flex searchContentContainer">
          <SearchCard />
          <SearchCard />
          <SearchCard />
          <SearchCard />
          <SearchCard />
          <SearchCard />
          <SearchCard />
          <SearchCard />
          <SearchCard />
          <SearchCard />
          <SearchCard />
          <SearchCard />
          <SearchCard />
          <SearchCard />
          <SearchCard />
        </div>
      </div>
    </>
  )
}

export default Search
