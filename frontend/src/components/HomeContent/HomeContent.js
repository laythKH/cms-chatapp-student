import './homeContent.css'
import CreateUser from '../Forms/CreateUser/CreateUser';
import SearchForUser from '../Forms/SearchForUser/SearchForUser';

const HomeContent = ({showOption, roles}) => {

  return (
    <div className='home-content-main'>
      
     {showOption === 'createUser' && <CreateUser />} 
     {showOption === 'searchForUser' && <SearchForUser />} 
     {showOption === 'createCourse' && <h1>Create Course</h1>} 
    </div>
  )
}

export default HomeContent