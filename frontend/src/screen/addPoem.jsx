import React from 'react'

const AddPoem = () => {
  return (
    <>
        <div className="flexCenter addPoemContainer">
            <form method="post" className='flex' >
                <h3>Add Post</h3>
                <input type="text" name="" id="" placeholder="Enter the heading for your post" required />
                <textarea name="" id="" cols="30" rows="10" placeholder="Enter your poem here..." defaultValue="" required ></textarea>
                <input type="submit" value="Add Post" />
            </form>
        </div>
    </>
  )
}

export default AddPoem