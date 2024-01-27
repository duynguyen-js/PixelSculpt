import { useState, useEffect } from "react"
import LoadingSpinner from "../loadingSpinner/LoadingSpinner"
import './home.scss'
import Card from '../card/Card'
import CreatePost from '../createPost/CreatePost'
import FormField from "../createPost/formField/FormField";
import RenderCards from "./renderCards/RenderCards";

const Home = () => {
  const [loading, setLoading] = useState(true)
  const [allPosts, setAllPosts] = useState(null)
  const [search, setSearch] = useState('');
  return (
    <section>
      <div className="text-container">
        <h1>The Community Showcase</h1>
        <p>
          Browse through a collection of imaginative and visually stunning
          images generated using the DALL-E AI
        </p>
      </div>

      <div className="form-field-container">
        <FormField />
      </div>

      <div className="loading-container">
        {loading ? <LoadingSpinner loading={loading}/> : (
          <>
            {search && (
              <h2 className="search-text">
                Displaying results for: <span>{search}</span>
              </h2>
            )}

            <div className="image-grid">
              {search ? (
                <RenderCards 
                  data={[]}
                  title="No search results found"
                />
              ) : ( 
                <RenderCards 
                  data={[]}
                  title="No posts found"
                />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Home